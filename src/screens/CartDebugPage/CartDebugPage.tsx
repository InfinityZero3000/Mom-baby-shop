import React from 'react';
import { useCart } from '../../contexts/CartContext';
import { getImagePath } from '../../lib/assets';

export const CartDebugPage: React.FC = () => {
  const { items } = useCart();

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8">Cart Debug - Kiểm tra hình ảnh</h1>
        
        <div className="space-y-6">
          {items.length === 0 ? (
            <p className="text-gray-600">Giỏ hàng trống</p>
          ) : (
            items.map((item, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-lg font-semibold mb-4">{item.name}</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium mb-2">Thông tin sản phẩm:</h4>
                    <ul className="text-sm space-y-1">
                      <li><strong>ID:</strong> {item.id}</li>
                      <li><strong>Tên:</strong> {item.name}</li>
                      <li><strong>Giá:</strong> {item.price}</li>
                      <li><strong>Danh mục:</strong> {item.category}</li>
                      <li><strong>Thương hiệu:</strong> {item.brand}</li>
                      <li><strong>Số lượng:</strong> {item.quantity}</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-2">Thông tin hình ảnh:</h4>
                    <ul className="text-sm space-y-1 mb-4">
                      <li><strong>Đường dẫn gốc:</strong> <code className="bg-gray-100 px-1">{item.image}</code></li>
                      <li><strong>Processed path:</strong> <code className="bg-gray-100 px-1">{getImagePath(item.image)}</code></li>
                      <li><strong>Current URL:</strong> <code className="bg-gray-100 px-1">{window.location.href}</code></li>
                    </ul>
                    
                    <div className="space-y-4">
                      <div>
                        <h5 className="font-medium text-sm mb-2">Hình ảnh hiện tại:</h5>
                        <div className="w-32 h-32 bg-gray-100 rounded-lg overflow-hidden">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.className = "w-full h-full object-cover border-2 border-red-500";
                              target.alt = "Lỗi không load được hình";
                            }}
                          />
                        </div>
                      </div>
                      
                      <div>
                        <h5 className="font-medium text-sm mb-2">Thử với getImagePath:</h5>
                        <div className="w-32 h-32 bg-gray-100 rounded-lg overflow-hidden">
                          <img
                            src={getImagePath(item.image)}
                            alt={item.name}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.className = "w-full h-full object-cover border-2 border-red-500";
                              target.alt = "Lỗi không load được hình (processed)";
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
        
        <div className="mt-8 bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">Test các đường dẫn hình ảnh mẫu:</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              'images/stroller-1.png',
              'stroller-1.png',
              '/stroller-1.png',
              getImagePath('images/stroller-1.png')
            ].map((path, index) => (
              <div key={index} className="text-center">
                <div className="w-24 h-24 bg-gray-100 rounded-lg overflow-hidden mx-auto mb-2">
                  <img
                    src={path}
                    alt={`Test ${index + 1}`}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.className = "w-full h-full object-cover border-2 border-red-500";
                    }}
                  />
                </div>
                <code className="text-xs bg-gray-100 px-1 py-0.5 rounded">
                  {path}
                </code>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartDebugPage;
