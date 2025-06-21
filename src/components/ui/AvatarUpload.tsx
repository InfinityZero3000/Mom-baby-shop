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

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setIsUploading(true);
      
      // Create a FileReader to convert file to base64
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        onAvatarChange(base64String);
        setIsUploading(false);
        setShowOptions(false);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAvatarSelect = (avatarPath: string) => {
    onAvatarChange(getImagePath(avatarPath));
    setShowOptions(false);
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
              className="w-full flex items-center justify-center gap-2"
            >
              <Upload className="w-4 h-4" />
              Tải ảnh từ máy tính
            </Button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              className="hidden"
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
