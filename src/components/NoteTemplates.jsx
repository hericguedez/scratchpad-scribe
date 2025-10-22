// Note Templates Feature
// Provides predefined templates for common note types

import React, { useState } from 'react';
import { 
  FileText, CheckSquare, Calendar, Code, Briefcase, 
  Book, Heart, ShoppingCart, Lightbulb, X 
} from 'lucide-react';

export const NoteTemplates = ({ isOpen, onClose, onSelectTemplate }) => {
  if (!isOpen) return null;

  const templates = [
    {
      id: 'blank',
      name: 'Blank Note',
      icon: FileText,
      category: 'Basic',
      color: 'gray',
      content: {
        title: 'Untitled Note',
        content: '',
      },
    },
    {
      id: 'todo',
      name: 'To-Do List',
      icon: CheckSquare,
      category: 'Productivity',
      color: 'blue',
      content: {
        title: 'To-Do List',
        content: `# Tasks for Today

## High Priority
- [ ] 
- [ ] 

## Medium Priority
- [ ] 
- [ ] 

## Low Priority
- [ ] 
- [ ] 

---
*Created: ${new Date().toLocaleDateString()}*`,
      },
    },
    {
      id: 'meeting',
      name: 'Meeting Notes',
      icon: Calendar,
      category: 'Work',
      color: 'purple',
      content: {
        title: 'Meeting Notes',
        content: `# Meeting Notes

**Date:** ${new Date().toLocaleDateString()}
**Time:** ${new Date().toLocaleTimeString()}
**Attendees:** 

## Agenda
1. 
2. 
3. 

## Discussion Points
- 

## Action Items
- [ ] 
- [ ] 

## Next Meeting
**Date:** 
**Topics:** `,
      },
    },
    {
      id: 'project',
      name: 'Project Plan',
      icon: Briefcase,
      category: 'Work',
      color: 'indigo',
      content: {
        title: 'Project Plan',
        content: `# Project Name

## Overview
Brief description of the project

## Objectives
- 
- 
- 

## Timeline
**Start Date:** 
**End Date:** 
**Milestones:** 
- 

## Resources
**Team Members:** 
**Budget:** 
**Tools:** 

## Deliverables
1. 
2. 
3. 

## Risks & Mitigation
- Risk: 
  Mitigation: 

## Success Criteria
- `,
      },
    },
    {
      id: 'code-snippet',
      name: 'Code Snippet',
      icon: Code,
      category: 'Development',
      color: 'green',
      content: {
        title: 'Code Snippet',
        content: `# Code Snippet

**Language:** 
**Purpose:** 

## Code
\`\`\`
// Your code here
\`\`\`

## Usage
\`\`\`
// Example usage
\`\`\`

## Notes
- 
- 

**Tags:** #code #development`,
      },
    },
    {
      id: 'study',
      name: 'Study Notes',
      icon: Book,
      category: 'Education',
      color: 'yellow',
      content: {
        title: 'Study Notes',
        content: `# Subject: 

## Topic: 

## Key Concepts
1. **Concept 1:** 
2. **Concept 2:** 
3. **Concept 3:** 

## Important Definitions
- **Term:** Definition

## Examples
- 

## Questions
- [ ] 
- [ ] 

## References
- 
- 

**Date:** ${new Date().toLocaleDateString()}`,
      },
    },
    {
      id: 'journal',
      name: 'Daily Journal',
      icon: Heart,
      category: 'Personal',
      color: 'pink',
      content: {
        title: `Journal - ${new Date().toLocaleDateString()}`,
        content: `# Daily Journal

**Date:** ${new Date().toLocaleDateString()}
**Mood:** ⭐⭐⭐⭐⭐

## Today's Highlights
- 
- 
- 

## Gratitude
What I'm grateful for today:
1. 
2. 
3. 

## Challenges
- 

## Tomorrow's Goals
- [ ] 
- [ ] 

## Random Thoughts
`,
      },
    },
    {
      id: 'shopping',
      name: 'Shopping List',
      icon: ShoppingCart,
      category: 'Personal',
      color: 'orange',
      content: {
        title: 'Shopping List',
        content: `# Shopping List

**Date:** ${new Date().toLocaleDateString()}

## Groceries
- [ ] 
- [ ] 

## Household Items
- [ ] 
- [ ] 

## Personal Care
- [ ] 
- [ ] 

## Other
- [ ] 
- [ ] 

---
**Estimated Total:** $
**Store:** `,
      },
    },
    {
      id: 'brainstorm',
      name: 'Brainstorm',
      icon: Lightbulb,
      category: 'Ideas',
      color: 'teal',
      content: {
        title: 'Brainstorming Session',
        content: `# Brainstorming: 

**Date:** ${new Date().toLocaleDateString()}
**Goal:** 

## Ideas
1. 
2. 
3. 
4. 
5. 

## Promising Concepts
⭐ 
⭐ 

## Next Steps
- [ ] 
- [ ] 

## Resources Needed
- 
- `,
      },
    },
  ];

  const categories = [...new Set(templates.map(t => t.category))];
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredTemplates = selectedCategory === 'all'
    ? templates
    : templates.filter(t => t.category === selectedCategory);

  const colorClasses = {
    gray: 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600',
    blue: 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 hover:bg-blue-200 dark:hover:bg-blue-800',
    purple: 'bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 hover:bg-purple-200 dark:hover:bg-purple-800',
    indigo: 'bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300 hover:bg-indigo-200 dark:hover:bg-indigo-800',
    green: 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 hover:bg-green-200 dark:hover:bg-green-800',
    yellow: 'bg-yellow-100 dark:bg-yellow-900 text-yellow-700 dark:text-yellow-300 hover:bg-yellow-200 dark:hover:bg-yellow-800',
    pink: 'bg-pink-100 dark:bg-pink-900 text-pink-700 dark:text-pink-300 hover:bg-pink-200 dark:hover:bg-pink-800',
    orange: 'bg-orange-100 dark:bg-orange-900 text-orange-700 dark:text-orange-300 hover:bg-orange-200 dark:hover:bg-orange-800',
    teal: 'bg-teal-100 dark:bg-teal-900 text-teal-700 dark:text-teal-300 hover:bg-teal-200 dark:hover:bg-teal-800',
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Choose a Template
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                Start with a pre-formatted template to save time
              </p>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-2 mt-4">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                selectedCategory === 'all'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              All Templates
            </button>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === category
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Templates Grid */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredTemplates.map((template) => {
              const Icon = template.icon;
              return (
                <button
                  key={template.id}
                  onClick={() => onSelectTemplate(template.content)}
                  className={`p-4 rounded-lg border-2 border-transparent transition-all 
                            hover:scale-105 hover:shadow-lg text-left
                            ${colorClasses[template.color]}`}
                >
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0">
                      <Icon className="w-6 h-6" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold truncate">{template.name}</h3>
                      <p className="text-xs mt-1 opacity-75">{template.category}</p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoteTemplates;
