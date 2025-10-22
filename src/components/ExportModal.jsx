// Note Export Feature Component
// Allows users to export notes in multiple formats (JSON, TXT, MD, PDF)

import React, { useState } from 'react';
import { Download, FileText, File, FileJson } from 'lucide-react';

export const ExportModal = ({ isOpen, onClose, notes }) => {
  const [exportFormat, setExportFormat] = useState('json');
  const [selectedNotes, setSelectedNotes] = useState('all');

  if (!isOpen) return null;

  const exportFormats = [
    { id: 'json', name: 'JSON', icon: FileJson, description: 'Machine-readable format' },
    { id: 'txt', name: 'Plain Text', icon: FileText, description: 'Simple text file' },
    { id: 'md', name: 'Markdown', icon: File, description: 'Formatted text' },
  ];

  const handleExport = () => {
    const notesToExport = selectedNotes === 'all' ? notes : notes.filter(note => note.selected);
    
    let content = '';
    let filename = '';
    let mimeType = '';

    switch (exportFormat) {
      case 'json':
        content = JSON.stringify(notesToExport, null, 2);
        filename = `notes-export-${Date.now()}.json`;
        mimeType = 'application/json';
        break;

      case 'txt':
        content = notesToExport
          .map(note => `Title: ${note.title}\nDate: ${note.date}\n\n${note.content}\n\n${'='.repeat(50)}\n`)
          .join('\n');
        filename = `notes-export-${Date.now()}.txt`;
        mimeType = 'text/plain';
        break;

      case 'md':
        content = notesToExport
          .map(note => `# ${note.title}\n\n*${note.date}*\n\n${note.content}\n\n---\n`)
          .join('\n');
        filename = `notes-export-${Date.now()}.md`;
        mimeType = 'text/markdown';
        break;

      default:
        return;
    }

    // Create blob and download
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full mx-4">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Export Notes
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Select Notes */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Select Notes
            </label>
            <div className="space-y-2">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="notes"
                  value="all"
                  checked={selectedNotes === 'all'}
                  onChange={(e) => setSelectedNotes(e.target.value)}
                  className="mr-2"
                />
                <span className="text-gray-700 dark:text-gray-300">
                  All Notes ({notes.length})
                </span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="notes"
                  value="selected"
                  checked={selectedNotes === 'selected'}
                  onChange={(e) => setSelectedNotes(e.target.value)}
                  className="mr-2"
                />
                <span className="text-gray-700 dark:text-gray-300">
                  Selected Notes
                </span>
              </label>
            </div>
          </div>

          {/* Export Format */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
              Export Format
            </label>
            <div className="space-y-3">
              {exportFormats.map((format) => {
                const Icon = format.icon;
                return (
                  <label
                    key={format.id}
                    className={`flex items-center p-3 border-2 rounded-lg cursor-pointer transition-all ${
                      exportFormat === format.id
                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                        : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
                    }`}
                  >
                    <input
                      type="radio"
                      name="format"
                      value={format.id}
                      checked={exportFormat === format.id}
                      onChange={(e) => setExportFormat(e.target.value)}
                      className="mr-3"
                    />
                    <Icon className="w-5 h-5 mr-2 text-gray-600 dark:text-gray-400" />
                    <div className="flex-1">
                      <div className="font-medium text-gray-900 dark:text-white">
                        {format.name}
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        {format.description}
                      </div>
                    </div>
                  </label>
                );
              })}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-3">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleExport}
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center"
            >
              <Download className="w-4 h-4 mr-2" />
              Export
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExportModal;
