"use client";
import Link from "next/link";
import React from "react";

function ActionButtonAppComponent({ link, title, variant, action }) {
  return (
    <Link
      href={link !== null ? link : ""}
      className={`${
        variant === "primary"
          ? "bg-purple-600 text-center hover:bg-purple-700 text-white p-4 rounded-lg"
          : "bg-white text-center hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 rounded-lg"
      }`}
      onClick={() => {
        action();
      }}
    >
      {title}
    </Link>
  );
}

export default ActionButtonAppComponent;
