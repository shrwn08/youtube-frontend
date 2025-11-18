export const formatDuration = (seconds) => {
  if (!seconds) return "0:00";
  
  const hours = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;
  
  if (hours > 0) {
    return `${hours}:${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  }
  return `${mins}:${secs.toString().padStart(2, "0")}`;
};

export const formatViews = (count) => {
  if (!count) return "0 views";
  
  if (count >= 1000000000) {
    return (count / 1000000000).toFixed(1) + "B views";
  }
  if (count >= 1000000) {
    return (count / 1000000).toFixed(1) + "M views";
  }
  if (count >= 1000) {
    return (count / 1000).toFixed(1) + "K views";
  }
  return count.toLocaleString() + " views";
};

export const formatTimeAgo = (date) => {
  if (!date) return "Recently";
  
  const seconds = Math.floor((new Date() - new Date(date)) / 1000);

  const intervals = {
    year: 31536000,
    month: 2592000,
    week: 604800,
    day: 86400,
    hour: 3600,
    minute: 60,
  };

  for (const [name, secondsInInterval] of Object.entries(intervals)) {
    const interval = Math.floor(seconds / secondsInInterval);
    if (interval >= 1) {
      return interval === 1 ? `1 ${name} ago` : `${interval} ${name}s ago`;
    }
  }

  return "Just now";
};

export const formatSubscribers = (count) => {
  if (!count) return "0 subscribers";
  
  if (count >= 1000000) {
    return (count / 1000000).toFixed(1) + "M subscribers";
  }
  if (count >= 1000) {
    return (count / 1000).toFixed(1) + "K subscribers";
  }
  return count.toLocaleString() + " subscribers";
};