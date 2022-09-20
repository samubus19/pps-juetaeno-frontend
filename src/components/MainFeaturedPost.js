import * as React from "react";
import PropTypes from "prop-types";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import logo from "../assets/logo3.png"

function MainFeaturedPost(props) {
  const { post } = props;

  return (
    <Paper
      sx={{
        position: "relative",
        backgroundColor: " #9b0404 ",
        color: "#fff",
        mb: 4,
        backgroundSize: "fill",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "right",
        backgroundImage: `url(${logo})`,
      }}
    >
      {/* Increase the priority of the hero background image */}
      {<img style={{ display: "none" }} src={logo} alt={post.imageText} />}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          bottom: 0,
          right: 0,
          left: 0,
          backgroundColor: "rgba(0,0,0,.3)",
        }}
      />
      <Grid container>
        <Grid item md={6}>
          <Box
            sx={{
              position: "relative",
              p: { xs: 3, md: 3 },
              pr: { md: 0 },
            }}
          >
            <Typography
              component="h1"
              variant="h3"
              color="inherit"
              gutterBottom
            >
              S.G.T.I.D.
            </Typography>
            <Typography variant="h6" color="inherit" paragraph>
              (Sistema de Gestion de Trafico Interno de Documentos)
            </Typography>
            <Typography variant="h5" color="inherit" paragraph>
              {post.area}
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
}

MainFeaturedPost.propTypes = {
  post: PropTypes.shape({
    area: PropTypes.string.isRequired,
  }).isRequired,
};
/** esto se debe pegar en cada pagina 
  area: "Area: Mesa de entrada",
};
 */
export default MainFeaturedPost;
