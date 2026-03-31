export default function HeroSection() {
  return (
    <section id="home" className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20 px-4">
      <div className="max-w-7xl mx-auto text-center">
        <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
          Welcome to MyApp
        </h1>
        <p className="text-xl md:text-2xl mb-8 text-blue-100">
          Build amazing web applications with modern React and Tailwind CSS
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-bold hover:bg-gray-100 transition">
            Get Started Free
          </button>
          <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-bold hover:bg-white hover:text-blue-600 transition">
            Watch Demo
          </button>
        </div>

        {/* Hero Image */}
        <div className="mt-12">
          <div className="bg-white/20 backdrop-blur-sm rounded-lg p-8 max-w-4xl mx-auto">
            <img 
              src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&h=400&fit=crop"
              alt="Hero"
              className="w-full rounded-lg shadow-xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
}