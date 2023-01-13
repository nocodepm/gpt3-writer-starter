import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);


const generateAction = async (req, res) => {

  const basePromptPrefix =
  `
  Write me an IELTS-style or story-telling short reading text, depending on the given topic or title below.

  The text must be written in ${req.body.userFirstInput} language. It must contain only 1 main paragraph with only 5 sentences.

  You must detect the native language of the input Topic or Title, before generating the text based on the must be written in language.

  The full text must be a complete paragraph with an end statement, the last sentence must include a full stop or period.
  
  It is suggested that the generated text is using less than 300 tokens.

  Topic or Title:
  `;

  console.log(`API: ${basePromptPrefix}${req.body.userInput}`)

  const baseCompletion = await openai.createCompletion({
    model: 'text-davinci-003',
    prompt: `${basePromptPrefix}${req.body.userInput}\n`,
    temperature: 0.7,
    max_tokens: 750,
  });
  
  const basePromptOutput = baseCompletion.data.choices.pop();

  res.status(200).json({ output: basePromptOutput });
};

export default generateAction;