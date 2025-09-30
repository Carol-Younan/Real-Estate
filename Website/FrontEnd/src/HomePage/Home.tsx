import Header from './Header.js';
import Info from './Info.js';
import Box from '@mui/material/Box';
import Projects from'./Projects.js';
import Careers from './Careers.js';

function Home(){
    return(
        <>
       <Header/> 
       <Box >
       <Info/>
       </Box>
       <Box>
        <Projects/>
       </Box>
       <Box>
        <Careers/>
       </Box>
       </>
    )
}
export default Home;