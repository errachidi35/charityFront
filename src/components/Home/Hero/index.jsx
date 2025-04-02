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

export const Hero = () => {
    return (
        <section className="relative h-[500px] bg-gradient-to-r from-gray-900 to-gray-700 text-white">
            <div className="container flex flex-col justify-center h-full space-y-4 pt-16">
                <h1 className="text-5xl font-bold leading-tight">
                    Act Today.
                    <br />
                    Change Tomorrow.
                </h1>
                <p className="text-lg max-w-md">
                    Join our mission to create positive change around the world
                    through community action.
                </p>
                <div className="pt-4">
                    <Button className="bg-green-primary hover:bg-green-700 text-white">
                        Get Started
                    </Button>
                </div>
            </div>
        </section>

    );

}