import React from 'react';
import { CATEGORY_IMAGE_CATALOG, FORM_CATEGORIES as CATEGORIES } from '../../utils/blogHelpers';

const CoverImageSelector = ({
  category,
  imageUrl,
  onSelectCategory,
  onSelectImageUrl,
}) => {
  const activePresets = CATEGORY_IMAGE_CATALOG[category] || CATEGORY_IMAGE_CATALOG.General;

  return (
    <div className="p-4 bg-zinc-50 rounded-xl border border-zinc-200/80 space-y-4 text-xs">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-zinc-700">Category:</span>
          <div className="flex items-center gap-1.5 flex-wrap">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => onSelectCategory(cat)}
                className={`px-3 py-1 rounded-md text-xs font-semibold transition border ${
                  category === cat
                    ? 'bg-zinc-900 text-white border-zinc-900 shadow-xs'
                    : 'bg-white text-zinc-600 border-zinc-200 hover:border-zinc-300'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Dynamic Category Cover Image Presets Grid */}
      <div className="space-y-3 pt-3 border-t border-zinc-200/80">
        <div className="flex items-center justify-between">
          <span className="font-semibold text-zinc-700">
            Select Cover Image for <span className="text-zinc-900 font-bold">{category}</span> (6 Presets Available):
          </span>
          <span className="text-zinc-400 text-[11px]">Click any thumbnail to pick custom cover</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2.5">
          {activePresets.map((preset) => {
            const isSelected = imageUrl === preset.url;
            return (
              <button
                key={preset.label}
                type="button"
                onClick={() => onSelectImageUrl(preset.url)}
                className={`group relative rounded-lg overflow-hidden border-2 transition aspect-[16/10] bg-zinc-100 ${
                  isSelected
                    ? 'border-zinc-900 ring-2 ring-zinc-900 ring-offset-1 scale-[1.02]'
                    : 'border-zinc-200 hover:border-zinc-400 opacity-85 hover:opacity-100'
                }`}
              >
                <img
                  src={preset.url}
                  alt={preset.label}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex items-end p-1.5">
                  <span className="text-[10px] font-semibold text-white leading-tight truncate">
                    {preset.label}
                  </span>
                </div>
                {isSelected && (
                  <div className="absolute top-1 right-1 w-4 h-4 bg-zinc-900 text-white rounded-full flex items-center justify-center text-[9px] font-bold shadow-xs">
                    ✓
                  </div>
                )}
              </button>
            );
          })}
        </div>

        {/* Custom Image URL Input */}
        <div className="pt-1">
          <input
            type="url"
            placeholder="Or paste custom image URL (https://...)"
            value={imageUrl}
            onChange={(e) => onSelectImageUrl(e.target.value)}
            className="w-full px-3 py-2 bg-white border border-zinc-200 rounded-lg text-zinc-800 text-xs outline-none focus:border-zinc-900 transition"
          />
        </div>

        {/* Live Selected Cover Preview */}
        {imageUrl && (
          <div className="relative rounded-lg overflow-hidden border border-zinc-200 aspect-[21/9] max-h-48 bg-zinc-100">
            <img
              src={imageUrl}
              alt="Selected Cover Preview"
              className="w-full h-full object-cover"
            />
            <div className="absolute top-2 left-2 bg-black/70 backdrop-blur-xs text-white text-[10px] font-semibold px-2.5 py-0.5 rounded">
              Selected Cover Preview ({category})
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CoverImageSelector;
