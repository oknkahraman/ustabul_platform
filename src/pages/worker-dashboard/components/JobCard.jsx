import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';
import { useNavigate } from 'react-router-dom';
import { applicationsAPI } from '../../../utils/api';

const JobCard = ({ job }) => {
  const navigate = useNavigate();
  const [isApplying, setIsApplying] = useState(false);
  const [hasApplied, setHasApplied] = useState(false);

  useEffect(() => {
    // Check if user has already applied to this job
    const checkApplication = async () => {
      try {
        const userId = localStorage.getItem('userId');
        if (!userId) return;

        const response = await applicationsAPI?.getApplicationsByWorker(userId);
        const applications = response?.data || [];
        
        const applied = applications?.some(app => app?.jobId === job?.id);
        setHasApplied(applied);
      } catch (err) {
        console.error('Failed to check application status:', err);
      }
    };

    checkApplication();
  }, [job?.id]);

  const handleApply = async () => {
    try {
      setIsApplying(true);
      
      const userId = localStorage.getItem('userId');
      if (!userId) {
        alert('Lütfen önce giriş yapın');
        return;
      }

      await applicationsAPI?.applyForJob(job?.id, {
        workerId: userId,
        coverLetter: '',
        proposedRate: job?.budget?.min || 0
      });

      alert('Başvurunuz başarıyla gönderildi!');
      setHasApplied(true);
    } catch (err) {
      console.error('Apply error:', err);
      alert('Başvuru gönderilemedi: ' + (err?.response?.data?.message || 'Bir hata oluştu'));
    } finally {
      setIsApplying(false);
    }
  };

  const handleViewDetails = () => {
    navigate(`/job-detail-view?id=${job?.id}&mode=worker`);
  };

  const getUrgencyColor = (urgency) => {
    switch (urgency) {
      case 'urgent':
        return 'bg-error/10 text-error border-error/20';
      case 'high':
        return 'bg-warning/10 text-warning border-warning/20';
      default:
        return 'bg-muted text-muted-foreground border-border';
    }
  };

  const formatDistance = (distance) => {
    return distance < 1 ? `${Math.round(distance * 1000)}m` : `${distance?.toFixed(1)}km`;
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 hover:border-primary/50 transition-colors">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-start space-x-4 flex-1">
          <div className="w-16 h-16 bg-muted rounded-lg overflow-hidden flex-shrink-0">
            <Image
              src={job?.companyLogo}
              alt={job?.companyLogoAlt}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-heading font-semibold text-foreground mb-1 truncate">
              {job?.title}
            </h3>
            <p className="text-sm text-muted-foreground mb-2">{job?.companyName}</p>
            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
              <div className="flex items-center space-x-1">
                <Icon name="MapPin" size={16} />
                <span>{job?.location}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Icon name="Navigation" size={16} />
                <span>{formatDistance(job?.distance)}</span>
              </div>
            </div>
          </div>
        </div>
        {job?.urgency !== 'normal' && (
          <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getUrgencyColor(job?.urgency)}`}>
            {job?.urgency === 'urgent' ? 'Acil' : 'Yüksek Öncelik'}
          </span>
        )}
      </div>
      <div className="mb-4">
        <div className="flex flex-wrap gap-2 mb-3">
          {job?.requiredSkills?.map((skill, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full"
            >
              {skill}
            </span>
          ))}
        </div>
        <p className="text-sm text-foreground line-clamp-2">{job?.description}</p>
      </div>
      <div className="flex items-center justify-between pt-4 border-t border-border">
        <div className="flex items-center space-x-6">
          <div>
            <p className="text-xs text-muted-foreground mb-1">Ücret</p>
            <p className="text-lg font-heading font-bold text-foreground">{job?.payment}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground mb-1">Süre</p>
            <p className="text-sm font-medium text-foreground">{job?.duration}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground mb-1">Başlangıç</p>
            <p className="text-sm font-medium text-foreground">{job?.startDate}</p>
          </div>
        </div>
        <div className="flex items-center gap-3 mt-4">
          <Button
            variant="outline"
            size="sm"
            iconName="Eye"
            onClick={handleViewDetails}
          >
            Detayları Gör
          </Button>
          <Button
            variant="default"
            size="sm"
            iconName={hasApplied ? "CheckCircle" : "Send"}
            onClick={handleApply}
            disabled={isApplying || hasApplied}
          >
            {isApplying ? 'Gönderiliyor...' : (hasApplied ? 'Başvuruldu' : 'Başvur')}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default JobCard;