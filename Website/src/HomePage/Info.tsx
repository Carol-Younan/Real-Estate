import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import WhoWeAre from '../assets/WhoWeAre.jpg';
import AnimatedStatsCounter from './Numbers';

export default function BasicGrid() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid size={4} sx={{margin:"50px",marginLeft:"90px",marginTop:"60px"}}>
         <p>Red Sea Construction and Development is an Experienced construction company with more than 2 decades of Construction as the in house arm of Orascom Hotels and Development handling all construction related activities of fully integrated Towns, Hotels, Golf Courses, Marinas, Villas, Apartments, Leisure Facilities, Hospitals, Universities, Schools, Roads & Bridges, along with the needed infrastructure (Power Stations, Desalination Plants, Sewage Treatment Plants, Water Tanks, Networks, etc...).</p>

<p>Starting 2010 Orascom Development decided to establish Red Sea Construction as a standalone entity to handle all construction works inside Orascom Development; while modifying its mandate to source construction works with selective clients out of the Orascom circle, hence becoming a Standalone Company utilizing its unique, extensive experience, talents and well trained staff of more than 1500 members in the open market.</p>

<p>Currently RSC annual turnover is 2.5 billion EGP and our back log is exceeding 11 billion EGP.</p>
        </Grid>
        <Grid size={2}>
    <AnimatedStatsCounter/>
        </Grid>
        <Grid size={3}>
          <img src={WhoWeAre} style={{
            margin:"10px",
            marginTop:"130px",
            marginRight:"30px",
            width:"500px",
            borderRadius:"12px"
          }
          }/>
        </Grid>
        </Grid>
        </Box>
  )}

