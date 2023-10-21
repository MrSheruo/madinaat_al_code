"use client";
import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import "froala-editor/css/froala_style.min.css";
import "froala-editor/css/froala_editor.pkgd.min.css";
const FroalaEditorComponent = dynamic(() => import("react-froala-wysiwyg"), {
  ssr: false,
});
// import "froala-editor/js/plugins/save.min.js";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

type Props = {
  number: number;
  title: string;
  onDelete: () => void; // Callback function to handle section deletion
};

const SectionPost = (props: Props) => {
  const [model, setModel] = useState("");
  useEffect(() => {
    console.log(model);
  }, [model]);
  return (
    <>
      <div className="flex flex-col justify-start w-fit gap-4 p-4 border border-[#222] rounded-2xl bg-white">
        <Input
          placeholder={`Title of ${props.title}`}
          type="text"
          className="w-[30ch] border-[#222]"
        />
        <FroalaEditorComponent
          model={model}
          onModelChange={(e: string) => setModel(e)}
          tag="textarea"
          config={{
            placeholderText: "Section Description",
            saveInterval: 2000,
            charCounterCount: true,
          }}
        />
        <Button
          className=" w-fit "
          variant={"destructive"}
          onClick={props.onDelete} // Use the provided onDelete callback
        >
          Delete Section
        </Button>
      </div>
      <div dangerouslySetInnerHTML={{ __html: model }}></div>
    </>
  );
};

export default SectionPost;
