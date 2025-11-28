import React, { useState } from 'react';
import Input from '../../../components/ui/Input';

import Icon from '../../../components/AppIcon';

const BusinessVerificationForm = ({ formData, errors, onChange, onFileUpload }) => {
  const [uploadedDocs, setUploadedDocs] = useState({
    tradeRegistry: null,
    taxPlate: null,
    signatureCircular: null
  });

  const handleFileChange = (docType, event) => {
    const file = event?.target?.files?.[0];
    if (file) {
      setUploadedDocs(prev => ({
        ...prev,
        [docType]: file
      }));
      if (onFileUpload) {
        onFileUpload(docType, file);
      }
    }
  };

  const removeFile = (docType) => {
    setUploadedDocs(prev => ({
      ...prev,
      [docType]: null
    }));
  };

  const DocumentUploadCard = ({ title, description, docType, accept = ".pdf,.jpg,.jpeg,.png" }) => {
    const file = uploadedDocs?.[docType];
    
    return (
      <div className="border border-border rounded-lg p-4 hover:border-primary/50 transition-colors duration-150">
        <div className="flex items-start justify-between mb-3">
          <div>
            <h4 className="text-sm font-medium text-foreground">{title}</h4>
            <p className="text-xs text-muted-foreground mt-1">{description}</p>
          </div>
          {file && (
            <button
              onClick={() => removeFile(docType)}
              className="p-1 hover:bg-muted rounded transition-colors duration-150"
              aria-label="Dosyayı kaldır"
            >
              <Icon name="X" size={16} color="var(--color-muted-foreground)" />
            </button>
          )}
        </div>
        {file ? (
          <div className="flex items-center space-x-3 bg-muted/50 rounded-lg p-3">
            <div className="w-10 h-10 bg-success/10 rounded-lg flex items-center justify-center flex-shrink-0">
              <Icon name="FileCheck" size={20} color="var(--color-success)" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground truncate">{file?.name}</p>
              <p className="text-xs text-muted-foreground">{(file?.size / 1024)?.toFixed(2)} KB</p>
            </div>
          </div>
        ) : (
          <label className="block cursor-pointer">
            <input
              type="file"
              accept={accept}
              onChange={(e) => handleFileChange(docType, e)}
              className="hidden"
            />
            <div className="border-2 border-dashed border-border rounded-lg p-4 text-center hover:border-primary/50 hover:bg-muted/30 transition-all duration-150">
              <Icon name="Upload" size={24} color="var(--color-muted-foreground)" className="mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">Dosya seçmek için tıklayın</p>
              <p className="text-xs text-muted-foreground mt-1">PDF, JPG veya PNG (Max 5MB)</p>
            </div>
          </label>
        )}
      </div>
    );
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
          <Icon name="ShieldCheck" size={20} color="var(--color-primary)" />
        </div>
        <div>
          <h2 className="text-xl font-heading font-bold text-foreground">İş Yeri Doğrulama</h2>
          <p className="text-sm text-muted-foreground">Şirket belgelerinizi yükleyin</p>
        </div>
      </div>
      <div className="space-y-4 mb-6">
        <Input
          label="Ticaret Odası Üyelik Numarası"
          type="text"
          name="chamberMembershipNumber"
          placeholder="Ticaret odası üyelik numaranız"
          value={formData?.chamberMembershipNumber}
          onChange={onChange}
          error={errors?.chamberMembershipNumber}
          description="Türkiye Ticaret Odası veya Sanayi Odası üyelik numarası"
        />

        <Input
          label="Yetkili Kişi Adı Soyadı"
          type="text"
          name="authorizedPersonName"
          placeholder="Şirket yetkilisi adı soyadı"
          value={formData?.authorizedPersonName}
          onChange={onChange}
          error={errors?.authorizedPersonName}
          required
        />

        <Input
          label="Yetkili Kişi TC Kimlik No"
          type="text"
          name="authorizedPersonId"
          placeholder="11 haneli TC kimlik numarası"
          value={formData?.authorizedPersonId}
          onChange={onChange}
          error={errors?.authorizedPersonId}
          required
          maxLength={11}
        />
      </div>
      <div className="space-y-4">
        <h3 className="text-sm font-medium text-foreground mb-3">Belge Yüklemeleri</h3>
        
        <DocumentUploadCard
          title="Ticaret Sicil Gazetesi"
          description="Şirket kuruluş belgesi (Son 1 yıl içinde alınmış)"
          docType="tradeRegistry"
        />

        <DocumentUploadCard
          title="Vergi Levhası"
          description="Güncel vergi levhası fotokopisi"
          docType="taxPlate"
        />

        <DocumentUploadCard
          title="İmza Sirküleri"
          description="Yetkili imza sirküleri (Opsiyonel)"
          docType="signatureCircular"
        />
      </div>
      <div className="bg-accent/10 rounded-lg p-4 border border-accent/20 mt-6">
        <div className="flex items-start space-x-3">
          <Icon name="AlertCircle" size={20} color="var(--color-accent)" className="mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-sm font-medium text-foreground">Doğrulama Süreci</p>
            <p className="text-xs text-muted-foreground mt-1">Yüklediğiniz belgeler 2-3 iş günü içinde incelenecek ve hesabınız doğrulanacaktır. Doğrulama sonrası iş ilanı yayınlayabilirsiniz.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessVerificationForm;