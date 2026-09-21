import React from 'react';
import { cn } from '@/lib/utils';
import type { ToolVersion } from '@/lib/externalTools';

interface VersionBadgeProps {
  version: ToolVersion;
  className?: string;
}

/** Small label so users always know if a button stays on this site or leaves it. */
const VersionBadge: React.FC<VersionBadgeProps> = ({ version, className }) => (
  <span
    className={cn(
      'text-[9px] sm:text-[10px] font-semibold uppercase tracking-wide opacity-80 whitespace-nowrap',
      className,
    )}
  >
    ({version})
  </span>
);

export default VersionBadge;
