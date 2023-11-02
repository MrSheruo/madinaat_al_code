import { getSession } from "@/lib/getSession";
import { redirect } from "next/navigation";
// todo Complete this page
export default async function EditUserPage() {
  const session = await getSession();

  if (session?.authStatues === true) {
    return <main>Edit Page</main>;
  } else {
    redirect("/");
  }
}
