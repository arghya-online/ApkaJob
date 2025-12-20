import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import Logo from "/logo.png";
import { Button } from "../components/ui/button";
import { SignedIn, SignedOut, UserButton, SignIn } from "@clerk/clerk-react";
import {
  BriefcaseBusiness,
  Heart,
  PenBox,
  LayoutDashboard,
} from "lucide-react";
import { useUser } from "@clerk/clerk-react";

function Header() {
  const [showSignIn, setShowSignIn] = useState(false);
  const [search, setSearch] = useSearchParams("");
  const { user, isLoaded } = useUser();

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

  const role = user?.unsafeMetadata?.role;

  return (
    <>
      <nav className="top-0 z-50 mb-10 flex items-center justify-between px-4 sm:px-8 h-16 border-b bg-white/10 backdrop-blur-sm sticky">
        <Link to="/" className="flex items-center">
          <img
            src={Logo}
            alt="ApkaJob Logo"
            className="w-28 h-auto object-contain"
          />
        </Link>

        <div className="hidden md:flex gap-8 items-center font-medium">
          {role === "candidate" && (
            <>
              <Link
                to="/jobs"
                className="text-slate-600 hover:text-slate-900 transition flex items-center gap-2"
              >
                <BriefcaseBusiness size={18} />
                Jobs
              </Link>
              <Link
                to="/saved-jobs"
                className="text-slate-600 hover:text-slate-900 transition flex items-center gap-2"
              >
                <Heart size={18} />
                Saved Jobs
              </Link>
            </>
          )}

          {role === "recruiter" && (
            <>
              <Link
                to="/jobs"
                className="text-slate-600 hover:text-slate-900 transition flex items-center gap-2"
              >
                <BriefcaseBusiness size={18} />
                Jobs
              </Link>
              <Link
                to="/my-jobs"
                className="text-slate-600 hover:text-slate-900 transition flex items-center gap-2"
              >
                <LayoutDashboard size={18} />
                My Jobs
              </Link>
              <Link
                to="/post-job"
                className="text-slate-600 hover:text-slate-900 transition flex items-center gap-2"
              >
                <PenBox size={18} />
                Post Job
              </Link>
              <Link
                to="/saved-jobs"
                className="text-slate-600 hover:text-slate-900 transition flex items-center gap-2"
              >
                <Heart size={18} />
                Saved Jobs
              </Link>
            </>
          )}
        </div>

        <div className="flex items-center gap-4">
          <SignedOut>
            <Button
              variant="outline"
              className="hidden sm:flex"
              onClick={() => setShowSignIn(true)}
            >
              Login
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="sm:hidden"
              onClick={() => setShowSignIn(true)}
            >
              <PenBox className="h-5 w-5" />
            </Button>
          </SignedOut>

          <SignedIn>
            {role && (
              <span className="hidden sm:inline-block text-xs font-semibold px-3 py-1 rounded-full bg-zinc-100 text-zinc-700 capitalize">
                {role}
              </span>
            )}

            <UserButton
              appearance={{
                elements: {
                  avatarBox: "w-9 h-9",
                },
              }}
            >
              <UserButton.MenuItems>
                {role === "candidate" && (
                  <UserButton.Link
                    label="Saved Jobs"
                    labelIcon={<Heart size={15} />}
                    href="/saved-jobs"
                  />
                )}
                {role === "recruiter" && (
                  <UserButton.Link
                    label="My Jobs"
                    labelIcon={<BriefcaseBusiness size={15} />}
                    href="/my-jobs"
                  />
                )}
                {role === "recruiter" && (
                  <UserButton.Link
                    label="Saved Jobs"
                    labelIcon={<Heart size={15} />}
                    href="/saved-jobs"
                  />
                )}
                {role === "recruiter" && (
                  <UserButton.Link
                    label="Post Job"
                    labelIcon={<PenBox size={15} />}
                    href="/post-job"
                  />
                )}
                <UserButton.Action label="manageAccount" />
                <UserButton.Action label="signOut" />
              </UserButton.MenuItems>
            </UserButton>
          </SignedIn>
        </div>
      </nav>
      {showSignIn && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black/50 z-1000 p-4"
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
