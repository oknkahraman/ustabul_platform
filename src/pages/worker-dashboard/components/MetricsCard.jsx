import React from 'react';
import Icon from '../../../components/AppIcon';

const MetricsCard = ({ icon, label, value, subValue, trend, color = 'primary' }) => {
  const getColorClasses = (colorName) => {
    switch (colorName) {
      case 'success':
        return {
          bg: 'bg-success/10',
          text: 'text-success',
          icon: 'var(--color-success)'
        };
      case 'warning':
        return {
          bg: 'bg-warning/10',
          text: 'text-warning',
          icon: 'var(--color-warning)'
        };
      case 'accent':
        return {
          bg: 'bg-accent/10',
          text: 'text-accent',
          icon: 'var(--color-accent)'
        };
      default:
        return {
          bg: 'bg-primary/10',
          text: 'text-primary',
          icon: 'var(--color-primary)'
        };
    }
  };

  const colors = getColorClasses(color);

  return (
    <div className="bg-card border border-border rounded-lg p-6 hover:shadow-md transition-all duration-150 ease-out">
      <div className="flex items-start justify-between mb-4">
        <div className={`w-12 h-12 ${colors?.bg} rounded-lg flex items-center justify-center`}>
          <Icon name={icon} size={24} color={colors?.icon} />
        </div>
        {trend && (
          <div className={`flex items-center space-x-1 ${trend > 0 ? 'text-success' : 'text-error'}`}>
            <Icon name={trend > 0 ? 'TrendingUp' : 'TrendingDown'} size={16} />
            <span className="text-xs font-medium">{Math.abs(trend)}%</span>
          </div>
        )}
      </div>
      <div>
        <p className="text-sm text-muted-foreground mb-1">{label}</p>
        <p className="text-2xl font-heading font-bold text-foreground">{value}</p>
        {subValue && (
          <p className="text-xs text-muted-foreground mt-1">{subValue}</p>
        )}
      </div>
    </div>
  );
};

export default MetricsCard;