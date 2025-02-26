import { AppBar, Button, Toolbar } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";

const AthleLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Button color="inherit" component="a" href="/">
            <HomeIcon />
          </Button>
        </Toolbar>
      </AppBar>
      {children}
    </div>
  );
};

export default AthleLayout;
