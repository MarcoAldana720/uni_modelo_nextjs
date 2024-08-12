import React from "react";
import Link from "next/link";

export default function LinkAside({href, children, Icon}) {
  return (
    <Link
      href={href}
      className="flex px-3 rounded-md items-center gap-4 py-3 transition duration-300 hover:bg-white hover:text-primary group/link"
    >
      <div>
        <Icon
          width={18}
          className="fill-white group-hover/link:fill-primary inline-block"
        />
      </div>
      {children}
    </Link>
  );
}
