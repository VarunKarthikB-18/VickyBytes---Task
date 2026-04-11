export default function VideoPlayer({ url }: { url: string }) {
  // If url is just "jfKfPfyJRdk", construct the full youtube embed url.
  // We'll just assume it's the full url from mock data.
  
  return (
    <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-black border border-border shadow-2xl">
      <iframe
        src={url}
        title="Event Live Stream"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        className="absolute top-0 left-0 w-full h-full border-0"
      ></iframe>
    </div>
  );
}
