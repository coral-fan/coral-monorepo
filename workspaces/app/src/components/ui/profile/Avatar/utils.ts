export const formatObjectPosition = (x?: number, y?: number) => {
  const xOffset = `${x ?? 0}% `;
  const yOffset = `${y ?? 0}%`;

  return `${xOffset}${yOffset}`;
};
