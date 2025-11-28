import React from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const JobPreview = ({ jobData, onClose, onPublish }) => {
  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-card border border-border rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-card border-b border-border p-4 flex items-center justify-between">
          <h2 className="text-xl font-heading font-bold text-foreground">İlan Önizlemesi</h2>
          <button
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <Icon name="X" size={24} color="currentColor" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div>
            <h3 className="text-2xl font-heading font-bold text-foreground mb-2">
              {jobData?.title || 'İlan Başlığı'}
            </h3>
            <div className="flex flex-wrap gap-2">
              {jobData?.urgency === 'urgent' && (
                <span className="px-2 py-1 bg-error text-error-foreground text-xs font-medium rounded">
                  Acil
                </span>
              )}
              {jobData?.urgency === 'high' && (
                <span className="px-2 py-1 bg-warning text-warning-foreground text-xs font-medium rounded">
                  Yüksek Öncelik
                </span>
              )}
              <span className="px-2 py-1 bg-primary/10 text-primary text-xs font-medium rounded">
                {jobData?.category || 'Kategori'}
              </span>
            </div>
          </div>

          {jobData?.description && (
            <div>
              <h4 className="text-lg font-heading font-semibold text-foreground mb-2">İş Açıklaması</h4>
              <p className="text-muted-foreground whitespace-pre-line">{jobData?.description}</p>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-muted rounded-lg p-4">
              <h4 className="text-sm font-medium text-foreground mb-2">📍 Konum</h4>
              <p className="text-sm text-muted-foreground">
                {jobData?.city && jobData?.district
                  ? `${jobData?.district}, ${jobData?.city}`
                  : 'Belirtilmedi'}
              </p>
            </div>

            <div className="bg-muted rounded-lg p-4">
              <h4 className="text-sm font-medium text-foreground mb-2">⏱️ Süre</h4>
              <p className="text-sm text-muted-foreground">
                {jobData?.timeline || 'Belirtilmedi'}
              </p>
            </div>

            <div className="bg-muted rounded-lg p-4">
              <h4 className="text-sm font-medium text-foreground mb-2">💰 Ödeme</h4>
              <p className="text-sm text-muted-foreground">
                {jobData?.paymentType === 'hourly' && jobData?.hourlyRate
                  ? `${jobData?.hourlyRate} TL/saat`
                  : jobData?.paymentType === 'project' && jobData?.projectBudget
                  ? `${jobData?.projectBudget} TL`
                  : 'Pazarlık Edilebilir'}
              </p>
            </div>

            <div className="bg-muted rounded-lg p-4">
              <h4 className="text-sm font-medium text-foreground mb-2">👥 Kapasite</h4>
              <p className="text-sm text-muted-foreground">
                {jobData?.workerCapacity || 1} işçi
              </p>
            </div>
          </div>

          {jobData?.primarySkills?.length > 0 && (
            <div>
              <h4 className="text-lg font-heading font-semibold text-foreground mb-3">Gerekli Yetkinlikler</h4>
              <div className="flex flex-wrap gap-2">
                {jobData?.primarySkills?.map((skill, index) => (
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

          {jobData?.requiredEquipment?.length > 0 && (
            <div>
              <h4 className="text-lg font-heading font-semibold text-foreground mb-3">Gerekli Ekipman</h4>
              <div className="flex flex-wrap gap-2">
                {jobData?.requiredEquipment?.map((equipment, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-secondary/10 text-secondary rounded-full text-sm"
                  >
                    {equipment}
                  </span>
                ))}
              </div>
            </div>
          )}

          {jobData?.screeningQuestions?.length > 0 && (
            <div>
              <h4 className="text-lg font-heading font-semibold text-foreground mb-3">Ön Eleme Soruları</h4>
              <div className="space-y-2">
                {jobData?.screeningQuestions?.map((question, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <span className="text-primary font-medium">{index + 1}.</span>
                    <p className="text-sm text-foreground">{question}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="sticky bottom-0 bg-card border-t border-border p-4 flex items-center justify-between">
          <Button variant="outline" onClick={onClose}>
            Düzenlemeye Dön
          </Button>
          <Button variant="default" iconName="CheckCircle" iconPosition="left" onClick={onPublish}>
            İlanı Yayınla
          </Button>
        </div>
      </div>
    </div>
  );
};

export default JobPreview;