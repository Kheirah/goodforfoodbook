import { useContext, useEffect, useState } from "react";
import { Outlet, NavLink } from "react-router-dom";
import { UserContext } from "../context/UserContext";

import Box from "@mui/material/Box";
import Container from "@mui/material/Box";
import Typography from "@mui/material/Box";

import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import Select from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";

import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Unstable_Grid2/Grid2";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const names = ["vegan", "vegetarisch", "low carb", "laktosefrei", "glutenfrei"];

export function SelectBoxNutrationType({ onhandleChangeNutrationType, filterNutrationTypeX }) {
  return (
    <>
      <Grid>
        <FormControl sx={{ m: 1, width: 250 }}>
          <InputLabel id="demo-multiple-checkbox-label">Ernährung</InputLabel>
          <Select
            labelId="nutrationType"
            id="nutrationType"
            multiple
            value={filterNutrationTypeX}
            onChange={onhandleChangeNutrationType}
            input={<OutlinedInput label="Ernährung" />}
            renderValue={(selected) => selected.join(", ")}
            MenuProps={MenuProps}
          >
            {names.map((name) => (
              <MenuItem key={name} value={name}>
                <Checkbox checked={filterNutrationTypeX.indexOf(name) > -1} />
                <ListItemText primary={name} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
    </>
  );
}
