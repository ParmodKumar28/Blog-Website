import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, BookOpen, PenSquare } from 'lucide-react';

const AuthorProfileCard = ({ username, email, storyCount }) => {
  const initial = username ? username.charAt(0).toUpperCase() : 'A';

  return (
    <div className="bg-white rounded-2xl border border-zinc-200 p-6 sm:p-8 shadow-xs">
      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
        
        {/* Avatar Circle */}
        <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-zinc-900 text-white font-bold flex items-center justify-center text-3xl sm:text-4xl shadow-md border-4 border-white flex-shrink-0">
          {initial}
        </div>

        {/* Profile Information */}
        <div className="space-y-3 text-center sm:text-left flex-1">
          <div>
            <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest border border-zinc-200 rounded px-2 py-0.5 bg-zinc-50">
              Verified Author
            </span>
            <h1 className="text-2xl sm:text-3xl font-bold font-serif-editorial text-zinc-900 mt-1">
              {username}
            </h1>
          </div>

          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 text-xs text-zinc-600">
            <span className="flex items-center gap-1.5 font-medium">
              <Mail className="w-3.5 h-3.5 text-zinc-400" />
              {email}
            </span>
            <span className="text-zinc-300">•</span>
            <span className="flex items-center gap-1.5 font-medium">
              <BookOpen className="w-3.5 h-3.5 text-zinc-400" />
              {storyCount} {storyCount === 1 ? 'Published Story' : 'Published Stories'}
            </span>
          </div>
        </div>

        {/* Write New Story Action */}
        <Link
          to="/posts/new"
          className="inline-flex items-center gap-1.5 px-4 py-2 bg-zinc-900 text-white text-xs font-semibold rounded-lg hover:bg-zinc-800 transition shadow-xs self-center sm:self-start"
        >
          <PenSquare className="w-3.5 h-3.5" />
          <span>Write Story</span>
        </Link>

      </div>
    </div>
  );
};

export default AuthorProfileCard;
