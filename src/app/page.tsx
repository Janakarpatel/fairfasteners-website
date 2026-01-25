'use client';

import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      <Navbar />
      <Hero />
      <Footer />
      {/* <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center">
          <h2 className="text-5xl font-bold text-gray-900 mb-6">
            Welcome to Our Company
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            This is a test text for the homepage. We are a professional company providing excellent services to our clients.
          </p>
          <p className="text-lg text-gray-500">
            More content will be added soon...
          </p>
        </div>
      </section> */}

      {/* Content Section */}
      {/* <section className="max-w-7xl mx-auto px-6 py-16 bg-gray-50">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Section 1</h3>
            <p className="text-gray-600">
              Test text for the first section goes here.
            </p>
          </div>
          <div className="p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Section 2</h3>
            <p className="text-gray-600">
              Test text for the second section goes here.
            </p>
          </div>
          <div className="p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Section 3</h3>
            <p className="text-gray-600">
              Test text for the third section goes here.
            </p>
          </div>
        </div>
      </section> */}

      {/* Footer */}
      {/* <footer className="border-t border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <p className="text-gray-600 text-center">
            © 2026 Company Name. All rights reserved.
          </p>
        </div>
      </footer> */}
    </div>
  );
}
