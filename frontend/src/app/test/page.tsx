"use client";

export default function TestPage() {
  return (
    <div className="min-h-screen relative bg-white dark:bg-gray-900">
      {/* Full page background image */}
      <div className="absolute inset-0 opacity-30 dark:opacity-40">
        <img
          src="/assets/cta.avif"
          alt="Full page background"
          className="w-full h-full object-cover"
        />
      </div>
      
      {/* Content overlay */}
      <div className="relative z-10 min-h-screen flex items-center justify-center p-8">
        <div className="text-center bg-white/80 dark:bg-black/80 backdrop-blur-sm p-8 rounded-lg max-w-md">
          <h1 className="text-3xl font-bold mb-4">Full Page Background Test</h1>
          <p className="text-lg mb-6">Image is now at 30% opacity (light) / 40% (dark).</p>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
            If you can see the liquid metal texture, it's working!
          </p>
          <div className="space-y-2">
            <p className="text-xs">Image path: /assets/cta.avif</p>
            <a href="/" className="inline-block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors">
              Back to Home
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}