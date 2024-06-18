export const getContrastColor = (hexColor: string) => {
  // Remove the leading # if present
  const color = hexColor.charAt(0) === '#' ? hexColor.substring(1, 7) : hexColor;
  const r = parseInt(color.substring(0, 2), 16);
  const g = parseInt(color.substring(2, 4), 16);
  const b = parseInt(color.substring(4, 6), 16);
  // Calculate the contrast color (YIQ formula)
  const yiq = (r * 299 + g * 587 + b * 114) / 1000;
  return yiq >= 128 ? 'black' : 'white';
};