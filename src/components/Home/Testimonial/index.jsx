import {
    ClockIcon,
    GlobeIcon,
    HeartIcon,
    HomeIcon,
    PlusCircleIcon,
    UsersIcon,
  } from "lucide-react";
  import React from "react";
  import { Badge } from "../../ui/badge";
  import { Button } from "../../ui/button";
  import { Card, CardContent } from "../../ui/card";
  import { Separator } from "../../ui/separator";
export const Testimonial = () => 
{
    return (
        
        <section className="container py-16">
        <div className="bg-green-50 p-8 rounded-lg relative">
          <div className="text-4xl text-green-500 absolute top-8 left-8">
            "
          </div>
          <div className="max-w-3xl mx-auto text-center py-8">
            <blockquote className="text-xl italic mb-4">
              Together, we can change lives for the better
            </blockquote>
            <div className="flex items-center justify-center gap-2">
              <span className="font-medium">Maria Diaz</span>
              <span className="text-gray-600 text-sm">
                Volunteer Coordinator
              </span>
            </div>
          </div>
        </div>
      </section>
    );

} 