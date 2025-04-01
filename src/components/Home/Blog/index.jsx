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

export const Blog = () =>
{
        const blogPosts = [
          {
            image: "https://c.animaapp.com/m8xv5qbvA1Rh6W/img/blog-1.jpg",
            title: "Where We Work",
            date: "June 12, 2023",
            category: "Impact Stories",
          },
          {
            image: "https://c.animaapp.com/m8xv5qbvA1Rh6W/img/blog-2.jpg",
            title: "Volunteer Stories",
            date: "May 28, 2023",
            category: "Community",
          },
          {
            image: "https://c.animaapp.com/m8xv5qbvA1Rh6W/img/blog-3.jpg",
            title: "Upcoming Events",
            date: "May 15, 2023",
            category: "News",
          },
        ];
    return (
        <section className="container py-16">
                    <div className="flex justify-between items-center mb-8">
                      <h2 className="text-3xl font-bold">Latest News and Blog</h2>
                      <Button variant="outline">See all news</Button>
                    </div>
          
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {blogPosts.map((post, index) => (
                        <Card key={index} className="overflow-hidden">
                          <div className="aspect-video relative">
                            <img
                              src={post.image}
                              alt={post.title}
                              className="h-full w-full object-cover"
                            />
                          </div>
                          <CardContent className="p-5">
                            <div className="flex justify-between items-center mb-2 text-sm text-gray-600">
                              <span>{post.date}</span>
                              <span>{post.category}</span>
                            </div>
                            <h3 className="font-bold text-lg mb-4">{post.title}</h3>
                            <Button variant="outline" className="w-full">
                              Read More
                            </Button>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </section>
    );
}