import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const secondPromptPrefix =
`
Check, correct, simplify, and also point out the grammar error of the text below. Also tell me why they are grammatically incorrect and explain why do you suggest certain correction. The full text must be less than 500 tokens.
 
Include “Corrected text:” and “Grammar corrections:” as starting points.
 
Text:
`;
const generateAction = async (req, res) => {

  console.log(`API: ${secondPromptPrefix}${req.body.userSecondInput}`)

  const secondCompletion = await openai.createCompletion({
    model: 'text-davinci-003',
    prompt: `${secondPromptPrefix}${req.body.userSecondInput}\n`,
    temperature: 0.8,
    max_tokens: 250,
  });
  
  const secondPromptOutput = secondCompletion.data.choices.pop();

  res.status(200).json({ output: secondPromptOutput });
};

export default generateAction;