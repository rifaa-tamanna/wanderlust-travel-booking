"use client";

import Link from "next/link";
import { CircleUser } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "./ui/button";

const navLinks = [
  { href: "/", label: "Home", active: true },
  { href: "/destinations", label: "Destinations", active: false },
  { href: "/add-destination", label: "Add Destination", active: false },
  { href: "/my-bookings", label: "My Bookings", active: false },
];

export function SiteNavbar() {
  const { data: session } = authClient.useSession();

  const user = session?.user;
  console.log(user);

  const handleSignOut = () => {
    authClient.signOut();
  };

  return (
    <header className="relative z-20 bg-white shadow-[0_1px_3px_rgba(0,0,0,0.08)]">
      <div className="relative mx-auto flex h-[52px] items-center justify-between px-4 md:px-6">
        {/* Left — nav links */}
        <nav className="hidden items-center gap-7 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className={
                link.active
                  ? "text-[15px] font-semibold text-[#00a6c0] underline underline-offset-4"
                  : "text-[15px] font-medium text-neutral-800 transition-colors hover:text-[#00a6c0]"
              }
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Center — logo */}
        <Link
          href="/"
          className="absolute left-1/2 -translate-x-1/2 font-display text-[28px] font-bold text-[#00a6c0] md:static md:translate-x-0"
        >
          Wanderlast
        </Link>

        {/* Right — profile & auth */}
        <div className="flex items-center gap-5 md:gap-7">
          <Link
            href="#profile"
            className="flex items-center gap-1.5 text-[15px] font-medium text-neutral-800 transition-colors hover:text-[#00a6c0]"
          >
            <CircleUser className="size-4" strokeWidth={1.75} />
            Profile
          </Link>

          {user ? (
            <Popover>
              <PopoverTrigger
                render={
                  <Avatar>
                    <AvatarImage
                      referrerPolicy="no-referrer"
                      src={user?.image as string}
                    />
                    <AvatarFallback>{user?.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                }
              ></PopoverTrigger>
              <PopoverContent>
                <PopoverHeader>
                  <PopoverTitle>{user?.name}</PopoverTitle>
                  <PopoverDescription>
                    <p className="mb-[10px]">{user?.email}</p>
                    <Button onClick={handleSignOut} variant={"destructive"}>
                      Sign Out
                    </Button>
                  </PopoverDescription>
                </PopoverHeader>
              </PopoverContent>
            </Popover>
          ) : (
            <>
              <Link
                href="login"
                className="hidden text-[15px] font-medium text-neutral-800 transition-colors hover:text-[#00a6c0] sm:block"
              >
                Login
              </Link>
              <Link
                href="signup"
                className="text-[15px] font-medium text-neutral-800 transition-colors hover:text-[#00a6c0]"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
