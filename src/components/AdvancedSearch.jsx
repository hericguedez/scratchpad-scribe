// Advanced Search and Filter Component
// Provides powerful search capabilities with filters and sorting

import React, { useState, useEffect } from 'react';
import { Search, Filter, SortAsc, SortDesc, Calendar, Tag, X } from 'lucide-react';

export const AdvancedSearch = ({ notes, onFilteredResults, categories }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    category: 'all',
    dateRange: 'all',
    sortBy: 'date',
    sortOrder: 'desc',
  });

  const dateRanges = [
    { id: 'all', label: 'All Time' },
    { id: 'today', label: 'Today' },
    { id: 'week', label: 'This Week' },
    { id: 'month', label: 'This Month' },
    { id: 'year', label: 'This Year' },
  ];

  const sortOptions = [
    { id: 'date', label: 'Date Modified' },
    { id: 'title', label: 'Title' },
    { id: 'category', label: 'Category' },
  ];

  useEffect(() => {
    filterNotes();
  }, [searchQuery, filters, notes]);

  const filterNotes = () => {
    let filtered = [...notes];

    // Text search
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (note) =>
          note.title.toLowerCase().includes(query) ||
          note.content.toLowerCase().includes(query) ||
          (note.tags && note.tags.some(tag => tag.toLowerCase().includes(query)))
      );
    }

    // Category filter
    if (filters.category !== 'all') {
      filtered = filtered.filter((note) => note.category === filters.category);
    }

    // Date range filter
    if (filters.dateRange !== 'all') {
      const now = new Date();
      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

      filtered = filtered.filter((note) => {
        const noteDate = new Date(note.date);

        switch (filters.dateRange) {
          case 'today':
            return noteDate >= today;
          case 'week':
            const weekAgo = new Date(today);
            weekAgo.setDate(weekAgo.getDate() - 7);
            return noteDate >= weekAgo;
          case 'month':
            const monthAgo = new Date(today);
            monthAgo.setMonth(monthAgo.getMonth() - 1);
            return noteDate >= monthAgo;
          case 'year':
            const yearAgo = new Date(today);
            yearAgo.setFullYear(yearAgo.getFullYear() - 1);
            return noteDate >= yearAgo;
          default:
            return true;
        }
      });
    }

    // Sort
    filtered.sort((a, b) => {
      let compareA, compareB;

      switch (filters.sortBy) {
        case 'date':
          compareA = new Date(a.date);
          compareB = new Date(b.date);
          break;
        case 'title':
          compareA = a.title.toLowerCase();
          compareB = b.title.toLowerCase();
          break;
        case 'category':
          compareA = a.category || '';
          compareB = b.category || '';
          break;
        default:
          return 0;
      }

      if (compareA < compareB) return filters.sortOrder === 'asc' ? -1 : 1;
      if (compareA > compareB) return filters.sortOrder === 'asc' ? 1 : -1;
      return 0;
    });

    onFilteredResults(filtered);
  };

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setSearchQuery('');
    setFilters({
      category: 'all',
      dateRange: 'all',
      sortBy: 'date',
      sortOrder: 'desc',
    });
  };

  const hasActiveFilters = 
    searchQuery.trim() !== '' ||
    filters.category !== 'all' ||
    filters.dateRange !== 'all';

  return (
    <div className="w-full space-y-4">
      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search notes by title, content, or tags..."
          className="w-full pl-10 pr-24 py-3 border border-gray-300 dark:border-gray-600 rounded-lg 
                   bg-white dark:bg-gray-800 text-gray-900 dark:text-white
                   focus:ring-2 focus:ring-blue-500 focus:border-transparent
                   transition-all"
        />
        <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex space-x-2">
          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 
                       hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors"
              title="Clear filters"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`p-2 rounded-md transition-colors ${
              showFilters
                ? 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400'
                : 'text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
            title="Toggle filters"
          >
            <Filter className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Filters Panel */}
      {showFilters && (
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Category Filter */}
            <div>
              <label className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                <Tag className="w-4 h-4 mr-1" />
                Category
              </label>
              <select
                value={filters.category}
                onChange={(e) => handleFilterChange('category', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md
                         bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                         focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Categories</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            {/* Date Range Filter */}
            <div>
              <label className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                <Calendar className="w-4 h-4 mr-1" />
                Date Range
              </label>
              <select
                value={filters.dateRange}
                onChange={(e) => handleFilterChange('dateRange', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md
                         bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                         focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {dateRanges.map((range) => (
                  <option key={range.id} value={range.id}>
                    {range.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort Options */}
            <div>
              <label className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {filters.sortOrder === 'asc' ? (
                  <SortAsc className="w-4 h-4 mr-1" />
                ) : (
                  <SortDesc className="w-4 h-4 mr-1" />
                )}
                Sort By
              </label>
              <div className="flex space-x-2">
                <select
                  value={filters.sortBy}
                  onChange={(e) => handleFilterChange('sortBy', e.target.value)}
                  className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md
                           bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                           focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {sortOptions.map((option) => (
                    <option key={option.id} value={option.id}>
                      {option.label}
                    </option>
                  ))}
                </select>
                <button
                  onClick={() =>
                    handleFilterChange('sortOrder', filters.sortOrder === 'asc' ? 'desc' : 'asc')
                  }
                  className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md
                           bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300
                           hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
                  title={`Sort ${filters.sortOrder === 'asc' ? 'descending' : 'ascending'}`}
                >
                  {filters.sortOrder === 'asc' ? (
                    <SortAsc className="w-5 h-5" />
                  ) : (
                    <SortDesc className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Active Filters Display */}
          {hasActiveFilters && (
            <div className="pt-3 border-t border-gray-200 dark:border-gray-700">
              <div className="flex items-center flex-wrap gap-2">
                <span className="text-sm text-gray-500 dark:text-gray-400">Active filters:</span>
                {searchQuery.trim() && (
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs 
                                 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200">
                    Search: "{searchQuery}"
                  </span>
                )}
                {filters.category !== 'all' && (
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs 
                                 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200">
                    Category: {filters.category}
                  </span>
                )}
                {filters.dateRange !== 'all' && (
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs 
                                 bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200">
                    {dateRanges.find(r => r.id === filters.dateRange)?.label}
                  </span>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AdvancedSearch;
