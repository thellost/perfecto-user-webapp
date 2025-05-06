import { set } from "lodash";
import React, { useState } from "react";

const useTagInput = (maxTags = 5) => {
  // Keep track of the tags array.

  const [tags, setTags] = useState<string[]>([]);

  // Function to handle adding the tag to the array

  const handleAddTag = (newTag: string) => {
    if (newTag && !tags.includes(newTag) && tags.length < maxTags) {
      console.log("Adding tag:", newTag); // Debugging line
      console.log("Current tags:", tags); // Debugging line
      setTags([...tags, newTag]); // Debugging line
    }
  };

  function changeTags (newTags: string[])  {
    setTags(newTags);
  }

  // Function to remove tag from array
  const handleRemoveTag = (tag: string) =>
    setTags(tags.filter((t) => t !== tag));

  // Return tags and functions from the hook

  return { tags, handleAddTag, handleRemoveTag, changeTags };
};

export default useTagInput;