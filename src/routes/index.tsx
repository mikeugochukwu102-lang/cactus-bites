import { createFileRoute } from "@tanstack/react-router";
import heroLagoon from "@/assets/hero-lagoon.jpg";
import interior from "@/assets/interior.jpg";
import { GallerySection } from "@/components/GallerySection";

export const Route = createFileRoute("/")({
  component: Index,
});

const menuItems = [
  { name: "Street Style Burger", price: "₦24,500", desc: "Angus beef, caramelized onions, brioche bun, house sauce." },
  { name: "Mac and Beef", price: "₦28,000", desc: "Smoked brisket folded into a four-cheese blend with truffle oil." },
  { name: "Fish and Chips", price: "₦32,000", desc: "Atlantic cod in golden batter, minted peas, hand-cut fries." },
  { name: "Spaghetti Bolognese", price: "₦22,000", desc: "Slow-cooked beef ragu, aged parmesan, torn fresh basil." },
  { name: "Wood-Fired Pizza", price: "₦26,000", desc: "Stone-baked, prosciutto, arugula, balsamic reduction." },
  { name: "Classic Mojito", price: "₦9,500", desc: "White rum, lime, mint from our garden, cane sugar." },
  { name: "Chocolate Brownie", price: "₦11,000", desc: "Warm sea-salt ganache served with vanilla bean gelato." },
  { name: "Strawberry Sorbet", price: "₦8,500", desc: "House-churned, bright and clean — the favorite finish." },
];

const reviews = [
  {
    quote: "The street style burger was sumptuous. The Mac and Beef, delicious. Every bite gave maximum satisfaction — and the customer service is top notch.",
    name: "Adetola Ogbebor",
    meta: "Local Guide · 399 photos",
  },
  {
    quote: "Cactus is a multi-cuisine restaurant in VI, Lagos. Ambience is cozy and friendly. Their outdoor dining is awesome — nicely maintained and comfortable.",
    name: "Dolon Zahir",
    meta: "Local Guide · 1,910 photos",
  },
  {
    quote: "Stunning waterfront views with lots of space indoors and out. Lovely dessert options and very refined design across all dining spaces.",
    name: "Six The Plug",
    meta: "Local Guide · 916 photos",
  },
];

