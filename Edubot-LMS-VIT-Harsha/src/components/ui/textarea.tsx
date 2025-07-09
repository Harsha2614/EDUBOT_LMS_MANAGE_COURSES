import * as React from "react"
import { cn } from "@/lib/utils"
import { cva, type VariantProps } from "class-variance-authority"

const textareaVariants = cva(
  "tw-flex tw-min-h-[80px] tw-w-full tw-rounded-md tw-border tw-border-input tw-bg-background tw-px-3 tw-py-2 tw-text-sm tw-ring-offset-background",
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

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement>, VariantProps<typeof textareaVariants> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, state, ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        className={cn(textareaVariants({ state, className }))}
        {...props}
      />
    )
  }
)
Textarea.displayName = "Textarea"

export { Textarea, textareaVariants }
