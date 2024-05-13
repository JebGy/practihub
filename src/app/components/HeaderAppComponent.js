"use client";
import Link from "next/link";
import React from "react";

function HeaderAppComponent({ current }) {
  return (
    
    <div className="w-full h-fit p-8 flex flex-row items-center justify-between bg-zinc-900 text-white">
      
      <h1 className="font-bold text-4xl text-white">
        {current !== undefined ? (
          <p>
            <Link
              href={"/practihubapp"}
              className="underline underline-offset-4"
            >
              PractiHub
            </Link>
            {`/ ${decodeURIComponent(current)}`}
          </p>
        ) : (
          <Link href={"/practihubapp"}>PractiHub</Link>
        )}
      </h1>
    </div>
  );
}

export default HeaderAppComponent;
