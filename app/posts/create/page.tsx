"use client";
import SectionPost from "@/components/SectionPost";
import SelectWithdata from "@/components/SelectWithdata";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

const page = () => {
  const [sections, setSections] = useState([
    {
      key: 1,
      title: "Section 1",
      description: "Description",
    },
  ]);
  const addSections = () => {
    setSections([
      ...sections,
      {
        key: sections.length + 1,
        title: `Section ${sections.length + 1}`,
        description: "Description",
      },
    ]);
  };
  const deleteSection = (index: number) => {
    setSections((prevSections) => {
      const newSections = [...prevSections];
      newSections.splice(index, 1);
      return newSections;
    });
  };
  return (
    <main className="flex flex-col max-w-7xl gap-4 m-auto items-center">
      <h2 className="text-2xl">Create a new post</h2>
      <form
        onSubmit={(e) => e.preventDefault()}
        className="flex flex-col justify-center items-start max-w-2xl m-auto gap-8 p-8"
      >
        <Input
          placeholder="Main Title..."
          className=" border-[#222] h-16 text-3xl"
        />
        {sections.map((section, index) => (
          <SectionPost
            title={section.title}
            key={section.key}
            number={section.key}
            onDelete={() => deleteSection(index)} // Pass onDelete callback
          />
        ))}
      </form>
      <Button className=" w-fit " variant={"default"} onClick={addSections}>
        Add Section
      </Button>
    </main>
  );
};

export default page;
