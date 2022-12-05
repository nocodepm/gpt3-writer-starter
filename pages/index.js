import { useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import buildspaceLogo from '../assets/buildspace-logo.png';

const Home = () => {
  const [userInput, setUserInput] = useState('');
  const [userSecondInput, setSecondUserInput] = useState('');
  const [apiOutput, setApiOutput] = useState('')

  const onUserChangedText = (event) => {
    setUserInput(event.target.value);
  };

  const onSecondUserChangedText = (event) => {
    setSecondUserInput(event.target.value);
  };

  const [isGenerating, setIsGenerating] = useState(false)
  const callGenerateEndpoint = async () => {
  setIsGenerating(true);
  
  const response = await fetch('/api/generate', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ userInput }),
  });

  const data = await response.json();
  const { output } = data;

  setApiOutput(`${output.text}`);
  setIsGenerating(false);
}

  const [apiSecondOutput, setSecondApiOutput] = useState('')
  const [isGrammarChecking, setIsGrammarChecking] = useState(false)
  const callGrammarEndpoint = async () => {
    setIsGrammarChecking(true);

  const response = await fetch('/api/grammar', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ userSecondInput }),
  });

  const data = await response.json();
  const { output } = data;

  setSecondApiOutput(`${output.text}`);
  setIsGrammarChecking(false);
}
  
  return (
    <div className="root">
      <Head>
        <title>GPT-3 Writer | buildspace</title>
      </Head>
      <div className="container">
        <div className="header">
          <div className="header-title">
            <h1>ID-EN text translation exercise</h1>
          </div>
          <div className="header-subtitle">
            <h2>Input a title or topic you have in mind either in Bahasa Indonesia or English, and then the bot will generate a text you can translate into English. After you're done translating, you can ask the bot to check and correct your grammars, even paraphrase the text for you (Pro feature coming soon).</h2>
          </div>
        </div>
      </div>
      <div className="prompt-container">
          <textarea
           className="prompt-box-short"
           placeholder="Start typing here ... you can try to input something like Study Aboard or Sepak Bola"
           value={userInput}
           onChange={onUserChangedText} />
           <div className="prompt-buttons">
            <a
              className={isGenerating ? 'generate-button loading' : 'generate-button'}
              onClick={callGenerateEndpoint}
             >
            <div className="generate">
            {isGenerating ? <span className="loader"></span> : <p>Generate</p>}
              </div>
              </a>
            </div>
           {apiOutput && (
          <div className="output">
            <div className="output-header-container">
              <div className="output-header">
                <h3>Your generated text</h3>
              </div>
            </div>
            <div className="output-content">
              <p>{apiOutput}</p>
            </div>
          </div>
          )}
      </div>
      <div className="prompt-container">
          <textarea
          placeholder="Strat your translation here..."
          className="prompt-box"
          value={userSecondInput}
          onChange={onSecondUserChangedText}
          />
      <div className="prompt-buttons">
          <a
            className={isGrammarChecking ? 'generate-button loading' : 'generate-button'}
            onClick={callGrammarEndpoint}
            >
            <div className="generate">
            {isGrammarChecking ? <span className="loader"></span> : <p>Grammar</p>}
              </div>
              </a>
            </div>
            {apiSecondOutput && (
          <div className="output">
            <div className="output-header-container">
              <div className="output-header">
                <h3>Your grammar check</h3>
              </div>
            </div>
            <div className="output-content">
              <p>{apiSecondOutput}</p>
            </div>
          </div>
          )}
        </div>
      <div className="badge-container grow">
        <a
          href="https://buildspace.so/builds/ai-writer"
          target="_blank"
          rel="noreferrer"
        >
          <div className="badge">
            <Image src={buildspaceLogo} alt="buildspace logo" />
            <p>build with buildspace</p>
          </div>
        </a>
      </div>
    </div>
  );
};

export default Home;
