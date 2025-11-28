import React, { useRef } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const CertificationUpload = ({ certificates, onCertificateAdd, onCertificateRemove }) => {
  const fileInputRef = useRef(null);

  const handleFileInput = (e) => {
    if (e?.target?.files && e?.target?.files?.[0]) {
      const file = e?.target?.files?.[0];
      const newCertificate = {
        id: Date.now(),
        file: file,
        preview: URL.createObjectURL(file),
        previewAlt: `Certificate document showing ${file?.name?.split('.')?.[0]} professional qualification`,
        name: '',
        issuer: '',
        issueDate: '',
        expiryDate: '',
        certificateNumber: ''
      };
      onCertificateAdd(newCertificate);
    }
  };

  const recognizedCertifications = [
    "TSE Kaynak Sertifikası",
    "TÜRKAK Akreditasyonu",
    "ISO 9001 Kalite Belgesi",
    "Ticaret Odası Üyelik Belgesi",
    "Mesleki Yeterlilik Belgesi (MYK)",
    "CNC Operatör Sertifikası",
    "Elektrik İşleri Yeterlilik Belgesi"
  ];

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-heading font-semibold text-foreground">Sertifika Doğrulama</h3>
        <span className="text-sm text-muted-foreground">İsteğe Bağlı</span>
      </div>
      <div className="mb-6 p-4 bg-muted/50 rounded-lg">
        <h4 className="text-sm font-medium text-foreground mb-3 flex items-center">
          <Icon name="Award" size={18} className="mr-2" color="var(--color-primary)" />
          Tanınan Sertifikalar
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {recognizedCertifications?.map((cert, index) => (
            <div key={index} className="flex items-center text-sm text-muted-foreground">
              <Icon name="CheckCircle2" size={14} className="mr-2 flex-shrink-0" color="var(--color-success)" />
              <span>{cert}</span>
            </div>
          ))}
        </div>
      </div>
      <Button
        variant="outline"
        iconName="Upload"
        iconPosition="left"
        fullWidth
        onClick={() => fileInputRef?.current?.click()}
        className="mb-4"
      >
        Sertifika Yükle
      </Button>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*,.pdf"
        onChange={handleFileInput}
        className="hidden"
      />
      {certificates?.length > 0 && (
        <div className="space-y-4 mt-6">
          {certificates?.map((cert) => (
            <div key={cert?.id} className="border border-border rounded-lg p-4">
              <div className="flex items-start gap-4">
                <div className="w-20 h-20 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                  {cert?.file?.type?.includes('pdf') ? (
                    <div className="w-full h-full flex items-center justify-center">
                      <Icon name="FileText" size={32} color="var(--color-muted-foreground)" />
                    </div>
                  ) : (
                    <Image
                      src={cert?.preview}
                      alt={cert?.previewAlt}
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>

                <div className="flex-1 space-y-3">
                  <Input
                    label="Sertifika Adı"
                    placeholder="Örn: TSE Kaynak Sertifikası"
                    value={cert?.name}
                    onChange={(e) => {
                      const updated = { ...cert, name: e?.target?.value };
                      onCertificateAdd(updated);
                    }}
                  />

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <Input
                      label="Veren Kurum"
                      placeholder="Örn: TSE"
                      value={cert?.issuer}
                      onChange={(e) => {
                        const updated = { ...cert, issuer: e?.target?.value };
                        onCertificateAdd(updated);
                      }}
                    />
                    <Input
                      label="Sertifika No"
                      placeholder="Örn: TSE-2024-12345"
                      value={cert?.certificateNumber}
                      onChange={(e) => {
                        const updated = { ...cert, certificateNumber: e?.target?.value };
                        onCertificateAdd(updated);
                      }}
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <Input
                      type="date"
                      label="Veriliş Tarihi"
                      value={cert?.issueDate}
                      onChange={(e) => {
                        const updated = { ...cert, issueDate: e?.target?.value };
                        onCertificateAdd(updated);
                      }}
                    />
                    <Input
                      type="date"
                      label="Geçerlilik Tarihi"
                      value={cert?.expiryDate}
                      onChange={(e) => {
                        const updated = { ...cert, expiryDate: e?.target?.value };
                        onCertificateAdd(updated);
                      }}
                    />
                  </div>
                </div>

                <Button
                  variant="ghost"
                  size="icon"
                  iconName="Trash2"
                  onClick={() => onCertificateRemove(cert?.id)}
                />
              </div>
            </div>
          ))}
        </div>
      )}
      <div className="mt-4 p-3 bg-success/10 rounded-lg">
        <p className="text-sm text-foreground flex items-start">
          <Icon name="TrendingUp" size={16} className="mr-2 mt-0.5 flex-shrink-0" color="var(--color-success)" />
          <span>Sertifikalı ustalar %40 daha fazla iş teklifi alır ve öncelikli olarak gösterilir</span>
        </p>
      </div>
    </div>
  );
};

export default CertificationUpload;