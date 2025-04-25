import React, { useState, useEffect, useRef } from 'react';

const VideoPlayer = ({ video, bookmarks, setBookmarks, userPreferences, setUserPreferences }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [error, setError] = useState(null);
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.volume = volume;
      videoRef.current.muted = isMuted;
      videoRef.current.playbackRate = playbackRate;
    }
  }, [volume, isMuted, playbackRate]);

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
    }
  };

  const handleError = (e) => {
    setError('Error loading video. Please try again later.');
    console.error('Video error:', e);
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const handlePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play().catch(err => {
          setError('Failed to play video. Please check your internet connection.');
        });
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleSeek = (e) => {
    const time = e.target.value;
    if (videoRef.current) {
      videoRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    setIsMuted(newVolume === 0);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const handlePlaybackRateChange = (rate) => {
    setPlaybackRate(rate);
  };

  const addBookmark = () => {
    if (videoRef.current) {
      const bookmark = {
        videoId: video.id,
        timestamp: videoRef.current.currentTime,
        title: `${video.title} at ${formatTime(videoRef.current.currentTime)}`
      };
      setBookmarks([...bookmarks, bookmark]);
    }
  };

  return (
    <div className="video-player">
      {error && <div className="error-message" role="alert">{error}</div>}
      
      <video
        ref={videoRef}
        src={`https://example.com/videos/${video.id}.mp4`} // This would be a real video URL in production
        poster={video.thumbnail}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onError={handleError}
        controls={false} // We're using custom controls
      />

      <div className="video-controls">
        <button 
          onClick={handlePlayPause}
          aria-label={isPlaying ? 'Pause' : 'Play'}
        >
          {isPlaying ? '⏸' : '▶️'}
        </button>

        <div className="time-control">
          <span>{formatTime(currentTime)}</span>
          <input
            type="range"
            min="0"
            max={duration}
            value={currentTime}
            onChange={handleSeek}
            aria-label="Video progress"
          />
          <span>{formatTime(duration)}</span>
        </div>

        <div className="volume-control">
          <button 
            onClick={toggleMute}
            aria-label={isMuted ? 'Unmute' : 'Mute'}
          >
            {isMuted ? '🔇' : '🔊'}
          </button>
          <input
            type="range"
            min="0"
            max="1"
            step="0.1"
            value={volume}
            onChange={handleVolumeChange}
            aria-label="Volume"
          />
        </div>

        <div className="playback-rate">
          <select
            value={playbackRate}
            onChange={(e) => handlePlaybackRateChange(parseFloat(e.target.value))}
            aria-label="Playback speed"
          >
            <option value="0.5">0.5x</option>
            <option value="1">1x</option>
            <option value="1.5">1.5x</option>
            <option value="2">2x</option>
          </select>
        </div>

        <button 
          onClick={addBookmark}
          aria-label="Add bookmark"
        >
          📑
        </button>

        <div className="user-preferences">
          <label>
            <input
              type="checkbox"
              checked={userPreferences.autoplay}
              onChange={(e) => setUserPreferences({
                ...userPreferences,
                autoplay: e.target.checked
              })}
            />
            Autoplay
          </label>
          <select
            value={userPreferences.quality}
            onChange={(e) => setUserPreferences({
              ...userPreferences,
              quality: e.target.value
            })}
          >
            <option value="low">Low Quality</option>
            <option value="medium">Medium Quality</option>
            <option value="high">High Quality</option>
          </select>
          <label>
            <input
              type="checkbox"
              checked={userPreferences.subtitles}
              onChange={(e) => setUserPreferences({
                ...userPreferences,
                subtitles: e.target.checked
              })}
            />
            Subtitles
          </label>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;
