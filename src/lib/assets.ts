/**
 * Asset path utilities for consistent handling of image and resource paths
 * across different deployment environments (local, GitHub Pages, etc.)
 */

// Get base path for GitHub Pages deployment
const getBasePath = (): string => {
  // For build time (when window is not available)
  if (typeof window === 'undefined') {
    return process.env.BUILD_FOR_GITHUB === 'true' || 
           process.env.GITHUB_PAGES === 'true' ? '/Mom-baby-shop' : '';
  }
  
  // For runtime (when window is available)
  const isGitHubPages = 
    window.location.hostname.includes('github.io') || 
    window.location.pathname.startsWith('/Mom-baby-shop') ||
    window.location.origin.includes('github.io') ||
    // Also check for preview server with base path
    window.location.pathname.includes('/Mom-baby-shop/') ||
    // Check for localhost preview with base path
    (window.location.hostname === 'localhost' && window.location.pathname.startsWith('/Mom-baby-shop'));
  
  // Always log detection logic for debugging
  console.log('getBasePath Debug:', {
    hostname: window.location.hostname,
    pathname: window.location.pathname,
    origin: window.location.origin,
    href: window.location.href,
    isGitHubPages,
    basePath: isGitHubPages ? '/Mom-baby-shop' : ''
  });
    
  return isGitHubPages ? '/Mom-baby-shop' : '';
};

/**
 * Get the correct path for an image asset
 * @param imagePath - The relative image path (e.g., 'images/stroller-1.png')
 * @returns The correct full path for the current environment
 */
export const getImagePath = (imagePath: string): string => {
  // Nếu đã là URL đầy đủ, trả về nguyên
  if (imagePath.startsWith('http') || imagePath.startsWith('//')) {
    return imagePath;
  }
  
  const basePath = getBasePath();
  
  // Remove leading slash if present
  let cleanPath = imagePath.startsWith('/') ? imagePath.slice(1) : imagePath;
  
  // Remove 'images/' prefix since Vite publicDir copies files to root
  if (cleanPath.startsWith('images/')) {
    cleanPath = cleanPath.replace('images/', '');
  }
  
  const finalPath = basePath ? `${basePath}/${cleanPath}` : `/${cleanPath}`;
  
  // Always show debug logging to troubleshoot GitHub Pages issues
  console.log('getImagePath Debug:', {
    originalPath: imagePath,
    basePath,
    cleanPath,
    finalPath,
    hostname: typeof window !== 'undefined' ? window.location.hostname : 'N/A',
    pathname: typeof window !== 'undefined' ? window.location.pathname : 'N/A',
    origin: typeof window !== 'undefined' ? window.location.origin : 'N/A',
    href: typeof window !== 'undefined' ? window.location.href : 'N/A'
  });
  
  return finalPath;
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
