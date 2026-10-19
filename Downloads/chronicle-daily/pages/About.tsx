
import React from 'react';
import { SITE_NAME, TAGLINE } from '../constants';
import { Award, Globe, Shield, Users } from 'lucide-react';

const About: React.FC = () => {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative py-24 bg-black text-white overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img src="https://picsum.photos/seed/about/1920/1080" className="w-full h-full object-cover grayscale" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <h1 className="text-6xl md:text-8xl font-serif font-bold mb-6 tracking-tighter">
            {SITE_NAME}
          </h1>
          <p className="text-2xl md:text-3xl font-light text-gray-300 italic mb-12">
            {TAGLINE}
          </p>
          <div className="h-1 w-24 bg-red-600 mx-auto"></div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-24 max-w-4xl mx-auto px-4 sm:px-6 text-center">
        <h2 className="text-xs font-bold text-red-600 uppercase tracking-[0.3em] mb-8">Our Mission</h2>
        <p className="text-3xl md:text-4xl font-serif leading-relaxed text-gray-800">
          We believe in the power of truth to ignite change. In an age of misinformation, we provide a beacon of clarity, grounded in rigorous fact-checking and fearless reporting.
        </p>
      </section>

      {/* Values Grid */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            <div className="text-center p-8 bg-white rounded-2xl shadow-sm hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-red-50 text-red-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Shield size={32} />
              </div>
              <h3 className="text-xl font-bold mb-4">Integrity First</h3>
              <p className="text-gray-500 text-sm">We maintain absolute independence from political and corporate influence.</p>
            </div>
            <div className="text-center p-8 bg-white rounded-2xl shadow-sm hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-red-50 text-red-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Globe size={32} />
              </div>
              <h3 className="text-xl font-bold mb-4">Global Reach</h3>
              <p className="text-gray-500 text-sm">With correspondents in 50 countries, we tell the stories that others miss.</p>
            </div>
            <div className="text-center p-8 bg-white rounded-2xl shadow-sm hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-red-50 text-red-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Award size={32} />
              </div>
              <h3 className="text-xl font-bold mb-4">Excellence</h3>
              <p className="text-gray-500 text-sm">Winner of 12 Pulitzer Prizes for investigative and feature journalism.</p>
            </div>
            <div className="text-center p-8 bg-white rounded-2xl shadow-sm hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-red-50 text-red-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users size={32} />
              </div>
              <h3 className="text-xl font-bold mb-4">Community</h3>
              <p className="text-gray-500 text-sm">Empowering our readers to take part in the global conversation.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Stats */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-black rounded-3xl p-16 text-white grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <p className="text-5xl font-serif font-bold text-red-600 mb-2">250+</p>
            <p className="text-gray-400 text-sm uppercase tracking-widest font-bold">Journalists</p>
          </div>
          <div>
            <p className="text-5xl font-serif font-bold text-red-600 mb-2">12M</p>
            <p className="text-gray-400 text-sm uppercase tracking-widest font-bold">Monthly Readers</p>
          </div>
          <div>
            <p className="text-5xl font-serif font-bold text-red-600 mb-2">50</p>
            <p className="text-gray-400 text-sm uppercase tracking-widest font-bold">Bureaus</p>
          </div>
          <div>
            <p className="text-5xl font-serif font-bold text-red-600 mb-2">24/7</p>
            <p className="text-gray-400 text-sm uppercase tracking-widest font-bold">Coverage</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
