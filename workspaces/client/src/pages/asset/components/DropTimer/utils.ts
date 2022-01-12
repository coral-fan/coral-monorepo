export const getTimeRemaining = (timestamp: string) => {
  const referenceTime = new Date(timestamp).getTime();
  const currentTime = new Date().getTime();

  const milliSecsDiff = referenceTime - currentTime;

  if (milliSecsDiff > 0) {
    const dateDiff = new Date(milliSecsDiff);

    const daysDiff = Math.floor(milliSecsDiff / 1000 / 60 / (60 * 24));
    const hoursDiff = dateDiff.getUTCHours();
    const minutesDiff = dateDiff.getUTCMinutes();
    const secondsDiff = dateDiff.getUTCSeconds();

    return { daysDiff, hoursDiff, minutesDiff, secondsDiff };
  }

  return { daysDiff: 0, hoursDiff: 0, minutesDiff: 0, secondsDiff: 0 };
};

const getOrdinal = (day: number) => {
  if (day > 3 && day < 21) return 'th';
  switch (day % 10) {
    case 1:
      return 'st';
    case 2:
      return 'nd';
    case 3:
      return 'rd';
    default:
      return 'th';
  }
};

export const getDateString = (timestamp: string) => {
  const date = new Date(timestamp);

  const month = date.toLocaleString('en-US', { month: 'long' });
  const day = date.getDate();

  return `${month} ${day}${getOrdinal(day)}`;
};

export const getDateStringShort = (timestamp: string) => {
  const date = new Date(timestamp);

  const month = date.getMonth() + 1;
  const day = date.getDate();

  return `${month}/${day}`;
};

export const getTimeString = (timestamp: string) => {
  const date = new Date(timestamp);

  return date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    timeZoneName: 'short',
  });
};
