import { forwardRef } from "react";

import { Box, Button, Stack } from "@mui/material";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export function AlertDialog({ openDialog, onHandleDecition }) {
  return (
    <>
      {/* <Button variant="outlined" onClick={handleClickOpen}>
        Open alert dialog
      </Button> */}
      <Dialog
        open={openDialog}
        onClose={onHandleDecition}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Zutat vollständig aus dem Bestand löschen?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Die Zutat wird vollständig aus dem Bestand gelöscht. Kann aber jeder Zeit, über das Add
            Ingredient Panel, angelegt werden.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              onHandleDecition("DISAGREE");
            }}
          >
            Disagree
          </Button>
          <Button
            onClick={() => {
              onHandleDecition("AGREE");
            }}
            autoFocus
          >
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
