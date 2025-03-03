
import React from 'react';
import TestimonialCard from './TestimonialCard';

const TestimonialSection: React.FC = () => {
  return (
    <div className="mt-20 smooth-fade-in animation-delay-800">
      <h3 className="text-2xl font-serif font-medium mb-8">What Users Are Saying</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <TestimonialCard 
          quote="Talk to History GPT has completely transformed how my students engage with historical content. The conversations feel authentic and provide insights that textbooks simply can't convey."
          name="Emma Sullivan"
          role="History Teacher, Boston"
          initials="ES"
        />
        
        <TestimonialCard 
          quote="I've spent hours talking with historical figures through this app. The AI is remarkably well-informed and stays true to the historical context. It's like time travel through conversation."
          name="Michael Johnson"
          role="History Enthusiast"
          initials="MJ"
        />

        <TestimonialCard 
          quote="As a writer researching for my historical novel, Talk to History GPT has been an invaluable tool. The nuanced responses have helped me understand perspectives from different time periods with remarkable accuracy."
          name="Sarah Chen"
          role="Author"
          initials="SC"
        />
        
        <TestimonialCard 
          quote="AiWebTools.Ai has outdone themselves with Talk to History GPT. My students are voluntarily spending extra time exploring historical conversations - something I never thought I'd see! It's educational technology at its finest."
          name="David Rodriguez"
          role="Education Director"
          initials="DR"
        />
      </div>
    </div>
  );
};

export default TestimonialSection;
