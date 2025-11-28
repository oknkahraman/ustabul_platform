import React, { useState } from 'react';
import { AlertCircle, FileText, Send } from 'lucide-react';

const DisputeResolution = () => {
  const [showDisputeForm, setShowDisputeForm] = useState(false);

  return (
    <div className="bg-white rounded-lg p-6">
      <div className="flex items-center gap-2 mb-4">
        <AlertCircle size={20} className="text-orange-600" />
        <h2 className="text-lg font-semibold text-gray-900">İtiraz Süreci</h2>
      </div>
      
      {!showDisputeForm ? (
        <>
          <p className="text-sm text-gray-600 mb-4">
            Haksız veya yanlış bir değerlendirme aldığınızı düşünüyorsanız itiraz edebilirsiniz.
          </p>
          
          <div className="space-y-3 mb-4">
            <div className="flex gap-2 text-sm">
              <span className="text-blue-600 font-medium">1.</span>
              <p className="text-gray-600">İtiraz formunu doldurun</p>
            </div>
            <div className="flex gap-2 text-sm">
              <span className="text-blue-600 font-medium">2.</span>
              <p className="text-gray-600">Kanıt belgelerini ekleyin</p>
            </div>
            <div className="flex gap-2 text-sm">
              <span className="text-blue-600 font-medium">3.</span>
              <p className="text-gray-600">Platform ekibi inceler</p>
            </div>
            <div className="flex gap-2 text-sm">
              <span className="text-blue-600 font-medium">4.</span>
              <p className="text-gray-600">48 saat içinde sonuç bildirilir</p>
            </div>
          </div>

          <button
            onClick={() => setShowDisputeForm(true)}
            className="w-full px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors flex items-center justify-center gap-2"
          >
            <FileText size={18} />
            İtiraz Et
          </button>
        </>
      ) : (
        <div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Hangi değerlendirmeye itiraz ediyorsunuz?
            </label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent">
              <option>Ofis Elektrik Tesisatı - Mehmet Yılmaz</option>
              <option>Bahçe Düzenlemesi - Ayşe Kaya</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              İtiraz Nedeniniz
            </label>
            <textarea
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              placeholder="Lütfen itiraz nedeninizi detaylı olarak açıklayın..."
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Kanıt Belgeleri (İsteğe Bağlı)
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
              <FileText size={32} className="mx-auto text-gray-400 mb-2" />
              <p className="text-xs text-gray-600">
                İtirazınızı destekleyen belgeler ekleyin
              </p>
              <button className="mt-2 text-sm text-blue-600 hover:text-blue-700">
                Dosya Seç
              </button>
            </div>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => setShowDisputeForm(false)}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              İptal
            </button>
            <button className="flex-1 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors flex items-center justify-center gap-2">
              <Send size={18} />
              Gönder
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DisputeResolution;