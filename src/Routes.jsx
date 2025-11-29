import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import WorkerDashboard from './pages/worker-dashboard';
import LoginRegistration from './pages/login-registration';
import EmployerProfileSetup from './pages/employer-profile-setup';
import WorkerProfileSetup from './pages/worker-profile-setup';
import EmployerDashboard from './pages/employer-dashboard';
import Homepage from './pages/homepage';
import AdminDashboard from './pages/admin-dashboard';

import PortfolioManagement from "pages/portfolio-management";
import RatingReviewSystem from "pages/rating-review-system";
import JobCreation from "pages/job-creation";
import JobDetailView from "pages/job-detail-view";

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<Homepage />} />
        <Route path="/login-registration" element={<LoginRegistration />} />
        <Route path="/worker-profile-setup" element={<WorkerProfileSetup />} />
        <Route path="/employer-profile-setup" element={<EmployerProfileSetup />} />
        <Route path="/employer-dashboard" element={<EmployerDashboard />} />
        <Route path="/worker-dashboard" element={<WorkerDashboard />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/portfolio-management" element={<PortfolioManagement />} />
        <Route path="/rating-review-system" element={<RatingReviewSystem />} />
        <Route path="/job-creation" element={<JobCreation />} />
        <Route path="/job-detail-view" element={<JobDetailView />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;