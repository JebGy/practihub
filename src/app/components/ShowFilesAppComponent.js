"use client";
import { collection, getDocs, getFirestore } from "firebase/firestore";
import React, { useEffect } from "react";
import { app } from "../firebaseInit";
import FileCrardAppComponent from "./FileCrardAppComponent";
import ActionButtonAppComponent from "./ActionButtonAppComponent";

function ShowFilesAppComponent() {
  const db = getFirestore(app);
  const [files, setFiles] = React.useState([]);
  const [subfiles, setsubFiles] = React.useState([]);

  useEffect(() => {
    getFilesFromDB();
  }, []);

  async function getFilesFromDB() {
    const ficheros = await getDocs(collection(db, "Carpetas"));
    const provFiles = [];
    ficheros.forEach((doc) => {
      provFiles.push(doc);
    });
    setFiles(provFiles);
  }
  console.log(files);
  return (
    <div className="text-black flex flex-col w-full h-full overflow-y-auto p-8 gap-8">
      <div className="flex flex-col gap-16 h-32 w-full">
        {files
          .sort((a, b) => b.id.localeCompare(a.id))
          .map((file) => {
            return (
              <div
                key={file.id}
                className="w-full bg-zinc-50 rounded-lg h-full p-4 flex flex-row items-center justify-between"
              >
                <h1 className="font-bold text-4xl">{file.id}</h1>
                <ActionButtonAppComponent
                  action={() => {}}
                  title={"Administrar"}
                  variant={"primary"}
                  link={"/practihubapp/" + file.id}
                />
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default ShowFilesAppComponent;
