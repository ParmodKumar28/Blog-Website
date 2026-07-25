import React, { useState } from 'react';
import { createBlogAsync, blogsSelector } from '../../Redux/reducers/blogsReducer';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Send, Sparkles } from 'lucide-react';
import FormattedContent from '../common/FormattedContent';
import ProRichTextEditor from '../common/ProRichTextEditor';

const PRESET_IMAGES = [
  { label: "Engineering", url: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80" },
  { label: "Code", url: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80" },
  { label: "AI & Tech", url: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80" },
  { label: "Workspace", url: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=1200&q=80" },
  { label: "Design System", url: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1200&q=80" },
  { label: "Minimalist", url: "https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?auto=format&fit=crop&w=1200&q=80" },
];

const CATEGORIES = ["Tech", "Design", "AI", "Tutorials", "Lifestyle", "General"];

const PostForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading } = useSelector(blogsSelector);

  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [category, setCategory] = useState('Tech');
  const [imageUrl, setImageUrl] = useState(PRESET_IMAGES[0].url);
  const [content, setContent] = useState('');
  const [activeTab, setActiveTab] = useState('edit');

  // Strip HTML for accurate word count
  const plainText = content ? content.replace(/<[^>]*>/g, ' ').trim() : '';
  const wordCount = plainText ? plainText.split(/\s+/).filter(Boolean).length : 0;
  const estimatedReadTime = `${Math.max(1, Math.ceil(wordCount / 200))} min read`;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !plainText) {
      toast.warn("Please enter both a title and article content before publishing.");
      return;
    }

    const blogData = {
      title,
      subtitle,
      category,
      imageUrl,
      content,
      readTime: estimatedReadTime,
    };

    try {
      await dispatch(createBlogAsync(blogData)).unwrap();
      navigate("/");
    } catch (err) {
      // Toast notification handled in thunk
    }
  };

  return (
    <div className="min-h-screen bg-white py-6 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-3xl mx-auto space-y-6">

        {/* STICKY TOP CONTROL HEADER (Write / Preview Tabs & Publish Button) */}
        <div className="sticky top-[64px] z-40 bg-white/95 backdrop-blur-md border-b border-zinc-200 py-3 shadow-xs -mx-4 px-4 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
          <div className="max-w-3xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-zinc-400" />
                Article Studio
              </span>
              <span className="text-zinc-300">•</span>
              <span className="text-xs font-semibold text-zinc-600">
                {estimatedReadTime} ({wordCount} words)
              </span>
            </div>

            <div className="flex items-center gap-3">
              {/* Sticky Write / Preview Tab Switcher */}
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

              {/* Sticky Publish Button */}
              <button
                type="button"
                onClick={handleSubmit}
                disabled={isLoading || !title.trim() || !plainText}
                className="px-4 py-1.5 bg-zinc-900 text-white text-xs font-semibold rounded-lg hover:bg-zinc-800 transition disabled:opacity-40 flex items-center gap-1.5"
              >
                <Send className="w-3.5 h-3.5" />
                <span>{isLoading ? 'Publishing...' : 'Publish Story'}</span>
              </button>
            </div>
          </div>
        </div>

        {activeTab === 'edit' ? (
          <div className="space-y-6 pt-2">

            {/* Title & Subtitle */}
            <div className="space-y-3">
              <input
                type="text"
                required
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full text-3xl sm:text-4xl font-bold font-serif-editorial text-zinc-900 placeholder:text-zinc-300 border-none outline-none bg-transparent"
              />
              <input
                type="text"
                placeholder="Subtitle or short overview..."
                value={subtitle}
                onChange={(e) => setSubtitle(e.target.value)}
                className="w-full text-lg font-serif-editorial italic text-zinc-600 placeholder:text-zinc-300 border-none outline-none bg-transparent"
              />
            </div>

            {/* Metadata Options: Category & Cover Image */}
            <div className="p-4 bg-zinc-50 rounded-xl border border-zinc-200/80 space-y-4 text-xs">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-zinc-700">Category:</span>
                  <div className="flex items-center gap-1.5 flex-wrap">
                    {CATEGORIES.map((cat) => (
                      <button
                        key={cat}
                        type="button"
                        onClick={() => setCategory(cat)}
                        className={`px-2.5 py-1 rounded-md text-xs font-semibold transition border ${
                          category === cat
                            ? 'bg-zinc-900 text-white border-zinc-900'
                            : 'bg-white text-zinc-600 border-zinc-200 hover:border-zinc-300'
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Cover Image Input & Visual Presets */}
              <div className="space-y-3 pt-3 border-t border-zinc-200/80">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-zinc-700">Cover Image:</span>
                  <span className="text-zinc-400 text-[11px]">Click a thumbnail below or enter custom URL</span>
                </div>
                
                {/* Visual Image Thumbnail Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2.5">
                  {PRESET_IMAGES.map((preset) => {
                    const isSelected = imageUrl === preset.url;
                    return (
                      <button
                        key={preset.label}
                        type="button"
                        onClick={() => setImageUrl(preset.url)}
                        className={`group relative rounded-lg overflow-hidden border-2 transition aspect-[16/10] bg-zinc-100 ${
                          isSelected
                            ? 'border-zinc-900 ring-2 ring-zinc-900 ring-offset-1 scale-[1.02]'
                            : 'border-zinc-200 hover:border-zinc-400 opacity-80 hover:opacity-100'
                        }`}
                      >
                        <img
                          src={preset.url}
                          alt={preset.label}
                          className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-1.5">
                          <span className="text-[10px] font-semibold text-white leading-tight truncate">
                            {preset.label}
                          </span>
                        </div>
                        {isSelected && (
                          <div className="absolute top-1 right-1 w-4 h-4 bg-zinc-900 text-white rounded-full flex items-center justify-center text-[9px] font-bold">
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
                    onChange={(e) => setImageUrl(e.target.value)}
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
                      onError={(e) => {
                        e.target.src = 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=1200&q=80';
                      }}
                    />
                    <div className="absolute top-2 left-2 bg-black/60 backdrop-blur-xs text-white text-[10px] font-semibold px-2 py-0.5 rounded">
                      Selected Cover Preview
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* PRO WYSIWYG RICH TEXT EDITOR */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-zinc-700 uppercase tracking-wider">
                Article Story Content
              </label>
              <ProRichTextEditor
                value={content}
                onChange={setContent}
                placeholder="Start typing your article..."
              />
            </div>

          </div>
        ) : (
          /* Reader Preview Mode */
          <div className="space-y-6 pt-4">
            {imageUrl && (
              <div className="w-full h-64 sm:h-80 rounded-xl overflow-hidden bg-zinc-100 border border-zinc-200">
                <img
                  src={imageUrl}
                  alt={title || 'Preview'}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <span className="tag-pill">{category}</span>
                <span className="text-xs text-zinc-400">{estimatedReadTime}</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-bold font-serif-editorial text-zinc-900">
                {title || 'Untitled Article'}
              </h1>
              {subtitle && (
                <p className="text-lg font-serif-editorial italic text-zinc-600">
                  {subtitle}
                </p>
              )}
              <hr className="border-zinc-200 my-4" />
              
              {/* Formatted Content Live Rendering */}
              {plainText ? (
                <FormattedContent content={content} />
              ) : (
                <p className="text-zinc-400 font-serif-editorial italic">
                  Start typing in the Write tab to preview article body text.
                </p>
              )}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default PostForm;
