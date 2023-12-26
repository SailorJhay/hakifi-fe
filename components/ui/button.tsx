"use client";

import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import clsx from "clsx";
import * as React from "react";

const buttonVariants = cva(
  "whitespace-nowrap font-medium",
  {
    variants: {
      variant: {
        default: "",
        ghost: 'bg-light-2 hover:bg-light-1 hover:border-primary-1 border-[1px] border-transparent',
        primary: "bg-primary-1 hover:bg-primary-2 disabled:opacity-20 text-white",
        secondary: "bg-grey-2 hover:bg-primary-2 disabled:opacity-20",
        monotone: "bg-light-2"
      },
      size: {
        default: "",
        sm: "p-2",
        md: "px-6 py-mobile",
        lg: "px-6 py-3",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
  VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={clsx(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };

