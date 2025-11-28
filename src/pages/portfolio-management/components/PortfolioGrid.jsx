import React, { useState } from 'react';
import { Eye, Edit2, Trash2, Star, Award, Camera } from 'lucide-react';

const PortfolioGrid = ({ items, viewMode, onDelete }) => {
  const [selectedItem, setSelectedItem] = useState(null);

  const handleEdit = (item) => {
    // Edit functionality placeholder
    console.log('Edit item:', item);
  };

  if (items?.length === 0) {
    return (
      <div className="bg-white rounded-lg p-12 text-center">
        <Camera size={64} className="mx-auto text-gray-300 mb-4" />
        <h3 className="text-xl font-semibold text-gray-900 mb-2">Henüz portfolyo öğesi yok</h3>
        <p className="text-gray-600">İlk iş örneğinizi ekleyerek başlayın</p>
      </div>
    );
  }

  if (viewMode === 'list') {
    return (
      <div className="bg-white rounded-lg divide-y divide-gray-200">
        {items?.map((item) => (
          <div key={item?.id} className="p-4 hover:bg-gray-50 transition-colors">
            <div className="flex gap-4">
              <img 
                src={item?.image} 
                alt={item?.alt}
                className="w-24 h-24 object-cover rounded-lg flex-shrink-0"
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">{item?.title}</h3>
                    <p className="text-sm text-gray-600 mb-2">{item?.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {item?.tags?.map((tag, idx) => (
                        <span key={idx} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleEdit(item)}
                      className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      <Edit2 size={18} />
                    </button>
                    <button
                      onClick={() => onDelete(item?.id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
                <div className="flex items-center gap-4 mt-3 text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <Eye size={16} />
                    <span>{item?.views}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star size={16} className="fill-yellow-400 text-yellow-400" />
                    <span>{item?.rating}</span>
                  </div>
                  {item?.verified && (
                    <div className="flex items-center gap-1 text-blue-600">
                      <Award size={16} />
                      <span>Doğrulanmış</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {items?.map((item) => (
        <div key={item?.id} className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
          <div className="relative group">
            <img 
              src={item?.image} 
              alt={item?.alt}
              className="w-full h-64 object-cover"
            />
            {item?.featured && (
              <div className="absolute top-4 left-4 px-3 py-1 bg-yellow-500 text-white text-sm font-medium rounded-full">
                Öne Çıkan
              </div>
            )}
            <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(item)}
                  className="p-2 bg-white rounded-lg shadow-lg hover:bg-gray-50 transition-colors"
                >
                  <Edit2 size={18} />
                </button>
                <button
                  onClick={() => onDelete(item?.id)}
                  className="p-2 bg-white rounded-lg shadow-lg hover:bg-red-50 text-red-600 transition-colors"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
              <div className="flex items-center gap-2 text-white text-sm">
                <Eye size={16} />
                <span>{item?.views} görüntülenme</span>
                <span className="mx-2">•</span>
                <span>{item?.applications} başvuru</span>
              </div>
            </div>
          </div>
          
          <div className="p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded">
                {item?.category}
              </span>
              <div className="flex items-center gap-1">
                <Star size={16} className="fill-yellow-400 text-yellow-400" />
                <span className="text-sm font-semibold">{item?.rating}</span>
              </div>
            </div>
            
            <h3 className="font-semibold text-gray-900 mb-1">{item?.title}</h3>
            <p className="text-sm text-gray-600 mb-3">{item?.description}</p>
            
            <div className="flex flex-wrap gap-2 mb-3">
              {item?.tags?.map((tag, idx) => (
                <span key={idx} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                  {tag}
                </span>
              ))}
            </div>
            
            <div className="flex items-center justify-between pt-3 border-t border-gray-200">
              <div className="flex items-center gap-2">
                {item?.verified && (
                  <div className="flex items-center gap-1 text-blue-600 text-sm">
                    <Award size={16} />
                    <span>Doğrulanmış</span>
                  </div>
                )}
              </div>
              <div className="text-xs text-gray-500">
                Kalite: %{item?.imageQuality}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PortfolioGrid;