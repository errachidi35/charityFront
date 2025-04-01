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

export const Header = () =>{
    const navItems = ["Home", "About", "Missions", "Gallery", "Contact"];
return (
<header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
    <div className="container flex h-16 items-center justify-between">
    <div className="flex items-center gap-2">
        <HomeIcon className="h-5 w-5" />
        <span className="font-bold text-xl">Charity</span>
    </div>

    <nav className="hidden md:flex items-center space-x-6">
        {navItems.map((item, index) => (
        <a
            key={index}
            href="#"
            className={`text-sm font-medium transition-colors hover:text-primary ${index === 0 ? "text-primary" : "text-muted-foreground"}`}
        >
            {item}
        </a>
        ))}
    </nav>

    <div className="flex items-center gap-2">
        <Button variant="outline" size="sm">
        Login
        </Button>
        <Button size="sm">Donate</Button>
    </div>
    </div>
</header>
);
}