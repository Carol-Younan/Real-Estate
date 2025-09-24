import * as React from 'react';
import Logo from './assets/red_sea_construction_logo-removebg-preview.png'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import { useRef } from 'react';

interface Props {
  window?: () => Window;
  footerRef?: React.RefObject<HTMLDivElement>;
}

const drawerWidth = 240;
const navItems = ['Home', 'About Us','Projects','Careers', 'Contact'];



export default function DrawerAppBar(props: Props) {
    const { window: muiWindow } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

    const [scrolled, setScrolled] = React.useState(false);


    const handleNavClick = (item: string) => {
    if (item === 'Contact' && footerRef?.current) {
      footerRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  React.useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
        <img src={Logo} alt="Red Sea Construction" />
      {/* <Typography variant="h6" sx={{ my: 2 }}>
        <>
      </Typography> */}
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item} disablePadding>
            <ListItemButton sx={{ textAlign: 'center' }}>
              <ListItemText primary={item} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

const container = muiWindow !== undefined ? () => muiWindow().document.body : undefined;

const footerRef = useRef<HTMLDivElement>(null);

// const scrollToFooter = () => {
//     footerRef.current?.scrollIntoView({ behavior: "smooth" });
//     window.history.replaceState(null, "", window.location.pathname);
//   };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar component="nav" sx={{backgroundColor: scrolled ? "white" : "transparent", 
    color: scrolled ? "black" : "white", position:"fixed",zIndex:'10',transition: "all 0.3s ease"
     }}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <img className='logo' src={Logo} alt="Red Sea Construction" style={{height:scrolled?"60px":"100px",width:scrolled?"60px":"100px",transition:"all 0.3s ease"}} />
          <Box sx={{ display: { xs: 'none', sm: 'block' }, ml: "auto",marginRight:'100px' }}>
            {navItems.map((item) => (
                <React.Fragment key={item}>
              <Button 
              onClick={() => handleNavClick(item)}
              sx={{ color: scrolled ? "black" : "white" , fontWeight:'bold',fontSize:'17px',marginRight:'15px',overflow: "hidden",
              border:"none",
    "&::after": {
      content: '""',
      position: "absolute",
      width: "0",
      height: "2px",
      left: "50%",
      bottom: 0,
      backgroundColor: "#0047AB",
      transition: "all 0.8s ease",
      transform: "translateX(-50%)",},
    "&:hover::after": {
      width: "50%",
    },"&:hover": {
      color:"#0047AB"
    },"&:focus": {
      outline: "none",
      boxShadow: "none",
    },
    "&:active": {
      outline: "none",
      boxShadow: "none",
    },}}>
                {item}
              </Button>
            
        </React.Fragment>
            ))}
          </Box>
        </Toolbar>
      </AppBar>
      <nav>
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
    </Box>
  );
}
