export function generatePlaceholderImage(
  text: string,
  bgColor = '#1B5E20',
  textColor = '#FFFFFF'
): string {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="600" height="400" viewBox="0 0 600 400">
    <rect width="600" height="400" fill="${bgColor}"/>
    <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle"
          fill="${textColor}" font-family="Inter, sans-serif" font-size="28" font-weight="bold">
      ${text}
    </text>
  </svg>`;
  return `data:image/svg+xml,${encodeURIComponent(svg)}`;
}