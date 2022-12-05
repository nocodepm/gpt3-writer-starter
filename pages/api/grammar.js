import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const secondPromptPrefix =
`
Check and correct the English grammar of this text for me. The full text must be less than 500 tokens.
Text:
`;
const generateAction = async (req, res) => {

  console.log(`API: ${secondPromptPrefix}${req.body.userSecondInput}`)

  const secondCompletion = await openai.createCompletion({
    model: 'text-davinci-003',
    prompt: `${secondPromptPrefix}${req.body.userSecondInput}\n`,
    temperature: 0.8,
    max_tokens: 500,
  });
  
  const secondPromptOutput = secondCompletion.data.choices.pop();

  res.status(200).json({ output: secondPromptOutput });
};

export default generateAction;