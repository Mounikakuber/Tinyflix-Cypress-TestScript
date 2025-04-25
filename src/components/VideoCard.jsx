import React from 'react';

const VideoCard = ({ video, onClick, onBookmark }) => {
  const formatDuration = (duration) => {
    return duration;
  };

  const formatViewCount = (count) => {
    if (count >= 1000000) {
      return `${(count / 1000000).toFixed(1)}M views`;
    }
    if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}K views`;
    }
    return `${count} views`;
  };

  return (
    <div 
      className="video-card"
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyPress={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          onClick();
        }
      }}
      aria-label={`${video.title} - ${formatDuration(video.duration)} - ${formatViewCount(video.viewCount)} views`}
    >
      <img 
        src={video.thumbnail} 
        alt={`Thumbnail for ${video.title}`}
        className="video-thumbnail"
      />
      <div className="video-info">
        <h3>{video.title}</h3>
        <p className="video-description">{video.description}</p>
        <div className="video-meta">
          <span>{formatDuration(video.duration)}</span>
          <span>{formatViewCount(video.viewCount)}</span>
          <span>⭐ {video.rating}</span>
        </div>
        <div className="video-tags">
          {video.tags.map(tag => (
            <span key={tag} className="tag">#{tag}</span>
          ))}
        </div>
        <button 
          onClick={(e) => {
            e.stopPropagation();
            onBookmark();
          }}
          className="bookmark-button"
          aria-label={`Bookmark ${video.title}`}
        >
          📑
        </button>
      </div>
    </div>
  );
};

export default VideoCard;
