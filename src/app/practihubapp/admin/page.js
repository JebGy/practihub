"use client";
import UserCard from "@/app/components/UserCard";
import {
  createUser,
  deleteUser,
  getAllUsers,
  updateRole,
} from "@/app/firebaseInit";
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

  const handleCreateUser = (e) => {
    e.preventDefault();
    const name = e.target.uname.value;
    const pass = e.target.pass.value;
    createUser(name, pass)
      .then(() => {
        setOpenModalAdd(false);
      })
      .then(() => {
        getAllUsers().then((users) => {
          setUsersData(users);
        });
      });
  };

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
        {openModalAdd && (
          <div className="h-fit p-8 w-96 bg-zinc-100 grid text-zinc-800 absolute left-0 right-0 top-0 bottom-0 m-auto rounded-lg shadow-lg">
            <form
              className="flex flex-col h-fit w-full gap-4"
              onSubmit={(e) => {
                handleCreateUser(e);
              }}
            >
              <label className="flex flex-col text-lg w-full">
                Usuario
                <input
                  required
                  type="text"
                  name="uname"
                  id="uname"
                  className="border-2 p-2 rounded-lg"
                />
              </label>
              <label className="flex flex-col text-lg">
                Contraseña
                <input
                  required
                  type="password"
                  name="pass"
                  id="pass"
                  className="border-2 p-2 rounded-lg"
                />
              </label>
              <button className="bg-zinc-200 p-2 rounded-lg">Crear</button>
            </form>
          </div>
        )}
        {usersData ? (
          <div className="flex-4 grid grid-cols-1 gap-4">
            {usersData.map((user) => (
              <UserCard
                user={user}
                key={user.uid}
                deleteUser={deleteUser}
                updateRole={updateRole}
              />
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
