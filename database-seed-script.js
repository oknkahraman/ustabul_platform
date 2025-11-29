const mongoose = require('mongoose');
const User = require('./src/models/User');
const Job = require('./src/models/Job');
const WorkerProfile = require('./src/models/WorkerProfile');
const EmployerProfile = require('./src/models/EmployerProfile');
const Application = require('./src/models/Application');
require('dotenv')?.config();

// Türkiye'deki başlıca şehirler ve ilçeler
const locations = {
  'İstanbul': ['Kadıköy', 'Beşiktaş', 'Şişli', 'Üsküdar', 'Beyoğlu', 'Sarıyer', 'Ataşehir', 'Maltepe'],
  'Ankara': ['Çankaya', 'Keçiören', 'Yenimahalle', 'Mamak', 'Etimesgut', 'Sincan'],
  'İzmir': ['Konak', 'Karşıyaka', 'Bornova', 'Buca', 'Balçova', 'Alsancak'],
  'Bursa': ['Osmangazi', 'Nilüfer', 'Yıldırım', 'Gemlik', 'Mudanya'],
  'Antalya': ['Muratpaşa', 'Kepez', 'Konyaaltı', 'Alanya', 'Manavgat']
};

// Meslekler ve kategoriler
const skillCategories = [
  {
    category: 'İnşaat',
    skills: ['Duvar Ustası', 'Boya Badana', 'Sıva', 'Fayans Döşeme', 'Çatı İşleri', 'Demir Doğrama']
  },
  {
    category: 'Elektrik',
    skills: ['Ev Elektrikleri', 'Pano Montajı', 'Aydınlatma', 'Sigorta Sistemleri', 'Akıllı Ev Sistemleri']
  },
  {
    category: 'Tesisat',
    skills: ['Su Tesisatı', 'Kalorifer', 'Kombi', 'Klima', 'Doğalgaz', 'Sıhhi Tesisat']
  },
  {
    category: 'Marangozluk',
    skills: ['Mobilya Yapımı', 'Dolap Montajı', 'Kapı-Pencere', 'Ahşap İşleri', 'Mutfak Dolabı']
  },
  {
    category: 'Tamir',
    skills: ['Beyaz Eşya Tamiri', 'Elektronik Tamir', 'Bilgisayar Tamiri', 'Cep Telefonu Tamiri']
  }
];

// Örnek kullanıcılar oluştur
async function createUsers() {
  console.log('Creating users...');
  
  const users = [];
  
  // 10 işçi kullanıcısı oluştur
  for (let i = 1; i <= 10; i++) {
    const workerCities = Object.keys(locations);
    const city = workerCities?.[Math.floor(Math.random() * workerCities?.length)];
    
    const user = await User?.create({
      email: `usta${i}@test.com`,
      password: 'test123456',
      fullName: `Usta ${i} Test`,
      role: 'worker'
    });
    
    users?.push(user);
    
    // Worker profile oluştur
    const randomCategory = skillCategories?.[Math.floor(Math.random() * skillCategories?.length)];
    const skills = randomCategory?.skills?.slice(0, 3)?.map(skill => ({
      category: randomCategory?.category,
      name: skill,
      level: ['intermediate', 'advanced', 'expert']?.[Math.floor(Math.random() * 3)]
    }));
    
    await WorkerProfile?.create({
      userId: user?._id,
      skills,
      experience: {
        years: Math.floor(Math.random() * 15) + 1,
        description: `${randomCategory?.category} alanında ${Math.floor(Math.random() * 15) + 1} yıllık deneyim`
      },
      location: {
        city,
        district: locations?.[city]?.[Math.floor(Math.random() * locations?.[city]?.length)]
      },
      availability: ['available', 'busy']?.[Math.floor(Math.random() * 2)],
      rating: {
        average: (Math.random() * 2 + 3)?.toFixed(1), // 3.0 - 5.0 arası
        count: Math.floor(Math.random() * 50) + 5
      },
      completedJobs: Math.floor(Math.random() * 100) + 10
    });
  }
  
  // 5 işveren kullanıcısı oluştur
  for (let i = 1; i <= 5; i++) {
    const employerCities = Object.keys(locations);
    const city = employerCities?.[Math.floor(Math.random() * employerCities?.length)];
    
    const user = await User?.create({
      email: `isveren${i}@test.com`,
      password: 'test123456',
      fullName: `İşveren ${i} Test`,
      role: 'employer',
      companyName: `${['ABC', 'XYZ', 'Demo', 'Test', 'Pro']?.[i-1]} İnşaat Firması`
    });
    
    users?.push(user);
    
    // Employer profile oluştur
    await EmployerProfile?.create({
      userId: user?._id,
      companyDetails: {
        name: user?.companyName,
        description: 'Profesyonel inşaat ve tadilat hizmetleri',
        industry: ['İnşaat', 'Gayrimenkul', 'Müteahhitlik']?.[Math.floor(Math.random() * 3)],
        size: ['1-10', '11-50', '51-200']?.[Math.floor(Math.random() * 3)]
      },
      location: {
        city,
        district: locations?.[city]?.[Math.floor(Math.random() * locations?.[city]?.length)]
      },
      verification: {
        isVerified: Math.random() > 0.3 // %70 doğrulanmış
      },
      rating: {
        average: (Math.random() * 1.5 + 3.5)?.toFixed(1), // 3.5 - 5.0 arası
        count: Math.floor(Math.random() * 30) + 5
      },
      statistics: {
        jobsPosted: Math.floor(Math.random() * 50) + 10,
        workersHired: Math.floor(Math.random() * 30) + 5
      }
    });
  }
  
  console.log(`✅ ${users?.length} users created`);
  return users;
}

