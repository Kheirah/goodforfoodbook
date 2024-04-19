import styles from "./RecipesFilter.module.css";

import { useContext, useEffect, useState } from "react";
import { Outlet, NavLink } from "react-router-dom";
import { UserContext } from "../context/UserContext";

import Box from "@mui/material/Box";
import Container from "@mui/material/Box";
import Typography from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Unstable_Grid2/Grid2";

export function RecipesFilter({ onClickFilter }) {
  const [isActiveFilterVegan, setIsActivFilterVegan] = useState(false);
  const [isActiveFilterEasy, setIsActiveFilterEasy] = useState(false);
  const [isActiveFilterFast, setIsActiveFilterFast] = useState(false);

  const { user, logout } = useContext(UserContext);

  const handleFilterButtonClick = (e) => {
    const filter = e.target.id;
    if (filter === "vegetarisch") {
      setIsActivFilterVegan(!isActiveFilterVegan);
    }
    if (filter === "einfach") {
      setIsActiveFilterEasy(!isActiveFilterEasy);
    }
    if (filter === "schnell") {
      setIsActiveFilterFast(!isActiveFilterFast);
    }
  };

  return (
    <>
      <Grid container spacing={3} sx={{ padding: "2em 0 2em 0" }}>
        <Grid>
          <Button variant="outlined">Rezeptart</Button>
        </Grid>
        <Grid>
          <Button variant="outlined">Kategorie</Button>
        </Grid>
        <Grid>
          <Button variant="outlined">Ernährung</Button>
        </Grid>

        <Grid container>
          <Grid>
            <Button
              variant="text"
              id="vegetarisch"
              onClick={(e) => {
                onClickFilter(e);
                handleFilterButtonClick(e);
              }}
              style={isActiveFilterVegan ? { fontWeight: 900 } : undefined}
            >
              Vegetarisch
            </Button>
          </Grid>
          <Grid>
            <Button
              variant="text"
              id="einfach"
              onClick={(e) => {
                onClickFilter(e, isActiveFilterEasy);
                handleFilterButtonClick(e);
              }}
              style={isActiveFilterEasy ? { fontWeight: 900 } : undefined}
            >
              Einach
            </Button>
          </Grid>
          <Grid>
            <Button
              variant="text"
              id="schnell"
              onClick={(e) => {
                onClickFilter(e, isActiveFilterFast);
                handleFilterButtonClick(e);
              }}
              style={isActiveFilterFast ? { fontWeight: 900 } : undefined}
            >
              Schnell
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}
