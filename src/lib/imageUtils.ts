export function getBgImageStyle(url: string, fallbackColor = '#1B5E20'): React.CSSProperties {
  return {
    backgroundImage: `url(${url})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundColor: fallbackColor,
  };
}