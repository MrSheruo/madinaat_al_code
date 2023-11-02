import PostButtons from "@/components/PostButtons";
import { Badge } from "@/components/ui/badge";
import { getSession } from "@/lib/getSession";
import { postInPage } from "@/lib/types";
import { domainName, formatDate } from "@/lib/utils";
import axios from "axios";

type Props = {
  params: {
    id: string;
  };
};

export default async function PostPage({ params }: Props) {
  try {
    const session = await getSession();

    const { data }: { data: postInPage } = await axios.get(
      `http://${domainName}/api/posts/${params.id}`
    );

    const { _id, breif, lastUpdated, description, tags, title, userId } = data;

    return (
      <main className=" p-10 flex flex-col max-w-7xl m-auto text-center">
        {session?.dataObject.user._id === userId._id && (
          <PostButtons id={_id || ""} />
        )}
        <h1
          id="title"
          title={`the title of the post is : ${title}`}
          className=" text-3xl text-center"
        >
          {title}
        </h1>
        <div className="flex gap-4 justify-center items-center mt-4">
          <p id="breif" title="a breif of the post">
            {breif}
          </p>
          |<p className="font-semibold">{userId.userName}</p>
        </div>
        <p className=" italic font-light">{formatDate(lastUpdated)}</p>
        <div
          className="mt-4 flex gap-2 justify-center items-center 
        "
        >
          {tags.map((t, i) => (
            <Badge key={i}>{t}</Badge>
          ))}
        </div>
        <div
          id="description"
          className=" mt-4"
          dangerouslySetInnerHTML={{ __html: description }}
        ></div>
      </main>
    );
  } catch (error) {
    console.log(error);
  }
}
