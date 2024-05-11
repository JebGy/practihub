import React from "react";
import ActionButtonAppComponent from "./ActionButtonAppComponent";

function FileCrardAppComponent({ file }) {
  return (
    <div
      className="w-full bg-zinc-50 rounded-lg h-full p-4 shadow-lg flex flex-col items-start justify-between"
      key={file.id}
    >
      <p className="font-bold text-xl">{file.id}</p>
      <ActionButtonAppComponent
        action={() => {}}
        link={"/practihubapp/" + file.id}
        title={"Detalles"}
        variant={"primary"}
      />
    </div>
  );
}

export default FileCrardAppComponent;
