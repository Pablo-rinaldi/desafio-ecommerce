const express = require("express");

const router = express.Router();

const CartManager = require("../dao/db/cart-manager-db.js");

const manager = new CartManager();

router.post("/", async (req, res) => {
  try {
    const newCart = await manager.createCart();
    res.json(newCart);
  } catch (error) {
    console.error("Error al crear carrito", error);
    res.status(500).json({
      error: "Error interno del servidor",
    });
  }
});

router.get("/:cid", async (req, res) => {
  let cartId = req.params.cid;

  try {
    const selectedCart = await manager.getCartById(cartId);

    if (selectedCart) {
      res.send(selectedCart);
    } else {
      res.send("Carrito no encontrado");
    }
  } catch (error) {
    console.error("Error al obtener el carrito", error);
    res.status(500).json({
      error: "Error interno del servidor",
    });
  }
});

router.post("/:cid/product/:pid", async (req, res) => {
  const cartId = req.params.cid;
  const productId = req.params.pid;
  const quantity = req.body.quantity || 1;

  try {
    const updatedCart = await manager.addProductToCart(
      cartId,
      productId,
      quantity
    );
    res.json(updatedCart.products);
  } catch (error) {
    console.error("Error al agregar al carrito", error);
    res.status(500).json({
      error: "Error interno del servidor",
    });
  }
});

module.exports = router;
