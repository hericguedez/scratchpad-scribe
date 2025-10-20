# Note Categories Component

A React/TypeScript component for scratchpad-scribe that enables users to organize notes with categories and tags.

## 📋 Description

The `NoteCategories` component provides an intuitive interface for managing note categories. Users can create, select, and remove categories to better organize their notes with a clean, modern UI that supports both light and dark themes.

## ✨ Features

- 🏷️ **Category Management**: Create, select, and remove categories
- 🎯 **Visual Selection**: Clear indication of selected categories
- 🔢 **Tag Limit**: Configurable maximum number of categories per note
- ⌨️ **Keyboard Support**: Enter to add, Escape to cancel
- 🎨 **Dark Mode Support**: Seamless light/dark theme integration
- 📱 **Responsive Design**: Works on all screen sizes
- ♿ **Accessible**: Proper ARIA labels and keyboard navigation
- 🎭 **Visual Feedback**: Hover states and smooth transitions

## 🚀 Usage

### Basic Implementation

```tsx
import NoteCategories from '@/components/NoteCategories';
import { useState } from 'react';

function NoteEditor() {
  const [categories] = useState(['Work', 'Personal', 'Ideas', 'Important']);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  return (
    <NoteCategories
      categories={categories}
      selectedCategories={selectedCategories}
      onCategorySelect={(category) => {
        setSelectedCategories([...selectedCategories, category]);
      }}
      onCategoryRemove={(category) => {
        setSelectedCategories(selectedCategories.filter(c => c !== category));
      }}
      onCategoryAdd={(category) => {
        // Add to your categories list
        console.log('New category:', category);
      }}
    />
  );
}
```

### With Custom Max Tags

```tsx
<NoteCategories
  categories={availableCategories}
  selectedCategories={selectedCategories}
  onCategorySelect={handleSelect}
  onCategoryRemove={handleRemove}
  onCategoryAdd={handleAdd}
  maxTags={3}  // Limit to 3 categories per note
/>
```

## 📦 Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `categories` | `string[]` | Yes | Array of available category names |
| `selectedCategories` | `string[]` | Yes | Array of currently selected categories |
| `onCategorySelect` | `(category: string) => void` | Yes | Callback when a category is selected |
| `onCategoryRemove` | `(category: string) => void` | Yes | Callback when a category is removed |
| `onCategoryAdd` | `(category: string) => void` | Yes | Callback when a new category is created |
| `maxTags` | `number` | No | Maximum categories per note (default: 5) |

## 🎨 UI Components

### Header Section
- Category icon and title
- Counter showing selected/max categories
- "New Category" button

### Selected Categories Display
- Blue-themed tags with # icon
- Remove button (X) for each tag
- Displayed in a separate highlighted section

### Add Category Input
- Text input with keyboard support
- Add and Cancel buttons
- Appears when "New Category" is clicked

### Available Categories Grid
- Visual grid of all categories
- Click to select/deselect
- Different styles for selected vs. available
- Disabled state when max reached

## 🎯 User Interactions

### Creating a Category
1. Click "New Category" button
2. Type category name
3. Press Enter or click "Add"
4. Category appears in available list

### Selecting a Category
1. Click on an available category
2. It moves to "selected" section
3. Visual style changes to indicate selection

### Removing a Category
1. Click X button on selected category
2. It returns to available categories
3. Counter updates

### Keyboard Shortcuts
- `Enter` - Confirm new category creation
- `Escape` - Cancel category creation

## 🎨 Styling

The component uses Tailwind CSS with dark mode support:

### Light Theme
- White/gray backgrounds
- Blue accents for selected items
- Clean borders and shadows

### Dark Theme
- Dark gray backgrounds (`dark:bg-gray-800`)
- Blue accents with adjusted opacity
- High contrast for readability

### States
- **Default**: Gray with subtle border
- **Selected**: Blue background with blue border
- **Hover**: Border highlight
- **Disabled**: Reduced opacity, no pointer

## 🔧 Technical Details

### Dependencies
- React
- TypeScript
- Tailwind CSS
- Lucide React icons (Tag, X, Plus, Hash)

### State Management
- Local state for "adding tag" mode
- Parent component manages categories list
- Props-based selection state

### Performance
- Efficient re-renders
- No unnecessary state updates
- Optimized event handlers

## 📱 Integration Example

```tsx
// In your note editor component
import NoteCategories from '@/components/NoteCategories';

export default function NoteEditor() {
  const [note, setNote] = useState({
    title: '',
    content: '',
    categories: []
  });

  const [allCategories, setAllCategories] = useState([
    'Work', 'Personal', 'Ideas', 'Tasks'
  ]);

  return (
    <div className="note-editor">
      {/* Title and content inputs */}
      
      <NoteCategories
        categories={allCategories}
        selectedCategories={note.categories}
        onCategorySelect={(cat) => {
          setNote({...note, categories: [...note.categories, cat]});
        }}
        onCategoryRemove={(cat) => {
          setNote({
            ...note,
            categories: note.categories.filter(c => c !== cat)
          });
        }}
        onCategoryAdd={(cat) => {
          setAllCategories([...allCategories, cat]);
        }}
      />
    </div>
  );
}
```

## 💡 Use Cases

- **Note Organization**: Categorize notes by topic
- **Filtering**: Filter notes by selected categories
- **Search Enhancement**: Search within specific categories
- **Quick Access**: Find related notes easily
- **Project Management**: Group notes by project

## 🔄 Future Enhancements

Potential additions:
- Category colors customization
- Category icons
- Drag and drop reordering
- Category descriptions
- Sub-categories support
- Bulk category operations
- Category usage statistics

## 👨‍💻 Author

**Ashvin**
- GitHub: [@ashvin2005](https://github.com/ashvin2005)
- LinkedIn: [ashvin-tiwari](https://linkedin.com/in/ashvin-tiwari)

## 🎃 Hacktoberfest 2025

Created as part of Hacktoberfest 2025 contributions to scratchpad-scribe.

## 📄 License

MIT License - Same as scratchpad-scribe project

---

Made with ❤️ for the scratchpad-scribe community