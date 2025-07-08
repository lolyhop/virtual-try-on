'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface BrandItem {
  id: number;
  name: string;
  brand: string;
  price: string;
  imageUrl: string;
  type: string;
  description: string;
}

interface Outfit {
  id: number;
  name: string;
  imageUrl: string;
  description: string;
}

interface AppData {
  brandItems: {
    dresses: BrandItem[];
    casual: BrandItem[];
  };
  savedOutfits: Outfit[];
}

export default function Home() {
  const [appData, setAppData] = useState<AppData | null>(null);
  const [selectedItem, setSelectedItem] = useState<BrandItem | null>(null);
  const [isVirtualTryOn, setIsVirtualTryOn] = useState(false);
  const [tryOnResult, setTryOnResult] = useState<string | null>(null);
  const [showSavedOutfits, setShowSavedOutfits] = useState(false);

  useEffect(() => {
    fetch('/api/clothing')
      .then(res => res.json())
      .then(data => setAppData(data))
      .catch(err => console.error('Error loading data:', err));
  }, []);

  const allItems = appData ? [
    ...appData.brandItems.dresses,
    ...appData.brandItems.casual
  ] : [];

  const handleTryOn = (item: BrandItem) => {
    setSelectedItem(item);
    setIsVirtualTryOn(true);
    setTryOnResult(null);
    
    // Simulate virtual try-on
    setTimeout(() => {
      setTryOnResult(item.imageUrl);
      setIsVirtualTryOn(false);
    }, 2500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-md shadow-lg sticky top-0 z-50 border-b border-purple-200/20">
        <div className="max-w-7xl mx-auto px-8 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                ✨ Virtual Try-On Studio
              </h1>
              <p className="text-gray-600 mt-1">Discover & try on luxury fashion pieces</p>
            </div>
            <nav className="flex gap-4">
              <button 
                onClick={() => setShowSavedOutfits(true)}
                className="px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-xl hover:from-blue-600 hover:to-cyan-600 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                💎 Saved Outfits
              </button>
              <Link href="/gallery" className="px-6 py-3 bg-gradient-to-r from-amber-500 to-yellow-500 text-white rounded-xl hover:from-amber-600 hover:to-yellow-600 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                🛍️ Brand Showcase
              </Link>
              <Link href="/new-outfit" className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl hover:from-green-600 hover:to-emerald-600 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                🎨 AI Creator
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-8 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Brand Items Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-xl p-6 border border-white/30 sticky top-24">
              <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                🏷️ Luxury Pieces
              </h3>
              
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {allItems.map((item) => (
                  <div 
                    key={item.id} 
                    className={`p-4 rounded-xl border-2 transition-all cursor-pointer ${
                      selectedItem?.id === item.id
                        ? 'border-purple-500 bg-purple-50 shadow-lg'
                        : 'border-gray-200 bg-white hover:border-purple-300 hover:bg-purple-50'
                    }`}
                    onClick={() => setSelectedItem(item)}
                  >
                    <div className="flex items-center gap-3">
                      <img 
                        src={item.imageUrl} 
                        alt={item.name}
                        className="w-12 h-12 object-contain bg-gray-50 rounded-lg"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-gray-800 truncate text-sm">{item.name}</h4>
                        <p className="text-xs text-gray-500 uppercase tracking-wider">{item.brand}</p>
                        <p className="text-sm font-bold text-purple-600">{item.price}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {selectedItem && (
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <button
                    onClick={() => handleTryOn(selectedItem)}
                    disabled={isVirtualTryOn}
                    className={`w-full py-3 rounded-xl font-bold transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1 ${
                      !isVirtualTryOn
                        ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600'
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    {isVirtualTryOn ? (
                      <span className="flex items-center justify-center gap-2">
                        <span className="animate-spin">🪄</span>
                        Trying On...
                      </span>
                    ) : (
                      '🪄 Virtual Try-On'
                    )}
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-2">
            <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-xl p-8 border border-white/30 min-h-[600px]">
              {selectedItem ? (
                <div>
                  {/* Item Details Header */}
                  <div className="flex items-start justify-between mb-8">
                    <div>
                      <h2 className="text-3xl font-bold text-gray-800 mb-2">{selectedItem.name}</h2>
                      <div className="flex items-center gap-4 mb-3">
                        <span className="px-4 py-1 bg-black/80 text-white rounded-full text-sm font-bold tracking-wider">
                          {selectedItem.brand}
                        </span>
                        <span className="text-3xl font-bold text-purple-600">{selectedItem.price}</span>
                      </div>
                      <p className="text-gray-600 leading-relaxed max-w-md">{selectedItem.description}</p>
                    </div>
                  </div>

                  {/* Virtual Try-On Area */}
                  <div className="grid md:grid-cols-2 gap-8">
                    {/* Original Item */}
                    <div className="text-center">
                      <h3 className="text-lg font-semibold text-gray-700 mb-4">Original Item</h3>
                      <div className="relative rounded-2xl overflow-hidden shadow-lg">
                        <div className={`absolute inset-0 ${
                          selectedItem.brand === 'Gucci' ? 'bg-gradient-to-br from-red-100 via-pink-50 to-red-200' :
                          selectedItem.brand === 'Versace' ? 'bg-gradient-to-br from-purple-100 via-black/5 to-gray-200' :
                          selectedItem.brand === 'Prada' ? 'bg-gradient-to-br from-blue-100 via-gray-50 to-blue-200' :
                          'bg-gradient-to-br from-gray-50 to-gray-100'
                        } blur-sm`}></div>
                        <img 
                          src={selectedItem.imageUrl} 
                          alt={selectedItem.name}
                          className="relative z-10 w-full h-80 object-contain"
                        />
                      </div>
                    </div>

                    {/* Virtual Try-On Result */}
                    <div className="text-center">
                      <h3 className="text-lg font-semibold text-gray-700 mb-4">Virtual Try-On</h3>
                      <div className="relative rounded-2xl overflow-hidden shadow-lg h-80 bg-gradient-to-br from-purple-100 to-pink-100 flex items-center justify-center">
                        {isVirtualTryOn ? (
                          <div className="text-center">
                            <div className="relative">
                              <div className="animate-spin text-6xl mb-4">🪄</div>
                              <div className="absolute -top-1 -right-1 animate-ping">✨</div>
                            </div>
                            <p className="text-purple-600 font-semibold">Creating virtual try-on...</p>
                          </div>
                        ) : tryOnResult ? (
                          <div className="relative w-full h-full">
                            <div className={`absolute inset-0 ${
                              selectedItem.brand === 'Gucci' ? 'bg-gradient-to-br from-red-100 via-pink-50 to-red-200' :
                              selectedItem.brand === 'Versace' ? 'bg-gradient-to-br from-purple-100 via-black/5 to-gray-200' :
                              selectedItem.brand === 'Prada' ? 'bg-gradient-to-br from-blue-100 via-gray-50 to-blue-200' :
                              'bg-gradient-to-br from-gray-50 to-gray-100'
                            } blur-sm rounded-2xl`}></div>
                            <img 
                              src={tryOnResult} 
                              alt="Virtual try-on result"
                              className="relative z-10 w-full h-full object-contain rounded-2xl"
                            />
                            <div className="absolute top-2 right-2 z-20">
                              <span className="px-2 py-1 bg-green-500 text-white rounded-full text-xs font-bold">
                                ✓ Perfect Fit
                              </span>
                            </div>
                          </div>
                        ) : (
                          <div className="text-center text-gray-500">
                            <div className="text-4xl mb-3">👤</div>
                            <p className="font-medium">Click &quot;Virtual Try-On&quot; to see how it looks!</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  {tryOnResult && (
                    <div className="flex gap-4 justify-center mt-8">
                      <button className="px-8 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl hover:from-green-600 hover:to-emerald-600 transition-all font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                        💚 Love It - Save
                      </button>
                      <button className="px-8 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-xl hover:from-blue-600 hover:to-cyan-600 transition-all font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                        🛒 Add to Cart
                      </button>
                      <button 
                        onClick={() => setTryOnResult(null)}
                        className="px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl hover:from-purple-600 hover:to-pink-600 transition-all font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                      >
                        🔄 Try Again
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex items-center justify-center h-full">
                  <div className="text-center">
                    <div className="text-8xl mb-6">🪄</div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-4">Virtual Try-On Studio</h3>
                    <p className="text-gray-600 mb-6 max-w-md leading-relaxed">
                      Select any luxury item from our curated collection to see detailed information and try it on virtually with our advanced AI technology.
                    </p>
                    <div className="bg-purple-50 rounded-2xl p-6 max-w-md mx-auto">
                      <h4 className="font-semibold text-purple-800 mb-3">✨ Features</h4>
                      <ul className="text-sm text-purple-700 space-y-2 text-left">
                        <li>• Advanced virtual try-on technology</li>
                        <li>• Authentic luxury brands</li>
                        <li>• Real-time fitting simulation</li>
                        <li>• Instant recommendations</li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Saved Outfits Modal */}
      {showSavedOutfits && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-8">
          <div className="bg-white rounded-3xl shadow-2xl max-w-4xl w-full max-h-[80vh] overflow-hidden">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-800">💎 Your Saved Outfits</h2>
              <button 
                onClick={() => setShowSavedOutfits(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <span className="text-2xl">✕</span>
              </button>
            </div>
            <div className="p-6 overflow-y-auto max-h-[60vh]">
              {appData?.savedOutfits ? (
                <div className="grid grid-cols-3 gap-6">
                  {appData.savedOutfits.map((outfit) => (
                    <div key={outfit.id} className="group">
                      <div className="bg-gray-50 rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition-all">
                        <div className="relative overflow-hidden">
                          <div className={`absolute inset-0 ${
                            outfit.name === 'Red Dress' ? 'bg-gradient-to-br from-red-100 via-pink-50 to-red-200' :
                            outfit.name === 'Casual Look' ? 'bg-gradient-to-br from-blue-100 via-gray-50 to-blue-200' :
                            outfit.name === 'Party Dress' ? 'bg-gradient-to-br from-purple-100 via-black/5 to-gray-200' :
                            'bg-gradient-to-br from-gray-50 to-gray-100'
                          } blur-sm`}></div>
                          <img 
                            src={outfit.imageUrl} 
                            alt={outfit.name}
                            className="relative z-10 w-full h-48 object-contain group-hover:scale-105 transition-transform duration-500"
                          />
                        </div>
                        <div className="p-4">
                          <h3 className="font-bold text-gray-800 mb-1">{outfit.name}</h3>
                          <p className="text-sm text-gray-600 mb-3">{outfit.description}</p>
                          <div className="flex gap-2">
                            <button className="flex-1 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-all text-sm font-medium">
                              👁️ View
                            </button>
                            <button className="flex-1 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all text-sm font-medium">
                              🪄 Try On
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">👗</div>
                  <p className="text-gray-500">No saved outfits yet</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
