"use client";
import React, { useEffect, useState } from "react";
import ActionButtonAppComponent from "./ActionButtonAppComponent";
import ActionModalFormAppComponent from "./ActionModalFormAppComponent";
import ActionModalFormUploadAppComponent from "./ActionModalFormUploadAppComponent";

function QuickAccesBarAppComponent({ subRoute, route }) {
  const [activeModal, setactiveModal] = useState();
  const [activeFileModal, setactiveFileModal] = useState();

  function handleUpdateModalStatus() {
    setactiveModal(!activeModal);
  }

  function handleUpdateFileModalStatus() {
    setactiveFileModal(!activeFileModal);
  }

  return (
    <div className="flex flex-row items-center justify-between p-8 w-full">
      <div className="bg-salmon-500 w-full p-4 flex flex-row items-center justify-between rounded-xl">
        <h2 className="text-white font-bold">Acciones rápidas</h2>
        {
          <ActionButtonAppComponent
            action={() => {
              if (subRoute) handleUpdateFileModalStatus();
              handleUpdateModalStatus();
            }}
            title={subRoute ? "Cargar documentos" : "Crear carpeta"}
            variant={"second"}
            link={null}
          />
        }
      </div>
      {activeModal && !subRoute ? (
        <ActionModalFormAppComponent
          closeFunction={() => {
            handleUpdateModalStatus();
          }}
        />
      ) : null}

      {activeFileModal && subRoute ? (
        <ActionModalFormUploadAppComponent
          file={route}
          closeFunction={() => {
            handleUpdateFileModalStatus();
          }}
        />
      ) : null}
    </div>
  );
}

export default QuickAccesBarAppComponent;
