import React from 'react';
import { Send, Sparkles, Edit3 } from 'lucide-react';

const StudioControlHeader = ({
  isEditMode,
  estimatedReadTime,
  wordCount,
  activeTab,
  setActiveTab,
  onSubmit,
  isLoading,
  isDisabled,
}) => {
  return (
    <div className="sticky top-[64px] z-40 bg-white/95 backdrop-blur-md border-b border-zinc-200 py-3 shadow-xs -mx-4 px-4 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
      <div className="max-w-3xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider flex items-center gap-1">
            {isEditMode ? <Edit3 className="w-3.5 h-3.5 text-zinc-400" /> : <Sparkles className="w-3.5 h-3.5 text-zinc-400" />}
            {isEditMode ? 'Edit Article' : 'Article Studio'}
          </span>
          <span className="text-zinc-300">•</span>
          <span className="text-xs font-semibold text-zinc-600">
            {estimatedReadTime} ({wordCount} words)
          </span>
        </div>

        <div className="flex items-center gap-3">
          {/* Write / Preview Tab Switcher */}
          <div className="flex items-center bg-zinc-100 p-1 rounded-lg border border-zinc-200">
            <button
              type="button"
              onClick={() => setActiveTab('edit')}
              className={`px-3.5 py-1 text-xs font-semibold rounded-md transition ${
                activeTab === 'edit'
                  ? 'bg-white text-zinc-900 shadow-xs'
                  : 'text-zinc-500 hover:text-zinc-900'
              }`}
            >
              Write
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('preview')}
              className={`px-3.5 py-1 text-xs font-semibold rounded-md transition ${
                activeTab === 'preview'
                  ? 'bg-white text-zinc-900 shadow-xs'
                  : 'text-zinc-500 hover:text-zinc-900'
              }`}
            >
              Preview
            </button>
          </div>

          {/* Submit Button */}
          <button
            type="button"
            onClick={onSubmit}
            disabled={isDisabled || isLoading}
            className="px-4 py-1.5 bg-zinc-900 text-white text-xs font-semibold rounded-lg hover:bg-zinc-800 transition disabled:opacity-40 flex items-center gap-1.5"
          >
            <Send className="w-3.5 h-3.5" />
            <span>
              {isLoading
                ? isEditMode ? 'Saving...' : 'Publishing...'
                : isEditMode ? 'Save Changes' : 'Publish Story'}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default StudioControlHeader;
