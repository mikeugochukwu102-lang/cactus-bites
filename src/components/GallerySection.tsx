import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

type Photo = {
  id: string;
  image_url: string;
  caption: string | null;
  category: "interior" | "terrace" | "dish";
};

const FILTERS: { key: "all" | Photo["category"]; label: string }[] = [
  { key: "all", label: "All" },
  { key: "interior", label: "Interior" },
  { key: "terrace", label: "Terrace" },
  { key: "dish", label: "Dishes" },
];

export function GallerySection() {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [filter, setFilter] = useState<(typeof FILTERS)[number]["key"]>("all");
  const [lightbox, setLightbox] = useState<Photo | null>(null);

  useEffect(() => {
    let active = true;
    supabase
      .from("gallery_photos")
      .select("id, image_url, caption, category")
      .order("sort_order", { ascending: true })
      .then(({ data }) => {
        if (active && data) setPhotos(data as Photo[]);
      });
    return () => {
      active = false;
    };
  }, []);

  const visible = filter === "all" ? photos : photos.filter((p) => p.category === filter);

  return (
    <section id="gallery" className="py-24 md:py-32 px-6 md:px-10 max-w-7xl mx-auto">
      <div className="text-center mb-12 md:mb-16">
        <span className="text-gold text-[10px] uppercase tracking-[0.4em] block mb-4">
          04 — Gallery
        </span>
        <h2 className="font-serif text-4xl md:text-5xl">A Glimpse Inside</h2>
        <p className="mt-4 text-cactus/60 text-sm max-w-md mx-auto">
          Interior moments, terrace evenings, and plates from our kitchen.
        </p>
      </div>

      <div className="flex flex-wrap justify-center gap-2 mb-12">
        {FILTERS.map((f) => (
          <button
            key={f.key}
            onClick={() => setFilter(f.key)}
            className={`px-5 py-2 text-[10px] uppercase tracking-[0.25em] border transition-colors ${
              filter === f.key
                ? "bg-cactus text-sand border-cactus"
                : "border-cactus/15 text-cactus/70 hover:border-cactus/40"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {visible.length === 0 ? (
        <p className="text-center text-cactus/40 text-sm italic py-16">
          No photos in this category yet.
        </p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
          {visible.map((p, i) => (
            <button
              key={p.id}
              onClick={() => setLightbox(p)}
              className={`group relative overflow-hidden bg-cactus/5 ${
                i % 5 === 0 ? "row-span-2 aspect-[3/4]" : "aspect-square"
              }`}
            >
              <img
                src={p.image_url}
                alt={p.caption ?? "Cactus Restaurant photo"}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              {p.caption && (
                <span className="absolute bottom-0 left-0 right-0 px-3 py-2 text-[10px] uppercase tracking-[0.2em] text-sand bg-gradient-to-t from-cactus/80 to-transparent text-left opacity-0 group-hover:opacity-100 transition-opacity">
                  {p.caption}
                </span>
              )}
            </button>
          ))}
        </div>
      )}

      {lightbox && (
        <div
          onClick={() => setLightbox(null)}
          className="fixed inset-0 z-[60] bg-cactus/95 backdrop-blur-sm flex items-center justify-center p-6 cursor-zoom-out"
        >
          <img
            src={lightbox.image_url}
            alt={lightbox.caption ?? ""}
            className="max-h-[90vh] max-w-full object-contain"
          />
          {lightbox.caption && (
            <span className="absolute bottom-8 left-1/2 -translate-x-1/2 text-sand text-xs uppercase tracking-[0.3em]">
              {lightbox.caption}
            </span>
          )}
        </div>
      )}
    </section>
  );
}