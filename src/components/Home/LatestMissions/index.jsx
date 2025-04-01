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
  
export const LatestMissions = () => {
 const missions = [
    {
      image: "https://c.animaapp.com/m8xv5qbvA1Rh6W/img/mission-1.jpg",
      title: "Clean Water for All",
      description: "Providing clean water solutions to communities in need",
      category: "Environment",
    },
    {
      image: "https://c.animaapp.com/m8xv5qbvA1Rh6W/img/mission-2.jpg",
      title: "Literacy Missions",
      description: "Teaching reading and writing skills to underserved areas",
      category: "Education",
    },
    {
      image: "https://c.animaapp.com/m8xv5qbvA1Rh6W/img/mission-3.jpg",
      title: "Aid Center",
      description: "Distributing essential supplies to those in need",
      category: "Humanitarian",
    },
    {
      image: "https://c.animaapp.com/m8xv5qbvA1Rh6W/img/mission-4.jpg",
      title: "Reduce Deforestation",
      description: "Planting trees and protecting natural habitats",
      category: "Environment",
    },
    {
      image: "https://c.animaapp.com/m8xv5qbvA1Rh6W/img/mission-5.jpg",
      title: "Immigration and Refugees",
      description: "Supporting displaced people with resources and care",
      category: "Humanitarian",
    },
    {
      image: "https://c.animaapp.com/m8xv5qbvA1Rh6W/img/mission-6.jpg",
      title: "Climate Change Mitigation",
      description:
        "Working to reduce carbon footprint and promote sustainability",
      category: "Environment",
    },
  ];
    return (
        <section className="container py-16">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-bold">Latest Missions</h2>
              <Button variant="outline">View all missions</Button>
            </div>
  
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {missions.map((mission, index) => (
                <Card key={index} className="overflow-hidden">
                  <div className="aspect-video relative">
                    <img
                      src={mission.image}
                      alt={mission.title}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <CardContent className="p-5">
                    <Badge className="mb-2">{mission.category}</Badge>
                    <h3 className="font-bold text-lg mb-2">{mission.title}</h3>
                    <p className="text-gray-600 text-sm mb-4">
                      {mission.description}
                    </p>
                    <Button variant="outline" className="w-full">
                      Learn More
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
    );
}