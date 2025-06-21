/**
 * Image validation utilities
 */

/**
 * Check if an image URL is valid and loadable
 * @param imageUrl - The image URL to check
 * @returns Promise<boolean> - true if image loads successfully
 */
export const isImageValid = (imageUrl: string): Promise<boolean> => {
  return new Promise((resolve) => {
    const img = new Image();
    
    img.onload = () => resolve(true);
    img.onerror = () => resolve(false);
    
    // Set timeout to avoid hanging
    setTimeout(() => resolve(false), 5000);
    
    img.src = imageUrl;
  });
};

/**
 * Get a fallback image URL for broken images
 * @returns A default placeholder image URL
 */
export const getFallbackImageUrl = (): string => {
  // Return a simple data URL for a placeholder
  return 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjNmNGY2Ii8+CiAgPHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzk0YTNiOCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkjDrG5oIOG6o25oPC90ZXh0Pgo8L3N2Zz4K';
};

/**
 * Validate and fix image URLs for cart items
 * @param imageUrl - The original image URL
 * @returns The validated/fixed image URL
 */
export const validateImageUrl = async (imageUrl: string): Promise<string> => {
  if (!imageUrl) {
    return getFallbackImageUrl();
  }
  
  const isValid = await isImageValid(imageUrl);
  return isValid ? imageUrl : getFallbackImageUrl();
};
