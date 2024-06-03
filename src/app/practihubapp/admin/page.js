"use client";
import { deleteUser, getAllUsers, updateRole } from "@/app/firebaseInit";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

function Page() {
  const [usersData, setUsersData] = React.useState(null);
  const [openModal, setOpenModal] = React.useState(false);
  const [openModalAdd, setOpenModalAdd] = React.useState(false);
  const router = useRouter();

  useEffect(() => {
    if (sessionStorage.getItem("ph_um") === null) {
      router.push("/login");
    }
    getAllUsers().then((users) => {
      console.log(users);
      setUsersData(users);
    });
  }, []);
  return (
    <div className="bg-zinc-50 h-screen p-4 w-screen ">
      <div className="flex flex-row items-center justify-between text-zinc-800">
        <h1 className="text-3xl font-bold ">Administrar usuarios</h1>
        <div className="flex flex-row gap-4">
          <button
            className="bg-zinc-200 p-2 rounded-lg border"
            onClick={() => {
              setOpenModalAdd(!openModalAdd);
            }}
          >
            Nuevo usuario
          </button>
          <button
            className="bg-zinc-200 p-2 rounded-lg border"
            onClick={() => {
              router.back();
            }}
          >
            Regresar
          </button>
        </div>
      </div>
      <div className="p-4">
        {usersData ? (
          <div className="flex-4 grid grid-cols-1 gap-4">
            {usersData.map((user) => (
              <div
                key={user.uid}
                className="bg-zinc-100 p-4 rounded-lg flex flex-row items-center justify-between"
              >
                <h1 className="text-xl font-bold text-zinc-800">
                  {user.uname}
                </h1>

                <div className="text-zinc-800 flex flex-row gap-4 items-center justify-center">
                  <p
                    className={`text-xl font-bold ${
                      user.role === "admin" ? "text-red-500" : "text-green-500"
                    }`}
                  >
                    {user.role}
                  </p>
                  <button
                    onClick={() => setOpenModal(!openModal)}
                    className="bg-zinc-200 p-2 rounded-full relative"
                  >
                    {openModal ? (
                      <div className="h-fit w-64 bg-zinc-50 absolute mt-8 right-0 rounded-lg flex flex-col justify-center items-start p-2 gap-2 shadow-lg">
                        <button
                          onClick={() => {
                            updateRole(
                              user.uname,
                              user.role === "admin" ? "user" : "admin"
                            ).then(() => location.reload());
                          }}
                          className="p-2 bg-zinc-100 text-start w-full hover:bg-zinc-200 rounded-md"
                        >
                          Cambiar a {user.role === "admin" ? "user" : "admin"}
                        </button>
                        <button
                          onClick={() => deleteUser(user.uname)}
                          className="p-2 bg-zinc-100 text-start w-full hover:bg-red-200 rounded-md"
                        >
                          Remover
                        </button>
                      </div>
                    ) : null}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="size-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
}

export default Page;
