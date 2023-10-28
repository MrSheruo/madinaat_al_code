import React from "react";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";
import Link from "next/link";
import { getSession } from "@/lib/getSession";
import AvatarComponent from "./AvatarComponent";

const Navbar = async () => {
  const session = await getSession();
  const isAuthenticated = session?.authStatues;
  return (
    <header className="flex flex-col w-full max-w-7xl m-auto ">
      <nav className="p-8 flex justify-between items-center flex-col sm:flex-row gap-4 sm:gap-0">
        <Link href={"/"}>
          <h2 className=" text-3xl font-bold text-[#222]">Madinaat Al-Code</h2>
        </Link>
        {isAuthenticated ? (
          <div className="flex items-center justify-center gap-8">
           
            <AvatarComponent />
            <Button className=" bg-green-600 hover:bg-green-500">
              <Link href="/posts/create">Create Post</Link>
            </Button>
          </div>
        ) : (
          <div className="flex items-center justify-center gap-4">
            <Link href="/signup">
              <Button>Sign Up</Button>
            </Link>
            <Link href="/signin">
              <Button className=" bg-green-600 hover:bg-green-500">
                Sign In
              </Button>
            </Link>
          </div>
        )}
      </nav>

      <div>
        <h2 className=" uppercase h-72 text-center text-3xl md:text-4xl lg:text-5xl font-bold flex flex-col justify-center items-center">
          <span className="text-5xl border-b-4 pd-3 font-bold">
            Madinaat Al-Code
          </span>
          <p className="text-lg mt-10 p-4">
            Madinaat Al-Code is a community for new developers who want to
            learn.
          </p>
        </h2>
        <Separator className=" bg-[#222] my-10" />
      </div>
    </header>
  );
};

export default Navbar;
