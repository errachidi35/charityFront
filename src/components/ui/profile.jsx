"use client";

import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
} from "./dropdown";
import { Menu } from "lucide-react"; // hamburger icon
import { useLogout } from "../../hooks/useLogout";


export default function Profile() {

    const { logout } = useLogout();


    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button className="p-2 rounded-md border hover:bg-gray-100">
                    <Menu className="w-7 h-7" />
                </button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end">
                <DropdownMenuItem onSelect={() => alert("Profile")}>Profile</DropdownMenuItem>
                <DropdownMenuItem onSelect={() => alert("Settings")}>Settings</DropdownMenuItem>
                <DropdownMenuItem onSelect={() => logout()}>Log out</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
