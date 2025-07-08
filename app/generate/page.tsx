'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Generate() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/');
  }, [router]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin text-6xl mb-4">🪄</div>
        <p className="text-gray-600">Redirecting to Virtual Try-On Studio...</p>
      </div>
    </div>
  );
} 