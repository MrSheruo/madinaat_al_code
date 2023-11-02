"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Link from "next/link";
import { Separator } from "./ui/separator";
import { userSchema } from "@/lib/types";

type Props = {
  image?: string;
  user?: userSchema;
};

const AvatarComponent = ({ image, user }: Props) => {
  return (
    <Popover>
      <PopoverTrigger>
        <Avatar>
          <AvatarImage src={image || "/userIcon.png"} />
          <AvatarFallback>Icon</AvatarFallback>
        </Avatar>
      </PopoverTrigger>
      <PopoverContent className=" w-fit flex flex-col gap-4">
        <p>Hello : {user?.userName}</p>
        <Link href={`/users/${user?._id}`}>Profile</Link>
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