// Örnek iş ilanları oluştur
async function createJobs(users) {
  console.log('Creating jobs...');
  
  const employers = users?.filter(u => u?.role === 'employer');
  const jobs = [];
  
  const jobTemplates = [
    {
      title: 'Ev Tadilat İşi',
      description: 'Dairemizde genel tadilat yapılacak. Boya badana, elektrik ve tesisat işleri dahil.',
      skills: ['Boya Badana', 'Elektrik', 'Tesisat']
    },
    {
      title: 'Banyo Yenileme',
      description: 'Banyo tamamen yenilenecek. Fayans, seramik, sıhhi tesisat işleri.',
      skills: ['Fayans Döşeme', 'Sıhhi Tesisat', 'Su Tesisatı']
    },
    {
      title: 'Mutfak Dolabı Montajı',
      description: 'Hazır mutfak dolabı montajı yapılacak. Ölçüm ve montaj dahil.',
      skills: ['Mobilya Yapımı', 'Mutfak Dolabı', 'Marangozluk']
    },
    {
      title: 'Daire Boyası',
      description: '120 m² daire boyası yapılacak. Malzeme işveren tarafından sağlanacak.',
      skills: ['Boya Badana']
    },
    {
      title: 'Klima Montajı',
      description: '3 adet klima montajı yapılacak. Hızlı ve profesyonel çalışma gerekli.',
      skills: ['Klima', 'Tesisat']
    },
    {
      title: 'Elektrik Tesisatı Yenileme',
      description: 'Eski binanın elektrik tesisatı komple yenilenecek.',
      skills: ['Ev Elektrikleri', 'Pano Montajı']
    },
    {
      title: 'Çatı Onarımı',
      description: 'Villa çatısında sızıntı onarımı ve izolasyon işi.',
      skills: ['Çatı İşleri', 'İzolasyon']
    },
    {
      title: 'Parke Döşeme',
      description: 'Salon ve yatak odalarına laminat parke döşenecek.',
      skills: ['Zemin Kaplama', 'Parke']
    }
  ];
  
  // Her işveren için 3-5 iş ilanı oluştur
  for (const employer of employers) {
    const numJobs = Math.floor(Math.random() * 3) + 3;
    
    for (let i = 0; i < numJobs; i++) {
      const template = jobTemplates?.[Math.floor(Math.random() * jobTemplates?.length)];
      const citiesArray = Object.keys(locations);
      const city = citiesArray?.[Math.floor(Math.random() * citiesArray?.length)];
      const district = locations?.[city]?.[Math.floor(Math.random() * locations?.[city]?.length)];
      
      const job = await Job?.create({
        employerId: employer?._id,
        title: template?.title,
        description: template?.description,
        location: {
          city,
          district,
          address: `${district}, ${city}`
        },
        salary: {
          min: Math.floor(Math.random() * 5000) + 3000, // 3000-8000 TL
          max: Math.floor(Math.random() * 7000) + 8000, // 8000-15000 TL
          currency: 'TRY'
        },
        skills: template?.skills,
        requirements: {
          experience: `${Math.floor(Math.random() * 5) + 1} yıl deneyim`,
          education: 'Lise',
          certifications: []
        },
        projectDetails: {
          duration: `${Math.floor(Math.random() * 20) + 5} gün`,
          startDate: new Date(Date.now() + Math.random() * 30 * 24 * 60 * 60 * 1000), // 0-30 gün içinde
          workType: ['full-time', 'part-time', 'contract']?.[Math.floor(Math.random() * 3)]
        },
        status: ['active', 'active', 'active', 'draft']?.[Math.floor(Math.random() * 4)], // %75 aktif
        applicationCount: 0
      });
      
      jobs?.push(job);
    }
  }
  
  console.log(`✅ ${jobs?.length} jobs created`);
  return jobs;
}

