
import React, { useState, useEffect } from 'react';

const VideoSection: React.FC = () => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsIntersecting(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    const videoElement = document.getElementById('video-section');
    if (videoElement) observer.observe(videoElement);

    return () => {
      if (videoElement) observer.unobserve(videoElement);
    };
  }, []);

  return (
    <div id="video-section" className="mt-8 sm:mt-16 smooth-fade-in animation-delay-400 px-2 sm:px-4">
      <h3 className="text-xl sm:text-2xl font-serif font-medium mb-4 sm:mb-6">"Those who cannot remember the past are condemned to repeat it." – George Santayana</h3>
      <div className="aspect-video w-full md:max-w-3xl mx-auto rounded-xl overflow-hidden shadow-lg transform transition-transform hover:scale-[1.02] duration-300 hover:box-glow mb-8 sm:mb-16">
        {(isIntersecting || hasLoaded) && (
          <iframe 
            width="100%" 
            height="100%" 
            src="https://www.youtube.com/embed/m1w0PzHcthI?vq=hd1080&autoplay=1&rel=0" 
            title="Talk to History Demo" 
            frameBorder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
            allowFullScreen 
            className="w-full h-full"
            onLoad={() => setHasLoaded(true)}
            loading="lazy"
          ></iframe>
        )}
      </div>
    </div>
  );
};

export default VideoSection;
