import React from 'react';
import { getImagePath } from '../../lib/assets';

export const AssetDebugPage = (): JSX.Element => {
  const testImages = [
    'images/banner.png',
    'images/stroller-1.png', 
    'images/mom-baby.jpg',
    'images/pillow-u-shape.png',
    'images/brand-joie.png'
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center">Asset Path Debug Page</h1>
        
        <div className="bg-white rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Environment Info</h2>
          <div className="space-y-2 text-sm">
            <p><strong>Current URL:</strong> {window.location.href}</p>
            <p><strong>Hostname:</strong> {window.location.hostname}</p>
            <p><strong>Pathname:</strong> {window.location.pathname}</p>
            <p><strong>Origin:</strong> {window.location.origin}</p>
          </div>
        </div>

        <div className="space-y-6">
          {testImages.map((imagePath, index) => {
            const resolvedPath = getImagePath(imagePath);
            return (
              <div key={index} className="bg-white rounded-lg p-6 shadow-sm">
                <h3 className="text-lg font-medium mb-4">Test Image {index + 1}</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600 mb-2">
                      <strong>Original Path:</strong> <code className="bg-gray-100 px-2 py-1 rounded">{imagePath}</code>
                    </p>
                    <p className="text-sm text-gray-600 mb-4">
                      <strong>Resolved Path:</strong> <code className="bg-gray-100 px-2 py-1 rounded">{resolvedPath}</code>
                    </p>
                    
                    <div className="space-y-2">
                      <p className="text-sm">
                        <strong>Status:</strong>{' '}
                        <span id={`status-${index}`} className="font-medium">Loading...</span>
                      </p>
                      <a 
                        href={resolvedPath} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-block text-blue-600 hover:text-blue-800 underline text-sm"
                      >
                        Open Image Direct Link
                      </a>
                    </div>
                  </div>
                  
                  <div>
                    <img
                      src={resolvedPath}
                      alt={`Test ${index + 1}`}
                      className="max-w-full h-32 object-contain border rounded"
                      onLoad={() => {
                        const statusEl = document.getElementById(`status-${index}`);
                        if (statusEl) {
                          statusEl.textContent = '✅ Loaded Successfully';
                          statusEl.className = 'font-medium text-green-600';
                        }
                      }}
                      onError={() => {
                        const statusEl = document.getElementById(`status-${index}`);
                        if (statusEl) {
                          statusEl.textContent = '❌ Failed to Load';
                          statusEl.className = 'font-medium text-red-600';
                        }
                      }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-blue-800 mb-2">Debug Information</h3>
          <p className="text-blue-700 text-sm">
            This page tests the asset path resolution for GitHub Pages deployment. 
            All images should load successfully if the path logic is working correctly.
          </p>
        </div>
      </div>
    </div>
  );
};
