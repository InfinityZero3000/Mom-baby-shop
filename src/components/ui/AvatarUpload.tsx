import React, { useState, useRef } from 'react';
import { Camera, Upload, User } from 'lucide-react';
import { Button } from './button';
import { getImagePath } from '../../lib/assets';

interface AvatarUploadProps {
  currentAvatar?: string;
  onAvatarChange: (newAvatar: string) => void;
  size?: 'sm' | 'md' | 'lg';
  editable?: boolean;
}

export const AvatarUpload: React.FC<AvatarUploadProps> = ({
  currentAvatar,
  onAvatarChange,
  size = 'md',
  editable = true
}) => {
  const [isUploading, setIsUploading] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [error, setError] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Predefined avatar options
  const avatarOptions = [
    'images/avatar-1.png',
    'images/avatar-2.png', 
    'images/avatar-3.png',
    'images/avatar-4.png',
    'images/avatar-5.png',
    'images/avatar-mom-1.png',
    'images/avatar-mom-2.png',
    'images/avatar-dad-1.png',
    'images/avatar-baby-1.png',
    'images/avatar-baby-2.png'
  ];

  const sizeClasses = {
    sm: 'w-12 h-12',
    md: 'w-24 h-24', 
    lg: 'w-32 h-32'
  };

  const buttonSizeClasses = {
    sm: 'w-6 h-6 -bottom-1 -right-1',
    md: 'w-8 h-8 -bottom-2 -right-2',
    lg: 'w-10 h-10 -bottom-2 -right-2'
  };

  const iconSizeClasses = {
    sm: 'w-3 h-3',
    md: 'w-4 h-4',
    lg: 'w-5 h-5'
  };

  // Function to resize image before converting to base64
  const resizeImage = (file: File, maxWidth: number = 300, maxHeight: number = 300, quality: number = 0.8): Promise<string> => {
    return new Promise((resolve, reject) => {
      try {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        
        if (!ctx) {
          reject(new Error('Không thể tạo canvas context'));
          return;
        }
        
        const img = new Image();
        
        img.onload = () => {
          try {
            // Calculate new dimensions
            let { width, height } = img;
            
            console.log('Original image dimensions:', { width, height });
            
            if (width > height) {
              if (width > maxWidth) {
                height = (height * maxWidth) / width;
                width = maxWidth;
              }
            } else {
              if (height > maxHeight) {
                width = (width * maxHeight) / height;
                height = maxHeight;
              }
            }
            
            console.log('Resized dimensions:', { width, height });
            
            // Set canvas dimensions
            canvas.width = width;
            canvas.height = height;
            
            // Draw and compress image
            ctx.drawImage(img, 0, 0, width, height);
            
            // Convert to base64 with compression
            const compressedBase64 = canvas.toDataURL('image/jpeg', quality);
            
            console.log('Image processing completed:', {
              originalSize: file.size,
              compressedLength: compressedBase64.length,
              estimatedCompressedSize: Math.round(compressedBase64.length * 0.75)
            });
            
            resolve(compressedBase64);
          } catch (error) {
            reject(new Error(`Lỗi khi xử lý ảnh: ${error instanceof Error ? error.message : 'Unknown error'}`));
          }
        };
        
        img.onerror = () => reject(new Error('Không thể tải ảnh. File có thể bị hỏng.'));
        
        // Create object URL for the file
        const objectUrl = URL.createObjectURL(file);
        img.src = objectUrl;
        
        // Clean up object URL after some time
        setTimeout(() => {
          URL.revokeObjectURL(objectUrl);
        }, 1000);
        
      } catch (error) {
        reject(new Error(`Lỗi khởi tạo: ${error instanceof Error ? error.message : 'Unknown error'}`));
      }
    });
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setError(''); // Clear any previous errors
      
      // Validate file size (max 10MB for original file)
      const maxSize = 10 * 1024 * 1024; // 10MB
      if (file.size > maxSize) {
        const errorMsg = 'File quá lớn! Vui lòng chọn ảnh nhỏ hơn 10MB.';
        setError(errorMsg);
        console.error('File size error:', { size: file.size, maxSize, fileName: file.name });
        return;
      }

      // Validate file type
      const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
      if (!allowedTypes.includes(file.type)) {
        const errorMsg = 'Định dạng file không được hỗ trợ! Vui lòng chọn file JPG, PNG, GIF hoặc WebP.';
        setError(errorMsg);
        console.error('File type error:', { type: file.type, allowed: allowedTypes, fileName: file.name });
        return;
      }

      console.log('Starting file upload process:', {
        name: file.name,
        size: file.size,
        type: file.type,
        lastModified: new Date(file.lastModified).toISOString()
      });

      setIsUploading(true);
      
      // Resize and compress image
      resizeImage(file, 300, 300, 0.8)
        .then((compressedBase64) => {
          console.log('File uploaded and compressed successfully:', {
            originalName: file.name,
            originalSize: file.size,
            originalType: file.type,
            compressedSize: compressedBase64.length,
            compressionRatio: (compressedBase64.length / file.size).toFixed(2)
          });
          onAvatarChange(compressedBase64);
          setIsUploading(false);
          setShowOptions(false);
          setError('');
        })
        .catch((error) => {
          console.error('Error processing uploaded file:', error);
          const errorMsg = `Có lỗi xảy ra khi xử lý file: ${error.message}`;
          setError(errorMsg);
          setIsUploading(false);
        });
    }
    
    // Reset input value to allow selecting the same file again
    event.target.value = '';
  };

  const handleAvatarSelect = (avatarPath: string) => {
    const fullPath = getImagePath(avatarPath);
    console.log('Avatar selected:', { original: avatarPath, resolved: fullPath });
    onAvatarChange(fullPath);
    setShowOptions(false);
    setError('');
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="relative">
      {/* Avatar Display */}
      <div className={`${sizeClasses[size]} rounded-full bg-gray-200 flex items-center justify-center overflow-hidden border-4 border-white shadow-lg`}>
        {currentAvatar ? (
          <img 
            src={currentAvatar} 
            alt="Avatar" 
            className="w-full h-full object-cover"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
              target.parentElement!.innerHTML = `<div class="w-full h-full flex items-center justify-center bg-gray-200"><svg class="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg></div>`;
            }}
          />
        ) : (
          <User className={`${size === 'sm' ? 'w-6 h-6' : size === 'md' ? 'w-12 h-12' : 'w-16 h-16'} text-gray-400`} />
        )}
      </div>

      {/* Edit Button */}
      {editable && (
        <button
          onClick={() => setShowOptions(!showOptions)}
          disabled={isUploading}
          className={`absolute ${buttonSizeClasses[size]} bg-pink-500 rounded-full flex items-center justify-center text-white hover:bg-pink-600 transition-colors shadow-lg ${isUploading ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          {isUploading ? (
            <div className="animate-spin rounded-full border-2 border-white border-t-transparent w-3 h-3"></div>
          ) : (
            <Camera className={iconSizeClasses[size]} />
          )}
        </button>
      )}

      {/* Options Modal */}
      {showOptions && (
        <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 bg-white rounded-lg shadow-xl border z-50 p-4 min-w-[300px]">
          <h3 className="text-sm font-semibold mb-3 text-gray-900">Chọn ảnh đại diện</h3>
          
          {/* Upload Option */}
          <div className="mb-4">
            <Button
              onClick={triggerFileInput}
              variant="outline"
              className="w-full flex items-center justify-center gap-2 hover:bg-pink-50 hover:border-pink-300"
              disabled={isUploading}
            >
              {isUploading ? (
                <>
                  <div className="animate-spin rounded-full border-2 border-pink-500 border-t-transparent w-4 h-4"></div>
                  Đang xử lý...
                </>
              ) : (
                <>
                  <Upload className="w-4 h-4" />
                  Tải ảnh từ máy tính
                </>
              )}
            </Button>
            <p className="text-xs text-gray-500 mt-1 text-center">
              Hỗ trợ JPG, PNG, GIF, WebP. Tối đa 10MB.
            </p>
            {error && (
              <div className="mt-2 p-2 bg-red-50 border border-red-200 rounded text-xs text-red-600">
                {error}
              </div>
            )}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              className="hidden"
              disabled={isUploading}
            />
          </div>

          {/* Predefined Avatars */}
          <div className="mb-3">
            <h4 className="text-xs font-medium text-gray-700 mb-2">Hoặc chọn từ thư viện:</h4>
            <div className="grid grid-cols-5 gap-2">
              {avatarOptions.map((avatar, index) => (
                <button
                  key={index}
                  onClick={() => handleAvatarSelect(avatar)}
                  className="w-12 h-12 rounded-full bg-gray-100 overflow-hidden hover:ring-2 hover:ring-pink-500 transition-all"
                >
                  <img
                    src={getImagePath(avatar)}
                    alt={`Avatar ${index + 1}`}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      target.parentElement!.innerHTML = `<div class="w-full h-full flex items-center justify-center bg-gray-200"><svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg></div>`;
                    }}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Close Button */}
          <Button
            onClick={() => setShowOptions(false)}
            variant="outline"
            size="sm"
            className="w-full mt-2"
          >
            Đóng
          </Button>
        </div>
      )}

      {/* Backdrop */}
      {showOptions && (
        <div
          className="fixed inset-0 bg-black bg-opacity-25 z-40"
          onClick={() => setShowOptions(false)}
        />
      )}
    </div>
  );
};
