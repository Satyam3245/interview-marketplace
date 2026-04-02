import { Show, SignInButton, SignOutButton, SignUpButton, UserButton } from "@clerk/nextjs";
import { Button } from "./ui/button";
import Link from "next/link";
import Image from "next/image";

const Header = ()=>{
    return <nav className="fixed top-0 inset-x-0 z-50 flex items-center justify-between px-10 py-3 border-b border-white bg-black">
        <Link
         href={'/'}
        >
         <Image
            src={"/logo.png"}
            alt="Prep Logo"
            width={100}
            height={100}
            className="h-11 w-auto"
         />
        </Link>
        <div className="flex items-center gap-3">
            <Show when="signed-out">
                <SignInButton>
                    <Button variant="ghost">Sign In</Button>
                </SignInButton>
                <SignUpButton>
                    <Button variant="ghost">Get Started</Button>
                </SignUpButton>
            </Show>
            <Show when="signed-in">
                <UserButton/>
            </Show>
        </div>

    </nav>
}


export default Header;