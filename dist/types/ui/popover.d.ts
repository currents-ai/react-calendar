import * as React from "react";
import * as PopoverPrimitive from "@radix-ui/react-popover";
declare function Popover({ ...props }: React.ComponentProps<typeof PopoverPrimitive.Root>): import("react/jsx-runtime").JSX.Element;
declare function PopoverTrigger({ ...props }: React.ComponentProps<typeof PopoverPrimitive.Trigger>): import("react/jsx-runtime").JSX.Element;
declare function PopoverContent({ className, align, sideOffset, showArrow, ...props }: React.ComponentProps<typeof PopoverPrimitive.Content> & {
    showArrow?: boolean;
}): import("react/jsx-runtime").JSX.Element;
declare function PopoverAnchor({ ...props }: React.ComponentProps<typeof PopoverPrimitive.Anchor>): import("react/jsx-runtime").JSX.Element;
export { Popover, PopoverAnchor, PopoverContent, PopoverTrigger };
