import CreatePost from "@/components/CreatePost";
import { getSession } from "@/lib/getSession";
import { redirect } from "next/navigation";

const CreatePostPage = async () => {
  const session = await getSession();
  if (!session) redirect("/signin");
  return <CreatePost userId={session?.dataObject.user._id} />;
};

export default CreatePostPage;
