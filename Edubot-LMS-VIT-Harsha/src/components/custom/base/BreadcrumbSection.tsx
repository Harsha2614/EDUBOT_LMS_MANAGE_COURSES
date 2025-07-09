import React from 'react';
import { Link, useRouterState } from '@tanstack/react-router';

const BreadcrumbSection: React.FC = () => {
  const { location } = useRouterState();
  const segments = location.pathname.split('/').filter(Boolean);

  const breadcrumbNameMap: Record<string, string> = {
    'manage-courses': 'Manage Courses',
    'Add': 'Add Course',
    'AddCourse': 'Add Course',
    'students': 'Students',
    'Clone':'Add Course',
    'AddMaterials': 'Add Modules/Materials',
  };

  const crumbs = segments.map((seg, idx) => {
    const href = '/' + segments.slice(0, idx + 1).join('/');
    const label =
      breadcrumbNameMap[seg] ||
      seg.replace(/-/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase());
    return { label, href };
  });

  return (
    <nav
      className="
        tw-flex tw-items-center tw-flex-wrap tw-gap-1
        tw-text-[8px] md:tw-text-[12px] lg:tw-text-[14px]
        tw-font-medium tw-font-['Montserrat'] tw-leading-none
      "
    >
      <Link to="/" className="hover:tw-underline tw-text-gray-600">Home</Link>
      {crumbs.map((crumb, index) => (
        <span key={index} className="tw-flex tw-items-center tw-gap-1">
          <span className="tw-text-gray-400">›</span>
          {index === crumbs.length - 1 ? (
            <span className=" tw-text-gray-700">{crumb.label}</span>
          ) : (
            <Link to={crumb.href} className="hover:tw-underline tw-text-gray-600">{crumb.label}</Link>
          )}
        </span>
      ))}
    </nav>
  );
};

export default BreadcrumbSection;
