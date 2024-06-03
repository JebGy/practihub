"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

function HeaderAppComponent({ current }) {
  const [userData, setUserData] = React.useState(null);
  const router = useRouter();
  useEffect(() => {
    setUserData(JSON.parse(sessionStorage.getItem("ph_um")));
    if (sessionStorage.getItem("ph_um") === null) {
      router.push("/login");
    }
  }, []);
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

      <div className="flex flex-row items-center justify-center gap-4">
        <button
          onClick={() => {
            router.push("/practihubapp/admin");
          }}
          className="font-bold"
        >
          {userData?.uname}
        </button>
        <span
          className={`h-2 w-2 my-auto rounded-full ${
            userData?.role === "admin" ? "bg-red-500" : " bg-green-400"
          }`}
        ></span>
      </div>
    </div>
  );
}

export default HeaderAppComponent;
