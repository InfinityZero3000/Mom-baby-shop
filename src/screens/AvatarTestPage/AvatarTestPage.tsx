import React, { useState } from 'react';
import { AvatarUpload } from '../../components/ui/AvatarUpload';
import { Card } from '../../components/ui/card';
import { Button } from '../../components/ui/button';

export const AvatarTestPage: React.FC = () => {
  const [currentAvatar, setCurrentAvatar] = useState<string>('');
  const [debugInfo, setDebugInfo] = useState<any>(null);
  const [logs, setLogs] = useState<string[]>([]);

  // Capture console logs
  React.useEffect(() => {
    const originalLog = console.log;
    const originalError = console.error;
    
    console.log = (...args) => {
      originalLog(...args);
      setLogs(prev => [...prev.slice(-10), `[LOG] ${new Date().toLocaleTimeString()}: ${args.join(' ')}`]);
    };
    
    console.error = (...args) => {
      originalError(...args);
      setLogs(prev => [...prev.slice(-10), `[ERROR] ${new Date().toLocaleTimeString()}: ${args.join(' ')}`]);
    };
    
    return () => {
      console.log = originalLog;
      console.error = originalError;
    };
  }, []);

  const handleAvatarChange = (newAvatar: string) => {
    console.log('Avatar changed:', newAvatar);
    setCurrentAvatar(newAvatar);
    setDebugInfo({
      type: newAvatar.startsWith('data:') ? 'Upload' : 'Predefined',
      length: newAvatar.length,
      preview: newAvatar.substring(0, 100) + '...',
      timestamp: new Date().toLocaleTimeString(),
      isDataUrl: newAvatar.startsWith('data:'),
      mimeType: newAvatar.startsWith('data:') ? newAvatar.split(';')[0].replace('data:', '') : 'N/A'
    });
  };

  const clearAvatar = () => {
    setCurrentAvatar('');
    setDebugInfo(null);
    setLogs([]);
  };

  const testLocalStorage = () => {
    try {
      const testData = 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k=';
      
      // Test localStorage availability
      localStorage.setItem('avatar-test', testData);
      const retrieved = localStorage.getItem('avatar-test');
      
      if (retrieved === testData) {
        console.log('LocalStorage test: PASSED');
        console.log('LocalStorage capacity test: Can store base64 images');
      } else {
        console.error('LocalStorage test: FAILED - Data mismatch');
      }
      
      localStorage.removeItem('avatar-test');
      
      // Test large data storage
      const largeData = 'data:image/jpeg;base64,' + 'A'.repeat(100000); // ~100KB
      try {
        localStorage.setItem('avatar-large-test', largeData);
        localStorage.removeItem('avatar-large-test');
        console.log('Large data test: PASSED - Can store ~100KB');
      } catch (e) {
        console.error('Large data test: FAILED', e);
      }
      
    } catch (error) {
      console.error('LocalStorage test: FAILED', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8">Avatar Upload Test Page</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Avatar Upload Test */}
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Test Avatar Upload</h2>
            
            <div className="flex flex-col items-center space-y-4">
              <AvatarUpload
                currentAvatar={currentAvatar}
                onAvatarChange={handleAvatarChange}
                size="lg"
                editable={true}
              />
              
              <Button onClick={clearAvatar} variant="outline">
                Clear Avatar
              </Button>
              
              <Button onClick={testLocalStorage} variant="outline">
                Test LocalStorage
              </Button>
            </div>
          </Card>

          {/* Debug Info */}
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Debug Information</h2>
            
            {debugInfo ? (
              <div className="space-y-2 text-sm">
                <div>
                  <strong>Type:</strong> {debugInfo.type}
                </div>
                <div>
                  <strong>Data Length:</strong> {debugInfo.length.toLocaleString()} characters
                </div>
                <div>
                  <strong>Is Data URL:</strong> {debugInfo.isDataUrl ? 'Yes' : 'No'}
                </div>
                {debugInfo.mimeType !== 'N/A' && (
                  <div>
                    <strong>MIME Type:</strong> {debugInfo.mimeType}
                  </div>
                )}
                <div>
                  <strong>Preview:</strong> 
                  <code className="block bg-gray-100 p-2 mt-1 text-xs break-all">
                    {debugInfo.preview}
                  </code>
                </div>
                <div>
                  <strong>Timestamp:</strong> {debugInfo.timestamp}
                </div>
                
                {debugInfo.type === 'Upload' && (
                  <div className="mt-4">
                    <strong>Estimated Size:</strong> {Math.round(debugInfo.length * 0.75 / 1024)} KB
                  </div>
                )}
              </div>
            ) : (
              <p className="text-gray-500">No avatar selected yet</p>
            )}
          </Card>

          {/* Different Sizes Test */}
          <Card className="p-6 md:col-span-2">
            <h2 className="text-xl font-semibold mb-4">Different Sizes Test</h2>
            
            <div className="flex items-center justify-center space-x-8">
              <div className="text-center">
                <p className="text-sm font-medium mb-2">Small</p>
                <AvatarUpload
                  currentAvatar={currentAvatar}
                  onAvatarChange={handleAvatarChange}
                  size="sm"
                  editable={true}
                />
              </div>
              
              <div className="text-center">
                <p className="text-sm font-medium mb-2">Medium</p>
                <AvatarUpload
                  currentAvatar={currentAvatar}
                  onAvatarChange={handleAvatarChange}
                  size="md"
                  editable={true}
                />
              </div>
              
              <div className="text-center">
                <p className="text-sm font-medium mb-2">Large</p>
                <AvatarUpload
                  currentAvatar={currentAvatar}
                  onAvatarChange={handleAvatarChange}
                  size="lg"
                  editable={true}
                />
              </div>
            </div>
          </Card>

          {/* Console Logs */}
          <Card className="p-6 md:col-span-2">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Console Logs</h2>
              <Button onClick={() => setLogs([])} variant="outline" size="sm">
                Clear Logs
              </Button>
            </div>
            
            <div className="bg-black text-green-400 p-4 rounded-lg max-h-60 overflow-y-auto font-mono text-sm">
              {logs.length > 0 ? (
                logs.map((log, index) => (
                  <div key={index} className="mb-1">
                    {log}
                  </div>
                ))
              ) : (
                <div className="text-gray-500">No logs yet...</div>
              )}
            </div>
          </Card>

          {/* Instructions */}
          <Card className="p-6 md:col-span-2 bg-blue-50">
            <h2 className="text-xl font-semibold mb-4 text-blue-800">Hướng dẫn test:</h2>
            <ol className="list-decimal list-inside space-y-2 text-blue-700">
              <li>Mở Console (F12) để xem debug logs</li>
              <li>Click vào nút camera trên avatar</li>
              <li>Thử "Tải ảnh từ máy tính" với file ảnh</li>
              <li>Thử chọn avatar có sẵn (số 1-10)</li>
              <li>Kiểm tra Debug Information để xem kết quả</li>
              <li>Thử với các file có size khác nhau</li>
            </ol>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AvatarTestPage;
