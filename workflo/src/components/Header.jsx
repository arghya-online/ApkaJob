import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import Logo from "/logo.png";
import { Button } from "../components/ui/button";
import { SignedIn, SignedOut, UserButton, SignIn } from "@clerk/clerk-react";
import { BriefcaseBusiness, PenBox } from "lucide-react";
import { useUser } from "@clerk/clerk-react";

function Header() {
  const [showSignIn, setShowSignIn] = useState(false);
  const [search, setSearch] = useSearchParams("");
  const { user } = useUser();

  useEffect(() => {
    if (search.get("sign-in")) {
      setShowSignIn(true);
    }
  }, [search]);

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      setShowSignIn(false);
      setSearch({});
    }
  };

  return (
    <>
      {/* HEADER */}
      <nav
        className="
          sticky top-0 z-50
          bg-white
          flex items-center justify-between
          px-4 sm:px-8
          h-16
          border-b
        "
      >
        {/* LOGO */}
        <Link to="/" className="flex items-center">
          <img
            src={Logo}
            alt="ApkaJob Logo"
            className="
              w-28
              h-auto
              object-contain
            "
            /* ❗ FIX:
               Earlier h-40 was forcing the navbar height to ~160px
               This was the main reason for the huge bottom gap
            */
          />
        </Link>

        {/* ROLE */}
        <span
          className="
            hidden sm:inline-block
            text-xs
            font-semibold
            px-3 py-1
            rounded-full
            bg-zinc-100
            text-zinc-700
          "
        >
          {user?.unsafeMetadata?.role || "GUEST"}
        </span>

        {/* AUTH ACTIONS */}
        <div>
          <SignedOut>
            <Button
              variant="outline"
              className="
                bg-slate-900 text-white
                hover:bg-slate-800
                transition
              "
              onClick={() => setShowSignIn(true)}
            >
              <PenBox className="mr-2 h-4 w-4" />
              Login
            </Button>
          </SignedOut>

          <SignedIn>
            <UserButton
              appearance={{
                elements: {
                  avatarBox: "w-9 h-9",
                },
              }}
            >
              <UserButton.MenuItems>
                <UserButton.Link
                  label="My Jobs"
                  labelIcon={<BriefcaseBusiness size={15} />}
                  href="/my-jobs"
                />
                <UserButton.Link
                  label="Saved Jobs"
                  labelIcon={<PenBox size={15} />}
                  href="/saved-jobs"
                />
                <UserButton.Action label="manageAccount" />
              </UserButton.MenuItems>
            </UserButton>
          </SignedIn>
        </div>
      </nav>

      {/* SIGN IN MODAL */}
      {showSignIn && (
        <div
          className="
            fixed inset-0
            flex items-center justify-center
            bg-black/50
            z-10000
          "
          onClick={handleOverlayClick}
        >
          <SignIn
            signUpForceRedirectUrl="/onboarding"
            fallbackRedirectUrl="/onboarding"
          />
        </div>
      )}
    </>
  );
}

export default Header;
