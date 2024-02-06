const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    res.render("chat");
  } catch (error) {
    console.log("no se pudo obtener el chat", error);
  }
});

module.exports = router;
