import styles from "./ShoppingList.module.css";

import { useContext, useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";

import ReactDOM from "react-dom";
import PDFCreator from "./PDFCreator";

import { UserContext } from "../context/UserContext";
import { ShoppingListContext } from "../context/ShoppingListContext";
import { SnackbarProvider, useSnackbar } from "notistack";

import { AlertDialog } from "./AlertDialog";

import { AddIngredientPanel } from "./AddIngredientPanel";
import { ShoppingListIngredient } from "./ShoppingListIngredient";

import { Box, Button, Stack } from "@mui/material";

import { lightGreen, grey, red, orange, deepOrange, green } from "@mui/material/colors";
import PrintSharpIcon from "@mui/icons-material/PrintSharp";

import axios from "axios";

export function ShoppingList() {
  const [isloading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [shoppingList, setShoppingList] = useState(null);

  const [openDialog, setOpenDialog] = useState(false);
  const [idToDeleteIngredient, setIdToDeleteIngredient] = useState();
  const [amountToDelete, setAmountToDelete] = useState();

  const { user } = useContext(UserContext);
  const { addShoppingListContextIngredients } = useContext(ShoppingListContext);
  const { enqueueSnackbar } = useSnackbar();

  const { VITE_API_URL: url } = import.meta.env;

  const deleteIngredientFromShoppingList = useCallback(
    async (ingredientObjId, quantity) => {
      try {
        setIsLoading(true);
        const { data } = await axios.post(
          `${url}/users/${user?.id}/deleteIngredientFromSchoppingList`,
          {
            ingredientObjId: ingredientObjId,
            quantity: quantity,
          }
        );
        console.log(data);
        console.log(data.message);
        enqueueSnackbar(data.message, { variant: "success" });
        loadIngredientsFromShoppingList();
      } catch (err) {
        console.log(err);
        enqueueSnackbar(err.message, { variant: "error" });
        enqueueSnackbar(err.response.data.message, { variant: "error" });
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    },
    [url, user?.id]
  );

  const addIngredientToShoppingList = useCallback(
    async (ingredientObjId, quantity) => {
      try {
        setIsLoading(true);
        const { data } = await axios.post(`${url}/users/${user?.id}/addIngredientToSchoppingList`, {
          ingredientObjId: ingredientObjId,
          quantity: quantity,
        });
        console.log(data);
        console.log(data.message);
        enqueueSnackbar(data.message, { variant: "info" });
        loadIngredientsFromShoppingList();
      } catch (err) {
        console.log(err);
        enqueueSnackbar(err.message, { variant: "error" });
        enqueueSnackbar(err.response.data.message, { variant: "error" });
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    },
    [url, user?.id]
  );
  const loadIngredientsFromShoppingList = useCallback(async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.get(`${url}/users/${user?.id}/getIngredientsFromShoppingList`);
      console.log(data.shoppingList);
      console.log(data.message);

      enqueueSnackbar(data.message, { variant: "success" });
      setShoppingList(data.shoppingList);
      addShoppingListContextIngredients(data.shoppingList.length);
    } catch (err) {
      console.log(err);
      console.log(err.response.data.message);
      console.log(err.response.status);
      enqueueSnackbar(err.response.data.message, { variant: "error" });
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  }, [url, user?.id]);

  useEffect(() => {
    loadIngredientsFromShoppingList();
  }, [url, user?.id, loadIngredientsFromShoppingList]);

  const handleClickOpenDialog = (id, amount, val) => {
    console.log(id);
    console.log(amount);
    setIdToDeleteIngredient(id);
    setAmountToDelete(amount);
    setOpenDialog(val);
  };

  const handleClickDecition = (bool, val, decition) => {
    console.log(val, decition, idToDeleteIngredient);
    setOpenDialog(bool);
    if (decition === "AGREE") {
      deleteIngredientFromShoppingList(idToDeleteIngredient, amountToDelete);
    }
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <>
      <h2>Shopping List</h2>

      {shoppingList?.length !== 0 && (
        <Box p={3} mb={5}>
          <PDFCreator shoppingList={shoppingList} user={user} />
        </Box>
      )}

      <AlertDialog
        openDialog={openDialog}
        onHandleDecition={(val, decition) => {
          handleClickDecition(false, val, decition);
        }}
      />

      <Stack spacing={5} direction="column" pb={10}>
        <Box>
          <h4> Bestandsliste Artikel hinzufügen</h4>
        </Box>
        <Box
          p={2}
          sx={{ borderColor: grey[800], borderWidth: "1px", borderStyle: "solid" }}
          borderRadius={1}
        >
          <AddIngredientPanel
            onUpdateIngredientsList={(ingredientObjId, quantity) => {
              addIngredientToShoppingList(ingredientObjId, quantity);
            }}
          />
        </Box>

        <Box>
          <Stack spacing={2} direction="column">
            <Box pb={2}>
              <h4>Aktueller Bestand</h4>
            </Box>
            {shoppingList
              ?.slice()
              .sort((a, b) => {
                return a.ingredient.name.localeCompare(b.ingredient.name);
              })
              .map((ingredient) => {
                return (
                  <ShoppingListIngredient
                    key={ingredient._id}
                    ingredient={
                      (ingredient = {
                        ...ingredient.ingredient,
                        quantity: ingredient.quantity,
                      })
                    }
                    onDeleteIngredientFromShoppingList={(ingredientObjId, quantity) => {
                      deleteIngredientFromShoppingList(ingredientObjId, quantity);
                    }}
                    onAddIngredientToShoppingList={(ingredientObjId, quantity) => {
                      addIngredientToShoppingList(ingredientObjId, quantity);
                    }}
                    onOpenDialog={(id, amount, val) => {
                      handleClickOpenDialog(id, amount, val);
                    }}
                  />
                );
              })}
          </Stack>
        </Box>
      </Stack>
    </>
  );
}
