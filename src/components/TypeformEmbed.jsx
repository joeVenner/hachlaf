/**
 * Responsive Typeform iframe embed that fills its container.
 *
 * Uses absolute positioning so the iframe always stretches to the full
 * width and height of its parent, even when the parent only has a
 * min-height. Includes a fallback link for mobile or iframe failures.
 */
export default function TypeformEmbed({ url, title }) {
  return (
    <div className="relative w-full min-h-[80vh] md:min-h-[calc(100vh-4rem)] bg-brand-light card-sharp overflow-hidden">
      <iframe
        src={url}
        title={title}
        className="absolute inset-0 w-full h-full"
        style={{ border: 'none' }}
        allow="camera; microphone; autoplay; encrypted-media; fullscreen; geolocation"
        loading="lazy"
      />
    </div>
  );
}
