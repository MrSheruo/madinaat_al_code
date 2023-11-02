import { Separator } from "@/components/ui/separator";
import { userSchema } from "@/lib/types";
import { domainName } from "@/lib/utils";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";

export default async function UsersPage() {
  const users: userSchema[] = await axios
    .get(`http://${domainName}/api/users`)
    .then((e) => e.data);

  return (
    <main className="sm:p-10 flex flex-col">
      <h1 className="text-3xl text-center mb-4">All users</h1>
      <section className=" flex flex-col sm:flex-row flex-wrap gap-10 justify-evenly p-4">
        {/* userCards */}
        {users.map((user: userSchema) => (
          <div
            key={user._id}
            className="flex flex-col border-[#222] border-2 bg-[#eee] p-8 rounded-md gap-4"
          >
            <Link
              href={`users/${user._id}`}
              className="flex gap-2 ml-4 items-center justify-center"
            >
              <Image
                src={"/userIcon.png"}
                width={45}
                height={45}
                className=" rounded-full"
                alt="userIcon"
                title={`user:`}
              />
              <p className=" font-semibold">{user.userName}</p>
            </Link>
            <Separator className=" bg-[#222]" />
            <div className="flex gap-6 items-center justify-center">
              <div
                title={`number of posts:`}
                className="flex flex-col items-center justify-center"
              >
                <p>posts</p>
                <p>{user.posts.length}</p>
              </div>
              <Separator className=" max-w-[2px] h-full bg-[#222]" />
              <div
                title={`number of posts:`}
                className="flex flex-col items-center justify-center"
              >
                <p>posts</p>
                <p>45</p>
              </div>
            </div>
            <Separator className="bg-[#222]" />
            <div
              id="socials"
              className="flex justify-center items-center gap-4"
            >
              <Link href={"#"}>facebook</Link>
              <Link href={"#"}>twitter</Link>
              <Link href={"#"}>instagram</Link>
            </div>
          </div>
        ))}
      </section>
    </main>
  );
}
