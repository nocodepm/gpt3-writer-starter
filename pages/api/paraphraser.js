import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const thirdPromptPrefix =
`
Paraphrase the English text below into a more natural simplified English language like spoken by English native speakers. The full text must be less than 500 tokens.

Text:
`;
const generateAction = async (req, res) => {

  console.log(`API: ${thirdPromptPrefix}${req.body.userThirdInput}`)

  const thirdCompletion = await openai.createCompletion({
    model: 'text-davinci-003',
    prompt: `${thirdPromptPrefix}${req.body.userThirdInput}\n`,
    temperature: 0.7,
    max_tokens: 500,
  });
  
  const thirdPromptOutput = thirdCompletion.data.choices.pop();

  res.status(200).json({ output: thirdPromptOutput });
};

export default generateAction;