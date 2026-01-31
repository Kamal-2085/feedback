import React from "react";
import { cn } from "@/lib/utils";

type Props = React.HTMLAttributes<HTMLHRElement> & { inset?: boolean };

export function Separator({ className, inset, ...props }: Props) {
  return (
    <hr
      {...props}
      className={cn(
        "border-t border-border my-4",
        inset ? "mx-4 md:mx-8" : "",
        className,
      )}
    />
  );
}

export default Separator;
