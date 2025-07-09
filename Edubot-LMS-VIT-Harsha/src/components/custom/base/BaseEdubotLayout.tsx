import React from 'react';
import { Outlet } from '@tanstack/react-router';
import BaseEdubotHeader from './BaseEdubotHeader';
import BaseEdubotSidebar from './BaseEdubotSidebar';
import BreadcrumbSection from './BreadcrumbSection';

const BaseEdubotLayout: React.FC = () => {
  return (
    <div className="tw-relative tw-min-h-screen">
      <BaseEdubotHeader />
      <BaseEdubotSidebar />
      <BreadcrumbSection />

      <main className="tw-pt-[107px] tw-pl-[217px] tw-pr-4 tw-pb-4 tw-bg-gray-50 min-h-screen">
        <Outlet />
      </main>
    </div>
  );
};

export default BaseEdubotLayout;
