
import React from 'react';

const VideoSection: React.FC = () => {
  return (
    <div className="mt-16 smooth-fade-in animation-delay-400">
      <h3 className="text-2xl font-serif font-medium mb-6">"Those who cannot remember the past are condemned to repeat it." – George Santayana</h3>
      <div className="aspect-video max-w-3xl mx-auto rounded-xl overflow-hidden shadow-lg transform transition-transform hover:scale-[1.02] duration-300 hover:box-glow mb-16">
        <iframe 
          width="100%" 
          height="100%" 
          src="https://www.youtube.com/embed/eyASGMPLpLM?vq=hd1080&autoplay=1&mute=1" 
          title="Talk to History Demo" 
          frameBorder="0" 
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
          allowFullScreen 
          className="w-full h-full"
        ></iframe>
      </div>
    </div>
  );
};

export default VideoSection;
