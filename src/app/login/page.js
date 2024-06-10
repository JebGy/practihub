"use client";
import React from "react";
import "../globals.css";
import Image from "next/image";
import guy from "../../../public/guyAtHome.jpeg";
import { createUser, loginUser } from "../firebaseInit";
import { useRouter } from "next/navigation";

function Page() {
  const router = useRouter();
  function handleSubmit(e) {
    e.preventDefault();
    loginUser(e.target.uname.value, e.target.pass.value, router)
      ? alert("Credenciales correctas")
      : alert("Credenciales incorrectas");
  }

  return (
    <div className="bg-zinc-100 h-screen lg:grid lg:grid-cols-2 flex flex-col gap-0 text-zinc-800 overflow-hidden items-center justify-center">
      <form
        onSubmit={(e) => {
          handleSubmit(e);
        }}
        className="flex flex-col h-fit w-96 mx-auto gap-4 p-4 lg:shadow-none shadow-lg rounded-lg"
      >
        <h1 className="text-2xl font-black">Ingresar a PractiHub</h1>
        <label className="flex flex-col text-lg">
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
          Contraseña
          <input
            required
            type="password"
            name="pass"
            id="pass"
            className="border-2 p-2 rounded-lg"
          />
        </label>
        <button
          type="submit"
          className="bg-salmon-500 p-2 rounded-lg text-lg text-white"
        >
          Iniciar
        </button>
      </form>
      <Image
        src={guy}
        alt="hero"
        className="w-full h-fit lg:block hidden object-cover object-top"
      />
    </div>
  );
}

export default Page;
