import React, { useState, useRef } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const PortfolioUpload = ({ portfolioImages, onImagesAdd, onImageRemove, onImageUpdate }) => {
  const [dragActive, setDragActive] = useState(false);
  const [editingImage, setEditingImage] = useState(null);
  const fileInputRef = useRef(null);
  const cameraInputRef = useRef(null);

  const handleDrag = (e) => {
    e?.preventDefault();
    e?.stopPropagation();
    if (e?.type === "dragenter" || e?.type === "dragover") {
      setDragActive(true);
    } else if (e?.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e?.preventDefault();
    e?.stopPropagation();
    setDragActive(false);
    
    if (e?.dataTransfer?.files && e?.dataTransfer?.files?.[0]) {
      handleFiles(e?.dataTransfer?.files);
    }
  };

  const handleFiles = (files) => {
    const newImages = Array.from(files)?.map((file, index) => ({
      id: Date.now() + index,
      file: file,
      preview: URL.createObjectURL(file),
      previewAlt: `Uploaded portfolio image showing ${file?.name?.split('.')?.[0]} work sample`,
      tags: [],
      technique: '',
      material: '',
      projectType: '',
      hash: `hash_${Date.now()}_${index}`
    }));
    onImagesAdd(newImages);
  };

  const handleFileInput = (e) => {
    if (e?.target?.files && e?.target?.files?.[0]) {
      handleFiles(e?.target?.files);
    }
  };

  const handleCameraCapture = (e) => {
    if (e?.target?.files && e?.target?.files?.[0]) {
      handleFiles(e?.target?.files);
    }
  };

  const openEditModal = (image) => {
    setEditingImage(image);
  };

  const closeEditModal = () => {
    setEditingImage(null);
  };

  const handleMetadataUpdate = (field, value) => {
    if (editingImage) {
      const updatedImage = { ...editingImage, [field]: value };
      setEditingImage(updatedImage);
    }
  };

  const saveMetadata = () => {
    if (editingImage) {
      onImageUpdate(editingImage?.id, editingImage);
      closeEditModal();
    }
  };

  const addTag = (tag) => {
    if (editingImage && tag?.trim() && !editingImage?.tags?.includes(tag?.trim())) {
      const updatedImage = { ...editingImage, tags: [...editingImage?.tags, tag?.trim()] };
      setEditingImage(updatedImage);
    }
  };

  const removeTag = (tagToRemove) => {
    if (editingImage) {
      const updatedImage = { ...editingImage, tags: editingImage?.tags?.filter(tag => tag !== tagToRemove) };
      setEditingImage(updatedImage);
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-heading font-semibold text-foreground">Portfolyo Yükleme</h3>
        <span className="text-sm text-muted-foreground">{portfolioImages?.length} fotoğraf</span>
      </div>
      <div
        className={`border-2 border-dashed rounded-lg p-8 text-center transition-all duration-150 ${
          dragActive ? 'border-primary bg-primary/5' : 'border-border bg-muted/30'
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <Icon name="Upload" size={48} color="var(--color-muted-foreground)" className="mx-auto mb-4" />
        <p className="text-foreground font-medium mb-2">Fotoğrafları buraya sürükleyin</p>
        <p className="text-sm text-muted-foreground mb-4">veya</p>
        
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button
            variant="outline"
            iconName="FolderOpen"
            iconPosition="left"
            onClick={() => fileInputRef?.current?.click()}
          >
            Galeriden Seç
          </Button>
          <Button
            variant="outline"
            iconName="Camera"
            iconPosition="left"
            onClick={() => cameraInputRef?.current?.click()}
          >
            Fotoğraf Çek
          </Button>
        </div>

        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept="image/*"
          onChange={handleFileInput}
          className="hidden"
        />
        <input
          ref={cameraInputRef}
          type="file"
          accept="image/*"
          capture="environment"
          onChange={handleCameraCapture}
          className="hidden"
        />

        <p className="text-xs text-muted-foreground mt-4">PNG, JPG, JPEG (Maks. 10MB)</p>
      </div>
      {portfolioImages?.length > 0 && (
        <div className="mt-6">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {portfolioImages?.map((image) => (
              <div key={image?.id} className="relative group">
                <div className="aspect-square rounded-lg overflow-hidden bg-muted">
                  <Image
                    src={image?.preview}
                    alt={image?.previewAlt}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <div className="absolute inset-0 bg-foreground/60 opacity-0 group-hover:opacity-100 transition-opacity duration-150 rounded-lg flex items-center justify-center gap-2">
                  <Button
                    variant="secondary"
                    size="icon"
                    iconName="Edit"
                    onClick={() => openEditModal(image)}
                  />
                  <Button
                    variant="destructive"
                    size="icon"
                    iconName="Trash2"
                    onClick={() => onImageRemove(image?.id)}
                  />
                </div>

                {image?.tags?.length > 0 && (
                  <div className="absolute bottom-2 left-2 right-2">
                    <div className="bg-foreground/80 backdrop-blur-sm rounded px-2 py-1">
                      <p className="text-xs text-background truncate">{image?.tags?.join(', ')}</p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
      <div className="mt-4 p-3 bg-accent/10 rounded-lg">
        <p className="text-sm text-foreground flex items-start">
          <Icon name="Info" size={16} className="mr-2 mt-0.5 flex-shrink-0" color="var(--color-accent)" />
          <span>Yüksek kaliteli iş fotoğrafları işverenlerin size güvenini artırır. Her fotoğrafa etiket ekleyerek daha iyi eşleşme sağlayabilirsiniz.</span>
        </p>
      </div>
      {editingImage && (
        <div className="fixed inset-0 bg-foreground/50 flex items-center justify-center z-50 p-4">
          <div className="bg-card rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-border flex items-center justify-between">
              <h3 className="text-lg font-heading font-semibold text-foreground">Fotoğraf Detayları</h3>
              <Button variant="ghost" size="icon" iconName="X" onClick={closeEditModal} />
            </div>

            <div className="p-6 space-y-4">
              <div className="aspect-video rounded-lg overflow-hidden bg-muted">
                <Image
                  src={editingImage?.preview}
                  alt={editingImage?.previewAlt}
                  className="w-full h-full object-contain"
                />
              </div>

              <Input
                label="Teknik"
                placeholder="Örn: TIG Kaynağı, CNC Torna"
                value={editingImage?.technique}
                onChange={(e) => handleMetadataUpdate('technique', e?.target?.value)}
              />

              <Input
                label="Malzeme"
                placeholder="Örn: Paslanmaz Çelik, Alüminyum"
                value={editingImage?.material}
                onChange={(e) => handleMetadataUpdate('material', e?.target?.value)}
              />

              <Input
                label="Proje Tipi"
                placeholder="Örn: Endüstriyel Makine Parçası, Özel İmalat"
                value={editingImage?.projectType}
                onChange={(e) => handleMetadataUpdate('projectType', e?.target?.value)}
              />

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Etiketler</label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {editingImage?.tags?.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center gap-1 px-3 py-1 bg-primary/10 text-primary rounded-full text-sm"
                    >
                      {tag}
                      <button onClick={() => removeTag(tag)} className="hover:text-primary/80">
                        <Icon name="X" size={14} />
                      </button>
                    </span>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Input
                    placeholder="Etiket ekle ve Enter'a bas"
                    onKeyPress={(e) => {
                      if (e?.key === 'Enter') {
                        addTag(e?.target?.value);
                        e.target.value = '';
                      }
                    }}
                  />
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-border flex justify-end gap-3">
              <Button variant="outline" onClick={closeEditModal}>İptal</Button>
              <Button variant="default" onClick={saveMetadata}>Kaydet</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PortfolioUpload;