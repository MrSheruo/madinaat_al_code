//todo this page
import BlogCard from "@/components/cards/BlogCard";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { getSession } from "@/lib/getSession";
import { userSchema } from "@/lib/types";
import { domainName } from "@/lib/utils";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import React from "react";
type Props = {
  params: {
    id: string;
  };
};

export default async function ProfilePage({ params }: Props) {
  try {
    const session = await getSession();
    const profileData = await axios
      .get(`http://${domainName}/api/users/${params.id}`)
      .then((e) => e.data);

    const { _id, posts, userName }: userSchema = profileData.user;

    if (session?.dataObject.user._id === _id) {
      return (
        <main className=" max-w-7xl m-auto flex flex-col gap-6 justify-center items-center mb-16">
          <Button>
            <Link href={`/users/${_id}/edit`}>Edit Profile</Link>
          </Button>
          <h2 className=" text-2xl font-semibold my-2">User</h2>
          <div className="flex flex-col gap-4 items-center ">
            <Image
              src="/userIcon.png"
              width={60}
              height={60}
              title="User Icon"
              alt="user icon"
              className=" rounded-full"
            />
            <h3 className=" font-semibold my-2">{userName}</h3>
          </div>
          <Separator className="bg-[#222] w-80" />
          <h2 className=" text-2xl font-semibold my-2">Posts</h2>
          <section className="w-full grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {posts.map((post, i) => (
              <BlogCard key={i} {...post} />
            ))}
          </section>
        </main>
      );
    }
  } catch (error) {
    console.log(error);
  }
}
