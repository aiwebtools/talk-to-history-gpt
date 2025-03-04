
import React from 'react';
import { cn } from '@/lib/utils';
import HeroHeader from './hero/HeroHeader';
import StatisticsSection from './hero/StatisticsSection';
import VideoSection from './hero/VideoSection';
import FeatureSection from './hero/FeatureSection';
import TestimonialSection from './hero/TestimonialSection';

interface HeroProps {
  onStartConversation: () => void;
  className?: string;
}

const Hero: React.FC<HeroProps> = ({
  onStartConversation,
  className
}) => {
  const handleStartClick = () => {
    // Open the specified URL in a new window/tab
    window.open('https://chatgpt.com/g/g-kHdIkYTdG-talk-to-history-gpt', '_blank');

    // Also call the original onStartConversation function if needed
    // Commenting this out since we're redirecting instead
    // onStartConversation();
  };

  return (
    <div className={cn('text-center max-w-5xl mx-auto px-4', className)}>
      {/* Welcome and Hero section */}
      <HeroHeader onStartClick={handleStartClick} />

      {/* Statistics Section */}
      <StatisticsSection />

      {/* Video Section */}
      <VideoSection />

      {/* Feature Cards Section */}
      <FeatureSection />

      {/* Testimonials Section */}
      <TestimonialSection />
    </div>
  );
};

export default Hero;
