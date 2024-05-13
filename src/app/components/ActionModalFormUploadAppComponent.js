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
import { app, uploadFileFromStudent } from "../firebaseInit";

function ActionModalFormUploadAppComponent({ closeFunction, file }) {
  const db = getFirestore(app);
  const selectedFile = useRef();
  const [subfiles, setSubfiles] = React.useState([]);

  const fileInput = useRef();

  useEffect(() => {
    getSubFiles();
  }, []);

  const getSubFiles = async () => {
    const documentRef = doc(db, "Carpetas", file);
    const docSnap = await getDoc(documentRef);

    if (docSnap.exists()) {
      console.log(docSnap.data());
      setSubfiles(docSnap.data().datos);
    } else {
      console.log("No");
    }
  };

  async function handleUpload() {
    const filePath = `${selectedFile.current.value}/${fileInput.current.files[0].name}`;
    uploadFileFromStudent(fileInput.current.files[0], filePath);

    const documentRef = doc(db, "Carpetas", file);
    const documentSnapshot = await getDoc(documentRef);
    const updatedData = documentSnapshot.data().datos.map((item) => {
      if (item.nombre === selectedFile.current.value) {
        return {
          ...item,
          ficheros: [...item.ficheros, filePath],
        };
      }
      return item;
    });

    await updateDoc(documentRef, {
      datos: updatedData,
    }).then(() => {
      alert("Updated");
      window.location.reload();
    });
  }

  return (
    <div className="bg-zinc-950 bg-opacity-25 z-[99] w-screen h-screen absolute top-0 left-0 flex flex-col items-center justify-center">
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
          <h2>Cargar archivo en {file}</h2>
        </div>
        <div className="p-4 flex flex-col gap-4 mt-4 text-black">
          <label className="flex flex-row gap-4">
            <select className="p-2 w-full" ref={selectedFile}>
              <option value="no">Seleccionar existente</option>
              {subfiles
                ? subfiles.map((subfile) => {
                    return (
                      <option key={subfile.nombre} value={subfile.nombre}>
                        {subfile.nombre}
                      </option>
                    );
                  })
                : null}
            </select>
          </label>

          <input
            type="file"
            ref={fileInput}
            className="border-b-2 border-zinc-950 outline-none w-full"
          />
          <ActionButtonAppComponent
            action={() => {
              handleUpload();
            }}
            title={"Crear carpeta"}
            variant={"primary"}
            link={null}
          />
        </div>
      </form>
    </div>
  );
}

export default ActionModalFormUploadAppComponent;
