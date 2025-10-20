import React, { useState } from 'react';
import { Tag, X, Plus, Hash } from 'lucide-react';

interface NoteCategoriesProps {
  categories: string[];
  selectedCategories: string[];
  onCategorySelect: (category: string) => void;
  onCategoryRemove: (category: string) => void;
  onCategoryAdd: (category: string) => void;
  maxTags?: number;
}

const NoteCategories: React.FC<NoteCategoriesProps> = ({
  categories,
  selectedCategories,
  onCategorySelect,
  onCategoryRemove,
  onCategoryAdd,
  maxTags = 5
}) => {
  const [isAddingTag, setIsAddingTag] = useState(false);
  const [newTagName, setNewTagName] = useState('');

  const handleAddTag = () => {
    if (newTagName.trim() && !categories.includes(newTagName.trim())) {
      onCategoryAdd(newTagName.trim());
      setNewTagName('');
      setIsAddingTag(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleAddTag();
    } else if (e.key === 'Escape') {
      setNewTagName('');
      setIsAddingTag(false);
    }
  };

  const isSelected = (category: string) => selectedCategories.includes(category);
  const canAddMore = selectedCategories.length < maxTags;

  return (
    <div className="w-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Tag className="w-4 h-4 text-gray-400" />
          <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Categories
          </h3>
          <span className="text-xs text-gray-400">
            ({selectedCategories.length}/{maxTags})
          </span>
        </div>
        {!isAddingTag && (
          <button
            onClick={() => setIsAddingTag(true)}
            className="flex items-center gap-1 text-xs text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
          >
            <Plus className="w-3 h-3" />
            New Category
          </button>
        )}
      </div>

      {/* Selected Categories */}
      {selectedCategories.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-3 p-2 bg-gray-50 dark:bg-gray-800 rounded-lg">
          {selectedCategories.map((category) => (
            <div
              key={category}
              className="flex items-center gap-1 px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-sm"
            >
              <Hash className="w-3 h-3" />
              <span>{category}</span>
              <button
                onClick={() => onCategoryRemove(category)}
                className="ml-1 hover:bg-blue-200 dark:hover:bg-blue-800 rounded-full p-0.5 transition-colors"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Add New Category Input */}
      {isAddingTag && (
        <div className="mb-3 flex gap-2">
          <input
            type="text"
            value={newTagName}
            onChange={(e) => setNewTagName(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Enter category name..."
            className="flex-1 px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            autoFocus
          />
          <button
            onClick={handleAddTag}
            className="px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
          >
            Add
          </button>
          <button
            onClick={() => {
              setNewTagName('');
              setIsAddingTag(false);
            }}
            className="px-3 py-2 bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-200 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors text-sm"
          >
            Cancel
          </button>
        </div>
      )}

      {/* Available Categories */}
      <div className="space-y-2">
        <p className="text-xs text-gray-500 dark:text-gray-400">
          Available Categories:
        </p>
        <div className="flex flex-wrap gap-2">
          {categories.length === 0 ? (
            <p className="text-xs text-gray-400 italic">
              No categories yet. Create one to get started!
            </p>
          ) : (
            categories.map((category) => (
              <button
                key={category}
                onClick={() => {
                  if (isSelected(category)) {
                    onCategoryRemove(category);
                  } else if (canAddMore) {
                    onCategorySelect(category);
                  }
                }}
                disabled={!isSelected(category) && !canAddMore}
                className={`
                  flex items-center gap-1 px-3 py-1 rounded-full text-sm transition-all
                  ${isSelected(category)
                    ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border-2 border-blue-500'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 border-2 border-transparent hover:border-gray-300 dark:hover:border-gray-500'
                  }
                  ${!isSelected(category) && !canAddMore ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
                `}
              >
                <Hash className="w-3 h-3" />
                <span>{category}</span>
              </button>
            ))
          )}
        </div>
      </div>

      {/* Max Tags Warning */}
      {!canAddMore && (
        <p className="text-xs text-orange-500 dark:text-orange-400 mt-2">
          Maximum {maxTags} categories reached. Remove one to add another.
        </p>
      )}
    </div>
  );
};

export default NoteCategories;