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

export const Features = () => {
    const features = [
      {
        icon: <UsersIcon className="h-6 w-6" />,
        title: "Volunteer",
        description: "Join our community",
      },
      {
        icon: <ClockIcon className="h-6 w-6" />,
        title: "Donate Hours",
        description: "Give your time",
      },
      {
        icon: <GlobeIcon className="h-6 w-6" />,
        title: "Global Reach",
        description: "Worldwide impact",
      },
      {
        icon: <HeartIcon className="h-6 w-6" />,
        title: "Local Communities",
        description: "Help those nearby",
      },
    ];
    return (
        <section className="container py-12">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {features.map((feature, index) => (
                <Card key={index} className="bg-gray-50">
                    <CardContent className="p-6 flex flex-col items-center text-center">
                    <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center mb-4">
                        {feature.icon}
                    </div>
                    <h3 className="font-medium text-lg">{feature.title}</h3>
                    <p className="text-gray-600 text-sm">{feature.description}</p>
                    </CardContent>
                </Card>
                ))}
            </div>
            </section>
    );

}