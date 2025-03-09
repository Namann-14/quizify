"use client";
import React from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { ThemeToggler } from "./theme-toggler";
import { Button } from "./ui/button";
import { useSession, signIn, signOut } from "next-auth/react";
import { DropdownMenu, DropdownMenuLabel } from "@radix-ui/react-dropdown-menu";
import {
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { LogOut } from "lucide-react";
import Link from "next/link";

const Navbar = () => {
  const { data: session } = useSession();

  return (
    <motion.header
      className={cn(
        "h-16 flex justify-between items-center px-6 md:px-10 lg:px-40 sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-lg"
      )}
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="text-xl font-semibold tracking-wide"
      >
        <div className="p-1 rounded-lg border-2 border-black font-bold dark:border-white text-xl ">Quizify</div>
      </motion.div>

      {/* Right Section */}
      <motion.div
        className="flex items-center gap-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        <ThemeToggler />
        {session ? (
          <div className="flex items-center gap-3">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar>
                  <AvatarImage
                    src={session.user.image}
                    alt={session.user.name}
                  />
                  <AvatarFallback>{session.user.name[0]}</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuLabel className="ml-2 font-medium py-1">My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <div className="flex items-center gap-2 ml-2 pt-2">
                  <div className="flex flex-col space-y-1 leading-0">
                    {session.user.name && (
                      <span className="font-semibold mb-2">{session.user.name}</span>
                    )}
                    {session.user.email && (
                      <span className="text-sm text-foreground/60">
                        {session.user.email}
                      </span>
                    )}
                  </div>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => signOut()}>
                  Sign Out <LogOut className="w-5 h-5" />
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        ) : (
          <Link href="/login">
          <Button variant="outline">
            Sign In
          </Button>
          </Link>
        )}
      </motion.div>
    </motion.header>
  );
};

export default Navbar;
