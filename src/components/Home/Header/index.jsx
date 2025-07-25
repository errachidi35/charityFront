import {
    ClockIcon,
    GlobeIcon,
    HeartIcon,
    HomeIcon,
    PlusCircleIcon,
    UsersIcon,
} from "lucide-react";
import React, { useState, useEffect } from "react";
import { Badge } from "../../ui/badge";
import { Button } from "../../ui/button";
import Profile from "../../ui/profile";
import { Separator } from "../../ui/separator";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
    motion,
    useScroll,
    useMotionValueEvent
} from "framer-motion";
import { useAuthContext } from "../../../hooks/useAuthContext";


export const Header = () => {

    const location = useLocation(); // get current route
    const [active, setActive] = useState("Home"); // corresponds to the current page

    const { scrollY } = useScroll();
    const [hidden, setHidden] = useState(false);

    const navigate = useNavigate();

    const { user } = useAuthContext();


    useEffect(() => {
        // change the active state according to the current page
        const currentPath = location.pathname.substring(1) || "Home";
        setActive(currentPath.charAt(0).toUpperCase() + currentPath.slice(1));
    }, [location.pathname]);

    // for the navbar disappear and reappear on scroll
    useMotionValueEvent(scrollY, "change", (latest) => {
        const previous = scrollY.getPrevious();
        if (latest > previous && latest > 150) {
            setHidden(true);
        } else {
            setHidden(false);
        }
    });


    const navItems = ["Home", "About", "Missions", "Gallery"];
    return (
        <motion.header
            initial={hidden ? {
                y: "-100%",
            } : { y: 0 }}
            animate={hidden ? {} : { y: 0 }}
            transition={{
                duration: 0.4,
                ease: "easeOut",
            }}
            className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-16 items-center justify-between">
                <div className="flex items-center gap-2">
                    <HomeIcon className="h-5 w-5" />
                    <span className="font-bold text-xl">WeHelp</span>
                </div>

                <nav className="hidden md:flex items-center space-x-6">
  {navItems.map((item, index) => (
    <Link
      key={index}
      to={"/" + (item === "Home" ? "" : item.toLowerCase())}
      className={`text-sm font-medium transition-colors hover:text-primary ${
        item === active ? "text-primary" : "text-muted-foreground"
      }`}
    >
      {item}
    </Link>
  ))}

  {/* 👉 Liens réservés aux membres */}
  {user?.role === "MEMBRE" && (
    <>
      {/* <Link
        to="/mes-benevoles"
        className={`text-sm font-medium transition-colors hover:text-primary ${
          location.pathname === "/mes-benevoles" ? "text-primary" : "text-muted-foreground"
        }`}
      >
        Bénévoles de mes missions
      </Link>
      <Link
        to="/mes-participations"
        className={`text-sm font-medium transition-colors hover:text-primary ${
          location.pathname === "/mes-participations" ? "text-primary" : "text-muted-foreground"
        }`}
      >
        Participations reçues
      </Link> */}
       <Link
    to="/mesmissions"
    className="text-gray-700 hover:text-green-600 px-4 py-2"
  >
    Mes missions
  </Link>
    </>
  )}

</nav>


                <div className="flex items-center gap-2">
                    {user && (
                        <>
                            <Profile />
                        </>)
                    }
                    {
                        !user && (
                            <>
                                <Button onClick={() => navigate("/login")} variant="outline" size="sm">
                                    Login
                                </Button>
                                <Button onClick={() => navigate("/signup")} className="bg-green-primary hover:bg-green-700" size="sm">Sign up</Button>
                            </>)
                    }

                </div>
            </div>
        </motion.header>
    );
}