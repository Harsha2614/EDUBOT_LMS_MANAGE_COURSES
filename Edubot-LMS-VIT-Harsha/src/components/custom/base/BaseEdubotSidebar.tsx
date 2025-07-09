import React, { useState } from 'react';
import { Link } from '@tanstack/react-router';
import {
  Bars3Icon,
  XMarkIcon,
  BellIcon,
  BookOpenIcon,
  ClipboardDocumentListIcon,
  UserGroupIcon,
  UserIcon,
  BuildingOffice2Icon,
  RectangleGroupIcon,
  Squares2X2Icon,
  InboxStackIcon,
  ArrowUpOnSquareIcon,
  ChatBubbleLeftRightIcon,
  Cog6ToothIcon,
  CheckBadgeIcon, // for Approve Courses
} from '@heroicons/react/24/outline';

// Sidebar items matching your screenshot
const sidebarItems = [
  { label: 'All Program & Courses', path: '/courses', icon: BookOpenIcon },
  { label: 'Approve Courses', path: '/approve-courses', icon: CheckBadgeIcon },
  { label: 'Manage User', path: '/users', icon: UserGroupIcon },
  { label: 'Student', path: '/students', icon: UserIcon },
  { label: 'Organization', path: '/organization', icon: BuildingOffice2Icon },
  { label: 'Manage Programs', path: '/programs', icon: RectangleGroupIcon },
  { label: 'Manage Courses', path: '/manage-courses', icon: Squares2X2Icon },
  { label: 'Submissions', path: '/submissions', icon: InboxStackIcon },
  { label: 'Manage Batches', path: '/batches', icon: ClipboardDocumentListIcon },
  { label: 'Data Import/Export', path: '/data', icon: ArrowUpOnSquareIcon },
  { label: 'Raised Tickets', path: '/tickets', icon: ChatBubbleLeftRightIcon },
  { label: 'Help and Settings', path: '/settings', icon: Cog6ToothIcon },
];

const BaseEdubotSidebar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* MOBILE + TABLET HEADER */}
      <div className="tw-bg-secondary tw-text-primary tw-px-4 tw-py-3 tw-flex tw-items-center tw-justify-between lg:tw-hidden tw-fixed tw-top-0 tw-left-0 tw-right-0 tw-z-50">
        <button onClick={() => setIsOpen(true)} aria-label="Open Menu">
          <Bars3Icon className="tw-w-6 tw-h-6" />
        </button>
        <img src="/edubot_logo.svg" alt="Logo" className="tw-h-6" />
        <div className="tw-relative">
          <BellIcon className="tw-w-6 tw-h-6" />
          <div className="tw-absolute tw-top-0 tw-right-0 tw-w-4 tw-h-4 tw-bg-red-500 tw-rounded-full tw-text-white tw-text-[10px] tw-flex tw-items-center tw-justify-center">
            4
          </div>
        </div>
      </div>

      {/* DESKTOP SIDEBAR */}
      <aside
        className="tw-hidden lg:tw-block tw-fixed tw-bg-primary tw-text-white tw-z-40"
        style={{ width: '217px', top: '50px', left: 0, bottom: 0 }}
      >
        <nav className="tw-h-full tw-overflow-y-auto">
          <ul className="tw-space-y-1 tw-pt-4">
            {sidebarItems.map(({ label, path, icon: Icon }) => (
              <li key={path}>
                <Link
                  to={path}
                  className="tw-flex tw-items-center tw-gap-3 tw-py-2 tw-px-4 hover:tw-bg-primary-button-pressed tw-transition-colors tw-text-[14px] tw-font-medium"
                  activeProps={{ className: 'tw-bg-primary-button-pressed' }}
                >
                  <Icon className="tw-w-5 tw-h-5" />
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      {/* MOBILE + TABLET SIDEBAR */}
      {isOpen && (
        <div className="tw-fixed tw-inset-0 tw-z-50 tw-bg-black/50 tw-flex">
          <div className="tw-bg-primary tw-text-white tw-w-4/5 tw-max-w-xs tw-flex tw-flex-col tw-pt-6 tw-px-4 tw-h-full tw-overflow-y-auto">
            <div className="tw-flex tw-justify-between tw-items-center tw-mb-6">
              <div className="tw-text-sm">
                Hello! Kranthi
                <br />
                Welcome to Edubot
              </div>
              <button onClick={() => setIsOpen(false)} aria-label="Close Menu">
                <XMarkIcon className="tw-w-6 tw-h-6" />
              </button>
            </div>
            <ul className="tw-space-y-4">
              {sidebarItems.map(({ label, path, icon: Icon }) => (
                <li key={path}>
                  <Link
                    to={path}
                    onClick={() => setIsOpen(false)}
                    className="tw-flex tw-items-center tw-gap-3 tw-py-2 tw-px-2 hover:tw-bg-primary-button-pressed tw-text-sm tw-rounded"
                    activeProps={{ className: 'tw-bg-primary-button-pressed' }}
                  >
                    <Icon className="tw-w-5 tw-h-5" />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="tw-flex-1" onClick={() => setIsOpen(false)} />
        </div>
      )}
    </>
  );
};

export default BaseEdubotSidebar;
