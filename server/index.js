const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 4000;

app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "Hi Everyone",
  });
});

app.listen(PORT, () => {
  console.log(`Server is listening on ${PORT}`);
});
