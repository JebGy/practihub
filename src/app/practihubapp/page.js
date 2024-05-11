import React from "react";
import HeaderAppComponent from "../components/HeaderAppComponent";
import QuickAccesBarAppComponent from "../components/QuickAccesBarAppComponent";
import ShowFilesAppComponent from "../components/ShowFilesAppComponent";

function page() {
  return (
    <div className="bg-zinc-100 h-screen flex flex-col gap-0">
      <HeaderAppComponent />
      <QuickAccesBarAppComponent />
      <ShowFilesAppComponent />
    </div>
  );
}

export default page;
