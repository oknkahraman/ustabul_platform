import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

import { applicationsAPI } from '../../../utils/api';
import { useNavigate } from 'react-router-dom';

const ApplicationForm = ({ jobId, onClose }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    coverLetter: '',
    proposedRate: '',
    availableStartDate: '',
    estimatedCompletionTime: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e?.preventDefault();
    
    try {
      setIsSubmitting(true);
      setError('');
      
      const userId = localStorage.getItem('userId');
      if (!userId) {
        throw new Error('Lütfen önce giriş yapın');
      }

      await applicationsAPI?.applyForJob(jobId, {
        workerId: userId,
        ...formData
      });

      alert('Başvurunuz başarıyla gönderildi!');
      onClose();
      navigate('/worker-dashboard');
    } catch (err) {
      console.error('Application error:', err);
      setError(err?.response?.data?.message || 'Başvuru gönderilemedi');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="bg-error/10 border border-error/20 rounded-lg p-3">
          <p className="text-error text-sm">{error}</p>
        </div>
      )}

      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-heading font-bold text-foreground">
          Başvuru Yap: {jobId}
        </h2>
        <button
          onClick={onClose}
          className="text-muted-foreground hover:text-foreground transition-colors"
        >
          <Icon name="X" size={24} color="currentColor" />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Ön Yazı / Mesajınız
          </label>
          <textarea
            className="w-full min-h-[120px] px-3 py-2 bg-background border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring text-foreground placeholder:text-muted-foreground resize-y"
            placeholder="Kendinizi tanıtın ve neden bu iş için uygun olduğunuzu açıklayın..."
            value={formData?.coverLetter}
            onChange={(e) =>
              setFormData({ ...formData, coverLetter: e?.target?.value })
            }
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Önerilen Ücret
          </label>
          <input
            type="number"
            className="w-full px-3 py-2 bg-background border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring text-foreground"
            placeholder="Önerilen ücreti girin"
            value={formData?.proposedRate}
            onChange={(e) =>
              setFormData({ ...formData, proposedRate: e?.target?.value })
            }
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Ne zaman başlayabilirsiniz?
          </label>
          <input
            type="date"
            className="w-full px-3 py-2 bg-background border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring text-foreground"
            value={formData?.availableStartDate}
            onChange={(e) =>
              setFormData({ ...formData, availableStartDate: e?.target?.value })
            }
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Tahmini Tamamlanma Süresi
          </label>
          <input
            type="number"
            className="w-full px-3 py-2 bg-background border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring text-foreground"
            placeholder="Günlük saat"
            value={formData?.estimatedCompletionTime}
            onChange={(e) =>
              setFormData({ ...formData, estimatedCompletionTime: e?.target?.value })
            }
            required
          />
        </div>
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-border">
        <Button
          type="button"
          variant="outline"
          onClick={onClose}
          disabled={isSubmitting}
        >
          İptal
        </Button>
        <Button
          type="submit"
          variant="default"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Gönderiliyor...' : 'Başvuruyu Gönder'}
        </Button>
      </div>
    </form>
  );
};

export default ApplicationForm;