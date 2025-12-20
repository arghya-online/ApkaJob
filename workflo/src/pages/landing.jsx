import React from "react";
import { Link } from "react-router-dom";
import Autoplay from "embla-carousel-autoplay";
import Banner from "/banner.png";
import { HelpCircle, ChevronDown } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";

import companies from "../data/companies";
import faq from "../data/faq";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@radix-ui/react-accordion";
import { Navigate } from "react-router-dom";
import TypewriterText from "@/components/TypeWriterText.jsx";

function Landing() {
  return (
    <main className="w-full">
      {/* HERO */}
      <section className="max-w-5xl mx-auto px-6 pt-10 pb-10 text-center">
        <h1 className="heading text-4xl sm:text-5xl md:text-6xl font-semibold text-slate-900 leading-tight">
          <TypewriterText text="Hiring and job search, without the usual chaos" />
        </h1>

        <p className="mt-6 text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto">
          One profile. Clear applications. Real recruiters. ApkaJob keeps hiring
          simple for everyone.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/jobs"
            className="bg-slate-900 px-10 py-3.5 text-sm font-semibold text-white hover:bg-slate-800 transition"
          >
            Find jobs
          </Link>

          <Link
            to="/post-job"
            className="border border-slate-300 px-10 py-3.5 text-sm font-semibold text-slate-700 hover:border-slate-400 hover:text-slate-900 transition"
          >
            Hire talent
          </Link>
        </div>

        <p className="mt-6 text-sm text-slate-500">
          Trusted by growing teams and early-career professionals
        </p>
      </section>
      <div className="bg-zinc-950 h-0.5"></div>

      <section className="max-w-6xl mx-auto px-6 py-10 ">
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
                  <p className=" text-sm font-semibold text-slate-800 group-hover:text-slate-700 transition text-center">
                    {company.name}
                  </p>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-10">
        <h2 className="text-3xl sm:text-4xl font-semibold text-center text-slate-900 mb-14">
          How ApkaJob works
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {[
            {
              title: "Create your profile",
              desc: "Set up once with your skills, resume, and preferences.",
            },
            {
              title: "Apply or post jobs",
              desc: "Job seekers apply quickly. Recruiters post roles in minutes.",
            },
            {
              title: "Track and connect",
              desc: "Follow application status and connect directly.",
            },
          ].map((step, i) => (
            <div key={i} className="text-center">
              <div className="text-4xl font-semibold text-slate-900 mb-4">
                {i + 1}
              </div>
              <h3 className="text-lg font-medium text-slate-900">
                {step.title}
              </h3>
              <p className="mt-2 text-slate-600 text-sm">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 pb-20 grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card className="border border-slate-300 bg-white">
          <CardHeader>
            <CardTitle>For Job Hunters</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-slate-600 space-y-2">
            <p>• Apply with one profile</p>
            <p>• Track applications clearly</p>
            <p>• Get noticed by real recruiters</p>
            <Link
              to="/jobs"
              className="inline-block mt-4 font-semibold text-slate-900"
            >
              Browse jobs →
            </Link>
          </CardContent>
        </Card>

        <Card className="border border-slate-300 bg-white">
          <CardHeader>
            <CardTitle>For Recruiters</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-slate-600 space-y-2">
            <p>• Post jobs quickly</p>
            <p>• View serious candidates</p>
            <p>• Hire without noise</p>
            <Link
              to="/post-job"
              className="inline-block mt-4 font-semibold text-slate-900"
            >
              Post a job →
            </Link>
          </CardContent>
        </Card>
      </section>

      <section className="max-w-7xl mx-auto py-10">
        <p className="text-center text-sm text-slate-500 mb-3">Still unsure?</p>

        <h2 className="text-3xl sm:text-4xl font-semibold text-center text-slate-900 mb-12">
          Questions people usually ask
        </h2>

        <Accordion
          type="single"
          collapsible
          className="w-full max-w-4xl mx-auto"
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

      {/* FINAL CTA */}
      <section className="py-10 text-center border-t">
        <h2 className="text-3xl sm:text-4xl font-semibold text-slate-900">
          Start with clarity, not confusion
        </h2>
        <p className="mt-4 text-slate-600">
          Whether you’re applying or hiring, ApkaJob keeps it simple.
        </p>

        <div className="mt-15 flex justify-center">
          <Link
            to="/jobs"
            className="bg-slate-900 px-12 py-3.5 text-sm font-semibold text-white hover:bg-slate-800 transition"
          >
            Get started
          </Link>
        </div>
      </section>
    </main>
  );
}

export default Landing;
