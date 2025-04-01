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

export const Gallery = () => {
    const galleryImages = [
        "https://c.animaapp.com/m8xv5qbvA1Rh6W/img/gallery-1.jpg",
        "https://c.animaapp.com/m8xv5qbvA1Rh6W/img/gallery-2.jpg",
        "https://c.animaapp.com/m8xv5qbvA1Rh6W/img/gallery-3.jpg",
        "https://c.animaapp.com/m8xv5qbvA1Rh6W/img/gallery-4.jpg",
        "https://c.animaapp.com/m8xv5qbvA1Rh6W/img/gallery-5.jpg",
        "https://c.animaapp.com/m8xv5qbvA1Rh6W/img/gallery-6.jpg",
      ];
    
    // Stats data
    const stats = [
        { value: "1.5k+", label: "Volunteers" },
        { value: "100", label: "Projects" },
        { value: "980", label: "Communities Reached" },
        { value: "1.9m", label: "Lives Impacted" },
      ];
    return (
        <section className="py-16 bg-gray-50">
                    <div className="container">
                      <h2 className="text-3xl font-bold mb-8">Our Gallery</h2>
          
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-12">
                        {galleryImages.map((image, index) => (
                          <div
                            key={index}
                            className="aspect-square overflow-hidden rounded-lg"
                          >
                            <img
                              src={image}
                              alt={`Gallery image ${index + 1}`}
                              className="h-full w-full object-cover transition-transform hover:scale-105"
                            />
                          </div>
                        ))}
                      </div>
          
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                        {stats.map((stat, index) => (
                          <div key={index} className="flex flex-col items-center">
                            <span className="text-3xl font-bold text-green-600">
                              {stat.value}
                            </span>
                            <span className="text-gray-600">{stat.label}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </section>
          
                  
          
    );
}