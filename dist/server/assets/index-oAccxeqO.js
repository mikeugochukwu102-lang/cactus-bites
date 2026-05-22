import { Q as reactExports, I as jsxRuntimeExports } from "./server-C3Rd8dbu.js";
import { s as supabase } from "./client-B7f2FfeD.js";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
const heroLagoon = "/assets/hero-lagoon-DZ9oFAiG.jpg";
const interior = "/assets/interior-CTJQ2-OH.jpg";
const FILTERS = [
  { key: "all", label: "All" },
  { key: "interior", label: "Interior" },
  { key: "terrace", label: "Terrace" },
  { key: "dish", label: "Dishes" }
];
function GallerySection() {
  const [photos, setPhotos] = reactExports.useState([]);
  const [filter, setFilter] = reactExports.useState("all");
  const [lightbox, setLightbox] = reactExports.useState(null);
  reactExports.useEffect(() => {
    let active = true;
    supabase.from("gallery_photos").select("id, image_url, caption, category").order("sort_order", { ascending: true }).then(({ data }) => {
      if (active && data) setPhotos(data);
    });
    return () => {
      active = false;
    };
  }, []);
  const visible = filter === "all" ? photos : photos.filter((p) => p.category === filter);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { id: "gallery", className: "py-24 md:py-32 px-6 md:px-10 max-w-7xl mx-auto", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center mb-12 md:mb-16", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gold text-[10px] uppercase tracking-[0.4em] block mb-4", children: "04 — Gallery" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-serif text-4xl md:text-5xl", children: "A Glimpse Inside" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 text-cactus/60 text-sm max-w-md mx-auto", children: "Interior moments, terrace evenings, and plates from our kitchen." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap justify-center gap-2 mb-12", children: FILTERS.map((f) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        onClick: () => setFilter(f.key),
        className: `px-5 py-2 text-[10px] uppercase tracking-[0.25em] border transition-colors ${filter === f.key ? "bg-cactus text-sand border-cactus" : "border-cactus/15 text-cactus/70 hover:border-cactus/40"}`,
        children: f.label
      },
      f.key
    )) }),
    visible.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-center text-cactus/40 text-sm italic py-16", children: "No photos in this category yet." }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4", children: visible.map((p, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "button",
      {
        onClick: () => setLightbox(p),
        className: `group relative overflow-hidden bg-cactus/5 ${i % 5 === 0 ? "row-span-2 aspect-[3/4]" : "aspect-square"}`,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "img",
            {
              src: p.image_url,
              alt: p.caption ?? "Cactus Restaurant photo",
              loading: "lazy",
              className: "w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            }
          ),
          p.caption && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute bottom-0 left-0 right-0 px-3 py-2 text-[10px] uppercase tracking-[0.2em] text-sand bg-gradient-to-t from-cactus/80 to-transparent text-left opacity-0 group-hover:opacity-100 transition-opacity", children: p.caption })
        ]
      },
      p.id
    )) }),
    lightbox && /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        onClick: () => setLightbox(null),
        className: "fixed inset-0 z-[60] bg-cactus/95 backdrop-blur-sm flex items-center justify-center p-6 cursor-zoom-out",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "img",
            {
              src: lightbox.image_url,
              alt: lightbox.caption ?? "",
              className: "max-h-[90vh] max-w-full object-contain"
            }
          ),
          lightbox.caption && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute bottom-8 left-1/2 -translate-x-1/2 text-sand text-xs uppercase tracking-[0.3em]", children: lightbox.caption })
        ]
      }
    )
  ] });
}
const menuItems = [{
  name: "Street Style Burger",
  price: "₦24,500",
  desc: "Angus beef, caramelized onions, brioche bun, house sauce."
}, {
  name: "Mac and Beef",
  price: "₦28,000",
  desc: "Smoked brisket folded into a four-cheese blend with truffle oil."
}, {
  name: "Fish and Chips",
  price: "₦32,000",
  desc: "Atlantic cod in golden batter, minted peas, hand-cut fries."
}, {
  name: "Spaghetti Bolognese",
  price: "₦22,000",
  desc: "Slow-cooked beef ragu, aged parmesan, torn fresh basil."
}, {
  name: "Wood-Fired Pizza",
  price: "₦26,000",
  desc: "Stone-baked, prosciutto, arugula, balsamic reduction."
}, {
  name: "Classic Mojito",
  price: "₦9,500",
  desc: "White rum, lime, mint from our garden, cane sugar."
}, {
  name: "Chocolate Brownie",
  price: "₦11,000",
  desc: "Warm sea-salt ganache served with vanilla bean gelato."
}, {
  name: "Strawberry Sorbet",
  price: "₦8,500",
  desc: "House-churned, bright and clean — the favorite finish."
}];
const reviews = [{
  quote: "The street style burger was sumptuous. The Mac and Beef, delicious. Every bite gave maximum satisfaction — and the customer service is top notch.",
  name: "Adetola Ogbebor",
  meta: "Local Guide · 399 photos"
}, {
  quote: "Cactus is a multi-cuisine restaurant in VI, Lagos. Ambience is cozy and friendly. Their outdoor dining is awesome — nicely maintained and comfortable.",
  name: "Dolon Zahir",
  meta: "Local Guide · 1,910 photos"
}, {
  quote: "Stunning waterfront views with lots of space indoors and out. Lovely dessert options and very refined design across all dining spaces.",
  name: "Six The Plug",
  meta: "Local Guide · 916 photos"
}];
function Index() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-sand text-cactus font-sans selection:bg-gold/30", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("nav", { className: "fixed w-full z-50 px-6 md:px-10 py-5 flex justify-between items-center mix-blend-difference text-sand", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "#top", className: "font-serif text-2xl tracking-tighter uppercase", children: "Cactus" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "hidden md:flex gap-8 text-xs uppercase tracking-[0.2em] font-medium", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "#about", className: "hover:text-gold transition-colors", children: "The View" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "#menu", className: "hover:text-gold transition-colors", children: "Menu" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "#gallery", className: "hover:text-gold transition-colors", children: "Gallery" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "#reviews", className: "hover:text-gold transition-colors", children: "Reviews" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "#contact", className: "hover:text-gold transition-colors", children: "Contact" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "tel:+2348027777666", className: "px-5 py-2 border border-sand/40 rounded-full text-[10px] uppercase tracking-[0.2em] hover:bg-sand hover:text-cactus transition-all", children: "Book a Table" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { id: "top", className: "relative h-screen min-h-[640px] flex items-center justify-center overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: heroLagoon, alt: "Lagos lagoon waterfront at golden hour from the Cactus terrace", width: 1920, height: 1080, className: "absolute inset-0 w-full h-full object-cover" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-cactus/55" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10 text-center text-sand px-6 max-w-3xl", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] md:text-xs uppercase tracking-[0.4em] text-gold mb-6", children: "Victoria Island · Lagos" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-serif text-7xl md:text-9xl mb-8 italic leading-[0.95]", children: "Cactus" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm md:text-base uppercase tracking-[0.3em] font-light max-w-xl mx-auto leading-relaxed mb-10", children: "A Waterfront Sanctuary on Ozumba Mbadiwe" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center justify-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "tel:+2348027777666", className: "bg-gold text-cactus px-9 py-4 text-[11px] uppercase tracking-[0.25em] font-bold hover:bg-sand transition-all shadow-xl", children: "Reservations" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "#menu", className: "px-9 py-4 text-[11px] uppercase tracking-[0.25em] font-bold border border-sand/50 hover:bg-sand hover:text-cactus transition-all", children: "View Menu" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-12 flex items-center justify-center gap-3 text-[10px] uppercase tracking-[0.3em] text-sand/70", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "★ 4.4" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "opacity-40", children: "/" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "6,610 Reviews" })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { id: "about", className: "py-24 md:py-32 px-6 md:px-10 max-w-7xl mx-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-12 gap-8 md:gap-12 items-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "col-span-12 md:col-span-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gold text-[10px] uppercase tracking-[0.4em] block mb-6", children: "01 — The View" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-serif text-4xl md:text-5xl mb-8 leading-tight text-balance", children: "Where the city meets the calm of the water." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-cactus/70 leading-relaxed mb-6 text-pretty", children: "Located on the edge of the Five Cowries Creek, Cactus is more than a restaurant — it is a sensory retreat from the Lagos pulse. Our terrace catches the gentle Atlantic breeze while you indulge in global flavors reimagined for the discerning palate." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-cactus/70 leading-relaxed mb-10 text-pretty", children: "From the first morning pastry to late-night dinners under the lanterns, every plate is built to slow time down." }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-4 items-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-px w-12 bg-gold" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] uppercase tracking-[0.3em] font-bold", children: "A Lagos Landmark" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "col-span-12 md:col-span-6 md:col-start-7", children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: interior, alt: "Warm candlelit interior of Cactus Restaurant with potted cacti and lagoon view", width: 1024, height: 1024, loading: "lazy", className: "w-full aspect-[4/5] object-cover" }) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { id: "menu", className: "bg-cactus text-sand py-24 md:py-32 px-6 md:px-10", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-5xl mx-auto", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center mb-16 md:mb-20", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gold text-[10px] uppercase tracking-[0.4em] block mb-4", children: "02 — The Collection" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-serif text-4xl md:text-5xl", children: "Signature Tastes" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 text-sand/60 text-sm max-w-md mx-auto", children: "₦20,000–60,000 per person · Multi-cuisine kitchen" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid md:grid-cols-2 gap-x-16 gap-y-10", children: menuItems.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border-b border-sand/10 pb-6 group", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-baseline gap-4 mb-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-serif text-xl md:text-2xl group-hover:text-gold transition-colors", children: item.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-sans text-sm tracking-wider whitespace-nowrap", children: item.price })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sand/55 text-sm italic leading-relaxed", children: item.desc })
      ] }, item.name)) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { id: "reviews", className: "py-24 md:py-32 px-6 md:px-10 max-w-7xl mx-auto", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center mb-16 md:mb-20", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gold text-[10px] uppercase tracking-[0.4em] block mb-4", children: "03 — Voices" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-serif text-4xl md:text-5xl", children: "Loved by Lagos" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid md:grid-cols-3 gap-8 md:gap-12", children: reviews.map((r) => /* @__PURE__ */ jsxRuntimeExports.jsxs("figure", { className: "flex flex-col gap-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-gold tracking-[0.2em] text-sm", children: "★ ★ ★ ★ ★" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("blockquote", { className: "font-serif text-lg italic leading-relaxed text-cactus/85 text-pretty", children: [
          "“",
          r.quote,
          "”"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("figcaption", { className: "mt-auto pt-4 border-t border-cactus/10", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm font-medium", children: r.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] uppercase tracking-[0.2em] text-cactus/50 mt-1", children: r.meta })
        ] })
      ] }, r.name)) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(GallerySection, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { id: "contact", className: "bg-cactus/[0.03] py-24 md:py-32 px-6 md:px-10 border-t border-cactus/10", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto grid md:grid-cols-3 gap-12 md:gap-16", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "text-[10px] uppercase tracking-[0.3em] font-bold mb-6 text-gold", children: "Location" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xl font-serif leading-relaxed", children: [
          "20/24 Ozumba Mbadiwe Ave,",
          /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
          "Victoria Island, Lagos 106104,",
          /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
          "Nigeria"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "text-[10px] uppercase tracking-[0.3em] font-bold mb-6 text-gold", children: "Opening Hours" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2 text-sm uppercase tracking-wider", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "flex justify-between gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Mon — Thu" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "10:00 — 22:00" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "flex justify-between gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Fri — Sat" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "10:00 — 23:00" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "flex justify-between gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Sunday" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "10:00 — 22:00" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 text-cactus/50 italic text-[10px] normal-case tracking-normal", children: "Kitchen closes one hour before bar." })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "text-[10px] uppercase tracking-[0.3em] font-bold mb-6 text-gold", children: "Reservations" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "tel:+2348027777666", className: "text-xl font-serif mb-2 block hover:text-gold transition-colors", children: "+234 802 777 7666" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-cactus/60 text-sm mb-8", children: "Walk-ins welcome — terrace seating fills quickly on weekends." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "tel:+2348027777666", className: "inline-block bg-cactus text-sand px-8 py-3 text-[10px] uppercase tracking-[0.3em] font-bold hover:bg-gold hover:text-cactus transition-colors", children: "Book a Table" })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("footer", { className: "py-10 px-6 md:px-10 border-t border-cactus/10", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-serif text-xl tracking-tighter uppercase", children: "Cactus" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[10px] uppercase tracking-[0.3em] text-cactus/40", children: [
        "© ",
        (/* @__PURE__ */ new Date()).getFullYear(),
        " Cactus Victoria Island"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-6 text-[10px] uppercase tracking-[0.3em]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "https://facebook.com", className: "hover:text-gold", children: "Facebook" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "#", className: "hover:text-gold", children: "Instagram" })
      ] })
    ] }) })
  ] });
}
export {
  Index as component
};
