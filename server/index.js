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

let database = [];

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

  const remainderText = () => {
    let newText = "";
    for (let i = 0; i < workArray.length; i++) {
      newText += `${workArray[i].name} as a ${workArray[i].position}`;
    }
    return newText;
  };

  const prompt1 = `I am writing a resume, my details are \n name: ${fullName} \n role: ${currentPosition} (${currentLength} years). \n I write in the technolegies: ${currentTechnologies}. Can you write a 100 words description for the top of the resume(first person writing)?`;
  //👇🏻 The job responsibilities prompt
  const prompt2 = `I am writing a resume, my details are \n name: ${fullName} \n role: ${currentPosition} (${currentLength} years). \n I write in the technolegies: ${currentTechnologies}. Can you write 10 points for a resume on what I am good at?`;
  //👇🏻 The job achievements prompt
  const prompt3 = `I am writing a resume, my details are \n name: ${fullName} \n role: ${currentPosition} (${currentLength} years). \n During my years I worked at ${
    workArray.length
  } companies. ${remainderText()} \n Can you write me 50 words for each company seperated in numbers of my succession in the company (in first person)?`;

  const objective = await GPTFunction(promp1);
  const keypoints = await GPTFunction(promp2);
  const jobResponsibilities = await GPTFunction(promp3);
  const chatgptData = { objective, keypoints, jobResponsibilities };

  const data = { ...newEntry, ...chatgptData };
  database.push(data);
  res.json({
    message: "request is made successfully",
    data,
  });
});

app.listen(PORT, () => {
  console.log(`Server is listening on ${PORT}`);
});
