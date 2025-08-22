import { useEffect, useMemo, useState } from "react";

export default function Projects() {
  // Ensure no white gap around/below the page
  useEffect(() => {
    const prevMargin = document.body.style.margin;
    const prevBg = document.body.style.backgroundColor;
    const prevMinHeight = document.body.style.minHeight;
    const prevOverflow = document.body.style.overflow;
    const htmlEl = document.documentElement;
    const prevHtmlBg = htmlEl.style.backgroundColor;

    document.body.style.margin = "0";
    document.body.style.padding = "0";
    document.body.style.backgroundColor = "#0e1a12";
    document.body.style.height = "100vh";
    document.body.style.overflow = "auto";
    htmlEl.style.backgroundColor = "#0e1a12";

    return () => {
      document.body.style.margin = prevMargin;
      document.body.style.backgroundColor = prevBg;
      document.body.style.minHeight = prevMinHeight;
      document.body.style.overflow = prevOverflow;
      htmlEl.style.backgroundColor = prevHtmlBg;
    };
  }, []);

  // Filters
  const projectTypes = [
    "All",
    "Stadium",
    "Community Field",
    "Upgrade",
    "Tournament",
    "School",
    "Indoor",
  ];
  const locations = [
    "All",
    "Mumbai",
    "Bengaluru",
    "Kochi",
    "Delhi",
    "Hyderabad",
    "Chennai",
  ];
  const services = [
    "All",
    "Turnkey",
    "Turf",
    "Lighting",
    "Fencing",
    "Base Work",
  ];

  const [type, setType] = useState("All");
  const [location, setLocation] = useState("All");
  const [service, setService] = useState("All");
  const [page, setPage] = useState(1);

  // Data
  const projects = useMemo(
    () => [
      {
        id: 1,
        title: "Premier League Stadium",
        description: "A state-of-the-art stadium for a top-tier football club.",
        image:
          "https://images.unsplash.com/photo-1518091043644-c1d4457512c6?q=80&w=1400&auto=format&fit=crop",
        type: "Stadium",
        location: "Delhi",
        services: ["Base Work", "Turf", "Lighting"],
      },
      {
        id: 2,
        title: "Community Football Field",
        description: "A high-quality football field for community use.",
        image:
          "https://images.unsplash.com/photo-1516542076529-1ea3854896e1?q=80&w=1400&auto=format&fit=crop",
        type: "Community Field",
        location: "Bengaluru",
        services: ["Turf", "Fencing"],
      },
      {
        id: 3,
        title: "Training Ground Upgrade",
        description:
          "Upgrading the training facilities for a professional team.",
        image:
          "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?q=80&w=1400&auto=format&fit=crop",
        type: "Upgrade",
        location: "Mumbai",
        services: ["Lighting", "Turf"],
      },
      {
        id: 4,
        title: "International Tournament Venue",
        description: "Hosting a major international football tournament.",
        image:
          "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1400&auto=format&fit=crop",
        type: "Tournament",
        location: "Hyderabad",
        services: ["Turnkey"],
      },
      {
        id: 5,
        title: "School Football Pitch",
        description: "A safe and durable football pitch for a school.",
        image:
          "https://images.unsplash.com/photo-1591247378418-5c0e574b8a43?q=80&w=1400&auto=format&fit=crop",
        type: "School",
        location: "Chennai",
        services: ["Base Work", "Turf"],
      },
      {
        id: 6,
        title: "Indoor Football Arena",
        description: "An indoor arena for year-round football activities.",
        image:
          "https://images.unsplash.com/photo-1502877338535-766e1452684a?q=80&w=1400&auto=format&fit=crop",
        type: "Indoor",
        location: "Kochi",
        services: ["Lighting", "Turf"],
      },
      // additional to demonstrate pagination
      {
        id: 7,
        title: "Club Training Complex",
        description: "Multi-pitch complex with support facilities.",
        image:
          "https://images.unsplash.com/photo-1486286701208-1d58e9338013?q=80&w=1400&auto=format&fit=crop",
        type: "Upgrade",
        location: "Delhi",
        services: ["Turf", "Fencing"],
      },
      {
        id: 8,
        title: "City Sports Park",
        description: "Public grounds revitalization with new turf systems.",
        image:
          "https://images.unsplash.com/photo-1459865264687-595d652de67e?q=80&w=1400&auto=format&fit=crop",
        type: "Community Field",
        location: "Mumbai",
        services: ["Turnkey"],
      },
      {
        id: 9,
        title: "Youth Academy Ground",
        description: "Elite academy pitch certified to FIFA Quality.",
        image:
          "https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?q=80&w=1400&auto=format&fit=crop",
        type: "School",
        location: "Bengaluru",
        services: ["Base Work", "Turf"],
      },
      {
        id: 10,
        title: "Seaside Arena",
        description: "Coastal venue with salt-resistant systems.",
        image:
          "https://images.unsplash.com/photo-1509021436665-8f07dbf5bf1d?q=80&w=1400&auto=format&fit=crop",
        type: "Stadium",
        location: "Chennai",
        services: ["Lighting"],
      },
      {
        id: 11,
        title: "City Indoor Dome",
        description: "Inflatable dome with premium turf surface.",
        image:
          "https://images.unsplash.com/photo-1499028344343-cd173ffc68a9?q=80&w=1400&auto=format&fit=crop",
        type: "Indoor",
        location: "Delhi",
        services: ["Turf"],
      },
      {
        id: 12,
        title: "Regional Cup Venue",
        description: "Temporary tournament overlay and field setup.",
        image:
          "https://images.unsplash.com/photo-1521417531039-5b670d1d91ab?q=80&w=1400&auto=format&fit=crop",
        type: "Tournament",
        location: "Hyderabad",
        services: ["Turnkey"],
      },
    ],
    []
  );

  // Filtering
  const filtered = useMemo(() => {
    return projects.filter((p) => {
      const t = type === "All" || p.type === type;
      const l = location === "All" || p.location === location;
      const s = service === "All" || p.services.includes(service);
      return t && l && s;
    });
  }, [projects, type, location, service]);

  // Pagination
  const pageSize = 6;
  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const currentPage = Math.min(page, totalPages);
  const start = (currentPage - 1) * pageSize;
  const pageItems = filtered.slice(start, start + pageSize);

  const resetFilters = () => {
    setType("All");
    setLocation("All");
    setService("All");
    setPage(1);
  };

  return (
    <section className="bg-[#0e1a12] text-white min-h-screen py-16 w-full">
      <div className="mx-auto max-w-7xl px-6">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
            Our Recent Projects
          </h1>
          <p className="text-neutral-300 max-w-3xl mx-auto leading-relaxed">
            Explore our portfolio of completed football ground projects,
            showcasing our expertise and commitment to quality.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:!grid-cols-2 lg:!grid-cols-3 gap-6">
          {pageItems.map((p) => (
            <article
              key={p.id}
              className="bg-black/30 rounded-xl overflow-hidden border border-white/5 hover:border-lime-500/40 transition-all duration-300 group"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={p.image}
                  alt={p.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              </div>
              <div className="p-5">
                <h3 className="text-lg font-semibold mb-1">{p.title}</h3>
                <p className="text-neutral-300 text-sm mb-4">{p.description}</p>
                <div className="flex flex-wrap gap-2 text-xs text-neutral-400 mb-4">
                  <span className="px-2 py-1 bg-white/5 rounded-full border border-white/10">
                    {p.type}
                  </span>
                  <span className="px-2 py-1 bg-white/5 rounded-full border border-white/10">
                    {p.location}
                  </span>
                  {p.services.map((s) => (
                    <span
                      key={s}
                      className="px-2 py-1 bg-white/5 rounded-full border border-white/10"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Empty state */}
        {pageItems.length === 0 && (
          <div className="text-center py-16 text-neutral-300">
            No projects found with the selected filters.
          </div>
        )}

        {/* Pagination */}
        <div className="flex items-center justify-center gap-2 mt-10">
          <PageBtn
            label="Prev"
            disabled={currentPage === 1}
            onClick={() => setPage((p) => Math.max(1, p - 1))}
          />
          {Array.from({ length: totalPages }).map((_, i) => {
            const n = i + 1;
            return (
              <button
                key={n}
                onClick={() => setPage(n)}
                className={
                  "w-9 h-9 rounded-md text-sm border transition " +
                  (n === currentPage
                    ? "bg-lime-500 text-black border-lime-500"
                    : "bg-white/5 text-neutral-300 border-white/10 hover:bg-white/10")
                }
              >
                {n}
              </button>
            );
          })}
          <PageBtn
            label="Next"
            disabled={currentPage === totalPages}
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
          />
        </div>
      </div>
    </section>
  );
}

function PageBtn({ label, onClick, disabled }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`h-9 px-3 rounded-md text-sm border transition ${
        disabled
          ? "bg-white/5 text-neutral-500 border-white/10 cursor-not-allowed"
          : "bg-white/5 text-neutral-300 border-white/10 hover:bg-white/10"
      }`}
    >
      {label}
    </button>
  );
}
