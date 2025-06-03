/**
 * Asset path utilities for consistent handling of image and resource paths
 * across different deployment environments (local, GitHub Pages, etc.)
 */

// Get base path for GitHub Pages deployment
const getBasePath = (): string => {
  // Check if we're building for GitHub Pages
  const isGitHubBuild = 
    process.env.BUILD_FOR_GITHUB === 'true' || 
    process.env.GITHUB_PAGES === 'true' ||
    (typeof window !== 'undefined' && window.location.hostname.includes('github.io'));
  
  return isGitHubBuild ? '/Mom-baby-shop' : '';
};

/**
 * Get the correct path for an image asset
 * @param imagePath - The relative image path (e.g., '/images/stroller-1.png')
 * @returns The correct full path for the current environment
 */
export const getImagePath = (imagePath: string): string => {
  const basePath = getBasePath();
  
  // Remove leading slash if present
  const cleanPath = imagePath.startsWith('/') ? imagePath.slice(1) : imagePath;
  
  return basePath ? `${basePath}/${cleanPath}` : `/${cleanPath}`;
};

/**
 * Get the correct path for any asset
 * @param assetPath - The relative asset path
 * @returns The correct full path for the current environment
 */
export const getAssetPath = (assetPath: string): string => {
  return getImagePath(assetPath);
};

/**
 * Get the correct base URL for routing
 * @returns The base URL for the current environment
 */
export const getBaseUrl = (): string => {
  return getBasePath();
};

/**
 * Helper function to format route paths for current environment
 * @param routePath - The route path (e.g., '/products', '/strollers')
 * @returns The correctly formatted route path
 */
export const getRoutePath = (routePath: string): string => {
  const basePath = getBasePath();
  
  // Ensure routePath starts with /
  const cleanRoute = routePath.startsWith('/') ? routePath : `/${routePath}`;
  
  return basePath ? `${basePath}${cleanRoute}` : cleanRoute;
};
