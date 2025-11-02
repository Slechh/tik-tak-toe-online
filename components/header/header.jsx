import logoSrc from "./logo.svg";
import Image from "next/image";
import { Profile } from "../profile";
import { ArrowDownIcon } from "./icons/arrow-down-icon";

export function Header() {
  return (
    <header className="flex h-24 items-center px-8 bg-white shadow-lg">
      <Image src={logoSrc} alt="logo" />
      <div className="h-8 w-px bg-slate-200 mx-6" />
      <button className="w-44 px-6 py-2 rounded-lg bg-teal-600 text-white text-2xl leading-tight hover:bg-teal-500 transition-colors">
        Играть
      </button>
      <button className="ml-auto flex items-center gap-2 text-teal-600 text-start">
        <Profile />
        <ArrowDownIcon />
      </button>
    </header>
  );
}
