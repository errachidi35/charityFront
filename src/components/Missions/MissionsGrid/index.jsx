import { CalendarIcon, MapPinIcon } from "lucide-react";
import React from "react";
import { Badge } from "../../ui/badge";
import { Button } from "../../ui/button";
import { Card, CardContent, CardFooter } from "../../ui/card";
import { Progress } from "../../ui/progress";

export const MissionsGrid = ({ filters }) => {
  const missions = [
    {
      id: 1,
      title: "Clean Water for All",
      description:
        "Clean, drinkable water means less illness and better hygiene for the poorest villages. Create a positive and sustainable difference now.",
      image: "https://tse2.mm.bing.net/th?id=OIP.jIad-_uUvKv6KTyEaRz41AHaDo&pid=Api",
      raised: 21000,
      goal: 50000,
      participants: 14,
      date: "Sunday 23/03",
      location: "Toulouse",
    },
    {
      id: 2,
      title: "Improve Education",
      description:
        "Education is the key to breaking the cycle of poverty. Help build schools and provide resources to children in need.",
      image: "https://tse2.mm.bing.net/th?id=OIP.CoQLqsxpdnSMprxS-7w6SwHaEF&pid=Api",
      raised: 31000,
      goal: 50000,
      participants: 25,
      date: "Sunday 23/03",
      location: "Toulouse",
    },
    {
      id: 3,
      title: "End Hunger",
      description:
        "Millions suffer from hunger every day. Support food distribution efforts to provide essential meals to those in need.",
      image: "https://tse2.mm.bing.net/th?id=OIP.i_gbgUqlXnOjwGC384ynSAHaEK&pid=Api",
      raised: 10000,
      goal: 50000,
      participants: 8,
      date: "Sunday 23/03",
      location: "Paris",
    },
    {
      id: 4,
      title: "Food Distribution",
      description:
        "Providing food to those in need is crucial. Join us in distributing essential groceries and meals to underprivileged communities.",
      image: "https://tse2.mm.bing.net/th?id=OIP.RQSlKL3lfR0YAVYnT-i4sgHaE8&pid=Api",
      raised: 0,
      goal: 5000,
      participants: 0,
      date: "Sunday 23/03",
      location: "Lyon",
    }
  ];

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const filteredMissions = missions.filter((mission) => {
    const matchesKeyword = !filters.keywords || 
      mission.title.toLowerCase().includes(filters.keywords.toLowerCase());
    const matchesLocation = !filters.location || 
      mission.location.toLowerCase().includes(filters.location.toLowerCase());

    return matchesKeyword && matchesLocation;
  });

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredMissions.length > 0 ? (
        filteredMissions.map((mission) => (
          <Card key={mission.id} className="overflow-hidden border-none shadow-md">
            <div className="relative h-48 bg-gray-200">
              <img src={mission.image} alt={mission.title} className="w-full h-full object-cover" />
            </div>
            <CardContent className="p-6">
              <h3 className="text-xl font-bold mb-2">{mission.title}</h3>
              <p className="text-gray-600 text-sm mb-4">{mission.description}</p>

              <div className="mb-2">
                <div className="flex justify-between text-sm mb-1">
                  <span>Raised: {formatCurrency(mission.raised)}</span>
                  <span className="text-gray-500">Goal: {formatCurrency(mission.goal)}</span>
                </div>
                <Progress value={(mission.raised / mission.goal) * 100} className="h-2 bg-gray-200" />
              </div>

              <div className="flex justify-between items-center mt-4">
                <div className="text-sm text-gray-500">
                  {mission.participants > 0 ? (
                    <span>{mission.participants} Participants</span>
                  ) : (
                    <span>Be the first to join!</span>
                  )}
                </div>
              </div>
            </CardContent>
            <CardFooter className="bg-gray-50 px-6 py-3 flex flex-col space-y-3">
              <div className="flex items-center space-x-2">
                <Badge variant="outline" className="flex items-center gap-1 rounded-full">
                  <CalendarIcon className="h-3 w-3" />
                  <span>{mission.date}</span>
                </Badge>
                <Badge variant="outline" className="flex items-center gap-1 rounded-full">
                  <MapPinIcon className="h-3 w-3" />
                  <span>{mission.location}</span>
                </Badge>
              </div>
              <div className="flex justify-between w-full">
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" className="text-xs">Volunteer</Button>
                  <Button variant="outline" size="sm" className="text-xs">Donate</Button>
                </div>
                <Button variant="outline" size="sm" className="text-xs">See more</Button>
              </div>
              <Button className="w-full bg-black text-white hover:bg-gray-800">VIEW DETAILS</Button>
            </CardFooter>
          </Card>
        ))
      ) : (
        <p className="text-center text-gray-500 col-span-full">No missions found.</p>
      )}
    </div>
  );
};
