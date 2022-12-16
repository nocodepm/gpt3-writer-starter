import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import buildspaceLogo from '../assets/buildspace-logo.png';
import { useSpeechSynthesis } from 'react-speech-kit';
import { useSpeechRecognition } from 'react-speech-kit';



const Home = () => {
  const [userInput, setUserInput] = useState('');
  const [apiOutput, setApiOutput] = useState('')

  const onUserChangedText = (event) => {
    setUserInput(event.target.value);
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

  const modifiedText = output.text.replace(/\n/g, '');

  setApiOutput(modifiedText);
  setIsGenerating(false);
}

  const [userSecondInput, setSecondUserInput] = useState('');
  const [apiSecondOutput, setSecondApiOutput] = useState('')

  const onSecondUserChangedText = (event) => {
    setSecondUserInput(event.target.value);
  };

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

  const modifiedText = output.text.replace(/\n/g, '');

  setSecondApiOutput(modifiedText);
  setIsGrammarChecking(false);
}
  
  const [userThirdInput, setThirdUserInput] = useState('');
  const [apiThirdOutput, setThirdApiOutput] = useState('')

  const onThirdUserChangedText = (event) => {
    setThirdUserInput(event.target.value);
  };

  const [isParaphrasing, setIsParaphrasing] = useState(false)
  const callParaphraserEndpoint = async () => {
    setIsParaphrasing(true);

  const response = await fetch('/api/paraphraser', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ apiSecondOutput }),
  });

  const data = await response.json();
  const { output } = data;

  const modifiedText = output.text.replace(/\n/g, '');

  setThirdApiOutput(modifiedText);
  setIsParaphrasing(false);
  }

  const [value, setValue] = useState('');
  const onEnd = () => {
    // You could do something here after speaking has finished
  };
  const { speak, cancel, speaking, supported, voices } = useSpeechSynthesis({
    onEnd,
  });

  const [lang, setLang] = useState('en-US');
  const [valueSecond, setValueSecond] = useState('');
  const [blocked, setBlocked] = useState(false);
  
  const { listen, listening, stop } = useSpeechRecognition({
    onResult: (result) => {
          setValueSecond((result));
    },
  });

  const toggle = listening
    ? stop
    : () => {
        setBlocked(false);
        listen({ lang });
      };

  const reset = () => {
    setValueSecond('');
    }

  return (
    <div className="root">
      <Head>
        <title>Daily Sprint English</title>
      </Head>
                      <!-- Google tag (gtag.js) -->
                <script async src="https://www.googletagmanager.com/gtag/js?id=G-X9SERWPJGG"></script>
                <script>
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());

                  gtag('config', 'G-X9SERWPJGG');
                </script>
      <div className="container">
        <div className="header">
          <div className="header-title">
            <h1>Daily Sprint English</h1>
          </div>
          <div className="header-subtitle">
            <h2>Put in a title or topic in either English or Indonesian and the bot will give you some text to translate. Once you're done, you can ask the bot to check and fix your grammar and even reword the text.</h2>
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
            {isGenerating ? <span className="loader"></span> : <p>Generate text</p>}
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
            {isGrammarChecking ? <span className="loader"></span> : <p>Check grammar</p>}
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
            <div className="prompt-container">
          <textarea
          placeholder="Strat your translation here..."
          className="prompt-box"
          value={apiSecondOutput}
          disabled
          /> 
      <div className="prompt-buttons">
          <a
            className={isParaphrasing ? 'generate-button loading' : 'generate-button'}
            onClick={callParaphraserEndpoint}
            >
            <div className="generate">
            {isParaphrasing ? <span className="loader"></span> : <p>Reword text</p>}
              </div>
              </a>
            </div>
            {apiThirdOutput && (
          <div className="output">
            <div className="output-header-container">
              <div className="output-header">
                <h3>Your paraprhased text</h3>
              </div>
            </div>
            <div className="output-content">
              <p>{apiThirdOutput}</p>
            </div>
            <div className="prompt-container">
              <div className="prompt-buttons">
              {speaking ?
                ( 
                  <a className="generate-button"
                    onClick={cancel}
                  >
                    <div className="generate">
                      <p>Stop talking</p>
                    </div>
                  </a>
                )
                :
                (
                  <a className="generate-button"
                    onClick={() => speak({ text: apiThirdOutput })}
                  >
                    <div className="generate">
                      <p>Read out loud</p>
                    </div>
                  </a>
                )}
              </div>
            </div>
            <div className="prompt-container">
              <div className="output-header">
                <h3>Speaking excercise</h3>
              </div>
              <div className="output-content">
              <p>Read through the paraphrased text above. The Speech Recognition feature will attempt to transcribe what you say. Here, you can check to see if you've pronounced the words correctly. Please read each sentence aloud.</p>
            </div>
            <textarea
              placeholder="Waiting to recognize your speech ..."
              className="prompt-box-short"
              value={valueSecond}
              disabled
            />
          <div className="prompt-buttons">
            <a
              className="generate-button"
              disabled={blocked}
              onClick={toggle}
              >
              {listening ?
                <div className="generate">
                <p>Stop talking</p>
                </div>
              :
                <div className="generate">
                <p>Listen to me</p>
                </div>}
            </a>
            <a className="generate-button"
                    onClick={reset}
                  >
                    <div className="generate">
                      <p>Try again</p>
                    </div>
                  </a>
                </div>
            </div>
          </div>
          )}
        </div>
          </div>
          )}
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