import NewPosts from "@/components/NewPosts";
import { getSession } from "@/lib/getSession";

// import { Separator } from "@/components/ui/separator";
export default async function Home() {
  const session = await getSession();
  const isAuth = session?.authStatues;

  return (
    <main className="  p-10 lg:p-20 flex flex-col">
      {
        //@ts-ignore
        isAuth ? (
          <h3 className=" text-3xl text-center">Latest posts</h3>
        ) : (
          <h3 className=" text-3xl text-center">Sign in to see more</h3>
        )
      }

      <NewPosts />
    </main>
  );
}
