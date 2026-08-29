import { POSTER_CONFIG } from '../constants/posterConfig';

export interface PhotoTransform {
  zoom: number;       // 0.5 to 3.0 (default: 1.0)
  panX: number;       // offset in percentage of circle diameter (-1.0 to 1.0)
  panY: number;       // offset in percentage of circle diameter (-1.0 to 1.0)
  rotation?: number;  // 0, 90, 180, 270
  brightness?: number;// 80 to 140 (default: 100)
  contrast?: number;  // 80 to 140 (default: 100)
  warmth?: number;    // 0 to 30 (default: 0)
}

export interface RenderPosterOptions {
  canvas: HTMLCanvasElement;
  posterImage: HTMLImageElement;
  userImage: HTMLImageElement | null;
  name: string;
  photoTransform: PhotoTransform;
  fontFamily?: string;
  scale?: number; // 1 for native (941x1671), 2 for 2x (1882x3342), etc.
}

/**
 * Preload an image from a URL or Data URL with Promise
 */
export const loadImage = (src: string): Promise<HTMLImageElement> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => resolve(img);
    img.onerror = (err) => reject(new Error(`Failed to load image: ${src}. Details: ${err}`));
    img.src = src;
  });
};

/**
 * Main Poster Compositor (V3)
 * Performs pixel-perfect rendering onto the provided canvas.
 */
