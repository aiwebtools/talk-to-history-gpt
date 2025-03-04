
import React from 'react';
import { Star, Users } from 'lucide-react';

const StatisticsSection: React.FC = () => {
  return (
    <div className="w-full py-6 my-4 sm:my-6 rounded-xl bg-gradient-to-r from-secondary/30 to-primary/20 backdrop-blur-sm border border-white/10">
      <div className="max-w-4xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-center sm:justify-around gap-6 sm:gap-10">
        {/* Active Users Stat */}
        <div className="flex flex-col items-center">
          <div className="flex items-center gap-2 mb-1">
            <Users className="h-5 w-5 text-primary" />
            <span className="text-2xl sm:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">2,000+</span>
          </div>
          <p className="text-sm text-muted-foreground">Active Users</p>
        </div>

        {/* Divider for desktop */}
        <div className="hidden sm:block h-12 w-px bg-border"></div>

        {/* Star Rating Stat */}
        <div className="flex flex-col items-center">
          <div className="flex items-center gap-1 mb-1">
            <div className="flex">
              <Star className="h-5 w-5 text-accent fill-accent" />
              <Star className="h-5 w-5 text-accent fill-accent" />
              <Star className="h-5 w-5 text-accent fill-accent" />
              <Star className="h-5 w-5 text-accent fill-accent" />
              <Star className="h-5 w-5 text-accent fill-accent/50" strokeWidth={1.5} />
            </div>
            <span className="text-2xl sm:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-accent to-accent/80 ml-1">4.5</span>
          </div>
          <p className="text-sm text-muted-foreground">Average Rating</p>
        </div>
      </div>
    </div>
  );
};

export default StatisticsSection;
