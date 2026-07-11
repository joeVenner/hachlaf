import { useEffect } from 'react';

const TYPEFORM_SCRIPT_SRC = 'https://embed.typeform.com/next/embed.js';

/**
 * Responsive Typeform embed that fills its container.
 *
 * Supports Typeform's live embed snippet and falls back to an iframe when only
 * a URL is provided.
 */
export default function TypeformEmbed({ url, title, liveId }) {
  useEffect(() => {
    if (!liveId) return undefined;

    const loadTypeform = () => {
      if (window.tf?.load) {
        window.tf.load();
      }
    };

    let script = document.querySelector(`script[src="${TYPEFORM_SCRIPT_SRC}"]`);
    if (!script) {
      script = document.createElement('script');
      script.src = TYPEFORM_SCRIPT_SRC;
      script.async = true;
      script.onload = loadTypeform;
      document.body.appendChild(script);
    } else {
      loadTypeform();
    }

    return undefined;
  }, [liveId]);

  return (
    <div className="relative w-full min-h-[calc(100svh-8rem)] bg-brand-light card-sharp overflow-hidden">
      {liveId ? (
        <div
          key={liveId}
          data-tf-live={liveId}
          className="absolute inset-0 w-full h-full"
          title={title}
        />
      ) : (
        <iframe
          src={url}
          title={title}
          className="absolute inset-0 w-full h-full"
          style={{ border: 'none' }}
          allow="camera; microphone; autoplay; encrypted-media; fullscreen; geolocation"
          loading="lazy"
        />
      )}
    </div>
  );
}
