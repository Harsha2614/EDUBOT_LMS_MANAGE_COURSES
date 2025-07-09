import * as React from "react"
import { cn } from "@/lib/utils"

export interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {}

const Label = React.forwardRef<HTMLLabelElement, LabelProps>(
  ({ className, ...props }, ref) => {
    return (
      <label
        ref={ref}
        className={cn("tw-text-sm tw-font-medium tw-leading-none peer-disabled:tw-cursor-not-allowed peer-disabled:tw-opacity-70", className)}
        {...props}
      />
    )
  }
)
Label.displayName = "Label"

export { Label }
