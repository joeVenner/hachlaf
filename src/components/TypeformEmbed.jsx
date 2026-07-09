/**
 * Responsive Typeform iframe embed.
 *
 * Uses Typeform's public embed URL with a fallback link for browsers
 * where iframe loading fails or for users who prefer a separate tab.
 */
export default function TypeformEmbed({ url, title }) {
  return (
    <div className="w-full min-h-[70vh] md:min-h-[75vh] bg-brand-light card-sharp overflow-hidden">
      <iframe
        src={url}
        title={title}
        width="100%"
        height="100%"
        style={{ minHeight: '70vh', border: 'none' }}
        allow="camera; microphone; autoplay; encrypted-media; fullscreen; geolocation"
        loading="lazy"
      />
    </div>
  );
}
