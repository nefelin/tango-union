import Logout from '@mui/icons-material/Logout';
import { Modal } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Tooltip from '@mui/material/Tooltip';
import React, { useState } from 'react';

import useLogout from '../hooks/useLogout';
import useWhoAmiI from '../hooks/useWhoAmiI';
import MenuLogin from './MenuLogin';
import MenuRegister from './MenuRegister';

const UserMenu = () => {
  const [authModal, setAuthModal] = useState(false);
  const [loginOrRegister, setLoginOrRegister] =
    useState<'login' | 'register'>('login');
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleCloseModal = () => {
    setAuthModal(false)
    setLoginOrRegister('login')
  }

  const user = useWhoAmiI();

  const { logout } = useLogout();

  const handleLogout = async () => {
    await logout();
    handleCloseMenu();
  };

  return user ? (
    <React.Fragment>
      <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
        <Tooltip title="Account settings">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
            <div className="text-white font-bold mr-4 hidden sm:inline">
              Hello {user.firstName}
            </div>
            <Avatar sx={{ width: 32, height: 32 }}>
              {user.firstName.split('')[0]}
            </Avatar>
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleCloseMenu}
        onClick={handleCloseMenu}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </React.Fragment>
  ) : (
    <>
      <button
        className="text-white font-bold !cursor-pointer"
        onClick={() => setAuthModal(true)}
      >
        Login
      </button>
      <Modal
        open={authModal}
        onClose={handleCloseModal}
      >
        <div className="flex w-screen h-screen justify-center items-center">
          <div className="w-full h-full sm:w-1/3 sm:h-fit bg-blue-200 bg-white sm:rounded-2xl px-12 py-8">
            {loginOrRegister === 'login' ? (
              <MenuLogin
                onCancel={handleCloseModal}
                onLogin={handleCloseModal}
                onRegister={() => setLoginOrRegister('register')}
              />
            ) : (
              <MenuRegister
                onCancel={handleCloseModal}
                onLogin={() => setLoginOrRegister('login')}
                onRegister={handleCloseModal}
              />
            )}
          </div>
        </div>
      </Modal>
    </>
  );
};

export default UserMenu;
