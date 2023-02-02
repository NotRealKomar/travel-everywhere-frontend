import { Link, Typography } from "@mui/material";

// TODO: Get rid of every "any" types
export const Copyright: React.FC<any> = (props: any) => (
  <Typography variant="body2" color="text.secondary" align="center" {...props}>
    {'Copyright © '}
    <Link color="inherit" href="https://github.com/NotRealKomar">
      Uladzislau Komar
    </Link>{' '}
    {new Date().getFullYear()}
    {'.'}
  </Typography>
);
