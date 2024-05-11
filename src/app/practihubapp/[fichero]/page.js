import HeaderAppComponent from "@/app/components/HeaderAppComponent";
import QuickAccesBarAppComponent from "@/app/components/QuickAccesBarAppComponent";
import ShowFilesAppComponent from "@/app/components/ShowFilesAppComponent";
import React from "react";

function page({ params }) {
  const { fichero } = params;
  return (
    <div className="bg-zinc-100 h-screen flex flex-col gap-0">
      <HeaderAppComponent current={fichero} />
      <QuickAccesBarAppComponent subRoute={true} />
      <ShowFilesAppComponent file={fichero} />
    </div>
  );
}

export default page;
