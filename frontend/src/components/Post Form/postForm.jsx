import React, { useState, useEffect } from 'react';
import { createBlogAsync, updateBlogAsync, fetchBlogByIdAsync, blogsSelector } from '../../Redux/reducers/blogsReducer';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import FormattedContent from '../common/FormattedContent';
import ProRichTextEditor from '../common/ProRichTextEditor';
import StudioControlHeader from './StudioControlHeader';
import CoverImageSelector from './CoverImageSelector';
import { CATEGORY_IMAGE_CATALOG } from '../../utils/blogHelpers';

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

  useEffect(() => {
    if (isEditMode && id) {
      dispatch(fetchBlogByIdAsync(id));
    }
  }, [dispatch, id, isEditMode]);

  useEffect(() => {
    if (isEditMode && blog) {
      setTitle(blog.title || '');
      setSubtitle(blog.subtitle || '');
      setCategory(blog.category || 'Tech');
      setImageUrl(blog.imageUrl || CATEGORY_IMAGE_CATALOG.Tech[0].url);
      setContent(blog.content || '');
    }
  }, [isEditMode, blog]);

  const plainText = content ? content.replace(/<[^>]*>/g, ' ').replace(/[#*`_~>-]/g, '').trim() : '';
  const wordCount = plainText ? plainText.split(/\s+/).filter(Boolean).length : 0;
  const minutes = Math.max(1, Math.ceil(wordCount / 200));
  const estimatedReadTime = `${minutes} min read`;

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
      // Handled in thunk
    }
  };

  return (
    <div className="min-h-screen bg-white py-6 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-3xl mx-auto space-y-6">

        {/* STICKY TOP CONTROL HEADER */}
        <StudioControlHeader
          isEditMode={isEditMode}
          estimatedReadTime={estimatedReadTime}
          wordCount={wordCount}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          onSubmit={handleSubmit}
          isLoading={isLoading}
          isDisabled={!title.trim() || !plainText}
        />

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

            {/* Category & Cover Image Selector Subcomponent */}
            <CoverImageSelector
              category={category}
              imageUrl={imageUrl}
              onSelectCategory={handleCategorySelect}
              onSelectImageUrl={setImageUrl}
            />

            {/* WYSIWYG Editor */}
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
