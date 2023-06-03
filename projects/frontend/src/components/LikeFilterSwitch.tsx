import { Favorite, FavoriteBorder } from '@mui/icons-material';
import { Switch, Tooltip } from '@mui/material';
import React from 'react';
import { Dispatch, SetStateAction } from 'react';

const LikeFilterSwitch = ({
  checked,
  onChange,
}: {
  checked: boolean;
  onChange: Dispatch<SetStateAction<boolean>>;
}) => (
  <div className="flex items-center">
    <Switch
      checked={checked}
      onChange={(_, newChecked) => onChange(newChecked)}
    />
    <Tooltip title={'Only show liked tracks'}>
      {checked ? <Favorite sx={{ color: 'red' }} /> : <FavoriteBorder />}
    </Tooltip>
  </div>
);

export default LikeFilterSwitch;
