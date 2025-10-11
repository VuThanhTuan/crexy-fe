// import darkLogo from "@/assets/logos/dark.svg";
// import logo from "@/assets/logos/main.svg";
import Image from "next/image";
import logo from "@/public/images/CrexyLogo.png" // Adjust the path to your logo image

export function Logo() {
  return (
    <div className="relative max-w-[10.847rem]">
      <Image
        src={logo}
        className="dark:hidden"
        alt="NextAdmin logo"
        role="presentation"
        width={100} height={100}
      />

      {/* <Image
        src={darkLogo}
        fill
        className="hidden dark:block"
        alt="NextAdmin logo"
        role="presentation"
        quality={100}
      /> */}
    </div>
  );
}
