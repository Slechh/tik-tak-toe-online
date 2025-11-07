import logoSrc from "./logo.svg";
import Image from "next/image";
import { Profile } from "../profile";
import { ArrowDownIcon } from "./icons/arrow-down-icon";
import { UiButton } from "../uikit/ui-button";

export function Header() {
  return (
    <header className="flex h-24 items-center px-8 bg-white shadow-lg">
      <Image src={logoSrc} alt="logo" />
      <div className="h-8 w-px bg-slate-200 mx-6" />
      <UiButton className="w-44" size="lg" variant="primary">
        Играть
      </UiButton>
      <button className="ml-auto flex items-center gap-2 text-teal-600 text-start">
        <Profile name="Dima" rating="5000"/>
        <ArrowDownIcon />
      </button>
    </header>
  );
}
