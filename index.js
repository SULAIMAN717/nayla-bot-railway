const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("Nayla Bot for Railway is Running ✅");
});

app.listen(port, () => {
  console.log(`Nayla Bot listening at http://localhost:${port}`);
});