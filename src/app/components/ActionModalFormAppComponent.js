"use client";
import React, { useEffect, useRef } from "react";
import {
  arrayUnion,
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import ActionButtonAppComponent from "./ActionButtonAppComponent";
import { app } from "../firebaseInit";

function ActionModalFormAppComponent({ closeFunction }) {
  const db = getFirestore(app);
  const selectedFile = useRef();
  const fileName = useRef();
  const [subfiles, setSubfiles] = React.useState([]);
  const subfileName = useRef();
  const handleSubmit = () => {
    const filenameValue =
      selectedFile.current.value !== undefined &&
      selectedFile.current.value !== "no"
        ? selectedFile.current.value
        : fileName.current.value;
    const fileRef = doc(db, "Carpetas", filenameValue);
    const newData = {
      nombre: subfileName.current.value,
      ficheros: [],
    };

    getDoc(fileRef)
      .then((docSnapshot) => {
        if (docSnapshot.exists()) {
          // Documento existente, actualiza los datos
          return updateDoc(fileRef, {
            datos: arrayUnion(newData),
          });
        } else {
          // Documento no existe, crea uno nuevo
          return setDoc(fileRef, {
            datos: [newData],
          });
        }
      })
      .then(() => {
        alert("Datos agregados a la carpeta");
        window.location.reload();
        closeFunction();
      })
      .catch((error) => {
        console.error("Error al agregar datos:", error);
      });
  };

  useEffect(() => {
    getSubColection();
  }, []);
  const getSubColection = () => {
    const fileRef = collection(db, "Carpetas");
    const provSubFiles = [];
    getDocs(fileRef).then((res) => {
      res.forEach((doc) => {
        provSubFiles.push(doc);
      });
      setSubfiles(provSubFiles);
    });
  };

  return (
    <div className="bg-zinc-950 bg-opacity-25 w-screen h-screen absolute top-0 left-0 flex flex-col items-center justify-center">
      <button onClick={closeFunction} className="absolute top-8 right-8">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18 18 6M6 6l12 12"
          />
        </svg>
      </button>
      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
        className="bg-white w-2/6 rounded-lg overflow-hidden"
      >
        <div className="bg-zinc-900 p-4 ">
          <h2>Crear nueva carpeta</h2>
        </div>
        <div className="p-4 flex flex-col gap-4 mt-4 text-black">
          <label className="flex flex-row gap-4">
            <input
              ref={fileName}
              placeholder="Nombre del grupo"
              type="text"
              className=" border-b-2 disabled:hidden border-zinc-950 outline-none w-full"
            ></input>
            <select
              className="p-2 w-full"
              ref={selectedFile}
              onChange={() => {
                selectedFile.current.value !== "no"
                  ? (fileName.current.disabled = true)
                  : (fileName.current.disabled = false);
              }}
            >
              <option value="no">Seleccionar existente</option>
              {subfiles.map((subfile) => {
                return (
                  <option key={subfile.id} value={subfile.id}>
                    {subfile.id}
                  </option>
                );
              })}
            </select>
          </label>
          <label>
            <input
              ref={subfileName}
              placeholder="Nombre de la carpeta"
              type="text"
              className="border-b-2 border-zinc-950 outline-none w-full"
            />
          </label>
          <ActionButtonAppComponent
            action={handleSubmit}
            title={"Crear carpeta"}
            variant={"primary"}
            link={null}
          />
        </div>
      </form>
    </div>
  );
}

export default ActionModalFormAppComponent;
