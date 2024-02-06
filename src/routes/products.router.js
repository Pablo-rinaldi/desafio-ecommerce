const express = require("express");

const router = express.Router();

const ProductManager = require("../dao/db/product-manager-db.js");

const manager = new ProductManager();

router.get("/", async (req, res) => {
  try {
    let limit = parseInt(req.query.limit);

    const prods = await manager.getProducts();

    if (limit) {
      const limitedProducts = prods.slice(0, limit);
      res.send(limitedProducts);
    } else {
      res.send(prods);
    }
  } catch (error) {
    console.log("Error, no se pudieron obtener los productos");
    res.status(500).json({ error: "error del servidor" });
  }
});

router.get("/:pid", async (req, res) => {
  const id = req.params.pid;

  try {
    const product = await manager.getProductById(id);

    if (product) {
      res.send(product);
    } else {
      res.send("Producto no encontrado");
    }
  } catch (error) {
    console.error("Error al obtener producto", error);
    res.status(500).json({
      error: "Error interno del servidor",
    });
  }
});

router.post("/", async (req, res) => {
  try {
    const body = await req.body;
    manager.addProduct(body);

    res.send({ status: "success", message: "Producto creado correctamente" });
  } catch (error) {
    console.error("No se pudo crear el producto", error);
    res.status(500).json({
      error: "Error interno del servidor",
    });
  }
});

router.put("/:pid", async (req, res) => {
  let id = req.params.pid;
  const updatedProduct = req.body;
  try {
    await manager.updateProduct(id, updatedProduct);
    res.send({
      status: "success",
      message: "Producto actualizado correctamente",
    });
  } catch (error) {
    console.error("No se pudo actualizar el producto", error);
    res.status(500).json({
      error: "Error interno del servidor",
    });
  }
});

router.delete("/:pid", async (req, res) => {
  let id = req.params.pid;

  try {
    await manager.deleteProduct(id);
    res.send({
      status: "success",
      message: "Producto fue borrado correctamente",
    });
  } catch (error) {
    console.error("No se pudo borrar el producto", error);
    res.status(500).json({
      error: "Error interno del servidor",
    });
  }
});

module.exports = router;
