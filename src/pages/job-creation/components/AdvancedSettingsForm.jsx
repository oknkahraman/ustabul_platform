import React, { useState } from 'react';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';
import Icon from '../../../components/AppIcon';

const AdvancedSettingsForm = ({ data, onUpdate }) => {
  const [newQuestion, setNewQuestion] = useState('');

  const handleChange = (field, value) => {
    onUpdate?.({ [field]: value });
  };

  const handleAddQuestion = () => {
    if (newQuestion?.trim()) {
      const currentQuestions = data?.screeningQuestions || [];
      onUpdate?.({ screeningQuestions: [...currentQuestions, newQuestion?.trim()] });
      setNewQuestion('');
    }
  };

  const handleRemoveQuestion = (questionToRemove) => {
    const updatedQuestions = (data?.screeningQuestions || [])?.filter(
      (q) => q !== questionToRemove
    );
    onUpdate?.({ screeningQuestions: updatedQuestions });
  };

  const suggestedQuestions = [
    'Daha önce benzer projelerde çalıştınız mı?',
    'Kendi ekipmanınız var mı?',
    'Ne zaman başlayabilirsiniz?',
    'Uzun süreli projeler için uygun musunuz?',
    'İlgili sertifikalarınız var mı?'
  ];

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-foreground mb-2">
          Başvuru Son Tarihi
        </label>
        <Input
          type="date"
          value={data?.applicationDeadline || ''}
          onChange={(e) => handleChange('applicationDeadline', e?.target?.value)}
        />
        <p className="text-xs text-muted-foreground mt-1">
          Belirtilmezse ilanınız süresiz açık kalır
        </p>
      </div>
      <div>
        <label className="block text-sm font-medium text-foreground mb-2">
          İşçi Kapasitesi
        </label>
        <Input
          type="number"
          min="1"
          max="50"
          placeholder="Kaç işçi alacaksınız?"
          value={data?.workerCapacity || 1}
          onChange={(e) => handleChange('workerCapacity', parseInt(e?.target?.value) || 1)}
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-foreground mb-2">
          Ön Eleme Soruları
        </label>
        <div className="flex gap-2 mb-3">
          <Input
            type="text"
            placeholder="Başvurularda sorulacak soru ekleyin"
            value={newQuestion}
            onChange={(e) => setNewQuestion(e?.target?.value)}
            onKeyPress={(e) => {
              if (e?.key === 'Enter') {
                e?.preventDefault();
                handleAddQuestion();
              }
            }}
          />
          <Button
            variant="outline"
            iconName="Plus"
            onClick={handleAddQuestion}
          >
            Ekle
          </Button>
        </div>

        {data?.screeningQuestions?.length > 0 && (
          <div className="space-y-2 mb-3">
            {data?.screeningQuestions?.map((question, index) => (
              <div
                key={index}
                className="flex items-start justify-between gap-2 p-3 bg-muted rounded-lg"
              >
                <p className="text-sm text-foreground flex-1">{index + 1}. {question}</p>
                <button
                  onClick={() => handleRemoveQuestion(question)}
                  className="text-error hover:text-error/80 transition-colors"
                >
                  <Icon name="X" size={16} color="currentColor" />
                </button>
              </div>
            ))}
          </div>
        )}

        <div className="bg-muted rounded-lg p-3">
          <p className="text-xs font-medium text-foreground mb-2">Önerilenler:</p>
          <div className="space-y-1">
            {suggestedQuestions?.map((suggestion, index) => (
              <button
                key={index}
                onClick={() => setNewQuestion(suggestion)}
                className="block w-full text-left px-2 py-1 text-xs text-foreground hover:bg-background rounded transition-colors"
              >
                + {suggestion}
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <Checkbox
            id="portfolioRequired"
            checked={data?.portfolioRequired || false}
            onCheckedChange={(checked) => handleChange('portfolioRequired', checked)}
          />
          <label
            htmlFor="portfolioRequired"
            className="text-sm font-medium text-foreground cursor-pointer"
          >
            Başvurularda portfolyo zorunlu
          </label>
        </div>

        {data?.portfolioRequired && (
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Portfolyo Talimatları
            </label>
            <textarea
              className="w-full min-h-[80px] px-3 py-2 bg-background border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring text-foreground placeholder:text-muted-foreground resize-y"
              placeholder="Portfolyoda görmek istediğiniz çalışma örneklerini belirtin..."
              value={data?.portfolioInstructions || ''}
              onChange={(e) => handleChange('portfolioInstructions', e?.target?.value)}
            />
          </div>
        )}
      </div>
      <div className="bg-info/10 border border-info rounded-lg p-4">
        <div className="flex items-start gap-3">
          <div className="text-info mt-0.5">🎯</div>
          <div className="text-sm text-info-foreground">
            <p className="font-medium mb-1">Başvuru Kalitesini Artırın:</p>
            <p>
              Ön eleme soruları ve portfolyo gereksinimleri, size uygun işçilerle
              eşleşme şansınızı artırır ve zaman kazandırır.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdvancedSettingsForm;