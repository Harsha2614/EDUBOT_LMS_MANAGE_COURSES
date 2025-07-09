import React from 'react';
import { Bell } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import BreadcrumbSection from './BreadcrumbSection';
import { useRouterState } from '@tanstack/react-router';

const BaseEdubotHeader: React.FC = () => {
  const { location } = useRouterState();
  const path = location.pathname.toLowerCase();

  const showAddCoursesHeading = path === '/manage-courses/addcourse';
  const showManageCoursesHeading = path === '/manage-courses' || path === '/manage-courses/';
  const showAddMaterialsHeading = path === '/manage-courses/add/addmaterials';
  const showHomeHeading = path === '/';
  const showCloneHeading = path === '/manage-courses/clone';

  const headingText =
    (showHomeHeading && 'Home') ||
    (showManageCoursesHeading && 'Manage Courses') ||
    (showAddCoursesHeading && 'Add Courses') ||
    (showAddMaterialsHeading && 'Add Modules/Materials') ||
    (showCloneHeading && 'Add Courses') ||
    '';

  return (
    <header className="tw-fixed tw-top-0 tw-left-0 tw-z-50 tw-w-full tw-bg-secondary tw-border-b tw-text-primary">
      {/* Top Bar */}
      <div className="tw-flex tw-items-center tw-justify-between tw-px-4 sm:tw-px-6 tw-py-2.5 lg:tw-py-2.5">
        <div className="tw-flex tw-items-center tw-gap-3 sm:tw-gap-4">
          <img src="/edubot_logo.svg" alt="Logo" className="tw-h-8" />
          <Separator orientation="vertical" className="tw-w-[2px] tw-h-8 tw-bg-primary" />
          <div className="tw-text-sm md:tw-text-base tw-font-medium tw-hidden sm:tw-block">
            Hello Kranthi, Welcome to Edubot LMS Platform
          </div>
        </div>

        <div className="tw-flex tw-items-center tw-gap-3 sm:tw-gap-4">
          <Bell className="tw-w-5 tw-h-5 sm:tw-w-6 sm:tw-h-6" />
          <Avatar className="tw-w-8 tw-h-8">
            <AvatarImage src="https://github.com/shadcn.png" alt="User" />
            <AvatarFallback>KR</AvatarFallback>
          </Avatar>
        </div>
      </div>

      {/* Breadcrumb and Heading Bar */}
      <div
        className="tw-bg-white tw-w-full tw-z-40 tw-px-4 tw-py-3 tw-flex tw-items-center tw-flex-wrap tw-gap-2
                   lg:tw-absolute lg:tw-left-[217px] lg:tw-right-0 lg:tw-top-[52px] lg:tw-px-6
                   lg:tw-py-5 xl:tw-py-4"
      >
        <div className="tw-font-medium tw-text-[10px] tw-font-['Montserrat'] tw-text-black tw-leading-none md:tw-text-base">
          {headingText}
        </div>
        <BreadcrumbSection />
      </div>
    </header>
  );
};

export default BaseEdubotHeader;
