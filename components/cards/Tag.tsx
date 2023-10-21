import React from "react";

const classes = ` font-semibold py-1 px-2 rounded-lg hover:shadow-lg transition duration-300 ease-in-out  flex items-center justify-center `;
type TagProps = {
  tag: string;
  isSelected: boolean;
  setSelectedTags: (prev: any) => void;
};
const Tag = ({ tag, isSelected, setSelectedTags }: TagProps) => {
  if (isSelected) {
    return (
      <div
        onClick={() => {
          setSelectedTags((prev: any) =>
            prev.filter((tag: any) => tag !== tag)
          );
        }}
        className={`${classes} bg-green-600 text-white`}
      >
        {tag}
      </div>
    );
  }
  return (
    <button
      onClick={() => {
        setSelectedTags([tag]);
      }}
      className={`${classes} bg-gray-200 text-gray-600`}
    >
      {tag}
    </button>
  );
};

export default Tag;
