
import React from 'react';
import { cn } from '@/lib/utils';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description }) => {
  return (
    <div className="p-6 rounded-xl bg-card border border-border hover-lift transition-all duration-500 group">
      <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center text-primary mb-4 group-hover:scale-110 transition-transform duration-300">
        {icon}
      </div>
      <h3 className="text-xl font-serif font-medium mb-2 group-hover:text-primary transition-colors">{title}</h3>
      <p className="text-muted-foreground group-hover:text-foreground transition-colors">
        {description}
      </p>
    </div>
  );
};

export default FeatureCard;
