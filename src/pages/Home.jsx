import {
  ClockIcon,
  GlobeIcon,
  HeartIcon,
  HomeIcon,
  PlusCircleIcon,
  UsersIcon,
} from "lucide-react";
import React from "react";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { Separator } from "../components/ui/separator";
import { Header } from "../components/Home/Header"
import { Hero } from "../components/Home/Hero"
import { Volunteer } from "../components/Home/Volunteer"
import { Features } from "../components/Home/Features"
import { LatestMissions } from "../components/Home/LatestMissions";
import { Gallery } from "../components/Home/Gallery";
import { Testemonial, Testimonial } from "../components/Home/Testimonial";
import { Blog } from "../components/Home/Blog";
import { Footer } from "../components/Home/Footer";


export const Home = () => {

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />

      <main className="flex-1">
        <Hero />

        <Volunteer />

        <Features />

        <LatestMissions />

        <Gallery />
        <Testimonial />
        <Blog />
      </main>

      <Footer />
    </div>
  );
};
