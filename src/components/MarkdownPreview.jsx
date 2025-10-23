// Markdown Preview with Live Split View
// Real-time markdown rendering with syntax highlighting

import React, { useState, useEffect } from 'react';
import { Eye, EyeOff, Columns, Maximize2 } from 'lucide-react';

export const MarkdownPreview = ({ content, isVisible, onToggle }) => {
  const [viewMode, setViewMode] = useState('split'); // 'split', 'preview', 'edit'

  // Simple markdown to HTML converter (for demonstration)
  const convertMarkdownToHTML = (markdown) => {
    if (!markdown) return '';

    let html = markdown;

    // Headers
    html = html.replace(/^### (.*$)/gim, '<h3 class="text-lg font-bold mt-4 mb-2 text-gray-900 dark:text-white">$1</h3>');
    html = html.replace(/^## (.*$)/gim, '<h2 class="text-xl font-bold mt-4 mb-2 text-gray-900 dark:text-white">$1</h2>');
    html = html.replace(/^# (.*$)/gim, '<h1 class="text-2xl font-bold mt-4 mb-2 text-gray-900 dark:text-white">$1</h1>');

    // Bold
    html = html.replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold">$1</strong>');
    html = html.replace(/__(.*?)__/g, '<strong class="font-bold">$1</strong>');

    // Italic
    html = html.replace(/\*(.*?)\*/g, '<em class="italic">$1</em>');
    html = html.replace(/_(.*?)_/g, '<em class="italic">$1</em>');

    // Links
    html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-blue-600 dark:text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">$1</a>');

    // Images
    html = html.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1" class="max-w-full h-auto rounded-lg my-2" />');

    // Code blocks
    html = html.replace(/```([\s\S]*?)```/g, '<pre class="bg-gray-100 dark:bg-gray-900 p-4 rounded-lg overflow-x-auto my-2"><code class="text-sm text-gray-800 dark:text-gray-200">$1</code></pre>');

    // Inline code
    html = html.replace(/`([^`]+)`/g, '<code class="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded text-sm text-red-600 dark:text-red-400">$1</code>');

    // Unordered lists
    html = html.replace(/^\- (.*$)/gim, '<li class="ml-4">$1</li>');
    html = html.replace(/(<li class="ml-4">.*<\/li>)/s, '<ul class="list-disc list-inside space-y-1 my-2 text-gray-700 dark:text-gray-300">$1</ul>');

    // Ordered lists  
    html = html.replace(/^\d+\. (.*$)/gim, '<li class="ml-4">$1</li>');

    // Checkboxes
    html = html.replace(/- \[ \] (.*$)/gim, '<li class="flex items-center space-x-2"><input type="checkbox" class="rounded" disabled /> <span>$1</span></li>');
    html = html.replace(/- \[x\] (.*$)/gim, '<li class="flex items-center space-x-2"><input type="checkbox" class="rounded" checked disabled /> <span class="line-through text-gray-500">$1</span></li>');

    // Blockquotes
    html = html.replace(/^> (.*$)/gim, '<blockquote class="border-l-4 border-gray-300 dark:border-gray-600 pl-4 italic text-gray-600 dark:text-gray-400 my-2">$1</blockquote>');

    // Horizontal rule
    html = html.replace(/^---$/gim, '<hr class="my-4 border-gray-300 dark:border-gray-600" />');

    // Line breaks
    html = html.replace(/\n/g, '<br />');

    return html;
  };

  if (!isVisible) return null;

  const htmlContent = convertMarkdownToHTML(content);

  return (
    <div className="border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900">
      {/* Preview Controls */}
      <div className="flex items-center justify-between px-4 py-2 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setViewMode('split')}
            className={`p-2 rounded transition-colors ${
              viewMode === 'split'
                ? 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400'
                : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
            title="Split view"
          >
            <Columns className="w-4 h-4" />
          </button>
          <button
            onClick={() => setViewMode('preview')}
            className={`p-2 rounded transition-colors ${
              viewMode === 'preview'
                ? 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400'
                : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
            title="Preview only"
          >
            <Eye className="w-4 h-4" />
          </button>
        </div>

        <button
          onClick={onToggle}
          className="p-2 rounded text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          title="Close preview"
        >
          <EyeOff className="w-4 h-4" />
        </button>
      </div>

      {/* Preview Content */}
      <div className={`overflow-y-auto ${viewMode === 'preview' ? 'h-96' : 'h-64'}`}>
        <div className="p-6">
          {content ? (
            <div 
              className="prose dark:prose-invert max-w-none"
              dangerouslySetInnerHTML={{ __html: htmlContent }}
            />
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <Maximize2 className="w-12 h-12 text-gray-300 dark:text-gray-600 mb-3" />
              <p className="text-gray-500 dark:text-gray-400">
                Start writing in markdown to see the preview
              </p>
              <p className="text-sm text-gray-400 dark:text-gray-500 mt-2">
                Supports headers, bold, italic, links, lists, code, and more
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Markdown Help */}
      <div className="px-4 py-2 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
        <details className="text-sm">
          <summary className="cursor-pointer text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200">
            Markdown Quick Reference
          </summary>
          <div className="mt-2 grid grid-cols-2 md:grid-cols-4 gap-4 text-xs text-gray-600 dark:text-gray-400">
            <div>
              <p className="font-semibold mb-1">Headers</p>
              <code># H1</code><br />
              <code>## H2</code><br />
              <code>### H3</code>
            </div>
            <div>
              <p className="font-semibold mb-1">Emphasis</p>
              <code>**bold**</code><br />
              <code>*italic*</code><br />
              <code>`code`</code>
            </div>
            <div>
              <p className="font-semibold mb-1">Lists</p>
              <code>- Item</code><br />
              <code>1. Item</code><br />
              <code>- [ ] Todo</code>
            </div>
            <div>
              <p className="font-semibold mb-1">Links</p>
              <code>[text](url)</code><br />
              <code>![alt](img.jpg)</code>
            </div>
          </div>
        </details>
      </div>
    </div>
  );
};

export default MarkdownPreview;
