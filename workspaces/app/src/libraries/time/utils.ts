export const getMilliSecsDiff = (timestamp: string) => {
  const referenceTime = new Date(timestamp).getTime();
  const currentTime = new Date().getTime();

  return referenceTime - currentTime;
};

export const getTimeInsideWindow = (startTimestamp: string, endTimestamp: string) => {
  const start = new Date(startTimestamp).getTime();
  const end = new Date(endTimestamp).getTime();

  const current = new Date().getTime();

  return start < current && current <= end;
};

export const getTimeParts = (milliSecsDiff: number) => {
  if (milliSecsDiff < 0) {
    return { daysDiff: 0, hoursDiff: 0, minutesDiff: 0, secondsDiff: 0 };
  }

  const dateDiff = new Date(milliSecsDiff);

  const daysDiff = Math.floor(milliSecsDiff / 1000 / 60 / (60 * 24));
  const hoursDiff = dateDiff.getUTCHours();
  const minutesDiff = dateDiff.getUTCMinutes();
  const secondsDiff = dateDiff.getUTCSeconds();

  return { daysDiff, hoursDiff, minutesDiff, secondsDiff };
};

export const getDateString = (timestamp: string) => {
  const date = new Date(timestamp);

  const month = date.toLocaleString('en-US', { month: 'short' });
  const day = date.getDate();

  return `${month} ${day}`;
};

export const getTimeString = (timestamp: string) => {
  const date = new Date(timestamp);

  return date
    .toLocaleTimeString('en-US', {
      hour: 'numeric',
      timeZoneName: 'short',
    })
    .replace(' ', '');
};
