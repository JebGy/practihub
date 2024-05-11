import HeaderAppComponent from "@/app/components/HeaderAppComponent";
import QuickAccesBarAppComponent from "@/app/components/QuickAccesBarAppComponent";
import ShowFilesAppComponent from "@/app/components/ShowFilesAppComponent";
import React from "react";

function page({ params }) {
  const { fichero } = params;
  return (
    <div className="bg-zinc-100 h-screen">
      <HeaderAppComponent current={fichero} />
      <QuickAccesBarAppComponent subRoute={true} />
    </div>
  );
}

export default page;
