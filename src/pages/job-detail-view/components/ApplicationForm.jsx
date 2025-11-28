import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';
import { Checkbox } from '../../../components/ui/Checkbox';

const ApplicationForm = ({ jobTitle, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    selectedPortfolio: [],
    coverMessage: '',
    availability: '',
    agreedToTerms: false
  });

  const mockPortfolioItems = [
    {
      id: 1,
      title: "Paslanmaz Çelik Tank Kaynağı",
      image: "https://img.rocket.new/generatedImages/rocket_gen_img_1e567f25a-1764276054531.png",
      imageAlt: "Close-up of professional TIG welding work on stainless steel pipe showing clean weld bead and proper penetration",
      category: "TIG Kaynağı"
    },
    {
      id: 2,
      title: "Endüstriyel Çelik Konstrüksiyon",
      image: "https://images.unsplash.com/photo-1709244596060-bf1e732adf79",
      imageAlt: "Industrial welding project showing completed metal framework with multiple weld joints in workshop setting",
      category: "MIG Kaynağı"
    },
    {
      id: 3,
      title: "Metal Mobilya İmalatı",
      image: "https://img.rocket.new/generatedImages/rocket_gen_img_14ad0441a-1764276055083.png",
      imageAlt: "Detailed view of MIG welding on thick steel plate with visible weld pool and protective gas coverage",
      category: "Metal İşleme"
    }
  ];

  const handlePortfolioToggle = (portfolioId) => {
    setFormData((prev) => ({
      ...prev,
      selectedPortfolio: prev?.selectedPortfolio?.includes(portfolioId)
        ? prev?.selectedPortfolio?.filter((id) => id !== portfolioId)
        : [...prev?.selectedPortfolio, portfolioId]
    }));
  };

  const handleSubmit = (e) => {
    e?.preventDefault();
    if (!formData?.agreedToTerms) {
      alert('Lütfen kullanım şartlarını kabul edin');
      return;
    }
    onSubmit?.(formData);
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-card border border-border rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-card border-b border-border p-4 flex items-center justify-between">
          <h2 className="text-xl font-heading font-bold text-foreground">
            Başvuru Yap: {jobTitle}
          </h2>
          <button
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <Icon name="X" size={24} color="currentColor" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium text-foreground mb-3">
              Portfolyo Seçin (En az 1)
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {mockPortfolioItems?.map((item) => (
                <div
                  key={item?.id}
                  onClick={() => handlePortfolioToggle(item?.id)}
                  className={`relative cursor-pointer rounded-lg overflow-hidden border-2 transition-all ${
                    formData?.selectedPortfolio?.includes(item?.id)
                      ? 'border-primary' :'border-border hover:border-primary/50'
                  }`}
                >
                  <img
                    src={item?.image}
                    alt={item?.imageAlt}
                    className="w-full h-32 object-cover"
                  />
                  <div className="p-2 bg-background/95">
                    <p className="text-sm font-medium text-foreground truncate">
                      {item?.title}
                    </p>
                    <p className="text-xs text-muted-foreground">{item?.category}</p>
                  </div>
                  {formData?.selectedPortfolio?.includes(item?.id) && (
                    <div className="absolute top-2 right-2 w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                      <Icon name="Check" size={16} color="var(--color-primary-foreground)" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Ön Yazı / Mesajınız
            </label>
            <textarea
              className="w-full min-h-[120px] px-3 py-2 bg-background border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring text-foreground placeholder:text-muted-foreground resize-y"
              placeholder="Kendinizi tanıtın ve neden bu iş için uygun olduğunuzu açıklayın..."
              value={formData?.coverMessage}
              onChange={(e) =>
                setFormData({ ...formData, coverMessage: e?.target?.value })
              }
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Ne zaman başlayabilirsiniz?
            </label>
            <select
              className="w-full px-3 py-2 bg-background border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring text-foreground"
              value={formData?.availability}
              onChange={(e) =>
                setFormData({ ...formData, availability: e?.target?.value })
              }
              required
            >
              <option value="">Seçin</option>
              <option value="immediately">Hemen</option>
              <option value="1week">1 hafta içinde</option>
              <option value="2weeks">2 hafta içinde</option>
              <option value="1month">1 ay içinde</option>
            </select>
          </div>

          <div className="flex items-start gap-2">
            <Checkbox
              id="terms"
              checked={formData?.agreedToTerms}
              onCheckedChange={(checked) =>
                setFormData({ ...formData, agreedToTerms: checked })
              }
            />
            <label htmlFor="terms" className="text-sm text-muted-foreground cursor-pointer">
              Başvurumla birlikte seçtiğim portfolyo örneklerini ve iletişim bilgilerimi
              işverene göndermeyi kabul ediyorum.
            </label>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-border">
            <Button type="button" variant="outline" onClick={onClose}>
              İptal
            </Button>
            <Button
              type="submit"
              variant="default"
              iconName="Send"
              iconPosition="left"
              disabled={
                formData?.selectedPortfolio?.length === 0 || !formData?.agreedToTerms
              }
            >
              Başvuruyu Gönder
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ApplicationForm;