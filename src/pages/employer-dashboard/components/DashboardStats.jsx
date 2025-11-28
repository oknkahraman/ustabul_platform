import React from 'react';
import Icon from '../../../components/AppIcon';

const DashboardStats = ({ stats }) => {
  const statCards = [
    {
      icon: 'Briefcase',
      label: 'Aktif İlanlar',
      value: stats?.activeJobs,
      color: 'text-primary',
      bgColor: 'bg-primary/10',
      trend: stats?.activeJobsTrend,
      trendUp: stats?.activeJobsTrend > 0
    },
    {
      icon: 'Users',
      label: 'Toplam Başvuru',
      value: stats?.totalApplications,
      color: 'text-accent',
      bgColor: 'bg-accent/10',
      trend: stats?.applicationsTrend,
      trendUp: stats?.applicationsTrend > 0
    },
    {
      icon: 'UserCheck',
      label: 'İşe Alınan',
      value: stats?.hiredWorkers,
      color: 'text-success',
      bgColor: 'bg-success/10',
      trend: stats?.hiredTrend,
      trendUp: stats?.hiredTrend > 0
    },
    {
      icon: 'Clock',
      label: 'Bekleyen Onay',
      value: stats?.pendingApprovals,
      color: 'text-warning',
      bgColor: 'bg-warning/10',
      highlight: stats?.pendingApprovals > 0
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {statCards?.map((stat, index) => (
        <div
          key={index}
          className={`bg-card border rounded-lg p-6 transition-all duration-150 ease-out ${
            stat?.highlight ? 'border-warning shadow-card animate-pulse' : 'border-border hover:shadow-card'
          }`}
        >
          <div className="flex items-start justify-between mb-4">
            <div className={`w-12 h-12 ${stat?.bgColor} rounded-lg flex items-center justify-center`}>
              <Icon name={stat?.icon} size={24} color={`var(--color-${stat?.color?.replace('text-', '')})`} />
            </div>
            {stat?.trend !== undefined && (
              <div className={`flex items-center gap-1 text-xs font-medium ${stat?.trendUp ? 'text-success' : 'text-error'}`}>
                <Icon name={stat?.trendUp ? 'TrendingUp' : 'TrendingDown'} size={14} />
                <span>{Math.abs(stat?.trend)}%</span>
              </div>
            )}
          </div>
          <div>
            <p className="text-2xl font-heading font-bold text-foreground mb-1">{stat?.value}</p>
            <p className="text-sm text-muted-foreground">{stat?.label}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DashboardStats;