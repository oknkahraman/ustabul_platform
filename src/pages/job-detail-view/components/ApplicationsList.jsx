import React from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const ApplicationsList = ({
  applications,
  onApprove,
  onReject,
  onContact,
  onViewProfile
}) => {
  if (!applications?.length) {
    return (
      <div className="bg-card border border-border rounded-lg p-8 text-center">
        <Icon name="Users" size={48} color="var(--color-muted-foreground)" className="mx-auto mb-4" />
        <h3 className="text-lg font-heading font-semibold text-foreground mb-2">
          Henüz Başvuru Yok
        </h3>
        <p className="text-muted-foreground">
          Bu ilana henüz başvuru yapılmamış
        </p>
      </div>
    );
  }

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <h3 className="text-lg font-heading font-semibold text-foreground mb-4">
        Başvurular ({applications?.length})
      </h3>
      <div className="space-y-4">
        {applications?.map((application) => (
          <div
            key={application?.id}
            className="border border-border rounded-lg p-4 hover:border-primary transition-all"
          >
            <div className="flex items-start gap-4">
              <img
                src={application?.workerAvatar}
                alt={application?.workerAvatarAlt}
                className="w-16 h-16 rounded-full object-cover flex-shrink-0"
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div>
                    <h4 className="font-medium text-foreground flex items-center gap-2">
                      {application?.workerName}
                      {application?.verified && (
                        <Icon
                          name="CheckCircle"
                          size={16}
                          color="var(--color-success)"
                        />
                      )}
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      {application?.primarySkill}
                    </p>
                  </div>
                  <span className="text-xs text-muted-foreground whitespace-nowrap">
                    {application?.appliedDate}
                  </span>
                </div>

                <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
                  <span className="flex items-center gap-1">
                    <Icon name="Star" size={12} color="var(--color-warning)" />
                    {application?.rating} ({application?.reviewCount})
                  </span>
                  <span className="flex items-center gap-1">
                    <Icon name="Award" size={12} color="currentColor" />
                    {application?.experience}
                  </span>
                  <span className="flex items-center gap-1">
                    <Icon name="MapPin" size={12} color="currentColor" />
                    {application?.distance}
                  </span>
                </div>

                {application?.matchedSkills?.length > 0 && (
                  <div className="flex flex-wrap gap-1 mb-3">
                    {application?.matchedSkills?.map((skill, index) => (
                      <span
                        key={index}
                        className="px-2 py-0.5 bg-success/10 text-success text-xs rounded"
                      >
                        ✓ {skill}
                      </span>
                    ))}
                  </div>
                )}

                {application?.coverMessage && (
                  <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                    {application?.coverMessage}
                  </p>
                )}

                {application?.portfolioSamples?.length > 0 && (
                  <div className="flex gap-2 mb-3">
                    {application?.portfolioSamples?.slice(0, 3)?.map((sample, index) => (
                      <img
                        key={index}
                        src={sample?.image}
                        alt={sample?.imageAlt}
                        className="w-16 h-16 rounded object-cover cursor-pointer hover:opacity-80 transition-opacity"
                        onClick={() => onViewProfile?.(application?.workerId)}
                      />
                    ))}
                    {application?.totalPortfolioCount > 3 && (
                      <div className="w-16 h-16 rounded bg-muted flex items-center justify-center text-xs text-muted-foreground">
                        +{application?.totalPortfolioCount - 3}
                      </div>
                    )}
                  </div>
                )}

                <div className="flex flex-wrap gap-2">
                  <Button
                    variant="default"
                    size="sm"
                    iconName="CheckCircle"
                    iconPosition="left"
                    onClick={() => onApprove?.(application?.id)}
                  >
                    Onayla
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    iconName="XCircle"
                    onClick={() => onReject?.(application?.id)}
                  >
                    Reddet
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    iconName="MessageCircle"
                    onClick={() => onContact?.(application?.workerId)}
                  >
                    Mesaj Gönder
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    iconName="User"
                    onClick={() => onViewProfile?.(application?.workerId)}
                  >
                    Profil
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ApplicationsList;