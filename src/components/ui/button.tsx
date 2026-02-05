import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
   "inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
         default: "bg-primary text-primary-foreground hover:bg-primary/90 rounded-full shadow-soft hover:shadow-elevated hover:-translate-y-0.5",
         destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90 rounded-full",
         outline: "border-2 border-primary bg-transparent text-primary hover:bg-primary hover:text-primary-foreground rounded-full",
         secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80 rounded-full",
         ghost: "hover:bg-muted hover:text-foreground rounded-full",
        link: "text-primary underline-offset-4 hover:underline",
         hero: "bg-primary text-primary-foreground rounded-full shadow-card hover:shadow-elevated hover:-translate-y-1 font-semibold text-base",
         accent: "bg-accent text-accent-foreground rounded-full shadow-soft hover:shadow-elevated hover:-translate-y-1 font-semibold",
         soft: "bg-muted text-foreground hover:bg-muted/80 rounded-full",
         glass: "glass rounded-full hover:bg-card/95",
      },
      size: {
         default: "h-11 px-6 py-2 text-sm",
         sm: "h-9 px-4 text-sm",
         lg: "h-14 px-8 text-base",
         xl: "h-16 px-10 text-lg",
        icon: "h-11 w-11",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
