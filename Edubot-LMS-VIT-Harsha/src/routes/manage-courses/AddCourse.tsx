// src/routes/manage-courses/AddCourse.tsx
import AddCoursePage from '@/pages/manage-courses/AddCourse';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/manage-courses/AddCourse')({
  component: () => <AddCoursePage />,
});