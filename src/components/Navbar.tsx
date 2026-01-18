'use client';

import { useState } from 'react';

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <nav className="border-b border-gray-200 bg-white sticky top-0 z-50 font-sans">
        <div className="max-w-full px-6 md:px-10 py-4 md:py-6 flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center gap-4">
            <img src="/company_logo.png" alt="Company Logo" className="h-10 w-auto object-contain" />
            </div>

            {/* Desktop Navigation Menu */}
            <div className="hidden lg:flex items-center gap-8">
            <a href="#" className="text-gray-900 font-medium hover:text-gray-600 transition">
                Platform
            </a>
            <a href="#" className="text-gray-900 font-medium hover:text-gray-600 transition">
                Customer Stories
            </a>
            <div className="relative group">
                <button className="text-gray-900 font-medium hover:text-gray-600 transition flex items-center gap-1">
                Resources
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
                </button>
            </div>
            <div className="relative group">
                <button className="text-gray-900 font-medium hover:text-gray-600 transition flex items-center gap-1">
                About
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
                </button>
            </div>
            <a href="#" className="text-gray-900 font-medium hover:text-gray-600 transition">
                Careers
            </a>
            </div>

            {/* Desktop CTA Button */}
            <button className="hidden md:block bg-[#1D4646] hover:bg-[#153838] text-white font-medium px-6 py-2 rounded-full transition">
                Contact Us
            </button>

            {/* Mobile Menu Button */}
            <button 
                onClick={toggleMenu}
                className="md:hidden flex flex-col items-center justify-center gap-1.5 w-8 h-8"
            >
                <span className={`w-6 h-0.5 bg-gray-900 transition-all ${isOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
                <span className={`w-6 h-0.5 bg-gray-900 transition-all ${isOpen ? 'opacity-0' : ''}`}></span>
                <span className={`w-6 h-0.5 bg-gray-900 transition-all ${isOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
            </button>
        </div>

        {/* Mobile Navigation Menu */}
        {isOpen && (
            <div className="md:hidden border-t border-gray-200 bg-white px-6 py-4">
            <div className="flex flex-col gap-4">
                <a href="#" className="text-gray-900 font-medium hover:text-gray-600 transition block">
                Platform
                </a>
                <a href="#" className="text-gray-900 font-medium hover:text-gray-600 transition block">
                Customer Stories
                </a>
                <a href="#" className="text-gray-900 font-medium hover:text-gray-600 transition block">
                Resources
                </a>
                <a href="#" className="text-gray-900 font-medium hover:text-gray-600 transition block">
                About
                </a>
                <a href="#" className="text-gray-900 font-medium hover:text-gray-600 transition block">
                Careers
                </a>
                <button className="w-full bg-[#1D4646] hover:bg-[#153838] text-white font-medium px-6 py-2 rounded-full transition mt-2">
                Request a demo
                </button>
            </div>
            </div>
        )}
        </nav>
    );
}
