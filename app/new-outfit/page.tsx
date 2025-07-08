'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function NewOutfit() {
  const [formData, setFormData] = useState({
    weather: '',
    style: '',
    type: ''
  });

  const [isCreating, setIsCreating] = useState(false);

  const weatherOptions = ['☀️ Sunny', '🌧️ Rainy', '❄️ Cold', '🔥 Hot', '💨 Windy'];
  const styleOptions = ['👕 Casual', '💼 Formal', '🏢 Business', '🏃 Sport', '🎉 Party'];
  const typeOptions = ['👚 Top & Bottom', '👗 Dress', '👔 Full Set', '💍 Accessories'];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleCreate = async () => {
    setIsCreating(true);
    console.log('Creating outfit with:', formData);
    
    // Simulate creation process
    setTimeout(() => {
      setIsCreating(false);
      alert('🎉 Outfit created successfully! Check your saved outfits.');
    }, 2000);
  };

  const isFormValid = formData.weather && formData.style && formData.type;

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-8 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                🎨 AI Creator
              </h1>
              <p className="text-gray-600 mt-1">Generate custom outfits with AI</p>
            </div>
            <nav className="flex gap-4">
              <Link href="/" className="px-6 py-3 bg-gradient-to-r from-gray-500 to-gray-600 text-white rounded-xl hover:from-gray-600 hover:to-gray-700 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                🏠 Home
              </Link>
              <Link href="/gallery" className="px-6 py-3 bg-gradient-to-r from-amber-500 to-yellow-500 text-white rounded-xl hover:from-amber-600 hover:to-yellow-600 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                🛍️ Brand Showcase
              </Link>
              <Link href="/generate" className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl hover:from-purple-600 hover:to-pink-600 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                ✨ Recommendations
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-8 py-12">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            🤖 AI Custom Generator
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Tell our AI about your preferences and we'll generate a completely custom outfit tailored just for you using advanced style algorithms.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Form Section */}
          <div className="bg-white/70 backdrop-blur-md rounded-3xl shadow-xl p-8 border border-white/20">
            <h3 className="text-2xl font-bold text-gray-800 mb-8 flex items-center gap-3">
              📝 Outfit Preferences
            </h3>
            
            <div className="space-y-8">
              {/* Weather Selection */}
              <div className="space-y-4">
                <label className="block text-lg font-semibold text-gray-700">
                  🌤️ What's the weather like?
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {weatherOptions.map(option => (
                    <button
                      key={option}
                      onClick={() => handleInputChange('weather', option)}
                      className={`p-4 rounded-xl border-2 transition-all text-left font-medium ${
                        formData.weather === option
                          ? 'border-green-500 bg-green-50 text-green-700 shadow-lg'
                          : 'border-gray-200 bg-white text-gray-700 hover:border-green-300 hover:bg-green-50'
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>

              {/* Style Selection */}
              <div className="space-y-4">
                <label className="block text-lg font-semibold text-gray-700">
                  💫 What's your vibe today?
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {styleOptions.map(option => (
                    <button
                      key={option}
                      onClick={() => handleInputChange('style', option)}
                      className={`p-4 rounded-xl border-2 transition-all text-left font-medium ${
                        formData.style === option
                          ? 'border-green-500 bg-green-50 text-green-700 shadow-lg'
                          : 'border-gray-200 bg-white text-gray-700 hover:border-green-300 hover:bg-green-50'
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>

              {/* Type Selection */}
              <div className="space-y-4">
                <label className="block text-lg font-semibold text-gray-700">
                  👔 What type of outfit?
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {typeOptions.map(option => (
                    <button
                      key={option}
                      onClick={() => handleInputChange('type', option)}
                      className={`p-4 rounded-xl border-2 transition-all text-left font-medium ${
                        formData.type === option
                          ? 'border-green-500 bg-green-50 text-green-700 shadow-lg'
                          : 'border-gray-200 bg-white text-gray-700 hover:border-green-300 hover:bg-green-50'
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>

              {/* Create Button */}
              <button
                onClick={handleCreate}
                disabled={!isFormValid || isCreating}
                className={`w-full py-4 rounded-xl font-bold text-lg transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1 ${
                  isFormValid && !isCreating
                    ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white hover:from-green-600 hover:to-emerald-600'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                {isCreating ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="animate-spin">⚡</span>
                    Creating Your Outfit...
                  </span>
                ) : (
                  '🎨 Create Outfit'
                )}
              </button>
            </div>
          </div>

          {/* Preview Section */}
          <div className="bg-white/70 backdrop-blur-md rounded-3xl shadow-xl p-8 border border-white/20 sticky top-24">
            <h3 className="text-2xl font-bold text-gray-800 mb-8 flex items-center gap-3">
              👁️ Style Preview
            </h3>
            
            <div className="space-y-6">
              {/* Selected Options Display */}
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                  <span className="font-medium text-gray-600">Weather:</span>
                  <span className="text-green-600 font-semibold">
                    {formData.weather || 'Not selected'}
                  </span>
                </div>
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                  <span className="font-medium text-gray-600">Style:</span>
                  <span className="text-green-600 font-semibold">
                    {formData.style || 'Not selected'}
                  </span>
                </div>
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                  <span className="font-medium text-gray-600">Type:</span>
                  <span className="text-green-600 font-semibold">
                    {formData.type || 'Not selected'}
                  </span>
                </div>
              </div>

              {/* Preview Area */}
              <div className="h-64 bg-gradient-to-br from-green-100 to-emerald-100 rounded-2xl flex items-center justify-center border-4 border-dashed border-green-300">
                {isFormValid ? (
                  <div className="text-center">
                    <div className="text-6xl mb-4">✨</div>
                    <p className="text-green-700 font-semibold text-lg">Ready to create!</p>
                    <p className="text-green-600 text-sm">Your perfect outfit awaits</p>
                  </div>
                ) : (
                  <div className="text-center text-gray-500">
                    <div className="text-6xl mb-4">👗</div>
                    <p className="font-medium">Complete the form</p>
                    <p className="text-sm">to see your style preview</p>
                  </div>
                )}
              </div>

              {/* Tips */}
              <div className="bg-green-50 rounded-xl p-4 border border-green-200">
                <h4 className="font-semibold text-green-800 mb-2">💡 Styling Tips</h4>
                <ul className="text-sm text-green-700 space-y-1">
                  <li>• Consider the occasion and location</li>
                  <li>• Mix textures for visual interest</li>
                  <li>• Choose colors that complement your skin tone</li>
                  <li>• Comfort is key to confidence</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 