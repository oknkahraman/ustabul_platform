import React, { useState } from 'react';
import { X, Upload, Image as ImageIcon } from 'lucide-react';

const UploadModal = ({ onClose, onUpload }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'Elektrik',
    tags: [],
    image: null,
    imagePreview: null
  });
  const [dragActive, setDragActive] = useState(false);
  const [tagInput, setTagInput] = useState('');

  const categories = ['Elektrik', 'Boya-Badana', 'Peyzaj', 'Marangoz', 'Tesisat', 'İnşaat', 'Tadilat'];

  const handleImageUpload = (file) => {
    if (file && file?.type?.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({
          ...formData,
          image: file,
          imagePreview: reader?.result
        });
      };
      reader?.readAsDataURL(file);
    }
  };

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
      handleImageUpload(e?.dataTransfer?.files?.[0]);
    }
  };

  const handleAddTag = () => {
    if (tagInput?.trim() && formData?.tags?.length < 5) {
      setFormData({
        ...formData,
        tags: [...formData?.tags, tagInput?.trim()]
      });
      setTagInput('');
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setFormData({
      ...formData,
      tags: formData?.tags?.filter(tag => tag !== tagToRemove)
    });
  };

  const handleSubmit = (e) => {
    e?.preventDefault();
    
    const newItem = {
      id: Date.now(),
      title: formData?.title,
      description: formData?.description,
      image: formData?.imagePreview || 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=400',
      alt: `${formData?.title} - ${formData?.description}`,
      category: formData?.category,
      tags: formData?.tags,
      views: 0,
      applications: 0,
      verified: false,
      rating: 0,
      completedDate: new Date()?.toISOString()?.split('T')?.[0],
      imageQuality: Math.floor(Math.random() * 20) + 80,
      featured: false
    };
    
    onUpload(newItem);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-900">Yeni İş Örneği Ekle</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          {/* Image Upload */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Fotoğraf *
            </label>
            {formData?.imagePreview ? (
              <div className="relative">
                <img 
                  src={formData?.imagePreview} 
                  alt="Preview"
                  className="w-full h-64 object-cover rounded-lg"
                />
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, image: null, imagePreview: null })}
                  className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                >
                  <X size={16} />
                </button>
              </div>
            ) : (
              <div
                className={`border-2 border-dashed rounded-lg p-8 text-center ${
                  dragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
                }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                <Upload size={48} className="mx-auto text-gray-400 mb-4" />
                <p className="text-gray-600 mb-2">Fotoğrafı sürükleyip bırakın veya</p>
                <label className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg cursor-pointer hover:bg-blue-700">
                  <ImageIcon size={20} />
                  Dosya Seç
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => handleImageUpload(e?.target?.files?.[0])}
                  />
                </label>
              </div>
            )}
          </div>

          {/* Title */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              İş Başlığı *
            </label>
            <input
              type="text"
              required
              value={formData?.title}
              onChange={(e) => setFormData({ ...formData, title: e?.target?.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Örn: Ofis Elektrik Tesisatı"
            />
          </div>

          {/* Description */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Açıklama *
            </label>
            <textarea
              required
              value={formData?.description}
              onChange={(e) => setFormData({ ...formData, description: e?.target?.value })}
              rows={3}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="İş detaylarını açıklayın..."
            />
          </div>

          {/* Category */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Kategori *
            </label>
            <select
              required
              value={formData?.category}
              onChange={(e) => setFormData({ ...formData, category: e?.target?.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {categories?.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          {/* Tags */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Etiketler (Maksimum 5)
            </label>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                value={tagInput}
                onChange={(e) => setTagInput(e?.target?.value)}
                onKeyPress={(e) => e?.key === 'Enter' && (e?.preventDefault(), handleAddTag())}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Etiket ekle..."
                disabled={formData?.tags?.length >= 5}
              />
              <button
                type="button"
                onClick={handleAddTag}
                disabled={formData?.tags?.length >= 5}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Ekle
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData?.tags?.map((tag, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-700 rounded-full"
                >
                  {tag}
                  <button
                    type="button"
                    onClick={() => handleRemoveTag(tag)}
                    className="hover:text-blue-900"
                  >
                    <X size={14} />
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              İptal
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Ekle
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UploadModal;