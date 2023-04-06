import CottageIcon from "@mui/icons-material/Cottage";
import { Grid } from "@mui/material";
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
      <CottageIcon className="homie-icon" fontSize="80px" />

      <h1 className="header-text">Homie</h1>
    </Grid>
  );
};
export default DiscoverHeader;
