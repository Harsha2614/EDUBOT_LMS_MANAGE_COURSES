import { createFileRoute } from '@tanstack/react-router'
import Clone from '@/pages/manage-courses/Clone'
export const Route = createFileRoute('/manage-courses/Clone')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div><Clone></Clone></div>
}
