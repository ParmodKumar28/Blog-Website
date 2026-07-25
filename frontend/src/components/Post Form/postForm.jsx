import React, { useState, useEffect } from 'react';
import { createBlogAsync, updateBlogAsync, fetchBlogByIdAsync, blogsSelector } from '../../Redux/reducers/blogsReducer';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Send, Sparkles, Edit3 } from 'lucide-react';
import FormattedContent from '../common/FormattedContent';
import ProRichTextEditor from '../common/ProRichTextEditor';
import { CATEGORY_IMAGE_CATALOG, FORM_CATEGORIES as CATEGORIES } from '../../utils/blogHelpers';

const PostForm = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { blog, isLoading } = useSelector(blogsSelector);

  const isEditMode = Boolean(id);

  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [category, setCategory] = useState('Tech');
  const [imageUrl, setImageUrl] = useState(CATEGORY_IMAGE_CATALOG.Tech[0].url);
  const [content, setContent] = useState('');
  const [activeTab, setActiveTab] = useState('edit');

  // Fetch blog data if in Edit mode
  useEffect(() => {
    if (isEditMode && id) {
      dispatch(fetchBlogByIdAsync(id));
    }
  }, [dispatch, id, isEditMode]);

  // Pre-populate fields when editing
  useEffect(() => {
    if (isEditMode && blog) {
      setTitle(blog.title || '');
      setSubtitle(blog.subtitle || '');
      setCategory(blog.category || 'Tech');
      setImageUrl(blog.imageUrl || CATEGORY_IMAGE_CATALOG.Tech[0].url);
      setContent(blog.content || '');
    }
  }, [isEditMode, blog]);

  // Dynamic image choices for currently selected category
  const activePresets = CATEGORY_IMAGE_CATALOG[category] || CATEGORY_IMAGE_CATALOG.General;

  // Accurate read time calculation (~200 words/min)
  const plainText = content ? content.replace(/<[^>]*>/g, ' ').replace(/[#*`_~>-]/g, '').trim() : '';
  const wordCount = plainText ? plainText.split(/\s+/).filter(Boolean).length : 0;
  const minutes = Math.max(1, Math.ceil(wordCount / 200));
  const estimatedReadTime = `${minutes} min read`;

  // Change Category AND auto-select first cover image for that category
  const handleCategorySelect = (cat) => {
    setCategory(cat);
    const presets = CATEGORY_IMAGE_CATALOG[cat] || CATEGORY_IMAGE_CATALOG.General;
    if (presets && presets.length > 0) {
      setImageUrl(presets[0].url);
    }
  };

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
      if (isEditMode && id) {
        await dispatch(updateBlogAsync({ blogId: id, blogData })).unwrap();
        navigate(`/posts/${id}`);
      } else {
        await dispatch(createBlogAsync(blogData)).unwrap();
        navigate("/");
      }
    } catch (err) {
      // Toast notification handled in thunk
    }
  };

  return (
    <div className="min-h-screen bg-white py-6 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-3xl mx-auto space-y-6">

        {/* STICKY TOP CONTROL HEADER (Write / Preview Tabs & Submit Button) */}
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

              {/* Sticky Submit Button */}
              <button
                type="button"
                onClick={handleSubmit}
                disabled={isLoading || !title.trim() || !plainText}
                className="px-4 py-1.5 bg-zinc-900 text-white text-xs font-semibold rounded-lg hover:bg-zinc-800 transition disabled:opacity-40 flex items-center gap-1.5"
              >
                <Send className="w-3.5 h-3.5" />
                <span>{isLoading ? (isEditMode ? 'Saving...' : 'Publishing...') : (isEditMode ? 'Save Changes' : 'Publish Story')}</span>
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

            {/* Metadata Options: Category Selector */}
            <div className="p-4 bg-zinc-50 rounded-xl border border-zinc-200/80 space-y-4 text-xs">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-zinc-700">Category:</span>
                  <div className="flex items-center gap-1.5 flex-wrap">
                    {CATEGORIES.map((cat) => (
                      <button
                        key={cat}
                        type="button"
                        onClick={() => handleCategorySelect(cat)}
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

              {/* Dynamic Category-Specific Cover Image Presets */}
              <div className="space-y-3 pt-3 border-t border-zinc-200/80">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-zinc-700">
                    Select Cover Image for <span className="text-zinc-900 font-bold">{category}</span> (6 Presets Available):
                  </span>
                  <span className="text-zinc-400 text-[11px]">Click any thumbnail to pick custom cover</span>
                </div>
                
                {/* Visual Category Thumbnail Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2.5">
                  {activePresets.map((preset) => {
                    const isSelected = imageUrl === preset.url;
                    return (
                      <button
                        key={preset.label}
                        type="button"
                        onClick={() => setImageUrl(preset.url)}
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
                    />
                    <div className="absolute top-2 left-2 bg-black/70 backdrop-blur-xs text-white text-[10px] font-semibold px-2.5 py-0.5 rounded">
                      Selected Cover Preview ({category})
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
