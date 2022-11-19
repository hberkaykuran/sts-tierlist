import { type NextPage } from "next";
import Link from "next/link";

const NavBar: NextPage = () => {
    return (
        <div className="h-12 w-[100vw] bg-neutral-900 overflow-hidden flex flex-row justify-between">
            <div className="navBarItem hoverAnimation"><Link href="/">Home</Link></div>
            <div className="navBarItem hoverAnimation"><Link href="/All">All Cards</Link></div>
            <div className="navBarItem hoverAnimation"><Link href="/Ironclad">Ironclad</Link></div>
            <div className="navBarItem hoverAnimation"><Link href="/Silent">Silent</Link></div>
            <div className="navBarItem hoverAnimation"><Link href="/Defect">Defect</Link></div>
            <div className="navBarItem hoverAnimation"><Link href="/Watcher">Watcher</Link></div>
        </div>
    )
}
export default NavBar; 