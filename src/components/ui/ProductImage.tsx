import React, { useState } from 'react';
import { Image as ImageIcon } from 'lucide-react';
import { getFallbackImageUrl } from '../../lib/imageUtils';

interface ProductImageProps {
  src: string;
  alt: string;
  className?: string;
  fallbackClassName?: string;
}

export const ProductImage: React.FC<ProductImageProps> = ({
  src,
  alt,
  className = "h-full w-full object-cover",
  fallbackClassName = "h-full w-full flex items-center justify-center bg-gray-200"
}) => {
  const [imageError, setImageError] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);

  const handleImageError = () => {
    console.log('Image failed to load:', src);
    setImageError(true);
    setImageLoading(false);
  };

  const handleImageLoad = () => {
    setImageLoading(false);
  };

  if (imageError) {
    return (
      <div className={fallbackClassName}>
        <div className="text-center">
          <ImageIcon className="h-8 w-8 text-gray-400 mx-auto mb-1" />
          <span className="text-xs text-gray-500">Hình ảnh</span>
        </div>
      </div>
    );
  }

  return (
    <div className="relative h-full w-full">
      {imageLoading && (
        <div className={fallbackClassName}>
          <div className="animate-pulse bg-gray-300 h-full w-full rounded"></div>
        </div>
      )}
      <img
        src={src || getFallbackImageUrl()}
        alt={alt}
        className={`${className} ${imageLoading ? 'opacity-0 absolute' : 'opacity-100'} transition-opacity duration-200`}
        onError={handleImageError}
        onLoad={handleImageLoad}
      />
    </div>
  );
};
