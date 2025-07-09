import * as React from "react"
import * as ScrollAreaPrimitive from "@radix-ui/react-scroll-area"
import { cn } from "@/lib/utils"

const ScrollArea = React.forwardRef<
  React.ElementRef<typeof ScrollAreaPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.Root>
>(({ className, children, ...props }, ref) => (
  <ScrollAreaPrimitive.Root
    ref={ref}
    className={cn("tw-relative tw-overflow-hidden", className)}
    {...props}
  >
    <ScrollAreaPrimitive.Viewport className="tw-h-full tw-w-full tw-rounded-[inherit]">
      {children}
    </ScrollAreaPrimitive.Viewport>
    <ScrollAreaPrimitive.Scrollbar
      orientation="vertical"
      className="tw-flex tw-select-none tw-touch-none tw-p-0.5 tw-transition-colors hover:tw-bg-muted"
    >
      <ScrollAreaPrimitive.Thumb className="tw-relative tw-flex-1 tw-rounded-full tw-bg-border" />
    </ScrollAreaPrimitive.Scrollbar>
    <ScrollAreaPrimitive.Scrollbar
      orientation="horizontal"
      className="tw-flex tw-select-none tw-touch-none tw-p-0.5 tw-transition-colors hover:tw-bg-muted"
    >
      <ScrollAreaPrimitive.Thumb className="tw-relative tw-flex-1 tw-rounded-full tw-bg-border" />
    </ScrollAreaPrimitive.Scrollbar>
    <ScrollAreaPrimitive.Corner className="tw-bg-muted" />
  </ScrollAreaPrimitive.Root>
))
ScrollArea.displayName = ScrollAreaPrimitive.Root.displayName

export { ScrollArea }
