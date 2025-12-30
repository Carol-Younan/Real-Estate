import * as React from 'react';
import Logo from './assets/realEstate-removebg-preview.png';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom"; 
import Drawer from '@mui/material/Drawer';
import { Divider, List, ListItem, ListItemButton, ListItemText } from '@mui/material';

interface Props {
  window?: () => Window;
  onContactClick?: () => void;
  OnHomeClick?:()=>void;
}

export default function DrawerAppBar(props: Props) {
  const { onContactClick } = props;
  const [scrolled, setScrolled] = React.useState(false);
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const navigate = useNavigate();

  const navItems = [
    { label: "Home", path: "/" },
    { label: "About Us", path: "/about" },
    { label: "Projects", path: "/projects" },
    { label: "Career", path: "/career" },
    { label: "Contact", path: "contact" },
  ];

  const handleNavClick = (label: string, path?: string) => {
    if (label === "Contact" && onContactClick) {
      onContactClick();
      return;
    }
    if (path) {
      navigate(path);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
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

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar 
        component="nav" 
        sx={{
          backgroundColor: scrolled ? "white" : "transparent", 
          color: scrolled ? "black" : "white", 
          position: "fixed",
          zIndex: 10,
          transition: "all 0.3s ease"
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { xs: 'block', md: 'none' } }}
          >
            <MenuIcon />
          </IconButton>

          <img 
            className='logo' 
            src={Logo} 
            onClick={() => handleNavClick("Home", "/")} 
            alt="Red Sea Construction" 
            style={{
              cursor: "pointer", 
              height: scrolled ? "60px" : "100px",
              width: scrolled ? "60px" : "100px",
              transition: "all 0.3s ease"
            }} 
          />

          <Box sx={{ display: { xs: 'none', md: 'block' }, ml: "auto", marginRight: '100px' }}>
            {navItems.map(({ label, path }) => (
              <Button 
                key={label}
                onClick={() => handleNavClick(label, path)}
                sx={{ 
                  color: scrolled ? "black" : "white",
                  fontWeight: 'bold',
                  fontSize: '17px',
                  marginRight: '15px',
                  overflow: "hidden",
                  border: "none",
                  "&::after": {
                    content: '""',
                    position: "absolute",
                    width: "0",
                    height: "2px",
                    left: "50%",
                    bottom: 0,
                    backgroundColor: "#0047AB",
                    transition: "all 0.8s ease",
                    transform: "translateX(-50%)",
                  },
                  "&:hover::after": {
                    width: "50%",
                  },
                  "&:hover": {
                    color: "#0047AB"
                  },
                  "&:focus": {
                    outline: "none",
                    boxShadow: "none",
                  },
                  "&:active": {
                    outline: "none",
                    boxShadow: "none",
                  },
                }}
              >
                {label}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </AppBar>

      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 240 },
        }}
      >
        <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
          <img src={Logo} alt="Logo" style={{ width: 80, margin: '20px auto' }} />
          <Divider />
          <List>
            {navItems.map(({ label, path }) => (
              <ListItem key={label} disablePadding>
                <ListItemButton onClick={() => handleNavClick(label, path)}>
                  <ListItemText primary={label} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    </Box>
  );
}