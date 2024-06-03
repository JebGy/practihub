import Image from "next/image";
import Link from "next/link";
import hero from "../../public/Guy.png";
import man from "../../public/Vector.png";
import icon1 from "../../public/image2.jpg";
import icon2 from "../../public/image3.jpg";
import icon3 from "../../public/image4.jpg";
import vector1 from "../../public/Vector 1.png";
import ActionButtonAppComponent from "./components/ActionButtonAppComponent";

export default function Home() {
  return (
    <main className="flex h-full bg-zinc-50 flex-col items-center justify-center">
      <Image
        src={hero}
        alt=""
        className="absolute top-0 left-0 w-screen h-full object-cover object-top pentagon"
      />
      <header className="z-[99] absolute top-0 w-full p-8">
        <h2 className="lg:text-3xl text-xl font-bold">PractiHub</h2>
      </header>
      <div className="z-[99] w-full h-screen items-start  justify-center flex flex-col p-8">
        <h1 className="lg:text-8xl text-3xl text-salmon-500 font-bold">PractiHub</h1>
        <p className="font-bold lg:text-2xl text-lg mb-4">Optimizando tus procesos</p>
        <ActionButtonAppComponent
          action={null}
          link={"/login"}
          title={"Probar ahora"}
          variant={"primaty"}
        />
      </div>
      <div className="h-screen bg-zinc-50 grid lg:grid-cols-2 text-zinc-800">
        <div className="p-16 flex flex-col items-start justify-center gap-4">
          <h1 className="text-6xl font-bold">Hazlo fácil con PractiHub</h1>
          <p>
            Carga y organiza tus documentos de práctica de forma rápida y
            sencilla con PractiHub. Nuestra plataforma intuitiva te permite
            gestionar todos tus archivos de práctica en un solo lugar, desde
            ejercicios hasta exámenes y proyectos.
          </p>
        </div>
        <Image src={man} alt="" className="p-8" />
      </div>

      <div className="h-screen bg-zinc-50 relative overflow-hidden w-full flex flex-col items-center justify-center text-zinc-800">
        <div className=" flex flex-col items-center justify-center gap-16">
          <h1 className="text-5xl font-bold">Ofrecemos</h1>
          <div className="flex lg:flex-row flex-col gap-16 items-center justify-center mb-16">
            <div className="flex w-64 text-center flex-col justify-center items-center gap-4">
              <Image src={icon3} alt="icon" className="w-16" />
              <h3 className="text-2xl font-bold">Carga facil</h3>
            </div>
            <div className="flex w-64 text-center flex-col justify-center items-center gap-4">
              <Image src={icon2} alt="icon" className="w-16" />
              <h3 className="text-2xl font-bold">Seguridad garantizada</h3>
            </div>
            <div className="flex w-64 text-center flex-col justify-center items-center gap-4">
              <Image src={icon1} alt="icon" className="w-16" />
              <h3 className="text-2xl font-bold">Organización intuitiva</h3>
            </div>
            <Image
              src={vector1}
              alt=""
              className="absolute bottom-0 left-0 w-full"
            />
          </div>
        </div>
      </div>

      <div className="h-96 bg-salmon-500 relative overflow-hidden w-full flex flex-col items-center justify-center text-zinc-800">
        <div className=" flex flex-col items-center justify-end gap-16 p-8">
          <h1 className="text-xl font-bold text-white text-center">
            © 2024 PractiHub. Todos los derechos reservados.
          </h1>
        </div>
      </div>
    </main>
  );
}
