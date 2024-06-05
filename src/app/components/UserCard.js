"use client";
import React from "react";

function UserCard({ user, deleteUser, updateRole }) {
  const [openModal, setOpenModal] = React.useState(false);
  return (
    <div
      key={user.uid}
      className="bg-zinc-100 p-4 rounded-lg flex flex-row items-center justify-between"
    >
      <h1 className="text-xl font-bold text-zinc-800">{user.uname}</h1>

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
            <div className="h-fit w-64 bg-zinc-50 absolute mt-8 right-0 rounded-lg z-[999] flex flex-col justify-center items-start p-2 gap-2 shadow-lg">
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
  );
}

export default UserCard;
