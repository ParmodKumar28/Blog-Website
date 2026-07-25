import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
  createBlogAsync,
  updateBlogAsync,
  fetchBlogByIdAsync,
  clearBlog,
  blogsSelector,
} from '../../Redux/reducers/blogsReducer';
import FormattedContent from '../common/FormattedContent';
import ProRichTextEditor from '../common/ProRichTextEditor';
import StudioControlHeader from './StudioControlHeader';
import CoverImageSelector from './CoverImageSelector';
import { CATEGORY_IMAGE_CATALOG } from '../../utils/blogHelpers';

const DEFAULT_CATEGORY = 'Tech';
const DEFAULT_IMAGE = CATEGORY_IMAGE_CATALOG[DEFAULT_CATEGORY][0].url;

const PostForm = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { blog, isLoading } = useSelector(blogsSelector);
  const isEditMode = Boolean(id);

  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [category, setCategory] = useState(DEFAULT_CATEGORY);
  const [imageUrl, setImageUrl] = useState(DEFAULT_IMAGE);
  const [content, setContent] = useState('');
  const [activeTab, setActiveTab] = useState('edit');

  useEffect(() => {
    if (isEditMode && id) {
      // Edit mode: fetch the existing blog to pre-fill the form
      dispatch(fetchBlogByIdAsync(id));
    } else {
      // Create mode: clear any stale blog from a previous detail page visit
      dispatch(clearBlog());
    }
  }, [dispatch, id, isEditMode]);

  // Pre-fill form fields only in edit mode when blog data arrives
  useEffect(() => {
    if (!isEditMode || !blog) return;
    setTitle(blog.title || '');
    setSubtitle(blog.subtitle || '');
    setCategory(blog.category || DEFAULT_CATEGORY);
    setImageUrl(blog.imageUrl || DEFAULT_IMAGE);
    setContent(blog.content || '');
  }, [isEditMode, blog]);

  // Derive read time and word count from content
  const plainText = content
    ? content.replace(/<[^>]*>/g, ' ').replace(/[#*`_~>-]/g, '').trim()
    : '';
  const wordCount = plainText ? plainText.split(/\s+/).filter(Boolean).length : 0;
  const minutes = Math.max(1, Math.ceil(wordCount / 200));
  const estimatedReadTime = `${minutes} min read`;

  const handleCategorySelect = (cat) => {
    setCategory(cat);
    // Auto-select first preset image for the chosen category
    const presets = CATEGORY_IMAGE_CATALOG[cat] || CATEGORY_IMAGE_CATALOG.General;
    setImageUrl(presets[0].url);
  };

  const handleSubmit = async () => {
    if (!title.trim() || !plainText) {
      toast.warn('Please enter both a title and article content before publishing.');
      return;
    }

    const blogData = {
      title: title.trim(),
      subtitle: subtitle.trim(),
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
        navigate('/');
      }
    } catch (_err) {
      // Error is already handled and toasted inside the thunk
    }
  };

  return (
    <div className="min-h-screen bg-white py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto space-y-6">

        {/* Sticky Control Header */}
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

            {/* Category & Cover Image Selector */}
            <CoverImageSelector
              category={category}
              imageUrl={imageUrl}
              onSelectCategory={handleCategorySelect}
              onSelectImageUrl={setImageUrl}
            />

            {/* WYSIWYG Rich Text Editor */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-zinc-700 uppercase tracking-wider">
                Article Content
              </label>
              <ProRichTextEditor
                value={content}
                onChange={setContent}
                placeholder="Start typing your article..."
              />
            </div>
          </div>
        ) : (
          /* Preview Mode */
          <div className="space-y-6 pt-4">
            {imageUrl && (
              <div className="w-full h-64 sm:h-80 rounded-xl overflow-hidden bg-zinc-100 border border-zinc-200">
                <img src={imageUrl} alt={title || 'Preview'} className="w-full h-full object-cover" />
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
                <p className="text-lg font-serif-editorial italic text-zinc-600">{subtitle}</p>
              )}
              <hr className="border-zinc-200 my-4" />
              {plainText ? (
                <FormattedContent content={content} />
              ) : (
                <p className="text-zinc-400 font-serif-editorial italic">
                  Start writing in the Write tab to preview your article.
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
