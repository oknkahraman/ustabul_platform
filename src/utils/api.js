import axios from 'axios';

// Backend API base URL - Update this with your VPS URL
const API_BASE_URL = import.meta.env?.VITE_API_BASE_URL || 'http://localhost:5000/api';

// Log API configuration in development
if (import.meta.env?.DEV) {
  console.log('🔧 API Configuration:', {
    baseURL: API_BASE_URL,
    environment: import.meta.env?.MODE
  });
}

// Create axios instance with default config
const api = axios?.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 second timeout
});

// Request interceptor to add auth token
api?.interceptors?.request?.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    // Log request in development
    if (import.meta.env?.DEV) {
      console.log(`📡 ${config?.method?.toUpperCase()} ${config?.url}`, {
        data: config?.data,
        params: config?.params
      });
    }
    
    return config;
  },
  (error) => {
    console.error('❌ Request interceptor error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api?.interceptors?.response?.use(
  (response) => {
    // Log successful response in development
    if (import.meta.env?.DEV) {
      console.log(`✅ Response from ${response?.config?.url}:`, response?.data);
    }
    return response;
  },
  (error) => {
    // Enhanced error logging
    if (import.meta.env?.DEV) {
      console.group('❌ API Error Details');
      console.error('Error:', error?.message);
      console.error('Config:', error?.config);
      console.error('Response:', error?.response);
      console.error('Request:', error?.request);
      console.groupEnd();
    }

    if (error?.response?.status === 401) {
      // Handle unauthorized - redirect to login
      localStorage.removeItem('authToken');
      localStorage.removeItem('userRole');
      localStorage.removeItem('userId');
      
      // Only redirect if not already on login page
      if (!window.location?.pathname?.includes('login-registration')) {
        window.location.href = '/login-registration';
      }
    }
    
    // Add user-friendly error message
    if (!error?.response && error?.request) {
      error.isConnectionError = true;
      error.userMessage = 'Backend sunucusuna bağlanılamıyor. Lütfen sunucunun çalıştığından emin olun.';
    }
    
    return Promise.reject(error);
  }
);

// Auth API calls
export const authAPI = {
  register: (data) => api?.post('/auth/register', data),
  login: (data) => api?.post('/auth/login', data),
  logout: () => api?.post('/auth/logout'),
  getCurrentUser: () => api?.get('/auth/me'),
};

// Jobs API calls
export const jobsAPI = {
  createJob: (data) => api?.post('/jobs', data),
  getAllJobs: (filters) => api?.get('/jobs', { params: filters }),
  getJobById: (id) => api?.get(`/jobs/${id}`),
  updateJob: (id, data) => api?.put(`/jobs/${id}`, data),
  deleteJob: (id) => api?.delete(`/jobs/${id}`),
  closeJob: (id) => api?.patch(`/jobs/${id}/close`),
};

// Applications API calls
export const applicationsAPI = {
  applyForJob: (jobId, data) => api?.post(`/jobs/${jobId}/apply`, data),
  getApplicationsByJob: (jobId) => api?.get(`/jobs/${jobId}/applications`),
  getApplicationsByWorker: (workerId) => api?.get(`/workers/${workerId}/applications`),
  approveApplication: (applicationId) => api?.patch(`/applications/${applicationId}/approve`),
  rejectApplication: (applicationId, reason) => 
    api?.patch(`/applications/${applicationId}/reject`, { reason }),
  getApplicationById: (id) => api?.get(`/applications/${id}`),
};

// Workers API calls
export const workersAPI = {
  getWorkerProfile: (id) => api?.get(`/workers/${id}`),
  updateWorkerProfile: (id, data) => api?.put(`/workers/${id}`, data),
  getWorkerPortfolio: (id) => api?.get(`/workers/${id}/portfolio`),
  uploadPortfolioItem: (id, data) => api?.post(`/workers/${id}/portfolio`, data),
};

// Employers API calls
export const employersAPI = {
  getEmployerProfile: (id) => api?.get(`/employers/${id}`),
  updateEmployerProfile: (id, data) => api?.put(`/employers/${id}`, data),
  getDashboardStats: (id) => api?.get(`/employers/${id}/stats`),
};

// Reviews API calls
export const reviewsAPI = {
  createReview: (data) => api?.post('/reviews', data),
  getReviewsByWorker: (workerId) => api?.get(`/workers/${workerId}/reviews`),
  getReviewsByEmployer: (employerId) => api?.get(`/employers/${employerId}/reviews`),
};

export default api;