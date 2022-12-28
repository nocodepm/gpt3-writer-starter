import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const secondPromptPrefix =
`
Check, correct, simplify the English text below to be more precise in context.
 
Also point out the grammar errors, and tell me why they are grammatically incorrect and explain why you suggest certain corrections.
 
The full text must be less than 500 tokens.

Include “Corrected text:” and “Grammar corrections:” as starting points.
 
State all the changes in grammars, sentence structures, etc under "Grammar corrections:" as bullet points with explanation as to why it is being suggested, so it's easier to read.

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