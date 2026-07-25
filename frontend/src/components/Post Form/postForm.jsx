import React, { useState } from 'react';
import { createBlogAsync, blogsSelector } from '../../Redux/reducers/blogsReducer';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Send, Sparkles } from 'lucide-react';
import FormattedContent from '../common/FormattedContent';
import ProRichTextEditor from '../common/ProRichTextEditor';

export const CATEGORY_IMAGE_CATALOG = {
  Tech: [
    { label: "Dark Circuit Grid", url: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80" },
    { label: "Server Datacenter", url: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80" },
    { label: "Quantum Chip", url: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80" },
    { label: "Cyber Neon Code", url: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1200&q=80" },
    { label: "Orbital Tech Grid", url: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="800" viewBox="0 0 1200 800"><defs><linearGradient id="t" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="%230f172a"/><stop offset="100%" stop-color="%231e293b"/></linearGradient></defs><rect width="1200" height="800" fill="url(%23t)"/><circle cx="600" cy="400" r="260" fill="none" stroke="%233b82f6" stroke-width="4" opacity="0.4"/><circle cx="600" cy="400" r="160" fill="none" stroke="%2360a5fa" stroke-width="3" opacity="0.6"/><line x1="200" y1="400" x2="1000" y2="400" stroke="%23475569" stroke-width="2" opacity="0.5"/><line x1="600" y1="100" x2="600" y2="700" stroke="%23475569" stroke-width="2" opacity="0.5"/></svg>` },
    { label: "Cloud Infra", url: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80" }
  ],
  Design: [
    { label: "UI Design Canvas", url: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1200&q=80" },
    { label: "Abstract Geometry", url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80" },
    { label: "Color Palette Art", url: "https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&w=1200&q=80" },
    { label: "Minimalist 3D Glass", url: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80" },
    { label: "Architectural Grid", url: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="800" viewBox="0 0 1200 800"><rect width="1200" height="800" fill="%231e1e24"/><path d="M0,133 H1200 M0,266 H1200 M0,400 H1200 M0,533 H1200 M0,666 H1200" stroke="%232e2e38" stroke-width="3"/><path d="M200,0 V800 M400,0 V800 M600,0 V800 M800,0 V800 M900,0 V800 M1000,0 V800 M1100,0 V800" stroke="%232e2e38" stroke-width="3"/><rect x="380" y="240" width="440" height="320" rx="16" fill="%232563eb" opacity="0.85"/></svg>` },
    { label: "Clean Typography", url: "https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?auto=format&fit=crop&w=1200&q=80" }
  ],
  AI: [
    { label: "Neural Network Nodes", url: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="800" viewBox="0 0 1200 800"><rect width="1200" height="800" fill="%2309090b"/><circle cx="300" cy="250" r="14" fill="%23a855f7"/><circle cx="600" cy="200" r="18" fill="%23c084fc"/><circle cx="900" cy="250" r="14" fill="%23a855f7"/><circle cx="400" cy="500" r="16" fill="%2338bdf8"/><circle cx="800" cy="500" r="16" fill="%2338bdf8"/><circle cx="600" cy="650" r="14" fill="%23818cf8"/><line x1="300" y1="250" x2="600" y2="200" stroke="%23c084fc" stroke-width="3" opacity="0.6"/><line x1="600" y1="200" x2="900" y2="250" stroke="%23c084fc" stroke-width="3" opacity="0.6"/><line x1="300" y1="250" x2="400" y2="500" stroke="%2338bdf8" stroke-width="3" opacity="0.6"/><line x1="600" y1="200" x2="400" y2="500" stroke="%2338bdf8" stroke-width="3" opacity="0.6"/><line x1="600" y1="200" x2="800" y2="500" stroke="%2338bdf8" stroke-width="3" opacity="0.6"/><line x1="900" y1="250" x2="800" y2="500" stroke="%2338bdf8" stroke-width="3" opacity="0.6"/><line x1="400" y1="500" x2="600" y2="650" stroke="%23818cf8" stroke-width="3" opacity="0.6"/><line x1="800" y1="500" x2="600" y2="650" stroke="%23818cf8" stroke-width="3" opacity="0.6"/><circle cx="600" cy="380" r="40" fill="%23a855f7" opacity="0.3"/><circle cx="600" cy="380" r="20" fill="%23c084fc"/></svg>` },
    { label: "Artificial Intelligence", url: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=1200&q=80" },
    { label: "Machine Learning Spectrum", url: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="800" viewBox="0 0 1200 800"><defs><linearGradient id="a" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="%2318181b"/><stop offset="100%" stop-color="%2327272a"/></linearGradient></defs><rect width="1200" height="800" fill="url(%23a)"/><polygon points="600,180 840,520 360,520" fill="none" stroke="%23a855f7" stroke-width="6" opacity="0.7"/><circle cx="600" cy="180" r="22" fill="%23c084fc"/><circle cx="840" cy="520" r="22" fill="%23c084fc"/><circle cx="360" cy="520" r="22" fill="%23c084fc"/></svg>` },
    { label: "Robotics Core", url: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=1200&q=80" },
    { label: "Synthetic Brain Data", url: "https://images.unsplash.com/photo-1507413245164-6160d8298b31?auto=format&fit=crop&w=1200&q=80" },
    { label: "Digital Intelligence", url: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80" }
  ],
  Tutorials: [
    { label: "Developer Code Editor", url: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80" },
    { label: "Terminal Matrix", url: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="800" viewBox="0 0 1200 800"><rect width="1200" height="800" fill="%2309090b"/><path d="M360,280 L220,400 L360,520" stroke="%2310b981" stroke-width="16" fill="none" stroke-linecap="round" stroke-linejoin="round"/><path d="M840,280 L980,400 L840,520" stroke="%2310b981" stroke-width="16" fill="none" stroke-linecap="round" stroke-linejoin="round"/><line x1="650" y1="240" x2="550" y2="560" stroke="%2310b981" stroke-width="14" stroke-linecap="round"/></svg>` },
    { label: "Pair Programming Desk", url: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=1200&q=80" },
    { label: "Software Architecture", url: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=1200&q=80" },
    { label: "Learning & Specs", url: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80" },
    { label: "Web Development", url: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80" }
  ],
  Lifestyle: [
    { label: "Minimal Desk Workspace", url: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=1200&q=80" },
    { label: "Coffee & Notebook", url: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1200&q=80" },
    { label: "Vector Workspace", url: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="800" viewBox="0 0 1200 800"><rect width="1200" height="800" fill="%23f4f4f5"/><rect x="250" y="180" width="700" height="440" rx="20" fill="%23ffffff" stroke="%23e4e4e7" stroke-width="6"/><line x1="250" y1="540" x2="950" y2="540" stroke="%23e4e4e7" stroke-width="4"/><circle cx="600" cy="360" r="48" fill="%2318181b"/></svg>` },
    { label: "Remote Working Setup", url: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80" },
    { label: "Creative Thought", url: "https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?auto=format&fit=crop&w=1200&q=80" },
    { label: "Journal & Pen", url: "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=1200&q=80" }
  ],
  General: [
    { label: "Charcoal Minimalist", url: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="800" viewBox="0 0 1200 800"><rect width="1200" height="800" fill="%23fafafa"/><circle cx="600" cy="400" r="200" fill="%2318181b"/><circle cx="600" cy="400" r="130" fill="%23ffffff"/></svg>` },
    { label: "Editorial Publication", url: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=1200&q=80" },
    { label: "Dark Abstract Tech", url: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80" },
    { label: "Modern Graphic Art", url: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1200&q=80" },
    { label: "Code Matrix", url: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80" },
    { label: "Clean Geometry", url: "https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?auto=format&fit=crop&w=1200&q=80" }
  ]
};

const CATEGORIES = ["Tech", "Design", "AI", "Tutorials", "Lifestyle", "General"];

const PostForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading } = useSelector(blogsSelector);

  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [category, setCategory] = useState('Tech');
  const [imageUrl, setImageUrl] = useState(CATEGORY_IMAGE_CATALOG.Tech[0].url);
  const [content, setContent] = useState('');
  const [activeTab, setActiveTab] = useState('edit');

  // Dynamic image choices for currently selected category
  const activePresets = CATEGORY_IMAGE_CATALOG[category] || CATEGORY_IMAGE_CATALOG.General;

  // Strip HTML for accurate word count
  const plainText = content ? content.replace(/<[^>]*>/g, ' ').trim() : '';
  const wordCount = plainText ? plainText.split(/\s+/).filter(Boolean).length : 0;
  const estimatedReadTime = `${Math.max(1, Math.ceil(wordCount / 200))} min read`;

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

              {/* Dynamic Category-Specific Cover Image Presets (6 images for selected category) */}
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
