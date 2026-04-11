import VideoPlayer from "@/components/VideoPlayer";
import LiveChat from "@/components/LiveChat";
import { mockEvents } from "@/lib/data";
import { redirect } from "next/navigation";
import { FiUsers, FiCalendar, FiClock, FiHeart, FiShare2 } from "react-icons/fi";

// In Next.js 15, params is a promise.
export default async function EventStreamingPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const event = mockEvents.find((e) => e.id === resolvedParams.id);

  if (!event) {
    redirect("/");
  }

  return (
    <div className="flex-1 w-full max-w-[1600px] mx-auto px-4 md:px-8 py-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Side: Video + Description (Takes up 2 cols on lg) */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          {/* Video Player */}
          <VideoPlayer url={event.videoUrl} />

          {/* Event Details Section */}
          <div className="flex flex-col rounded-xl bg-card border border-border p-6 shadow-sm">
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 border-b border-border pb-6">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-destructive px-2.5 py-1 text-xs font-bold text-destructive-foreground">
                    {event.date === "Live Now" ? (
                      <>
                        <span className="h-2 w-2 rounded-full bg-white animate-pulse" />
                        LIVE
                      </>
                    ) : (
                      "UPCOMING"
                    )}
                  </span>
                  <span className="inline-flex items-center rounded-full bg-secondary px-2.5 py-1 text-xs font-semibold text-secondary-foreground border border-border">
                    {event.category}
                  </span>
                </div>
                <h1 className="text-2xl md:text-3xl font-bold text-card-foreground mb-2">
                  {event.title}
                </h1>
                
                <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1.5">
                    <FiUsers className="h-4 w-4" />
                    <span>{event.viewers.toLocaleString()} watching</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <FiCalendar className="h-4 w-4" />
                    <span>{event.date}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <FiClock className="h-4 w-4" />
                    <span>{event.time}</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 mt-2 md:mt-0">
                <button className="flex items-center gap-2 rounded-full bg-secondary px-4 py-2 text-sm font-medium hover:bg-secondary/80 transition-colors border border-border">
                  <FiHeart className="h-4 w-4" />
                  Like
                </button>
                <button className="flex items-center gap-2 rounded-full bg-secondary px-4 py-2 text-sm font-medium hover:bg-secondary/80 transition-colors border border-border">
                  <FiShare2 className="h-4 w-4" />
                  Share
                </button>
              </div>
            </div>

            {/* Description */}
            <div className="pt-6">
              <h3 className="text-lg font-semibold mb-3">About this Event</h3>
              <p className="text-muted-foreground leading-relaxed">
                {event.description}
              </p>
            </div>
          </div>
        </div>

        {/* Right Side: Live Chat (Takes up 1 col on lg) */}
        <div className="lg:col-span-1 h-[600px] lg:h-[calc(100vh-140px)] sticky top-24">
          <LiveChat />
        </div>
      </div>
    </div>
  );
}
