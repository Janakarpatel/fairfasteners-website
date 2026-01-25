'use client';

export default function Footer() {
    return (
        <footer className="bg-brand-primary text-white">
            <div className="max-w-7xl mx-auto px-6 md:px-10 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
                    {/* Company Info */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Fair Fasteners</h3>
                        <p className="text-white/80 text-sm leading-relaxed">
                            Premium fastening solutions for industrial and commercial applications.
                        </p>
                    </div>

                    {/* Products */}
                    <div>
                        <h4 className="text-sm font-semibold mb-4 uppercase tracking-wider">Products</h4>
                        <ul className="space-y-2">
                            <li><a href="#" className="text-white/80 hover:text-white text-sm transition">Rivets</a></li>
                            <li><a href="#" className="text-white/80 hover:text-white text-sm transition">Bolts</a></li>
                            <li><a href="#" className="text-white/80 hover:text-white text-sm transition">Screws</a></li>
                            <li><a href="#" className="text-white/80 hover:text-white text-sm transition">Nuts & Washers</a></li>
                        </ul>
                    </div>

                    {/* Company */}
                    <div>
                        <h4 className="text-sm font-semibold mb-4 uppercase tracking-wider">Company</h4>
                        <ul className="space-y-2">
                            <li><a href="#" className="text-white/80 hover:text-white text-sm transition">About Us</a></li>
                            <li><a href="#" className="text-white/80 hover:text-white text-sm transition">Services</a></li>
                            <li><a href="#" className="text-white/80 hover:text-white text-sm transition">Support</a></li>
                            <li><a href="#" className="text-white/80 hover:text-white text-sm transition">Contact</a></li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="text-sm font-semibold mb-4 uppercase tracking-wider">Contact</h4>
                        <ul className="space-y-2 text-sm text-white/80">
                            <li>Email: info@fairfasteners.com</li>
                            <li>Phone: +1 (555) 123-4567</li>
                            <li>Address: 123 Industry St, City, State</li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-white/20 pt-8 mt-8">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <p className="text-sm text-white/60">
                            © {new Date().getFullYear()} Fair Fasteners. All rights reserved.
                        </p>
                        <div className="flex gap-6">
                            <a href="#" className="text-sm text-white/60 hover:text-white transition">Privacy Policy</a>
                            <a href="#" className="text-sm text-white/60 hover:text-white transition">Terms of Service</a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
