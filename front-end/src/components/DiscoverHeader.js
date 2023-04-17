import CottageIcon from "@mui/icons-material/Cottage";
import { Grid, Typography } from "@mui/material";
import "./DiscoverHeader.css";
const DiscoverHeader = (props) => {
  return (
    <Grid
      className="discoverheader"
      container
      direction="row"
      justifyContent="flex-start"
      alignItems="center"
    >
      <Grid item xs={3}>
        <CottageIcon className="homie-icon" fontSize="90px" />
      </Grid>
      <Grid item>
        <Typography variant="h4" className="header-text">
          Homie
        </Typography>
      </Grid>
    </Grid>
  );
};
export default DiscoverHeader;
