import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import WhoWeAre from "../assets/WhoWeAre.jpg";
import AnimatedStatsCounter from "./Numbers";

export default function BasicGrid() {
  return (
    <Box
      sx={{
        flexGrow: 1,
        padding: { xs: "20px", sm: "40px", md: "60px" },
        maxWidth: "1400px",
        margin: "0 auto",
      }}
    >
      <Grid container spacing={{ xs: 2, sm: 3, md: 4 }}>
        {/* Text Content */}
        <Grid
          size={{ xs: 12, md: 5 }}
          sx={{
            fontSize: { xs: "14px", sm: "16px" },
            padding: { xs: "0", sm: "20px" },
          }}
        >
          <p>
            Real Estate Construction and Development is an Experienced
            construction company with more than 2 decades of Construction as the
            in house arm of Orascom Hotels and Development handling all
            construction related activities of fully integrated Towns, Hotels,
            Golf Courses, Marinas, Villas, Apartments, Leisure Facilities,
            Hospitals, Universities, Schools, Roads & Bridges, along with the
            needed infrastructure (Power Stations, Desalination Plants, Sewage
            Treatment Plants, Water Tanks, Networks, etc...).
          </p>

          <p>
            Starting 2010 Orascom Development decided to establish Real Estate
            Construction as a standalone entity to handle all construction works
            inside Orascom Development; while modifying its mandate to source
            construction works with selective clients out of the Orascom circle,
            hence becoming a Standalone Company utilizing its unique, extensive
            experience, talents and well trained staff of more than 1500 members
            in the open market.
          </p>

          <p>
            Currently RSC annual turnover is 2.5 billion EGP and our back log is
            exceeding 11 billion EGP.
          </p>
        </Grid>

        {/* Stats Counter */}
        <Grid
          size={{ xs: 12, md: 3 }}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: { xs: "20px", md: "40px" },
          }}
        >
          <AnimatedStatsCounter />
        </Grid>

        {/* Image */}
        <Grid
          size={{ xs: 12, md: 4 }}
          sx={{
            display: "flex",
            justifyContent: "center",
            marginTop: { xs: "20px", md: "60px" },
          }}
        >
          <img
            src={WhoWeAre}
            alt="Who We Are"
            style={{
              width: "100%",
              maxWidth: "500px",
              height: "auto",
              borderRadius: "12px",
              objectFit: "cover",
            }}
          />
        </Grid>
      </Grid>
    </Box>
  );
}
