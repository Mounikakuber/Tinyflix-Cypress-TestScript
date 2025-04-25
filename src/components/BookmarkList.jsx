import React from 'react'

const BookmarkList = ({ bookmarks }) => {
  const formatTime = (timestamp) => {
    const minutes = Math.floor(timestamp / 60);
    const seconds = Math.floor(timestamp % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleBookmarkClick = (timestamp) => {
    // This would be handled by the parent component in a real app
    console.log('Jump to timestamp:', timestamp);
  };

  if (bookmarks.length === 0) {
    return (
      <div className="bookmark-list empty" role="status">
        <p>No bookmarks yet. Add bookmarks while watching videos!</p>
      </div>
    );
  }

  return (
    <div className="bookmark-list">
      <h3>Bookmarks</h3>
      <ul role="list">
        {bookmarks.map((bookmark, index) => (
          <li 
            key={bookmark.videoId + '-' + bookmark.timestamp}
            className="bookmark-item"
          >
            <button
              onClick={() => handleBookmarkClick(bookmark.timestamp)}
              aria-label={`Jump to ${bookmark.title}`}
            >
              <span className="bookmark-title">{bookmark.title}</span>
              <span className="bookmark-time">{formatTime(bookmark.timestamp)}</span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BookmarkList;
