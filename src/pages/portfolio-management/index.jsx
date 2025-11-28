import React, { useState } from 'react';
import { Upload, Eye, Star, TrendingUp, Award, Grid, List } from 'lucide-react';
import PortfolioGrid from './components/PortfolioGrid';
import UploadModal from './components/UploadModal';
import PortfolioAnalytics from './components/PortfolioAnalytics';
import QualityAssessment from './components/QualityAssessment';
import FilterPanel from './components/FilterPanel';

const PortfolioManagement = () => {
  const [viewMode, setViewMode] = useState('grid');
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [portfolioItems, setPortfolioItems] = useState([
  {
    id: 1,
    title: 'Bağ Evi Elektrik Tesisatı',
    description: 'Tam kapsamlı elektrik tesisatı yenileme projesi',
    image: "https://images.unsplash.com/photo-1710678683936-306f9442eec8",
    alt: 'Modern elektrik panosu ve kablolama sistemi',
    category: 'Elektrik',
    tags: ['Tesisat', 'Panel', 'Bakım'],
    views: 245,
    applications: 12,
    verified: true,
    rating: 4.8,
    completedDate: '2025-01-15',
    imageQuality: 95,
    featured: true
  },
  {
    id: 2,
    title: 'Ofis Boyama İşleri',
    description: '500m² ofis alanı iç mekan boyama',
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_1faed0c82-1764307451008.png",
    alt: 'Profesyonel boyalı ofis duvarları ve tavan detayı',
    category: 'Boya-Badana',
    tags: ['İç Mekan', 'Ofis', 'Dekoratif'],
    views: 189,
    applications: 8,
    verified: true,
    rating: 4.9,
    completedDate: '2025-01-10',
    imageQuality: 92,
    featured: false
  },
  {
    id: 3,
    title: 'Bahçe Düzenlemesi',
    description: 'Peyzaj ve sulama sistemi kurulumu',
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_1fd2290a7-1764307452494.png",
    alt: 'Düzenlenmiş bahçe alanı ve bitki dizaynı',
    category: 'Peyzaj',
    tags: ['Bahçe', 'Sulama', 'Tasarım'],
    views: 312,
    applications: 15,
    verified: true,
    rating: 5.0,
    completedDate: '2025-01-05',
    imageQuality: 98,
    featured: true
  },
  {
    id: 4,
    title: 'Mutfak Dolabı Montajı',
    description: 'Özel tasarım mutfak dolap sistemi',
    image: "https://images.unsplash.com/photo-1611095210561-67f0832b1ca3",
    alt: 'Modern mutfak dolap sistemi ve granit tezgah',
    category: 'Marangoz',
    tags: ['Mutfak', 'Dolap', 'Montaj'],
    views: 267,
    applications: 10,
    verified: false,
    rating: 4.7,
    completedDate: '2024-12-20',
    imageQuality: 88,
    featured: false
  }]
  );

  const categories = ['Tümü', 'Elektrik', 'Boya-Badana', 'Peyzaj', 'Marangoz', 'Tesisat'];

  const stats = {
    totalViews: portfolioItems?.reduce((sum, item) => sum + item?.views, 0),
    totalApplications: portfolioItems?.reduce((sum, item) => sum + item?.applications, 0),
    averageRating: (portfolioItems?.reduce((sum, item) => sum + item?.rating, 0) / portfolioItems?.length)?.toFixed(1),
    verificationRate: Math.round(portfolioItems?.filter((item) => item?.verified)?.length / portfolioItems?.length * 100)
  };

  const handleUpload = (newItem) => {
    setPortfolioItems([newItem, ...portfolioItems]);
    setShowUploadModal(false);
  };

  const handleDelete = (id) => {
    setPortfolioItems(portfolioItems?.filter((item) => item?.id !== id));
  };

  const filteredItems = selectedFilter === 'all' ?
  portfolioItems :
  portfolioItems?.filter((item) => item?.category?.toLowerCase() === selectedFilter?.toLowerCase());

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Portfolyo Yönetimi</h1>
              <p className="text-gray-600 mt-1">İşlerinizi sergileyin ve fırsatları artırın</p>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowUploadModal(true)}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">

                <Upload size={20} />
                <span className="hidden sm:inline">Yeni Ekle</span>
              </button>
              <div className="flex items-center gap-2 bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded ${viewMode === 'grid' ? 'bg-white shadow' : ''}`}>

                  <Grid size={20} />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded ${viewMode === 'list' ? 'bg-white shadow' : ''}`}>

                  <List size={20} />
                </button>
              </div>
            </div>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            <div className="bg-blue-50 rounded-lg p-4">
              <div className="flex items-center gap-2 text-blue-600 mb-1">
                <Eye size={20} />
                <span className="text-sm font-medium">Görüntülenme</span>
              </div>
              <p className="text-2xl font-bold text-gray-900">{stats?.totalViews}</p>
            </div>
            <div className="bg-green-50 rounded-lg p-4">
              <div className="flex items-center gap-2 text-green-600 mb-1">
                <TrendingUp size={20} />
                <span className="text-sm font-medium">Başvuru</span>
              </div>
              <p className="text-2xl font-bold text-gray-900">{stats?.totalApplications}</p>
            </div>
            <div className="bg-yellow-50 rounded-lg p-4">
              <div className="flex items-center gap-2 text-yellow-600 mb-1">
                <Star size={20} />
                <span className="text-sm font-medium">Ort. Puan</span>
              </div>
              <p className="text-2xl font-bold text-gray-900">{stats?.averageRating}</p>
            </div>
            <div className="bg-purple-50 rounded-lg p-4">
              <div className="flex items-center gap-2 text-purple-600 mb-1">
                <Award size={20} />
                <span className="text-sm font-medium">Doğrulama</span>
              </div>
              <p className="text-2xl font-bold text-gray-900">%{stats?.verificationRate}</p>
            </div>
          </div>
        </div>
      </div>
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar - Filters & Analytics */}
          <div className="lg:col-span-1">
            <FilterPanel
              categories={categories}
              selectedFilter={selectedFilter}
              onFilterChange={setSelectedFilter} />

            <QualityAssessment items={portfolioItems} />
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-3">
            <PortfolioAnalytics items={filteredItems} />
            <PortfolioGrid
              items={filteredItems}
              viewMode={viewMode}
              onDelete={handleDelete} />

          </div>
        </div>
      </div>
      {/* Upload Modal */}
      {showUploadModal &&
      <UploadModal
        onClose={() => setShowUploadModal(false)}
        onUpload={handleUpload} />

      }
    </div>);

};

export default PortfolioManagement;