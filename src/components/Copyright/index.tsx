import { Link, Typography } from '@mui/material';
import React from 'react';

// TODO: Get rid of every "any" types
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const Copyright: React.FC<any> = (props) => (
  <Typography variant="body2" color="text.secondary" align="center" {...props}>
    {'Copyright © '}
    <Link color="inherit" href="https://github.com/NotRealKomar">
      Uladzislau Komar
    </Link>{' '}
    {new Date().getFullYear()}
    {'.'}
  </Typography>
);
