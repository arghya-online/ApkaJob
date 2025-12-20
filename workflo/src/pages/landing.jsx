import React from "react";
import { Link } from "react-router-dom";
import Autoplay from "embla-carousel-autoplay";
import {
  HelpCircle,
  ChevronDown,
  LogIn,
  Search,
  Bookmark,
  UserCircle,
} from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { useUser } from "@clerk/clerk-react";
import Banner from "/banner.png";
import companies from "../data/companies";
import faq from "../data/faq";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@radix-ui/react-accordion";
import TypewriterText from "@/components/TypeWriterText.jsx";

import ParticleBackground from "@/components/ParticleBackground";

function Landing() {
  const { user } = useUser();
  const role = user?.unsafeMetadata?.role;
  return (
    <main className="w-full">
      <ParticleBackground />
      <section className="max-w-5xl mx-auto px-6 pb-10 text-center min-h-screen flex flex-col justify-center">
        <img
          src={Banner}
          alt="Banner"
          className="lg:h-50 w-full object-cover"
        />
        <div>
          <h1 className="heading text-2xl sm:text-3xl md:text-6xl font-semibold text-slate-900 leading-snug md:leading-tight mt-6">
            <TypewriterText text="Hiring and job search, without the usual chaos" />
          </h1>

          <p className="mt-6 text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto">
            One profile. Clear applications. Real recruiters. ApkaJob keeps
            hiring simple for everyone.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            {!role && (
              <>
                <Link
                  to="/jobs"
                  className="bg-slate-900 px-10 py-3.5 text-sm font-semibold text-white hover:bg-slate-800 transition rounded shadow-sm"
                >
                  Find jobs
                </Link>
                <Link
                  to="/post-job"
                  className="border border-slate-300 px-10 py-3.5 text-sm font-semibold text-slate-700 hover:border-slate-400 hover:text-slate-900 transition rounded bg-white"
                >
                  Hire talent
                </Link>
              </>
            )}

            {role === "candidate" && (
              <>
                <Link
                  to="/jobs"
                  className="bg-slate-900 px-10 py-3.5 text-sm font-semibold text-white hover:bg-slate-800 transition rounded shadow-sm"
                >
                  Browse jobs
                </Link>
                <Link
                  to="/saved-jobs"
                  className="border border-slate-300 px-10 py-3.5 text-sm font-semibold text-slate-700 hover:border-slate-400 hover:text-slate-900 transition rounded bg-white"
                >
                  View saved jobs
                </Link>
              </>
            )}

            {role === "recruiter" && (
              <>
                <Link
                  to="/post-job"
                  className="bg-slate-900 px-10 py-3.5 text-sm font-semibold text-white hover:bg-slate-800 transition rounded shadow-sm"
                >
                  Post a job
                </Link>
                <Link
                  to="/jobs"
                  className="bg-slate-900 px-10 py-3.5 text-sm font-semibold text-white hover:bg-slate-800 transition rounded shadow-sm"
                >
                  Browse jobs
                </Link>
                <Link
                  to="/my-jobs"
                  className="border border-slate-300 px-10 py-3.5 text-sm font-semibold text-slate-700 hover:border-slate-400 hover:text-slate-900 transition rounded bg-white"
                >
                  Manage my jobs
                </Link>
              </>
            )}
          </div>

          <p className="mt-6 text-sm text-slate-500">
            {role === "recruiter"
              ? "Post jobs and manage applicants in one place"
              : role === "candidate"
              ? "Apply faster with one profile"
              : "Trusted by growing teams and early-career professionals"}
          </p>
        </div>
      </section>
      <div className="bg-zinc-950 h-0.5" />

      <section className="max-w-6xl mx-auto px-6 py-10">
        <CardHeader className="mb-6">
          <CardTitle className="text-3xl font-semibold text-slate-900 text-center pb-10">
            Trusted By
          </CardTitle>
        </CardHeader>
        <Carousel
          opts={{ align: "start", loop: true }}
          plugins={[Autoplay({ delay: 900 })]}
        >
          <CarouselContent className="gap-6">
            {companies.map((company) => (
              <CarouselItem
                key={company.id}
                className="basis-1/2 sm:basis-1/3 md:basis-1/5 flex justify-center"
              >
                <div className="flex flex-col items-center justify-center gap-3 group">
                  <img
                    src={company.path}
                    alt={company.name}
                    className="h-14 sm:h-16 object-contain opacity-100 group-hover:opacity-100 transition"
                  />
                  <p className="text-sm font-semibold text-slate-800 group-hover:text-slate-700 transition text-center">
                    {company.name}
                  </p>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-14">
        <h2 className="text-3xl sm:text-4xl font-semibold text-center text-slate-900 mb-12">
          Getting started on{" "}
          <img src="logo.png" alt="ApkaJob" className="inline h-12 ml-2" />
        </h2>

        <div className="max-w-3xl mx-auto space-y-8">
          <div className="flex items-start gap-4">
            <div className="bg-slate-100 p-3 rounded-full">
              <LogIn className="h-5 w-5 text-slate-700" />
            </div>
            <div>
              <h3 className="text-lg font-medium text-slate-900">
                Sign up or log in
              </h3>
              <p className="mt-1 text-sm text-slate-600 leading-relaxed">
                Create an account or log in to ApkaJob to start exploring job
                opportunities.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="bg-slate-100 p-3 rounded-full">
              <Search className="h-5 w-5 text-slate-700" />
            </div>
            <div>
              <h3 className="text-lg font-medium text-slate-900">
                Browse jobs that interest you
              </h3>
              <p className="mt-1 text-sm text-slate-600 leading-relaxed">
                Visit the Browse Jobs page to view openings, read details, and
                find roles that fit you.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="bg-slate-100 p-3 rounded-full">
              <Bookmark className="h-5 w-5 text-slate-700" />
            </div>
            <div>
              <h3 className="text-lg font-medium text-slate-900">
                Apply or save jobs
              </h3>
              <p className="mt-1 text-sm text-slate-600 leading-relaxed">
                Apply directly using your profile or save jobs to come back to
                them later.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="bg-slate-100 p-3 rounded-full">
              <UserCircle className="h-5 w-5 text-slate-700" />
            </div>
            <div>
              <h3 className="text-lg font-medium text-slate-900">
                Manage your profile
              </h3>
              <p className="mt-1 text-sm text-slate-600 leading-relaxed">
                Use the profile icon to upload a profile photo, update details,
                and manage your account.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="max-w-6xl mx-auto px-6 pb-20 grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card
          className={`border bg-white transition-all ${
            role === "recruiter"
              ? "opacity-50 grayscale hover:opacity-100 hover:grayscale-0"
              : "border-slate-300 shadow-sm"
          }`}
        >
          <CardHeader>
            <CardTitle>For Job Hunters</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-slate-600 space-y-2">
            <p>• Apply with one profile</p>
            <p>• Track applications clearly</p>
            <p>• Get noticed by real recruiters</p>
            {(!role || role === "candidate") && (
              <Link
                to="/jobs"
                className="border-2 border-slate-900 p-1 px-3 inline-block mt-4 font-semibold text-slate-900 hover:bg-slate-100 transition text-xs uppercase tracking-wider"
              >
                Browse jobs
              </Link>
            )}
          </CardContent>
        </Card>

        <Card
          className={`border bg-white transition-all ${
            role === "candidate"
              ? "opacity-50 grayscale hover:opacity-100 hover:grayscale-0"
              : "border-slate-300 shadow-sm"
          }`}
        >
          <CardHeader>
            <CardTitle>For Recruiters</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-slate-600 space-y-2">
            <p>• Post jobs quickly</p>
            <p>• View serious candidates</p>
            <p>• Hire without noise</p>
            {(!role || role === "recruiter") && (
              <Link
                to="/post-job"
                className="border-2 border-slate-900 p-1 px-3 inline-block mt-4 font-semibold text-slate-900 hover:bg-slate-100 transition text-xs uppercase tracking-wider"
              >
                Post a job
              </Link>
            )}
          </CardContent>
        </Card>
      </section>

      <section className="max-w-7xl mx-auto py-10 bg-slate-50/50">
        <p className="text-center text-sm text-slate-500 mb-3">Still unsure?</p>

        <h2 className="text-3xl sm:text-4xl font-semibold text-center text-slate-900 mb-12">
          Questions people usually ask
        </h2>

        <Accordion
          type="single"
          collapsible
          className="w-full max-w-4xl mx-auto px-6"
        >
          {faq.map((item, index) => (
            <AccordionItem
              key={item.id}
              value={`item-${index}`}
              className="border-b border-slate-200"
            >
              <AccordionTrigger className="flex gap-4 py-6 text-left text-lg font-medium text-slate-900 hover:no-underline">
                <HelpCircle className="h-5 w-5 text-slate-500 mt-1 shrink-0" />
                <span className="flex-1">{item.question}</span>
                <ChevronDown className="h-5 w-5 text-slate-500 transition-transform group-data-[state=open]:rotate-180" />
              </AccordionTrigger>

              <AccordionContent className="pl-9 pb-6 text-base text-slate-600 leading-relaxed">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>

      <section className="py-20 text-center border-t bg-white">
        <h2 className="text-3xl sm:text-4xl font-semibold text-slate-900">
          Start with clarity, not confusion
        </h2>
        <p className="mt-4 text-slate-600">
          Whether you’re applying or hiring, ApkaJob keeps it simple.
        </p>

        <div className="mt-10 flex justify-center">
          <Link
            to={role === "recruiter" ? "/post-job" : "/jobs"}
            className="bg-slate-900 px-12 py-3.5 text-sm font-semibold text-white hover:bg-slate-800 transition rounded shadow-lg"
          >
            {role === "recruiter" ? "Post a Job Now" : "Get Started"}
          </Link>
        </div>
      </section>
    </main>
  );
}

export default Landing;
