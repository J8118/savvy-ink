/**
 * Cloudinary helper functions
 * Use these to generate optimized Cloudinary URLs
 */

/**
 * Get optimized Cloudinary video URL
 * Use this for background videos that need autoplay/loop
 */
export function getCloudinaryVideoUrl(
  publicId: string,
  options?: {
    quality?: 'auto' | number;
    format?: 'auto' | 'mp4' | 'webm';
    width?: number;
    height?: number;
    crop?: string;
    fetchFormat?: 'auto';
    videoCodec?: 'auto' | string;
  }
): string {
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  
  if (!cloudName) {
    console.warn('NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME is not set. Using fallback URL.');
    // Fallback to local file if Cloudinary is not configured
    return `/${publicId}`;
  }

  const {
    quality = 'auto',
    format = 'auto',
    width,
    height,
    crop = 'fill',
    fetchFormat = 'auto',
    videoCodec = 'auto',
  } = options || {};

  const transformations: string[] = [];
  
  // Video codec auto - selects best codec (H.264, VP9, etc.)
  if (videoCodec) transformations.push(`vc_${videoCodec}`);
  
  // Quality auto
  if (quality) transformations.push(`q_${quality}`);
  
  // Format auto - selects best format (MP4, WebM, etc.)
  if (fetchFormat) transformations.push(`f_${fetchFormat}`);
  
  // Dimensions
  if (width) transformations.push(`w_${width}`);
  if (height) transformations.push(`h_${height}`);
  if (crop && (width || height)) transformations.push(`c_${crop}`);

  const transformationString = transformations.length > 0 
    ? transformations.join(',') + '/' 
    : '';

  // If format is auto, don't append extension - Cloudinary will handle it
  // Otherwise use the specified format
  const fileExtension = format === 'auto' ? '' : `.${format}`;

  return `https://res.cloudinary.com/${cloudName}/video/upload/${transformationString}${publicId}${fileExtension}`;
}

/**
 * Get multiple video sources for optimal browser support
 * Returns both MP4 and WebM formats
 */
export function getCloudinaryVideoSources(publicId: string, options?: Parameters<typeof getCloudinaryVideoUrl>[1]) {
  const mp4Url = getCloudinaryVideoUrl(publicId, { ...options, format: 'mp4' });
  const webmUrl = getCloudinaryVideoUrl(publicId, { ...options, format: 'webm' });
  
  return [
    { src: webmUrl, type: 'video/webm' },
    { src: mp4Url, type: 'video/mp4' },
  ];
}

/**
 * Get optimized Cloudinary image URL
 * Use this when you need a simple URL instead of CldImage component
 */
export function getCloudinaryImageUrl(
  publicId: string,
  options?: {
    width?: number;
    height?: number;
    quality?: 'auto' | number;
    format?: 'auto' | 'webp' | 'avif';
    crop?: string;
  }
): string {
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  
  if (!cloudName) {
    console.warn('NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME is not set. Using fallback URL.');
    return `/${publicId}`;
  }

  const {
    width,
    height,
    quality = 'auto',
    format = 'auto',
    crop,
  } = options || {};

  const transformations: string[] = [];
  
  if (quality) transformations.push(`q_${quality}`);
  if (format) transformations.push(`f_${format}`);
  if (width) transformations.push(`w_${width}`);
  if (height) transformations.push(`h_${height}`);
  if (crop && (width || height)) transformations.push(`c_${crop}`);

  const transformationString = transformations.length > 0 
    ? transformations.join(',') + '/' 
    : '';

  return `https://res.cloudinary.com/${cloudName}/image/upload/${transformationString}${publicId}`;
}

