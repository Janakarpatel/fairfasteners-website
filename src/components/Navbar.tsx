'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [openDropdown, setOpenDropdown] = useState<string | null>(null);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const toggleDropdown = (name: string) => {
        setOpenDropdown(openDropdown === name ? null : name);
    };

    return (
        <nav className="border-b border-gray-200 bg-white sticky top-0 z-50 font-sans">
            <div className="max-w-full px-6 md:px-10 py-4 md:py-6 flex items-center justify-between">
                {/* Left Side: Logo + Menu */}
                <div className="flex items-center gap-8">
                    {/* Logo */}
                    <div className="flex items-center gap-4">
                        <img src="/company_logo.png" alt="Company Logo" className="h-8 w-auto object-contain" />
                    </div>

                    {/* Desktop Navigation Menu */}
                    <div className="hidden lg:flex items-center gap-8">
                        <a href="#" className="text-gray-900 hover:text-brand-primary transition text-sm font-medium">
                            Products
                        </a>
                        <a href="#" className="text-gray-900 hover:text-brand-primary transition text-sm font-medium">
                            Services
                        </a>

                        {/* Resources Dropdown */}
                        <div className="relative group">
                            <button className="text-gray-900 hover:text-brand-primary transition flex items-center gap-2 text-sm font-medium">
                                Resources
                                <ChevronDown size={16} className="group-hover:rotate-180 transition" />
                            </button>
                            <div className="absolute left-0 mt-0 w-48 bg-white rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 py-2">
                                <a href="#" className="block px-4 py-2 text-gray-700 hover:text-brand-primary text-sm transition">Product Catalog</a>
                                <a href="#" className="block px-4 py-2 text-gray-700 hover:text-brand-primary text-sm transition">Technical Specs</a>
                                <a href="#" className="block px-4 py-2 text-gray-700 hover:text-brand-primary text-sm transition">Case Studies</a>
                                <a href="#" className="block px-4 py-2 text-gray-700 hover:text-brand-primary text-sm transition">Certifications</a>
                                <a href="#" className="block px-4 py-2 text-gray-700 hover:text-brand-primary text-sm transition">Downloads</a>
                                <a href="#" className="block px-4 py-2 text-brand-primary font-medium text-sm transition">View all resources →</a>
                            </div>
                        </div>

                        {/* Company Dropdown */}
                        <div className="relative group">
                            <button className="text-gray-900 hover:text-brand-primary transition flex items-center gap-2 text-sm font-medium">
                                Company
                                <ChevronDown size={16} className="group-hover:rotate-180 transition" />
                            </button>
                            <div className="absolute left-0 mt-0 w-48 bg-white rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 py-2">
                                <a href="#" className="block px-4 py-2 text-gray-700 hover:text-brand-primary text-sm transition">About Us</a>
                                <a href="#" className="block px-4 py-2 text-gray-700 hover:text-brand-primary text-sm transition">Our Team</a>
                                <a href="#" className="block px-4 py-2 text-gray-700 hover:text-brand-primary text-sm transition">History</a>
                                <a href="#" className="block px-4 py-2 text-gray-700 hover:text-brand-primary text-sm transition">Careers</a>
                            </div>
                        </div>

                        <a href="#" className="text-gray-900 hover:text-brand-primary transition text-sm font-medium">
                            Contact
                        </a>
                    </div>
                </div>

                {/* Right Side: CTA Button + Mobile Menu */}
                <div className="flex items-center gap-4">
                    {/* Desktop CTA Button */}
                    <button className="hidden md:block bg-brand-primary hover:bg-[#153838] text-white font-medium px-6 py-2 rounded-full transition">
                        Contact Us
                    </button>

                    {/* Mobile Menu Button */}
                    <button 
                        onClick={toggleMenu}
                        className="lg:hidden flex flex-col items-center justify-center gap-1.5 w-8 h-8"
                    >
                        <span className={`w-6 h-0.5 bg-gray-900 transition-all ${isOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
                        <span className={`w-6 h-0.5 bg-gray-900 transition-all ${isOpen ? 'opacity-0' : ''}`}></span>
                        <span className={`w-6 h-0.5 bg-gray-900 transition-all ${isOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
                    </button>
                </div>
            </div>

            {/* Mobile Navigation Menu */}
            {isOpen && (
                <div className="lg:hidden border-t border-gray-200 bg-white px-6 py-4">
                    <div className="flex flex-col gap-2">
                        <a href="#" className="text-gray-900 font-medium hover:text-brand-primary transition block py-2">
                            Products
                        </a>
                        <a href="#" className="text-gray-900 font-medium hover:text-brand-primary transition block py-2">
                            Services
                        </a>

                        {/* Mobile Resources Dropdown */}
                        <button 
                            onClick={() => toggleDropdown('resources')}
                            className="text-gray-900 font-medium hover:text-brand-primary transition flex items-center justify-between w-full py-2"
                        >
                            Resources
                            <ChevronDown size={16} className={`transition ${openDropdown === 'resources' ? 'rotate-180' : ''}`} />
                        </button>
                        {openDropdown === 'resources' && (
                            <div className="pl-4 flex flex-col gap-1 border-l-2 border-brand-primary">
                                <a href="#" className="text-gray-700 hover:text-brand-primary text-sm transition block py-1">Product Catalog</a>
                                <a href="#" className="text-gray-700 hover:text-brand-primary text-sm transition block py-1">Technical Specs</a>
                                <a href="#" className="text-gray-700 hover:text-brand-primary text-sm transition block py-1">Case Studies</a>
                                <a href="#" className="text-gray-700 hover:text-brand-primary text-sm transition block py-1">Certifications</a>
                            </div>
                        )}

                        {/* Mobile Company Dropdown */}
                        <button 
                            onClick={() => toggleDropdown('company')}
                            className="text-gray-900 font-medium hover:text-brand-primary transition flex items-center justify-between w-full py-2"
                        >
                            Company
                            <ChevronDown size={16} className={`transition ${openDropdown === 'company' ? 'rotate-180' : ''}`} />
                        </button>
                        {openDropdown === 'company' && (
                            <div className="pl-4 flex flex-col gap-1 border-l-2 border-brand-primary">
                                <a href="#" className="text-gray-700 hover:text-brand-primary text-sm transition block py-1">About Us</a>
                                <a href="#" className="text-gray-700 hover:text-brand-primary text-sm transition block py-1">Our Team</a>
                                <a href="#" className="text-gray-700 hover:text-brand-primary text-sm transition block py-1">History</a>
                                <a href="#" className="text-gray-700 hover:text-brand-primary text-sm transition block py-1">Careers</a>
                            </div>
                        )}

                        <a href="#" className="text-gray-900 font-medium hover:text-brand-primary transition block py-2">
                            Contact
                        </a>
                        <button className="w-full bg-brand-primary hover:bg-[#153838] text-white font-medium px-6 py-2 rounded-full transition mt-4">
                            Contact Us
                        </button>
                    </div>
                </div>
            )}
        </nav>
    );
}
