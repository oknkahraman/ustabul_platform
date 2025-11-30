const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('../models/User.model');
const EmployerProfile = require('../models/EmployerProfile.model');
const WorkerProfile = require('../models/WorkerProfile.model');
const Job = require('../models/Job.model');

dotenv?.config();

// Turkish cities and districts
const locations = [
  { city: 'İstanbul', districts: ['Kadıköy', 'Beşiktaş', 'Şişli', 'Üsküdar', 'Bakırköy'] },
  { city: 'Ankara', districts: ['Çankaya', 'Keçiören', 'Yenimahalle', 'Mamak', 'Etimesgut'] },
  { city: 'İzmir', districts: ['Konak', 'Karşıyaka', 'Bornova', 'Buca', 'Alsancak'] }
];

// Skills for workers
const skillCategories = [
  'Elektrik', 'Tesisat', 'Boya Badana', 'Marangozluk', 'Döşeme',
  'Klima Montaj', 'Tadilat', 'Dekorasyon', 'Cam Balkon', 'Alçıpan'
];

// Company names for employers
const companyNames = [
  'Yapı İnşaat Ltd.',
  'Ev Tadilat A.Ş.',
  'Profesyonel Tamirat',
  'Güven Yapı',
  'Usta Burada Hizmetleri'
];

// Random helper
const getRandomItem = (arr) => arr?.[Math.floor(Math.random() * arr?.length)];
const getRandomNumber = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

// Clear database
const clearDatabase = async () => {
  await User?.deleteMany({});
  await EmployerProfile?.deleteMany({});
  await WorkerProfile?.deleteMany({});
  await Job?.deleteMany({});
  console.log('✅ Database cleared');
};

// Seed employers
const seedEmployers = async () => {
  const employers = [];
  
  for (let i = 1; i <= 5; i++) {
    const location = getRandomItem(locations);
    const district = getRandomItem(location?.districts);
    
    const user = await User?.create({
      email: `employer${i}@ustabul.com`,
      password: '123456',
      fullName: `İşveren ${i}`,
      role: 'employer',
      isVerified: true
    });

    await EmployerProfile?.create({
      userId: user?._id,
      companyDetails: {
        name: getRandomItem(companyNames) + ` ${i}`,
        taxNumber: `${getRandomNumber(1000000000, 9999999999)}`,
        taxOffice: `${location?.city} Vergi Dairesi`
      },
      location: {
        city: location?.city,
        district: district,
        neighborhood: `${district} Mahallesi`,
        street: `Usta Sokak No:${i}`,
        buildingNo: `${i}`
      },
      industry: getRandomItem(['İnşaat', 'Tadilat', 'Emlak', 'Bakım-Onarım']),
      companySize: getRandomItem(['1-10', '11-50', '51-200']),
      verified: true
    });

    employers?.push(user);
  }

  console.log(`✅ ${employers?.length} employers created`);
  return employers;
};

// Seed workers
const seedWorkers = async () => {
  const workers = [];
  
  for (let i = 1; i <= 10; i++) {
    const location = getRandomItem(locations);
    const district = getRandomItem(location?.districts);
    const workerSkills = [];
    const numSkills = getRandomNumber(2, 4);
    
    for (let j = 0; j < numSkills; j++) {
      const skill = getRandomItem(skillCategories);
      if (!workerSkills?.includes(skill)) {
        workerSkills?.push(skill);
      }
    }

    const user = await User?.create({
      email: `worker${i}@ustabul.com`,
      password: '123456',
      fullName: `Usta ${i}`,
      role: 'worker',
      isVerified: true
    });

    await WorkerProfile?.create({
      userId: user?._id,
      skills: workerSkills,
      experience: getRandomItem(['0-1', '1-3', '3-5', '5-10', '10+']),
      location: {
        city: location?.city,
        district: district,
        neighborhood: `${district} Mahallesi`
      },
      preferences: {
        isAnonymous: false,
        notificationSettings: {
          emailNotifications: true,
          smsNotifications: false,
          newJobAlerts: true
        }
      },
      hourlyRate: getRandomNumber(150, 500),
      availability: 'available',
      completedJobs: getRandomNumber(5, 50),
      rating: {
        average: (Math.random() * 2 + 3)?.toFixed(1), // 3.0 - 5.0
        count: getRandomNumber(5, 30)
      }
    });

    workers?.push(user);
  }

  console.log(`✅ ${workers?.length} workers created`);
  return workers;
};

// Seed jobs
const seedJobs = async (employers) => {
  const jobTitles = [
    'Evde Elektrik Tamiri',
    'Mutfak Tadilat İşi',
    'Boya Badana İşi',
    'Klima Montajı',
    'Banyo Tadilatı',
    'Parke Döşeme',
    'Alçıpan Tavan',
    'Doğalgaz Tesisatı',
    'Cam Balkon Montajı',
    'Kapı Pencere Değişimi'
  ];

  const jobs = [];

  for (let i = 1; i <= 20; i++) {
    const employer = getRandomItem(employers);
    const location = getRandomItem(locations);
    const district = getRandomItem(location?.districts);
    const requiredSkills = [];
    const numSkills = getRandomNumber(1, 3);
    
    for (let j = 0; j < numSkills; j++) {
      const skill = getRandomItem(skillCategories);
      if (!requiredSkills?.includes(skill)) {
        requiredSkills?.push(skill);
      }
    }

    const job = await Job?.create({
      employerId: employer?._id,
      title: getRandomItem(jobTitles),
      description: `Bu iş için deneyimli usta aranıyor. ${requiredSkills?.join(', ')} konularında tecrübeli olmak gerekmektedir.`,
      location: {
        city: location?.city,
        district: district,
        neighborhood: `${district} Mahallesi`,
        fullAddress: `${district} Mahallesi, Usta Caddesi No:${i}`
      },
      salary: {
        min: getRandomNumber(3000, 5000),
        max: getRandomNumber(5000, 10000)
      },
      skills: requiredSkills,
      status: 'active',
      applicationCount: getRandomNumber(0, 5),
      viewCount: getRandomNumber(10, 100)
    });

    jobs?.push(job);
  }

  console.log(`✅ ${jobs?.length} jobs created`);
  return jobs;
};

// Main seed function
const seedDatabase = async () => {
  try {
    // Connect to MongoDB
    await mongoose?.connect(process.env.MONGODB_URI);
    console.log('✅ MongoDB connected');

    // Clear existing data
    await clearDatabase();

    // Seed data
    const employers = await seedEmployers();
    const workers = await seedWorkers();
    const jobs = await seedJobs(employers);

    console.log('\n🎉 Database seeding completed successfully!');
    console.log('\n📊 Summary:');
    console.log(`   - Employers: ${employers?.length}`);
    console.log(`   - Workers: ${workers?.length}`);
    console.log(`   - Jobs: ${jobs?.length}`);
    console.log('\n🔐 Test Credentials:');
    console.log('   Employer: employer1@ustabul.com / 123456');
    console.log('   Worker: worker1@ustabul.com / 123456');
    console.log('\n📍 Locations: Istanbul, Ankara, İzmir');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

// Run seeder
seedDatabase();