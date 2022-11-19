import { type NextPage } from "next";
import Link from "next/link";

const NavBar: NextPage = () => {
  return (
    <div className="flex h-12 w-[100vw] flex-row justify-between overflow-hidden bg-neutral-900">
      <Link href="/" className="navBarItem hoverAnimation">
        Home
      </Link>
      <Link href="/All" className="navBarItem hoverAnimation">
        All Cards
      </Link>
      <Link className="navBarItem hoverAnimation" href="/Ironclad">
        Ironclad
      </Link>
      <Link className="navBarItem hoverAnimation" href="/Silent">
        Silent
      </Link>
      <Link className="navBarItem hoverAnimation" href="/Defect">
        Defect
      </Link>
      <Link className="navBarItem hoverAnimation" href="/Watcher">
        Watcher
      </Link>
    </div>
  );
};
export default NavBar;
