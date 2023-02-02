import { AppBar, Box, Button, Container, createTheme, Divider, Drawer, Grid, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Menu, MenuItem, Paper, ThemeProvider, Toolbar, Typography } from "@mui/material";
import { ReactNode, useState } from "react";
import { Copyright } from "../Copyright";
import { 
  AccountCircle,
  CalendarMonth,
  ChevronLeft,
  Dashboard
} from '@mui/icons-material';
import MenuIcon from '@mui/icons-material/Menu';
import { Outlet, useNavigate } from "react-router-dom";
import { getIsAuthenticated } from "../../helpers/getIsAuthenticated";

type LayoutProps = {
  children?: ReactNode;
}

const mdTheme = createTheme();

export const Layout: React.FC<LayoutProps> = ({children}) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const navigate = useNavigate();

  const handleDrawerOpen = () => {
    setIsDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setIsDrawerOpen(false);
  };

  const handleNavigation = (toUrl: string) => {
    navigate(toUrl);
    setIsDrawerOpen(false);
  }

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfileClick = () => {
    setAnchorEl(null);

    navigate('/app/profile');
  };

  const handleLogoutClick = () => {
    setAnchorEl(null);

    localStorage.clear();

    navigate('/login');
  };

  const handleClose = () => {
    setAnchorEl(null);
  }

  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="Open drawer"
              onClick={handleDrawerOpen}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" component="div" onClick={() => handleNavigation('/app/dashboard')} sx={{ cursor: 'pointer',flexGrow: 1 }}>
              Travel Guide
            </Typography>
            {getIsAuthenticated() ? (
              <div>
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleMenu}
                  color="inherit"
                >
                  <AccountCircle />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  <MenuItem onClick={handleProfileClick}>Профиль</MenuItem>
                  <MenuItem onClick={handleLogoutClick}>Выйти</MenuItem>
                </Menu>
              </div>
            ) : (
              <Button color="inherit" onClick={() => navigate('/login')}>Login</Button>
            )}
          </Toolbar>
        </AppBar>
        <Drawer
            open={isDrawerOpen}
          >
            <div>
              <IconButton onClick={handleDrawerClose}>
                <ChevronLeft />
              </IconButton>
            </div>
            <Divider />
            <List>
              <ListItem>
                <ListItemButton onClick={() => handleNavigation('/app/dashboard')}>
                  <ListItemIcon>
                    <Dashboard />
                  </ListItemIcon>
                  <ListItemText primary="Главная" />
                </ListItemButton>
              </ListItem>
              <ListItem>
                <ListItemButton onClick={() => handleNavigation('/app/travels')}>
                  <ListItemIcon>
                    <CalendarMonth />
                  </ListItemIcon>
                  <ListItemText primary="Путешествия" />
                </ListItemButton>
              </ListItem>
              <ListItem>
                <ListItemButton onClick={() => handleNavigation('/app/places')}>
                  <ListItemIcon>
                    <CalendarMonth />
                  </ListItemIcon>
                  <ListItemText primary="Места" />
                </ListItemButton>
              </ListItem>
              <ListItem>
                <ListItemButton onClick={() => handleNavigation('/app/calendar')}>
                  <ListItemIcon>
                    <CalendarMonth />
                  </ListItemIcon>
                  <ListItemText primary="Календарь" />
                </ListItemButton>
              </ListItem>
            </List>
          </Drawer>
          <Box>
            <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
              <Grid container spacing={3}>
                <Grid item md={12}>
                  <Paper
                    sx={{
                      p: 2,
                      display: 'flex',
                      flexDirection: 'column',
                    }}
                  >
                    {children ?? <Outlet />}
                  </Paper>
                </Grid>
              </Grid>
            </Container>
          </Box>
          <Box marginTop="32px">
            <Copyright />
          </Box>
      </Box>
    </ThemeProvider>
  );
}
