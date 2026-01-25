'use client';

export default function Hero() {
    return (
        <section 
            className="w-full relative overflow-hidden flex items-center"
            style={{
                backgroundImage: 'url(/images/frame_1.png)',
                backgroundSize: 'cover',
                // backgroundPosition: '120% center',
                backgroundAttachment: 'fixed',
                height: 'calc(100vh - 80px)',
                // minHeight: '400px'
            }}
        >
            {/* Dark overlay for text readability */}
            <div className="absolute inset-0"></div>
            
            <div className="max-w-7xl mx-3 px-6 md:px-10 relative z-10">
                <div className="w-3/4">
                    {/* Text Content */}
                    <h1 className="text-6xl md:text-5xl font-bold text-brand-primary mb-3 tracking-tight">
                        Embrace the reality of Engineering to create our future. 
                    </h1>
                    <p className="text-lg md:text-xl text-brand-primary mb-8 tracking-tight">
                        We provide high-quality fasteners including rivets, bolts, and screws for industrial and commercial applications. Our products are engineered for reliability and durability.
                    </p>
                    {/* <div className="flex gap-4">
                        <button className="border-2 border-white hover:bg-white/10 text-white font-semibold px-8 py-3 rounded-lg transition">
                            Learn More
                        </button>
                    </div> */}
                </div>
            </div>
        </section>
    );
}
