import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:size-4 [&_svg]:shrink-0 active:scale-[0.98]",
  {
    variants: {
      variant: {
        // Electric blue — CTA principal en dashboard y marketing
        default:
          "bg-primary text-primary-foreground shadow-primary hover:shadow-primary-lg hover:bg-primary/90",
        // Negro pill — CTA de marca en navbar marketing
        brand:
          "bg-black text-white hover:bg-black/85",
        // Contorno azul — acciones secundarias
        outline:
          "border border-primary text-primary bg-transparent hover:bg-secondary",
        // Surface tintada — acciones terciarias
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/70",
        // Sin fondo — íconos, acciones ghost
        ghost:
          "hover:bg-secondary text-muted-foreground hover:text-foreground",
        // Destructivo
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        // Link
        link: "text-primary underline-offset-4 hover:underline",
        // Accent (alias de default para compatibilidad)
        accent:
          "bg-primary text-primary-foreground shadow-primary hover:shadow-primary-lg hover:bg-primary/90",
      },
      size: {
        default: "h-11 px-6 py-2",
        sm:      "h-9 px-4 text-xs",
        lg:      "h-12 px-8 text-base",
        icon:    "h-10 w-10",
      },
    },
    defaultVariants: { variant: "default", size: "default" },
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
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