function Index() {
  return (
    <div className="bg-sand text-cactus font-sans selection:bg-gold/30">
      {/* Navigation */}
      <nav className="fixed w-full z-50 px-6 md:px-10 py-5 flex justify-between items-center mix-blend-difference text-sand">
        <a href="#top" className="font-serif text-2xl tracking-tighter uppercase">Cactus</a>
        <div className="hidden md:flex gap-8 text-xs uppercase tracking-[0.2em] font-medium">
          <a href="#about" className="hover:text-gold transition-colors">The View</a>
          <a href="#menu" className="hover:text-gold transition-colors">Menu</a>
          <a href="#gallery" className="hover:text-gold transition-colors">Gallery</a>
          <a href="#reviews" className="hover:text-gold transition-colors">Reviews</a>
          <a href="#contact" className="hover:text-gold transition-colors">Contact</a>
        </div>
        <a
          href="tel:+2348027777666"
          className="px-5 py-2 border border-sand/40 rounded-full text-[10px] uppercase tracking-[0.2em] hover:bg-sand hover:text-cactus transition-all"
        >
          Book a Table
        </a>
      </nav>

      {/* Hero */}
      <header id="top" className="relative h-screen min-h-[640px] flex items-center justify-center overflow-hidden">
        <img
          src={heroLagoon}
          alt="Lagos lagoon waterfront at golden hour from the Cactus terrace"
          width={1920}
          height={1080}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-cactus/55" />
        <div className="relative z-10 text-center text-sand px-6 max-w-3xl">
          <p className="text-[10px] md:text-xs uppercase tracking-[0.4em] text-gold mb-6">Victoria Island · Lagos</p>
          <h1 className="font-serif text-7xl md:text-9xl mb-8 italic leading-[0.95]">Cactus</h1>
          <p className="text-sm md:text-base uppercase tracking-[0.3em] font-light max-w-xl mx-auto leading-relaxed mb-10">
            A Waterfront Sanctuary on Ozumba Mbadiwe
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <a
              href="tel:+2348027777666"
              className="bg-gold text-cactus px-9 py-4 text-[11px] uppercase tracking-[0.25em] font-bold hover:bg-sand transition-all shadow-xl"
            >
              Reservations
            </a>
            <a
              href="#menu"
              className="px-9 py-4 text-[11px] uppercase tracking-[0.25em] font-bold border border-sand/50 hover:bg-sand hover:text-cactus transition-all"
            >
              View Menu
            </a>
          </div>
          <div className="mt-12 flex items-center justify-center gap-3 text-[10px] uppercase tracking-[0.3em] text-sand/70">
            <span>★ 4.4</span>
            <span className="opacity-40">/</span>
            <span>6,610 Reviews</span>
          </div>
        </div>
      </header>

      {/* About */}
      <section id="about" className="py-24 md:py-32 px-6 md:px-10 max-w-7xl mx-auto">
        <div className="grid grid-cols-12 gap-8 md:gap-12 items-center">
          <div className="col-span-12 md:col-span-5">
            <span className="text-gold text-[10px] uppercase tracking-[0.4em] block mb-6">01 — The View</span>
            <h2 className="font-serif text-4xl md:text-5xl mb-8 leading-tight text-balance">
              Where the city meets the calm of the water.
            </h2>
            <p className="text-cactus/70 leading-relaxed mb-6 text-pretty">
              Located on the edge of the Five Cowries Creek, Cactus is more than a restaurant — it is a sensory retreat from the Lagos pulse. Our terrace catches the gentle Atlantic breeze while you indulge in global flavors reimagined for the discerning palate.
            </p>
            <p className="text-cactus/70 leading-relaxed mb-10 text-pretty">
              From the first morning pastry to late-night dinners under the lanterns, every plate is built to slow time down.
            </p>
            <div className="flex gap-4 items-center">
              <div className="h-px w-12 bg-gold" />
              <span className="text-[10px] uppercase tracking-[0.3em] font-bold">A Lagos Landmark</span>
            </div>
          </div>
          <div className="col-span-12 md:col-span-6 md:col-start-7">
            <img
              src={interior}
              alt="Warm candlelit interior of Cactus Restaurant with potted cacti and lagoon view"
              width={1024}
              height={1024}
              loading="lazy"
              className="w-full aspect-[4/5] object-cover"
            />
          </div>
        </div>
      </section>

      {/* Menu */}
      <section id="menu" className="bg-cactus text-sand py-24 md:py-32 px-6 md:px-10">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16 md:mb-20">
            <span className="text-gold text-[10px] uppercase tracking-[0.4em] block mb-4">02 — The Collection</span>
            <h2 className="font-serif text-4xl md:text-5xl">Signature Tastes</h2>
            <p className="mt-4 text-sand/60 text-sm max-w-md mx-auto">
              ₦20,000–60,000 per person · Multi-cuisine kitchen
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-x-16 gap-y-10">
            {menuItems.map((item) => (
              <div key={item.name} className="border-b border-sand/10 pb-6 group">
                <div className="flex justify-between items-baseline gap-4 mb-2">
                  <h3 className="font-serif text-xl md:text-2xl group-hover:text-gold transition-colors">
                    {item.name}
                  </h3>
                  <span className="font-sans text-sm tracking-wider whitespace-nowrap">{item.price}</span>
                </div>
                <p className="text-sand/55 text-sm italic leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section id="reviews" className="py-24 md:py-32 px-6 md:px-10 max-w-7xl mx-auto">
        <div className="text-center mb-16 md:mb-20">
          <span className="text-gold text-[10px] uppercase tracking-[0.4em] block mb-4">03 — Voices</span>
          <h2 className="font-serif text-4xl md:text-5xl">Loved by Lagos</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-8 md:gap-12">
          {reviews.map((r) => (
            <figure key={r.name} className="flex flex-col gap-6">
              <div className="text-gold tracking-[0.2em] text-sm">★ ★ ★ ★ ★</div>
              <blockquote className="font-serif text-lg italic leading-relaxed text-cactus/85 text-pretty">
                “{r.quote}”
              </blockquote>
              <figcaption className="mt-auto pt-4 border-t border-cactus/10">
                <div className="text-sm font-medium">{r.name}</div>
                <div className="text-[10px] uppercase tracking-[0.2em] text-cactus/50 mt-1">{r.meta}</div>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      <GallerySection />

      {/* Contact */}
      <section id="contact" className="bg-cactus/[0.03] py-24 md:py-32 px-6 md:px-10 border-t border-cactus/10">
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-12 md:gap-16">
          <div>
            <h4 className="text-[10px] uppercase tracking-[0.3em] font-bold mb-6 text-gold">Location</h4>
            <p className="text-xl font-serif leading-relaxed">
              20/24 Ozumba Mbadiwe Ave,<br />
              Victoria Island, Lagos 106104,<br />
              Nigeria
            </p>
          </div>
          <div>
            <h4 className="text-[10px] uppercase tracking-[0.3em] font-bold mb-6 text-gold">Opening Hours</h4>
            <div className="space-y-2 text-sm uppercase tracking-wider">
              <p className="flex justify-between gap-4"><span>Mon — Thu</span><span>10:00 — 22:00</span></p>
              <p className="flex justify-between gap-4"><span>Fri — Sat</span><span>10:00 — 23:00</span></p>
              <p className="flex justify-between gap-4"><span>Sunday</span><span>10:00 — 22:00</span></p>
              <p className="mt-4 text-cactus/50 italic text-[10px] normal-case tracking-normal">
                Kitchen closes one hour before bar.
              </p>
            </div>
          </div>
          <div>
            <h4 className="text-[10px] uppercase tracking-[0.3em] font-bold mb-6 text-gold">Reservations</h4>
            <a href="tel:+2348027777666" className="text-xl font-serif mb-2 block hover:text-gold transition-colors">
              +234 802 777 7666
            </a>
            <p className="text-cactus/60 text-sm mb-8">Walk-ins welcome — terrace seating fills quickly on weekends.</p>
            <a
              href="tel:+2348027777666"
              className="inline-block bg-cactus text-sand px-8 py-3 text-[10px] uppercase tracking-[0.3em] font-bold hover:bg-gold hover:text-cactus transition-colors"
            >
              Book a Table
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 px-6 md:px-10 border-t border-cactus/10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <span className="font-serif text-xl tracking-tighter uppercase">Cactus</span>
          <p className="text-[10px] uppercase tracking-[0.3em] text-cactus/40">
            © {new Date().getFullYear()} Cactus Victoria Island
          </p>
          <div className="flex gap-6 text-[10px] uppercase tracking-[0.3em]">
            <a href="https://facebook.com" className="hover:text-gold">Facebook</a>
            <a href="#" className="hover:text-gold">Instagram</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
