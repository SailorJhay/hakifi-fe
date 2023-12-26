import clsx from "clsx";
import React from "react";

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={clsx("animate-pulse bg-slate-100 dark:bg-slate-800", className)}
      {...props}
    />
  )
}

export { Skeleton };

