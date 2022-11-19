import Head from "next/head";
import NavBar from "./NavBar";

type LayoutProps = {
  children: React.ReactNode,
};

export default function Layout( {children} : LayoutProps) {
 return (
    <>
      <div>
        <NavBar/>
        <main>{children}</main>
      </div>
    </>
 )
}
