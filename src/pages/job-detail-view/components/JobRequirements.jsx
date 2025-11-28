import React from 'react';
import Icon from '../../../components/AppIcon';

const JobRequirements = ({ skills, experienceLevel, equipment }) => {
  const experienceLevelMap = {
    entry: 'Başlangıç (0-2 yıl)',
    intermediate: 'Orta (2-5 yıl)',
    advanced: 'İleri (5-10 yıl)',
    expert: 'Uzman (10+ yıl)'
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <h3 className="text-lg font-heading font-semibold text-foreground mb-4">
        Gereksinimler
      </h3>
      <div className="space-y-4">
        {skills?.length > 0 && (
          <div>
            <h4 className="text-sm font-medium text-foreground mb-2 flex items-center gap-2">
              <Icon name="CheckCircle" size={16} color="var(--color-primary)" />
              Gerekli Yetkinlikler
            </h4>
            <div className="flex flex-wrap gap-2">
              {skills?.map((skill, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}

        {experienceLevel && (
          <div>
            <h4 className="text-sm font-medium text-foreground mb-2 flex items-center gap-2">
              <Icon name="Award" size={16} color="var(--color-secondary)" />
              Deneyim Seviyesi
            </h4>
            <p className="text-sm text-muted-foreground">
              {experienceLevelMap?.[experienceLevel] || experienceLevel}
            </p>
          </div>
        )}

        {equipment?.length > 0 && (
          <div>
            <h4 className="text-sm font-medium text-foreground mb-2 flex items-center gap-2">
              <Icon name="Tool" size={16} color="var(--color-warning)" />
              Gerekli Ekipman
            </h4>
            <div className="flex flex-wrap gap-2">
              {equipment?.map((item, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-secondary/10 text-secondary rounded-full text-sm"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
      <div className="mt-6 bg-info/10 border border-info rounded-lg p-4">
        <div className="flex items-start gap-3">
          <div className="text-info mt-0.5">💡</div>
          <div className="text-sm text-info-foreground">
            <p className="font-medium mb-1">Başvuru İpucu:</p>
            <p>
              Portfolyonuzda bu yetkinliklerle ilgili çalışma örnekleri bulundurmak
              başvurunuzun öne çıkmasını sağlar.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobRequirements;