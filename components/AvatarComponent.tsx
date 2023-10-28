"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Link from "next/link";
import { Separator } from "./ui/separator";

type Props = {
  image?: string;
  name?: string;
};

const AvatarComponent = ({ image, name }: Props) => {
  return (
    <Popover>
      <PopoverTrigger>
        <Avatar>
          <AvatarImage src={image || "/userIcon.png"} />
          <AvatarFallback>Icon</AvatarFallback>
        </Avatar>
      </PopoverTrigger>
      <PopoverContent className=" w-fit flex flex-col gap-4">
        <Link href="/">Something else</Link>
        <Link href="/users/profile">Profile</Link>
        <Separator />
        <Link
          href="/api/users/signout"
          onClick={() => setTimeout(() => window.location.reload(), 2000)}
        >
          log out
        </Link>
      </PopoverContent>
    </Popover>
  );
};

export default AvatarComponent;
