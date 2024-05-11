"use client";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
} from "firebase/firestore";
import "rsuite/Accordion/styles/index.css";

import React, { useEffect } from "react";
import { app, listFilesFromStudent } from "../firebaseInit";

import ActionButtonAppComponent from "./ActionButtonAppComponent";
import { Accordion, Placeholder } from "rsuite";
import Link from "next/link";
import { useRouter } from "next/navigation";

function ShowFilesAppComponent({ file }) {
  const db = getFirestore(app);
  const [files, setFiles] = React.useState([]);
  const [subfiles, setsubFiles] = React.useState([]);
  const navigator = useRouter();

  useEffect(() => {
    if (file === undefined || file === null) {
      getFilesFromDB();
    }
    getSubColection();
  }, []);

  async function getFilesFromDB() {
    const ficheros = await getDocs(collection(db, "Carpetas"));
    const provFiles = [];
    ficheros.forEach((doc) => {
      provFiles.push(doc);
    });
    setFiles(provFiles);
  }

  async function getSubColection() {
    const fileRef = doc(db, "Carpetas", file !== null ? file : "");
    const ficheros = await getDoc(fileRef);
    if (ficheros.exists()) {
      setsubFiles(ficheros.data().datos);
    } else {
      console.log("No existe");
    }
  }
  console.log(files);
  return (
    <div className="text-black flex flex-col w-full h-full overflow-y-auto p-8 gap-0">
      <div className="flex flex-col gap-8 w-full overflow-hidden h-full overflow-y-auto">
        {file === null
          ? files
              .sort((a, b) => b.id.localeCompare(a.id))
              .map((file) => {
                return (
                  <div
                    key={file.id}
                    className="w-full bg-zinc-50 rounded-lg h-full p-4 flex flex-row items-center justify-between"
                  >
                    <h1 className="font-bold text-xl">{file.id}</h1>
                    <ActionButtonAppComponent
                      action={() => {}}
                      title={"Administrar"}
                      variant={"primary"}
                      link={"/practihubapp/" + file.id}
                    />
                  </div>
                );
              })
          : null}
        {files !== null && subfiles ? (
          <Accordion bordered>
            {subfiles?.map((dato) => {
              return (
                <Accordion.Panel key={dato.nombre} header={dato.nombre}>
                  <p className="font-bold">
                    Documentos existentes: {dato.ficheros.length}
                  </p>
                  <div className="p-4">
                    {dato.ficheros.map((value, index, array) => {
                      return (
                        <Link
                          className="underline underline-offset-4"
                          key={index}
                          href={""}
                          onClick={() => {
                            listFilesFromStudent(`/${value}`).then((url) => {
                              navigator.push(url);
                            });
                          }}
                        >
                          {value}
                        </Link>
                      );
                    })}
                  </div>
                </Accordion.Panel>
              );
            })}
          </Accordion>
        ) : null}
      </div>
    </div>
  );
}

export default ShowFilesAppComponent;