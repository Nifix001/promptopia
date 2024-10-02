'use client'

import PromptCard from './PromptCard';

const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className="mt-16 prompt_layout">
      {data.length > 0 ? (
        data.map((post) => (
          <PromptCard 
            key={post._id}
            post={post}
            handleTagClick={handleTagClick}
          />
        ))
      ) : (
        <p>No prompts available</p>
      )}
    </div>
  );
}

export default PromptCardList;
