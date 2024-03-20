import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";

export default function Navbar() {
  return (
    <header className="shadow-sm">
      <nav className="max-w-5xl flex items-center justify-between m-auto px-3 py-5">
        <Link href={"/"}>
          {/* <Image src={logo} width={40} height={40} priority alt="Job Board" /> */}
          <span className="text-xl font-bold ">Job Board</span>
        </Link>

        <Button asChild>
          <Link href={"/post-job"}>Post a Job</Link>
        </Button>
      </nav>
    </header>
  );
}
