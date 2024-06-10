"use client";
import React, { useEffect } from "react";
import {
  getFirestore,
  collection,
  getDocs,
  doc,
  getDoc,
  updateDoc,
  arrayRemove,
  deleteDoc,
} from "firebase/firestore";
import { app, listFilesFromStudent } from "../firebaseInit";
import { Accordion } from "rsuite";
import Link from "next/link";

import ActionButtonAppComponent from "./ActionButtonAppComponent";
import { useRouter } from "next/navigation";
import "rsuite/Accordion/styles/index.css";

function ShowFilesAppComponent({ file }) {
  const db = getFirestore(app);
  const [files, setFiles] = React.useState([]);
  const [subfiles, setSubFiles] = React.useState([]);
  const [onCurrentView, setOnCurrentView] = React.useState("");
  const [isAdmin, setIsAdmin] = React.useState(false);
  const navigator = useRouter();

  useEffect(() => {
    if (!file) {
      getFilesFromDB();
    }

    if (sessionStorage.getItem("ph_um")) {
      const user = JSON.parse(sessionStorage.getItem("ph_um"));
      if (user.role === "admin") {
        setIsAdmin(true);
      }
    }
    getSubCollection();
  }, []);

  async function getFilesFromDB() {
    const ficheros = await getDocs(collection(db, "Carpetas"));
    const provFiles = [];
    ficheros.forEach((doc) => {
      provFiles.push(doc);
    });
    setFiles(provFiles);
  }

  async function getSubCollection() {
    const fileRef = doc(db, "Carpetas", file ? decodeURIComponent(file) : "");
    const ficheros = await getDoc(fileRef);
    if (ficheros.exists()) {
      setSubFiles(ficheros.data().datos);
    } else {
      console.log("No existe");
    }
  }

  const handleRemoveFile = async (fileIndex, datoIndex) => {
    if (!file) return;

    const docRef = doc(db, "Carpetas", decodeURIComponent(file));
    const ficheros = await getDoc(docRef);

    if (ficheros.exists()) {
      const updatedData = subfiles[datoIndex].ficheros.filter(
        (_, i) => i !== fileIndex
      );

      const updatedSubfiles = [...subfiles];
      updatedSubfiles[datoIndex] = {
        ...updatedSubfiles[datoIndex],
        ficheros: updatedData,
      };

      await updateDoc(docRef, {
        datos: updatedSubfiles,
      });

      setSubFiles(updatedSubfiles);
    } else {
      console.error("El documento no existe.");
    }
  };

  const handleRemoveSubfile = async (datoIndex) => {
    if (!file) return;

    const docRef = doc(db, "Carpetas", decodeURIComponent(file));
    const ficheros = await getDoc(docRef);

    if (ficheros.exists()) {
      const updatedSubfiles = subfiles.filter((_, i) => i !== datoIndex);

      await updateDoc(docRef, {
        datos: updatedSubfiles,
      });

      setSubFiles(updatedSubfiles);
    } else {
      console.error("El documento no existe.");
    }
  };

  const handleDeleteDocument = async (documentId) => {
    const docRef = doc(db, "Carpetas", documentId);
    await deleteDoc(docRef);
    setFiles(files.filter((file) => file.id !== documentId));
  };

  return (
    <div className="text-black flex flex-col w-full h-full overflow-y-auto p-8 gap-0">
      <div className="flex flex-col gap-8 w-full overflow-hidden h-full overflow-y-auto">
        {!file
          ? files
              .sort((a, b) => b.id.localeCompare(a.id))
              .map((file) => (
                <div
                  key={file.id}
                  className="w-full bg-zinc-50 rounded-lg h-full p-4 flex flex-row items-center justify-between"
                >
                  <h1 className="font-bold text-xl">{file.id}</h1>
                  <div className="flex gap-4 flex-row items-center justify-between">
                    <ActionButtonAppComponent
                      action={() => {}}
                      title={"Visualizar"}
                      variant={"primary"}
                      link={"/practihubapp/" + file.id}
                    />
                    {isAdmin ? (
                      <button
                        className="text-red-600 font-bold h-full border-red-400 border-2 rounded-lg  p-4"
                        onClick={() =>
                          //ask for confirmation
                          {
                            const n = confirm(
                              "¿Está seguro que desaea eliminar este documento?"
                            );
                            if (n) handleDeleteDocument(file.id);
                          }
                        }
                      >
                        Remover
                      </button>
                    ) : null}
                  </div>
                </div>
              ))
          : null}

        {files !== null && subfiles ? (
          <div className="grid lg:grid-cols-2 grid-cols-1 h-full">
            <Accordion bordered>
              {subfiles.map((dato, datoIndex) => (
                <Accordion.Panel key={dato.nombre} header={dato.nombre}>
                  <div className="p-4 flex flex-row items-center justify-between">
                    <p className="font-bold">
                      Documentos existentes: {dato.ficheros.length}
                    </p>
                    <button
                      className="text-red-600 font-bold p-2 border-2 border-red-400 rounded-lg"
                      onClick={() => {
                        const n = confirm(
                          "¿Está seguro que desaea eliminar este folder?"
                        );
                        if (n) handleRemoveSubfile(datoIndex);
                      }}
                    >
                      Remover
                    </button>
                  </div>
                  <div className="p-4 flex flex-col gap-4 text-purple-600">
                    {dato.ficheros.map((value, fileIndex) => (
                      <div
                        key={value}
                        className="flex gap-4 flex-row items-center justify-between"
                      >
                        <Link
                          className="underline underline-offset-4"
                          href={""}
                          onClick={() => {
                            listFilesFromStudent(`/${value}`).then((url) => {
                              setOnCurrentView(url);
                            });
                          }}
                        >
                          {value}
                        </Link>
                        {isAdmin ? (
                          <button
                            className="text-red-600 font-bold border-red-400 border-2 rounded-lg p-2"
                            onClick={() =>
                              //ask for confirmation
                              {
                                const n = confirm(
                                  "¿Está seguro que desaea eliminar este documento?"
                                );
                                if (n) handleRemoveFile(fileIndex, datoIndex);
                              }
                            }
                          >
                            Remover
                          </button>
                        ) : null}
                      </div>
                    ))}
                  </div>
                  <iframe
                    src={onCurrentView}
                    className="w-full h-full lg:hidden"
                  />
                </Accordion.Panel>
              ))}
            </Accordion>
            <iframe
              src={onCurrentView}
              className="w-full h-full lg:block hidden"
            />
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default ShowFilesAppComponent;