export const renderPoster = ({
  canvas,
  posterImage,
  userImage,
  name,
  photoTransform,
  fontFamily = "'Noto Serif Gujarati', 'Rasa', serif",
  scale = 1,
}: RenderPosterOptions) => {
  const ctx = canvas.getContext('2d', { alpha: false, desynchronized: false });
  if (!ctx) return;

  const targetWidth = Math.round(POSTER_CONFIG.nativeWidth * scale);
  const targetHeight = Math.round(POSTER_CONFIG.nativeHeight * scale);

  if (canvas.width !== targetWidth || canvas.height !== targetHeight) {
    canvas.width = targetWidth;
    canvas.height = targetHeight;
  }

  // Optimize rendering quality
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = 'high';

  // 1. Draw Base Poster Template V3
  ctx.drawImage(posterImage, 0, 0, targetWidth, targetHeight);

  // 2. Draw User Photo clipped to Circle (Exact V3 Geometry)
  const circleCenterX = POSTER_CONFIG.photoCircle.centerX * targetWidth;
  const circleCenterY = POSTER_CONFIG.photoCircle.centerY * targetHeight;
  const circleDiameter = POSTER_CONFIG.photoCircle.diameter * targetWidth;
  const circleRadius = circleDiameter / 2;

  if (userImage && userImage.complete && userImage.naturalWidth > 0) {
    ctx.save();

    // Create circular clipping path (True mathematical circle, equal radius in all axes)
    ctx.beginPath();
    ctx.arc(circleCenterX, circleCenterY, circleRadius, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.clip();

    // Apply color adjustments if specified
    const brightness = photoTransform.brightness ?? 100;
    const contrast = photoTransform.contrast ?? 100;
    const warmth = photoTransform.warmth ?? 0;

    let filterStr = `brightness(${brightness}%) contrast(${contrast}%)`;
    if (warmth > 0) {
      filterStr += ` sepia(${warmth * 0.6}%) saturate(${100 + warmth * 0.8}%)`;
    }
    ctx.filter = filterStr;

    // Calculate Cover Fit + User Transform
    const imgAspect = userImage.naturalWidth / userImage.naturalHeight;
    const circleAspect = 1.0; // perfect circle

    let baseDrawWidth: number;
    let baseDrawHeight: number;

    if (imgAspect > circleAspect) {
      // Landscape: height matches diameter, width is wider
      baseDrawHeight = circleDiameter;
      baseDrawWidth = circleDiameter * imgAspect;
    } else {
      // Portrait / Square: width matches diameter, height is taller
      baseDrawWidth = circleDiameter;
      baseDrawHeight = circleDiameter / imgAspect;
    }

    const currentZoom = Math.max(0.5, Math.min(4.0, photoTransform.zoom || 1.0));
    const drawWidth = baseDrawWidth * currentZoom;
    const drawHeight = baseDrawHeight * currentZoom;

    // User pan offsets (relative to circle diameter)
    const panOffsetX = (photoTransform.panX || 0) * circleDiameter;
    const panOffsetY = (photoTransform.panY || 0) * circleDiameter;

    // Center coordinates for drawing
    const drawX = circleCenterX - drawWidth / 2 + panOffsetX;
    const drawY = circleCenterY - drawHeight / 2 + panOffsetY;

    // Support rotation if requested
    if (photoTransform.rotation && photoTransform.rotation % 360 !== 0) {
      ctx.translate(circleCenterX + panOffsetX, circleCenterY + panOffsetY);
      ctx.rotate((photoTransform.rotation * Math.PI) / 180);
      ctx.drawImage(userImage, -drawWidth / 2, -drawHeight / 2, drawWidth, drawHeight);
    } else {
      ctx.drawImage(userImage, drawX, drawY, drawWidth, drawHeight);
    }

    ctx.restore();
  }

  // 3. Draw Devotee Name in the Rectangular Box (V3 Layout: Center-Aligned Both Axes)
  const trimmedName = name.trim();
  if (trimmedName) {
    drawCenteredBoxName(ctx, trimmedName, targetWidth, targetHeight, fontFamily);
  }
};

/**
 * Draws the devotee's name center-aligned horizontally and vertically
 * inside the rectangular box below the top "શુભેચ્છક:" label tag (V3 Template)
 */
function drawCenteredBoxName(
  ctx: CanvasRenderingContext2D,
  text: string,
  canvasWidth: number,
  canvasHeight: number,
  fontFamily: string
) {
  const boxWidth = POSTER_CONFIG.nameBox.width * canvasWidth;
  const boxHeight = POSTER_CONFIG.nameBox.height * canvasHeight;
  const centerX = POSTER_CONFIG.nameBox.centerX * canvasWidth;
  const centerY = POSTER_CONFIG.nameBox.centerY * canvasHeight;

  // Maximum allowed width with safe padding inside the frame
  const maxAllowedWidth = boxWidth * 0.90;
  const maxAllowedHeight = boxHeight * 0.78;

  // Dynamic Fit-To-Width binary search for exact font size
  let minFont = 14 * (canvasWidth / POSTER_CONFIG.nativeWidth);
  let maxFont = maxAllowedHeight * 1.05;
  let bestFontSize = minFont;

  ctx.save();

  for (let sz = maxFont; sz >= minFont; sz -= 0.5) {
    ctx.font = `800 ${sz}px ${fontFamily}`;
    const metrics = ctx.measureText(text);
    if (metrics.width <= maxAllowedWidth) {
      bestFontSize = sz;
      break;
    }
  }

  ctx.font = `800 ${bestFontSize}px ${fontFamily}`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  // Small Y adjustment for Devanagari / Gujarati baseline balance
  const yOffset = bestFontSize * 0.03;
  const renderY = centerY + yOffset;

  // 1. Dark Maroon Shadow & Outline for sharp contrast against gold / dark box background
  ctx.shadowColor = 'rgba(20, 1, 5, 0.85)';
  ctx.shadowBlur = Math.max(3, bestFontSize * 0.16);
  ctx.shadowOffsetX = 0;
  ctx.shadowOffsetY = Math.max(1.5, bestFontSize * 0.05);

  // 2. Stroke outline
  ctx.strokeStyle = '#26020A';
  ctx.lineWidth = Math.max(2.2, bestFontSize * 0.08);
  ctx.lineJoin = 'round';
  ctx.miterLimit = 2;
  ctx.strokeText(text, centerX, renderY);

  // Reset shadow for crisp gradient fill
  ctx.shadowColor = 'transparent';
  ctx.shadowBlur = 0;
  ctx.shadowOffsetX = 0;
  ctx.shadowOffsetY = 0;

  // 3. Gold Linear Gradient (Matching poster lettering: #FFE2B8 -> #FFCD82 -> #C68F41 -> #7A4E10)
  const gradient = ctx.createLinearGradient(
    0,
    renderY - bestFontSize * 0.5,
    0,
    renderY + bestFontSize * 0.55
  );
  gradient.addColorStop(0.0, '#FFFFFF'); // Soft specular
  gradient.addColorStop(0.2, '#FFE8C7');
  gradient.addColorStop(0.45, '#FFCD82'); // Bright Gold Highlight
  gradient.addColorStop(0.75, '#C68F41'); // Mid Gold Fill
  gradient.addColorStop(1.0, '#7A4E10');  // Darker Gold Base

  ctx.fillStyle = gradient;
  ctx.fillText(text, centerX, renderY);

  // 4. Subtle Inner Highlight for metallic luster
  ctx.save();
  ctx.globalCompositeOperation = 'source-atop';
  const highlightGrad = ctx.createLinearGradient(0, renderY - bestFontSize * 0.5, 0, renderY);
  highlightGrad.addColorStop(0.0, 'rgba(255, 255, 255, 0.4)');
  highlightGrad.addColorStop(1.0, 'rgba(255, 255, 255, 0.0)');
  ctx.fillStyle = highlightGrad;
  ctx.fillText(text, centerX, renderY);
  ctx.restore();

  ctx.restore();
}

/**
 * Exports canvas as high-resolution PNG blob
 */
export const exportPosterBlob = async (
  posterImage: HTMLImageElement,
  userImage: HTMLImageElement | null,
  name: string,
  photoTransform: PhotoTransform,
  fontFamily: string,
  scale: number = 2
): Promise<Blob> => {
  const offscreenCanvas = document.createElement('canvas');
  renderPoster({
    canvas: offscreenCanvas,
    posterImage,
    userImage,
    name,
    photoTransform,
    fontFamily,
    scale,
  });

  return new Promise((resolve, reject) => {
    offscreenCanvas.toBlob(
      (blob) => {
        if (blob) {
          resolve(blob);
        } else {
          reject(new Error('Failed to generate poster blob'));
        }
      },
      'image/png',
      1.0
    );
  });
};

/**
 * Triggers browser download for generated poster blob
 */
export const triggerDownload = (blob: Blob, devoteeName: string) => {
  const sanitized = devoteeName
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9\u0A80-\u0AFF\u0900-\u097F_-]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');

  const filename = `chamatkarik-dham-ganesh-utsav-${sanitized || 'bhakt'}.png`;
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = filename;
  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);
  setTimeout(() => URL.revokeObjectURL(url), 1000);
};
