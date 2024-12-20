import React from 'react';
import { ArrowUp, ArrowDown } from 'lucide-react';
import './StatsCard.css';

interface StatsCardProps {
  title: string;
  value: string;
  change: string;
  icon: React.ReactNode;
  trend: 'up' | 'down';
}

export const StatsCard: React.FC<StatsCardProps> = ({
  title,
  value,
  change,
  icon,
  trend,
}) => {
  return (
    <div className="stats-card">
      <div className="stats-card-content">
        <div className="stats-card-icon">{icon}</div>
        <div className="stats-card-info">
          <p className="stats-card-title">{title}</p>
          <p className="stats-card-value">{value}</p>
          <div className={`stats-card-change ${trend === 'up' ? 'trend-up' : 'trend-down'}`}>
            {trend === 'up' ? (
              <ArrowUp className="h-4 w-4" />
            ) : (
              <ArrowDown className="h-4 w-4" />
            )}
            <span>{change}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
