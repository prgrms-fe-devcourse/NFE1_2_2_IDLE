export const formatTimeAgo = (date) => {
  const seconds = Math.floor((new Date() - new Date(date)) / 1000);
  let interval;

  // 년도 처리 (1년 = 31536000초)
  interval = Math.floor(seconds / 31536000);
  if (interval >= 1) return `${interval} 년 전`;

  // 달 처리 (1달 = 2592000초)
  interval = Math.floor(seconds / 2592000);
  if (interval >= 1) return `${interval} 달 전`;

  // 일 처리 (1일 = 86400초)
  interval = Math.floor(seconds / 86400);
  if (interval >= 1) return `${interval} 일 전`;

  // 시간 처리 (1시간 = 3600초)
  interval = Math.floor(seconds / 3600);
  if (interval >= 1) return `${interval} 시간 전`;

  // 분 처리 (1분 = 60초)
  interval = Math.floor(seconds / 60);
  if (interval >= 1) return `${interval} 분 전`;

  return "방금 전";
};

