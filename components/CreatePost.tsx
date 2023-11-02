"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FormEvent, useRef, useState } from "react";
import dynamic from "next/dynamic";
import "froala-editor/css/froala_style.min.css";
import "froala-editor/css/froala_editor.pkgd.min.css";
import { Badge } from "@/components/ui/badge";
import axios from "axios";
const FroalaEditorComponent = dynamic(() => import("react-froala-wysiwyg"), {
  ssr: false,
});

type Props = {
  userId: string;
};

const CreatePost = ({ userId }: Props) => {
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const title = useRef<HTMLInputElement>(null);
  const breif = useRef<HTMLInputElement>(null);
  const tag = useRef<HTMLInputElement>(null);

  const addTag = () => {
    if (
      tag.current?.value === "" ||
      !tag.current?.value ||
      tag.current?.value === undefined ||
      tags.length >= 4 ||
      tags.includes(tag.current?.value)
    ) {
      return false;
    }

    setTags([...tags, tag.current?.value]);
    tag.current.value = "";
  };

  const createPost = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const post = {
      title: title.current?.value,
      breif: breif.current?.value,
      description: description,
      tags: tags,
      userId: userId,
    };
    const { data } = await axios.post("/api/posts", post);
    window.location.href = `/posts/${data._id}`;
  };

  return (
    <main className="flex flex-col max-w-7xl gap-4 m-auto items-center">
      <h2 className="text-2xl">Create a new post</h2>
      <form
        onSubmit={createPost}
        className="flex flex-col justify-center items-start max-w-2xl m-auto gap-8 p-8"
      >
        <Input
          ref={title}
          placeholder="Main Title..."
          className=" border-[#222] h-16 text-3xl"
        />
        <Input ref={breif} placeholder="Brief..." className=" border-[#222] " />
        <FroalaEditorComponent
          model={description}
          onModelChange={(e: string) => setDescription(e)}
          tag="textarea"
          config={{
            placeholderText: "Section Description",
            saveInterval: 2000,
            charCounterCount: true,
          }}
        />
        <div className="flex items-center ">
          <Input placeholder="Tag" ref={tag} className=" mr-8 border-[#222]" />
          <Button
            type="button"
            className=" w-fit p-6 "
            disabled={tags.length >= 4}
            onClick={addTag}
          >
            Add tag
          </Button>
        </div>
        <div className="flex gap-4">
          {tags.map((tag, i) => (
            <Badge
              key={i}
              onClick={() => setTags(tags.filter((t) => t !== tag))}
            >
              {tag}
            </Badge>
          ))}
        </div>
        <Button className=" w-fit bg-green-600">Create Post</Button>
      </form>
    </main>
  );
};

export default CreatePost;
