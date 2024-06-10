"use client";
import React, { useEffect, useState } from "react";
import ActionButtonAppComponent from "./ActionButtonAppComponent";
import ActionModalFormAppComponent from "./ActionModalFormAppComponent";
import ActionModalFormUploadAppComponent from "./ActionModalFormUploadAppComponent";

function QuickAccesBarAppComponent({ subRoute, route }) {
  const [activeModal, setactiveModal] = useState();
  const [activeFileModal, setactiveFileModal] = useState();
  const [isAdmin, setIsAdmin] = useState(false);

  let timeoutId;

  const handleUserActivity = () => {
    clearTimeout(timeoutId);
    
    timeoutId = setTimeout(() => {
      // Lógica para cerrar sesión por inactividad
      sessionStorage.removeItem("ph_um");
      window.location.href = "/login"; // Redirigir al usuario a la página de inicio de sesión
    }, 60000); 
  };

  useEffect(() => {
    // Verificar el rol de usuario al cargar el componente
    if (
      sessionStorage.getItem("ph_um") !== null &&
      JSON.parse(sessionStorage.getItem("ph_um")).role === "admin"
    ) {
      setIsAdmin(true);
    }

    // Agregar event listeners para detectar actividad del usuario
    window.addEventListener("mousemove", handleUserActivity);
    window.addEventListener("keypress", handleUserActivity);

    // Iniciar el temporizador de inactividad
    handleUserActivity();
    console.log("ogica para cerrar usuario al cargar el componente");

    // Limpiar event listeners y el temporizador al desmontar el componente
    return () => {
      window.removeEventListener("mousemove", handleUserActivity);
      window.removeEventListener("keypress", handleUserActivity);
      clearTimeout(timeoutId);
    };
  }, []);

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
        {isAdmin ? (
          <ActionButtonAppComponent
            action={() => {
              if (subRoute) handleUpdateFileModalStatus();
              handleUpdateModalStatus();
            }}
            title={subRoute ? "Cargar documentos" : "Crear carpeta"}
            variant={"second"}
            link={null}
          />
        ) : null}
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
