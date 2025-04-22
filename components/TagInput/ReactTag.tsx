import React from 'react';
import { createRoot } from 'react-dom/client';
import { StrictMode } from 'react';
import type { Tag } from"react-tag-input";
import { WithContext as ReactTags, SEPARATORS } from "react-tag-input";
;
const SUGGESTIONS = ["Bathub", "Garden", "Kitchen", "Living Room", "Bedroom", "Dining Room", "Office", "Garage", "Basement", "Attic"];
const suggestions = SUGGESTIONS.map((item) => {
  return {
    id: item,
    text: item,
    className: '',
  };
});

const KeyCodes = {
  comma: 188,
  enter: [10, 13],
};

const ReactTag = () => {
  const [tags, setTags] = React.useState<Array<Tag>>(suggestions);

  const handleDelete = (index: number) => {
    setTags(tags.filter((_, i) => i !== index));
  };

  const onTagUpdate = (index: number, newTag: Tag) => {
    const updatedTags = [...tags];
    updatedTags.splice(index, 1, newTag);
    setTags(updatedTags);
  };

  const handleAddition = (tag: Tag) => {
    setTags((prevTags) => {
      return [...prevTags, tag];
    });
  };

  const handleDrag = (tag: Tag, currPos: number, newPos: number) => {
    const newTags = tags.slice();

    newTags.splice(currPos, 1);
    newTags.splice(newPos, 0, tag);

    // re-render
    setTags(newTags);
  };

  const handleTagClick = (index: number) => {
    console.log('The tag at index ' + index + ' was clicked');
  };

  const onClearAll = () => {
    setTags([]);
  };

  return (
    <div className="app">

      <h1> React Tags Example </h1>
      <div>
        <ReactTags
          tags={tags}
          suggestions={suggestions}
          separators={[SEPARATORS.ENTER, SEPARATORS.COMMA]}
          handleDelete={handleDelete}
          handleAddition={handleAddition}
          handleDrag={handleDrag}
          handleTagClick={handleTagClick}
          onTagUpdate={onTagUpdate}
          inputFieldPosition="bottom"
          editable
          clearAll
          onClearAll={onClearAll}
          maxTags={7}
        />
      </div>
    </div>
  );
};

export default ReactTag;