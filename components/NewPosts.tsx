"use client";
import Image from "next/image";
import BlogCard from "@/components/cards/BlogCard";
import { useState, useEffect } from "react";
import Tag from "@/components/cards/Tag";
import { Button } from "@/components/ui/button";
import { postSchema } from "@/lib/types";
import axios from "axios";
type selectedTags = string[];

const NewPosts = () => {
  const [posts, setPosts] = useState<postSchema[]>([]);
  const [selectedTags, setSelectedTags] = useState<selectedTags>([]);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const allTags: string[] = posts.reduce((tags, post: any) => {
    return tags.concat(post.tags);
  }, []);
  const uniqueTags: string[] = Array.from(new Set(allTags));

  const postsPerPage = 8;
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };
  useEffect(() => {
    async function getPosts() {
      try {
        const response = await axios.get("/api/posts/new");
        setPosts(response.data);
      } catch (error: any) {
        setError(error);
      }
    }
    getPosts();
  }, []);
  if (posts?.length == 0) {
    return (
      <div className=" text-center mt-8 font-bold text-3xl">
        There is no posts yet...
      </div>
    );
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
      <div className="pagination flex gap-2 mt-8  justify-center">
        <Button
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
        >
          before
        </Button>
        {Array.from({ length: Math.ceil(posts.length / postsPerPage) }).map(
          (_, i) => (
            <Button
              key={i}
              onClick={() => paginate(i + 1)}
              className={`${currentPage === i + 1 && "bg-green-500"}`}
            >
              {i + 1}
            </Button>
          )
        )}
        <Button
          onClick={() => paginate(currentPage + 1)}
          disabled={currentPage === Math.ceil(posts.length / postsPerPage)}
        >
          after
        </Button>
      </div>
    </div>
  );
};

export default NewPosts;
