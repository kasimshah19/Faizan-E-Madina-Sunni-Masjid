import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMaximize2, FiImage } from 'react-icons/fi';

// Dummy Gallery Data
const GALLERY_IMAGES = [
  { id: 1, category: "Masjid", title: "Main Prayer Hall", src: "https://placehold.co/800x600/10b981/ffffff?text=Main+Hall" },
  { id: 2, category: "Events", title: "Eid ul Fitr Gathering", src: "https://placehold.co/800x600/047857/ffffff?text=Eid+Gathering" },
  { id: 3, category: "Education", title: "Madrasa Quran Class", src: "https://placehold.co/800x600/065f46/ffffff?text=Madrasa+Class" },
  { id: 4, category: "Community", title: "Ramadan Iftar Drive", src: "https://placehold.co/600x800/10b981/ffffff?text=Iftar+Drive" },
  { id: 5, category: "Masjid", title: "Beautiful Exterior View", src: "https://placehold.co/800x600/047857/ffffff?text=Masjid+Exterior" },
  { id: 6, category: "Community", title: "Youth Career Seminar", src: "https://placehold.co/800x600/065f46/ffffff?text=Youth+Seminar" },
  { id: 7, category: "Education", title: "Annual Prize Distribution", src: "https://placehold.co/600x800/10b981/ffffff?text=Prize+Distribution" },
  { id: 8, category: "Events", title: "Community Cleaning Day", src: "https://placehold.co/800x600/047857/ffffff?text=Community+Work" },
  { id: 9, category: "Masjid", title: "Mihrab & Minbar", src: "https://placehold.co/800x600/065f46/ffffff?text=Mihrab" },
];

const CATEGORIES = ["All", "Masjid", "Events", "Education", "Community"];

const Gallery = () => {
  const [activeFilter, setActiveFilter] = useState("All");

  const filteredImages = activeFilter === "All" 
    ? GALLERY_IMAGES 
    : GALLERY_IMAGES.filter(img => img.category === activeFilter);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900">
      
      {/* ================= PAGE HEADER ================= */}
      <section className="bg-emerald-900 py-16 md:py-24 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/arabesque.png')] mix-blend-overlay"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-emerald-900 to-transparent"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Photo Gallery</h1>
            <p className="text-emerald-100 text-lg max-w-2xl mx-auto">
              A visual journey through our beautiful masjid, vibrant community events, and educational programs.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ================= FILTER BUTTONS ================= */}
      <section className="py-8 md:py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex flex-wrap justify-center gap-3">
          {CATEGORIES.map((category) => (
            <button
              key={category}
              onClick={() => setActiveFilter(category)}
              className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all duration-300 shadow-sm ${
                activeFilter === category 
                  ? 'bg-emerald-600 text-white shadow-md' 
                  : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:border-emerald-500 hover:text-emerald-600 dark:hover:text-emerald-400'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </section>

      {/* ================= GALLERY GRID ================= */}
      <section className="pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex-grow">
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {filteredImages.map((image) => (
              <motion.div
                key={image.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="group relative rounded-2xl overflow-hidden shadow-md cursor-pointer aspect-w-4 aspect-h-3 bg-gray-200 dark:bg-gray-800"
              >
                <img 
                  src={image.src} 
                  alt={image.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                
                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/90 via-emerald-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                  <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    <span className="inline-block px-3 py-1 bg-emerald-500 text-white text-xs font-bold uppercase tracking-wider rounded-full mb-2">
                      {image.category}
                    </span>
                    <h3 className="text-xl font-bold text-white mb-1">{image.title}</h3>
                  </div>
                  
                  {/* Icon in top right corner on hover */}
                  <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm p-2 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                    <FiMaximize2 className="text-xl" />
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Empty State */}
        {filteredImages.length === 0 && (
          <div className="text-center py-20">
            <FiImage className="text-5xl text-gray-300 dark:text-gray-600 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-gray-500 dark:text-gray-400">No images found in this category.</h3>
          </div>
        )}
      </section>

    </div>
  );
};

export default Gallery;