const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 4000;
const multer = require("multer");
const path = require("path");
const { Configuration, OpenAIApi } = require("openai");
const { text } = require("express");

app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

const configuration = new Configuration({
  apiKey: "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",
});
const openai = new OpenAIApi(configuration);

const GPTFunction = async (text) => {
  const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: text,
    temperature: 0.6,
    max_tokens: 250,
    top_p: 1,
    frequency_penalty: 1,
    presence_penalty: 1,
  });
  return response.data.choices[0].text;
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = mutler({
  storage: storage,
  limits: { filesize: 1024 * 1024 * 5 },
});

app.get("/", (req, res) => {
  res.json({
    message: "Hi Everyone",
  });
});

app.post("/resume/create", upload.single("headshotImage"), async (req, res) => {
  const { fullName, currentPosition, currentLength, currentTech, workHistory } =
    req.body;
  const workArray = JSON.parse(workHistory);

  const newEntry = {
    id: generateID(),
    fullName,
    image_url: `http://localhost:4000/uploads/${req.file.filename}`,
    currentPosition,
    currentLength,
    currentTech,
    workHistory: workArray,
  };
  res.json({
    message: "request is made successfully",
    data: {},
  });
});

app.listen(PORT, () => {
  console.log(`Server is listening on ${PORT}`);
});
