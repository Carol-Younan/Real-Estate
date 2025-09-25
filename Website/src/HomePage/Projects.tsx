import { useRef, useEffect, useState } from "react";
import CONFIG from '../Config';

interface StatData {
  image: string;
  header: string;
}

function StatCard({ stat }: { stat: StatData }) {
  return (
    <div
      className="stat-card"
      style={{
        flex: "0 0 300px",
        borderRadius: "16px",
        overflow: "hidden",
        background: "#fff",
        boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
        cursor: "pointer",
      }}
    >
      <div style={{ height: "200px" }}>
        <img
          src={stat.image}
          alt={stat.header}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </div>
      <h3 style={{ padding: "12px", color: "#30709E", margin: 0 }}>{stat.header}</h3>
    </div>
  );
}

export default function Projects() {

  const [stats, setStats] = useState<StatData[]>([]);

  const innerRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);
  const autoScrollRef = useRef<number | undefined>(undefined);

  const step = 320; 

  useEffect(() => {
    fetch(CONFIG.PROJECTS_URL) 
      .then((res) => res.json())
      .then((data) => setStats(data))
      .catch((err) => console.error("Error loading projects:", err));
  }, []);

  const repeatedStats = [...stats, ...stats, ...stats, ...stats, ...stats];

  const scroll = (direction: "left" | "right") => {
    if (!innerRef.current) return;

    const container = innerRef.current;
    const newPos = direction === "left" ? container.scrollLeft - step : container.scrollLeft + step;

    container.scrollTo({ left: newPos, behavior: "smooth" });
  };

  useEffect(() => {
    if (innerRef.current) {
      const container = innerRef.current;
      container.scrollLeft = (container.scrollWidth / 5) * 2; 
    }

    const startAutoScroll = () => {
      autoScrollRef.current = window.setInterval(() => {
        if (!isPaused && innerRef.current) {
          const container = innerRef.current;
          container.scrollLeft += 1; 
        }
      }, 20);
    };

    startAutoScroll();

    return () => {
      if (autoScrollRef.current) clearInterval(autoScrollRef.current);
    };
  }, [isPaused]);

  const handleScroll = () => {
    if (!innerRef.current) return;

    const container = innerRef.current;
    const singleSetWidth = container.scrollWidth / 5;

    
    if (container.scrollLeft >= singleSetWidth * 3.5) {
      requestAnimationFrame(() => {
        container.style.scrollBehavior = "auto";
        container.scrollLeft = singleSetWidth;
        requestAnimationFrame(() => {
          container.style.scrollBehavior = "smooth";
        });
      });
    } 
    else if (container.scrollLeft <= singleSetWidth * 0.5) {
      requestAnimationFrame(() => {
        container.style.scrollBehavior = "auto";
        container.scrollLeft = singleSetWidth * 2.5;
        requestAnimationFrame(() => {
          container.style.scrollBehavior = "smooth";
        });
      });
    }
  };

  return (
    <>
      <style>{`
        .scrollable-container::-webkit-scrollbar {
          display: none;
        }
        .stat-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 8px 25px rgba(0,0,0,0.15);
        }
      `}</style>

      <div style={{ width: "100%", paddingTop: "30px",paddingBottom:"100px", background: "linear-gradient(135deg,#f5f7fa,#c3cfe2)", position: "relative" }}>
        <h2 style={{ textAlign: "center", fontSize: 40, fontWeight: "bold", color: "#2A3B9F" }}>
          Projects
        </h2>

        <div 
          style={{ position: "relative", overflow: "hidden", maxWidth: 1200, margin: "0 auto", padding: "0 80px" }}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Left arrow */}
          <button
            onClick={() => scroll("left")}
            style={{
              position: "absolute",
              top: "50%",
              left: "10px",
              transform: "translateY(-50%)",
              zIndex: 30,
              width: 60,
              height: 60,
              borderRadius: "50%",
              border: "3px solid #fff",
              background: "linear-gradient(135deg, #3498db, #2980b9)",
              color: "#fff",
              cursor: "pointer",
              fontSize: 24,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 8px 25px rgba(52, 152, 219, 0.4)",
              transition: "all 0.3s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-50%) scale(1.1)";
              e.currentTarget.style.boxShadow = "0 12px 35px rgba(52, 152, 219, 0.6)";
              e.currentTarget.style.background = "linear-gradient(135deg, #2980b9, #1f5f99)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(-50%) scale(1)";
              e.currentTarget.style.boxShadow = "0 8px 25px rgba(52, 152, 219, 0.4)";
              e.currentTarget.style.background = "linear-gradient(135deg, #3498db, #2980b9)";
            }}
          >
            ◀
          </button>

          {/* Right arrow */}
          <button
            onClick={() => scroll("right")}
            style={{
              position: "absolute",
              top: "50%",
              right: "10px",
              transform: "translateY(-50%)",
              zIndex: 30,
              width: 60,
              height: 60,
              borderRadius: "50%",
              border: "3px solid #fff",
              background: "linear-gradient(135deg, #3498db, #2980b9)",
              color: "#fff",
              cursor: "pointer",
              fontSize: 24,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 8px 25px rgba(52, 152, 219, 0.4)",
              transition: "all 0.3s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-50%) scale(1.1)";
              e.currentTarget.style.boxShadow = "0 12px 35px rgba(52, 152, 219, 0.6)";
              e.currentTarget.style.background = "linear-gradient(135deg, #2980b9, #1f5f99)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(-50%) scale(1)";
              e.currentTarget.style.boxShadow = "0 8px 25px rgba(52, 152, 219, 0.4)";
              e.currentTarget.style.background = "linear-gradient(135deg, #3498db, #2980b9)";
            }}
          >
            ▶
          </button>

          {/* Cards */}
          <div
            ref={innerRef}
            onScroll={handleScroll}
            className="scrollable-container"
            style={{ display: "flex", gap: 20, overflowX: "auto", scrollBehavior: "smooth", scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {repeatedStats.map((stat, index) => (
              <StatCard key={`${stat.header}-${index}`} stat={stat} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
