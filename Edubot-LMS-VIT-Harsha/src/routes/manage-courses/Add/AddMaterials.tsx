// src/routes/manage-courses/Add/AddMaterials.tsx
import { createFileRoute } from '@tanstack/react-router'
import { z } from 'zod'
import AddMaterials from '@/pages/manage-courses/Add/AddMaterials'

export const Route = createFileRoute(
  '/manage-courses/Add/AddMaterials',
)({
  validateSearch: z.object({
    moduleIndex: z.coerce.number(),
    moduleName: z.string().optional(),
  }),
  component: () => <AddMaterials />,
})