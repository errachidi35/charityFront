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
  
export const Volunteer =()=>
{
    return (
        <section className="container py-16">
            <Card className="overflow-hidden">
              <CardContent className="p-0">
                <div className="flex flex-col md:flex-row">
                  <div className="md:w-1/2">
                    <img
                      src="https://c.animaapp.com/m8xv5qbvA1Rh6W/img/volunteer.jpg"
                      alt="Volunteers working together"
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="md:w-1/2 p-8 flex flex-col justify-center space-y-4">
                    <h2 className="text-3xl font-bold">
                      Got time?
                      <br />
                      Lend a hand!
                    </h2>
                    <p className="text-gray-600">
                      Join our global community of volunteers making a difference
                      every day.
                    </p>
  
                    <ul className="space-y-3 pt-4">
                      <li className="flex items-center gap-2">
                        <div className="h-5 w-5 rounded-full bg-green-100 flex items-center justify-center">
                          <PlusCircleIcon className="h-3 w-3 text-green-600" />
                        </div>
                        <span className="text-sm">
                          Flexible volunteer opportunities
                        </span>
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="h-5 w-5 rounded-full bg-green-100 flex items-center justify-center">
                          <PlusCircleIcon className="h-3 w-3 text-green-600" />
                        </div>
                        <span className="text-sm">
                          Join for a day or long-term
                        </span>
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="h-5 w-5 rounded-full bg-green-100 flex items-center justify-center">
                          <PlusCircleIcon className="h-3 w-3 text-green-600" />
                        </div>
                        <span className="text-sm">
                          No experience needed for most roles
                        </span>
                      </li>
                    </ul>
  
                    <div className="pt-4">
                      <Button>Volunteer Now</Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>
    );
}