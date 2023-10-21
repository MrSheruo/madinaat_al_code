"use client";
import Image from "next/image";
import BlogCard from "@/components/cards/BlogCard";
import { useState, useEffect } from "react";
import Tag from "@/components/cards/Tag";
import { Button } from "@/components/ui/button";
import { postSchema } from "@/lib/types";
type selectedTags = string[];

const NewPosts = () => {
  const [posts, setPosts] = useState<postSchema[]>([
    {
      _id: "a",
      title: "hero is here",
      breif: "this is a breif",
      sections: [],
      tags: ["React", "Next.js", "TypeScript", "JavaScript"],
      userId: "",
      createdAt: new Date(),
      lastUpdated: new Date(),
    },
    {
      _id: "b",
      title: "laenlfkeano",
      breif: "this is a breif",
      sections: [],
      tags: ["JavaScript", "SQL", "Node.js"],
      userId: "",
      createdAt: new Date(),
      lastUpdated: new Date(),
    },
    {
      _id: "c",
      title: "aaa",
      breif: "this is a breif",
      sections: [],
      tags: ["JavaScript", "aSQL", "Node.js"],
      userId: "",
      createdAt: new Date(),
      lastUpdated: new Date(),
    },
    {
      _id: "c",
      title: "aaa",
      breif: "this is a breif",
      sections: [],
      tags: ["JavaScript", "aSQL", "Node.js"],
      userId: "",
      createdAt: new Date(),
      lastUpdated: new Date(),
    },
    {
      _id: "c",
      title: "aaa",
      breif: "this is a breif",
      sections: [],
      tags: ["JavaScript", "aSQL", "Node.js"],
      userId: "",
      createdAt: new Date(),
      lastUpdated: new Date(),
    },
    {
      _id: "c",
      title: "aaa",
      breif: "this is a breif",
      sections: [],
      tags: ["JavaScript", "aSQL", "Node.js"],
      userId: "",
      createdAt: new Date(),
      lastUpdated: new Date(),
    },
    {
      _id: "c",
      title: "aaa",
      breif: "this is a breif",
      sections: [],
      tags: ["JavaScript", "aSQL", "Node.js"],
      userId: "",
      createdAt: new Date(),
      lastUpdated: new Date(),
    },
  ]);
  const [selectedTags, setSelectedTags] = useState<selectedTags>([]);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const allTags: string[] = posts.reduce((tags, post: any) => {
    return tags.concat(post.tags);
  }, []);
  const uniqueTags: string[] = Array.from(new Set(allTags));

  const postsPerPage = 6;
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };
  useEffect(() => {
    // async function getPosts() {
    //   try {
    //     const response = await axios.get("/api/posts");
    //     setPosts(response.data);
    //     console.log(response.data);
    //   } catch (error: any) {
    //     console.log(error);
    //     setError(error);
    //   }
    // }
    // getPosts();
  }, []);
  if (posts?.length == 0) {
    return <div className=" text-center">There is no posts...</div>;
  }

  if (error) {
    return (
      <div className=" text-center text-3xl mt-10">
        Something went wrong...
        <Image src="/" alt="error" height={200} width={200} className=" w-96" />
      </div>
    );
  }
  return (
    <div>
      <div className=" flex flex-wrap my-10 gap-4">
        {uniqueTags.map((tag, i) => (
          <Tag
            key={i}
            isSelected={selectedTags.includes(tag)}
            setSelectedTags={setSelectedTags}
            tag={tag}
          />
        ))}
        {selectedTags.length != 0 && (
          <Button
            onClick={() => {
              setSelectedTags([]);
            }}
            variant="destructive"
          >
            Delete
          </Button>
        )}
      </div>
      <section className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {selectedTags?.length !== 0 &&
          currentPosts.map((post) =>
            post.tags
              .filter((tag: any) => selectedTags.includes(tag))
              .map((tag: any, i) => <BlogCard key={i} {...post} />)
          )}
        {selectedTags?.length === 0 &&
          currentPosts.map((post, i) => <BlogCard key={i} {...post} />)}
      </section>
      {/* Pagination */}
      <div className="pagination">
        {Array.from({ length: Math.ceil(posts.length / postsPerPage) }).map(
          (_, i) => (
            <Button key={i} onClick={() => paginate(i + 1)}>
              {i + 1}
            </Button>
          )
        )}
      </div>
    </div>
  );
};

export default NewPosts;
