import Link from "next/link";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { postSchema } from "@/lib/types";
import { Separator } from "../ui/separator";

const BlogCard = ({ tags, title, _id, breif }: postSchema) => {
  return (
    <Link href={`/posts/${_id}`}>
      <div className=" rounded-lg flex flex-col justify-evenly px-4 shadow-lg object-cover bg-white h-80">
        <h3>{title}</h3>
        <div className="flex flex-wrap gap-2 ">
          {tags.map((tag, i) => (
            <Badge key={i}>{tag}</Badge>
          ))}
        </div>
        <Separator />
        <p className=" mt-4 text-gray-600 h-20">{breif}</p>
        <Button className=" bg-green-600 hover:bg-green-500">Read More</Button>
      </div>
    </Link>
  );
};

export default BlogCard;
