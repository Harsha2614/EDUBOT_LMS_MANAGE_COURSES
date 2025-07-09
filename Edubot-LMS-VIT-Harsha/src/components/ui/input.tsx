import * as React from "react"
import { cn } from "@/lib/utils"
import { cva, type VariantProps } from "class-variance-authority"

const inputVariants = cva(
  "tw-flex tw-h-10 tw-w-full tw-rounded-md tw-border tw-border-input tw-bg-background tw-px-3 tw-py-2 tw-text-sm tw-ring-offset-background",
  {
    variants: {
      state: {
        default: "focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2",
        disabled: "tw-opacity-50 tw-cursor-not-allowed",
      },
    },
    defaultVariants: {
      state: "default",
    },
  }
)

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement>, VariantProps<typeof inputVariants> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, state, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={cn(inputVariants({ state, className }))}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input, inputVariants }