// Örnek başvurular oluştur
async function createApplications(users, jobs) {
  console.log('Creating applications...');
  
  const workers = users?.filter(u => u?.role === 'worker');
  const activeJobs = jobs?.filter(j => j?.status === 'active');
  const applications = [];
  
  // Her aktif iş için 2-5 başvuru oluştur
  for (const job of activeJobs) {
    const numApplications = Math.floor(Math.random() * 4) + 2;
    const selectedWorkers = workers?.sort(() => 0.5 - Math.random())?.slice(0, numApplications);
    
    for (const worker of selectedWorkers) {
      const application = await Application?.create({
        jobId: job?._id,
        workerId: worker?._id,
        status: ['pending', 'pending', 'pending', 'approved', 'rejected']?.[Math.floor(Math.random() * 5)],
        coverLetter: `${job?.title} için başvuruyorum. İlgili alanda deneyimliyim ve kaliteli iş çıkarırım.`,
        proposedSalary: job?.salary?.min + Math.floor(Math.random() * (job?.salary?.max - job?.salary?.min)),
        availability: {
          startDate: new Date(Date.now() + Math.random() * 7 * 24 * 60 * 60 * 1000) // 0-7 gün içinde
        }
      });
      
      applications?.push(application);
      
      // Job application count'u güncelle
      await Job?.findByIdAndUpdate(job?._id, {
        $inc: { applicationCount: 1 }
      });
    }
  }
  
  console.log(`✅ ${applications?.length} applications created`);
  return applications;
}

// Ana seed fonksiyonu
async function seedDatabase() {
  try {
    console.log('🌱 Starting database seeding...');
    
    // MongoDB'ye bağlan
    await mongoose?.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('✅ Connected to MongoDB');
    
    // Mevcut verileri temizle
    console.log('🧹 Cleaning existing data...');
    await User?.deleteMany({});
    await Job?.deleteMany({});
    await WorkerProfile?.deleteMany({});
    await EmployerProfile?.deleteMany({});
    await Application?.deleteMany({});
    console.log('✅ Database cleaned');
    
    // Verileri oluştur
    const users = await createUsers();
    const jobs = await createJobs(users);
    const applications = await createApplications(users, jobs);
    
    console.log('\n✨ Database seeding completed successfully!');
    console.log('\n📊 Summary:');
    console.log(`- Users: ${users?.length} (10 workers, 5 employers)`);
    console.log(`- Jobs: ${jobs?.length}`);
    console.log(`- Applications: ${applications?.length}`);
    
    console.log('\n🔑 Test Credentials:');
    console.log('Workers: usta1@test.com to usta10@test.com');
    console.log('Employers: isveren1@test.com to isveren5@test.com');
    console.log('Password for all: test123456');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
}

// Script'i çalıştır
seedDatabase();