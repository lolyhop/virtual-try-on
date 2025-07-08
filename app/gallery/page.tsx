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

interface BrandData {
  brandItems: {
    dresses: BrandItem[];
    casual: BrandItem[];
  };
}

export default function BrandShowcase() {
  const [brandData, setBrandData] = useState<BrandData | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('dresses');

  useEffect(() => {
    fetch('/api/clothing')
      .then(res => res.json())
      .then(data => setBrandData(data))
      .catch(err => console.error('Error loading brand data:', err));
  }, []);

  const categories = [
    { key: 'dresses', label: '👗 Dresses', icon: '✨' },
    { key: 'casual', label: '👕 Casual', icon: '🌟' }
  ];

  const allItems = brandData ? [
    ...brandData.brandItems.dresses,
    ...brandData.brandItems.casual
  ] : [];

  const filteredItems = brandData ? brandData.brandItems[selectedCategory as keyof typeof brandData.brandItems] || [] : [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50">
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-md shadow-lg sticky top-0 z-50 border-b border-amber-200/20">
        <div className="max-w-7xl mx-auto px-8 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-amber-600 to-yellow-600 bg-clip-text text-transparent">
                🏷️ Brand Showcase
              </h1>
              <p className="text-gray-600 mt-1">Discover luxury fashion from top brands</p>
            </div>
            <nav className="flex gap-4">
              <Link href="/" className="px-6 py-3 bg-gradient-to-r from-gray-500 to-gray-600 text-white rounded-xl hover:from-gray-600 hover:to-gray-700 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                🏠 Home
              </Link>
              <Link href="/new-outfit" className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl hover:from-green-600 hover:to-emerald-600 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                🎨 AI Creator
              </Link>
              <Link href="/generate" className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl hover:from-purple-600 hover:to-pink-600 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                ✨ Recommendations
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-8 py-12">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            🛍️ Luxury Collection
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Browse exclusive pieces from the world's most prestigious fashion houses. Each item is carefully curated for style, quality, and luxury.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex justify-center mb-12">
          <div className="bg-white/70 backdrop-blur-md rounded-2xl p-2 shadow-lg border border-white/20">
            <div className="flex gap-2">
              {categories.map((category) => (
                <button
                  key={category.key}
                  onClick={() => setSelectedCategory(category.key)}
                  className={`px-6 py-3 rounded-xl font-semibold transition-all ${
                    selectedCategory === category.key
                      ? 'bg-gradient-to-r from-amber-500 to-yellow-500 text-white shadow-lg'
                      : 'text-gray-600 hover:bg-amber-50 hover:text-amber-700'
                  }`}
                >
                  {category.icon} {category.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Brand Items Grid */}
        {brandData ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredItems.map((item) => (
              <div key={item.id} className="group">
                <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 border border-white/30">
                  {/* Image Container */}
                  <div className="relative overflow-hidden">
                    <div className={`absolute inset-0 ${
                      item.name.includes('Evening') || item.brand === 'Gucci' ? 'bg-gradient-to-br from-red-100 via-pink-50 to-red-200' :
                      item.name.includes('Party') || item.brand === 'Versace' ? 'bg-gradient-to-br from-purple-100 via-black/5 to-gray-200' :
                      item.name.includes('Casual') || item.brand === 'Prada' ? 'bg-gradient-to-br from-blue-100 via-gray-50 to-blue-200' :
                      'bg-gradient-to-br from-gray-50 to-gray-100'
                    } blur-sm`}></div>
                    
                    <img 
                      src={item.imageUrl} 
                      alt={item.name}
                      className="relative z-10 w-full h-96 object-contain group-hover:scale-105 transition-transform duration-700"
                    />
                    
                    {/* Brand Badge */}
                    <div className="absolute top-4 left-4 z-20">
                      <span className="px-4 py-2 bg-black/80 backdrop-blur-md text-white rounded-full text-sm font-bold tracking-wider">
                        {item.brand}
                      </span>
                    </div>

                    {/* Price Badge */}
                    <div className="absolute top-4 right-4 z-20">
                      <span className="px-3 py-1 bg-amber-500 text-white rounded-full text-sm font-bold">
                        {item.price}
                      </span>
                    </div>
                    
                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-15">
                      <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                        <div className="flex gap-2">
                          <button className="flex-1 py-3 bg-white/20 backdrop-blur-md text-white rounded-lg hover:bg-white/30 transition-all font-semibold">
                            👁️ View Details
                          </button>
                          <button className="flex-1 py-3 bg-gradient-to-r from-amber-500 to-yellow-500 text-white rounded-lg hover:from-amber-600 hover:to-yellow-600 transition-all font-semibold">
                            🪄 Try On
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="text-xl font-bold text-gray-800 group-hover:text-amber-600 transition-colors">
                          {item.name}
                        </h3>
                        <p className="text-sm text-gray-500 uppercase tracking-wider font-semibold">
                          {item.brand}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-amber-600">{item.price}</p>
                      </div>
                    </div>
                    
                    <p className="text-gray-600 text-sm leading-relaxed mb-4">
                      {item.description}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-gray-500 text-xs">
                        <span>⭐</span>
                        <span>Luxury Collection</span>
                      </div>
                      <div className="flex gap-1">
                        {[1,2,3,4,5].map(star => (
                          <span key={star} className="text-amber-400 text-sm">⭐</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex items-center justify-center h-96">
            <div className="text-center">
              <div className="animate-bounce text-6xl mb-4">🛍️</div>
              <p className="text-xl text-gray-600 font-medium">Loading luxury brands...</p>
            </div>
          </div>
        )}

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-amber-500 to-yellow-500 rounded-3xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">Want Personalized Recommendations?</h3>
            <p className="text-amber-100 mb-6 text-lg">Let our AI analyze your style and suggest the perfect luxury pieces for you!</p>
            <div className="flex gap-4 justify-center">
              <Link href="/generate" className="px-8 py-3 bg-white text-amber-600 rounded-xl hover:bg-amber-50 transition-all font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                ✨ Get AI Recommendations
              </Link>
              <Link href="/new-outfit" className="px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl hover:from-purple-600 hover:to-pink-600 transition-all font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                🎨 Create Custom Outfit
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 