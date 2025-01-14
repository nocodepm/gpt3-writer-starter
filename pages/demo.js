import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import buildspaceLogo from '../assets/buildspace-logo.png';
import { useSpeechSynthesis } from 'react-speech-kit';
import { useSpeechRecognition } from 'react-speech-kit';
import Script from 'next/script';



const Home = () => {
  const [userInput, setUserInput] = useState('');
  const [userFirstInput, setFirstUserInput] = useState('');
  const [apiOutput, setApiOutput] = useState('')

  const onUserChangedText = (event) => {
    setUserInput(event.target.value);
  };

  const onFirstUserChangedText = (event) => {
    setFirstUserInput(event.target.value);
  };

  const [isGenerating, setIsGenerating] = useState(false)
  const callGenerateEndpoint = async () => {
  setIsGenerating(true);
  
  const response = await fetch('/api/generate', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      userInput,
      userFirstInput,
    }),
  });

  const data = await response.json();
  const { output } = data;

  const modifiedText = output.text.replace();

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

  const modifiedText = output.text.replace();

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
    body: JSON.stringify({ userThirdInput }),
  });

  const data = await response.json();
  const { output } = data;

  const modifiedText = output.text.replace();

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
  const [interimValues, setInterimValues] = useState([]);
  
  const { listen, listening, stop } = useSpeechRecognition({
    continuous: true,
    onResult: (result) => {
          console.log('Received final result:', result);
          setValueSecond(valueSecond + ' ' + interimValues.join(' ') + ' ' + result);
          setInterimValues([]);
    },
    onInterimResult: (result) => {
      console.log('Received interim result:', result);
      setInterimValues((interimValues) => [...interimValues, result]);
    },
    interimResults: true,
  });

  const toggle = () => {
    if (listening) {
      stop();
    } else {
      listen();
    }
  };

  const reset = () => {
    setValueSecond('');
    }

  return (
    <div className="root">
      <Head>
    
      <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        {/*====== Title ======*/}
        <title>AI-powered English-practicing apps</title>


      </Head>


      <header className="appie-header-area-x appie-sticky">
            <div className="container">
              <div className="header-nav-box header-nav-box-7">
                <div className="row align-items-center">
                  <div className="col-lg-2 col-md-4 col-sm-5 col-6 order-1 order-sm-1">
                    <div className="appie-logo-box">
                      <a href="/">
                        <img src="images/AvidX-logo.png" alt="AvidX logo" />
                      </a>
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-1 col-sm-1 order-3 order-sm-2"></div>
                </div>
              </div>
            </div>
      </header>


      <section className="appie-hero-area-x">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-7">
              <div className="appie-hero-content appie-hero-content-6 appie-hero-content-7">
                <h1 className="appie-title">English Sprint </h1>
                <p>
                  Put in a title or topic in any of your native language and the AI
                  will give you some text to translate to English. Once you're done, you can ask
                  the AI to check and fix your grammar and even reword the text.
                </p>
                <div className="info"></div>
              </div>
            </div>
          </div>
        </div>
      </section>


      <section className="appie-project-area pb-100">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div
                className="appie-project-box"
              >
                <div className="row">
                  <div className="col-lg-6">
                    <div className="appie-project-content-x">
                      <h3 className="title">Let's get started!</h3>
                      <h5>1. Input your native language & any topic in your language.</h5>
                        <div className="input-box mt-30">
                          <input
                          type="text"
                          placeholder="Language: Bahasa Indonesia, Mandarin, Korean, Germany, Russian, etc."
                          value={userFirstInput}
                          onChange={onFirstUserChangedText}
                          />
                        </div>
                        <div className="input-box mt-30">
                          <input
                          type="text"
                          placeholder="Topic: Sepak Bola, 산불, วันหยุด, Учиться, Nudeln kochen, 새해 전날, etc."
                          value={userInput}
                          onChange={onUserChangedText}
                          />
                          <button>
                          <div>
                            <a
                              className={isGenerating ? 'loading' : ''}
                              onClick={callGenerateEndpoint}
                            >
                            <div>
                            {isGenerating ? <span className="loader"></span> : <p>Generate</p>}
                              </div>
                              </a>
                            </div>
                          </button>
                        </div>
                      {apiOutput && (
                        <div className="output">
                          <div>
                            <div className="output-header pt-35">
                              <h3>Your generated text</h3>
                            </div>
                          </div>
                          <div className="output-content">
                            <p>{apiOutput}</p>
                          </div>
                        </div>
                      )
                    }
                  </div>

                  <div className="appie-project-content-x">
                  <h5 className="pt-50">2. Try to translate the generated text into English below.</h5>                   
                        <div className="input-box-height mt-30">
                          <textarea
                          type="text"
                          placeholder="Start translating here the best you can do and hit the Grammar button..."
                          value={userSecondInput}
                          onChange={onSecondUserChangedText}
                          />
                          <button>
                          <div>
                            <a
                              className={isGrammarChecking ? 'loading' : ''}
                              onClick={callGrammarEndpoint}
                            >
                            <div>
                            {isGrammarChecking ? <span className="loader"></span> : <p>Grammar</p>}
                              </div>
                              </a>
                            </div>
                          </button>
                        </div>
                      {apiSecondOutput && (
                        <div className="output">
                          <div>
                            <div className="output-header pt-35">
                              <h3>Your corrected text</h3>
                            </div>
                          </div>
                          <div className="output-content">
                            <p>{apiSecondOutput}</p>
                          </div>
                        </div>
                      )
                    }
                  </div>
                  <div className="appie-project-content-x">
                  <h5 className="pt-50">3. Paraphrase the corrected text below to see the alternative.</h5>
                        <div className="input-box-height mt-30">
                          <textarea
                          type="text"
                          placeholder="Copy your corrected text here and hit the Paraphrase button..."
                          value={userThirdInput}
                          onChange={onThirdUserChangedText}
                          />
                          <button>
                          <div>
                            <a
                              className={isParaphrasing ? 'loading' : ''}
                              onClick={callParaphraserEndpoint}
                            >
                            <div>
                            {isParaphrasing ? <span className="loader"></span> : <p>Paraphrase</p>}
                              </div>
                              </a>
                            </div>
                          </button>
                        </div>
                      {apiThirdOutput && (
                        <div className="output">
                          <div>
                            <div className="output-header pt-35">
                              <h3>Your paraphrased text</h3>
                            </div>
                          </div>
                          <div className="output-content">
                            <p>{apiThirdOutput}</p>
                          </div>
                          <div className="no-box mt-10">
                          <h5 className='pb-30'>4. Hit the text-to-speech button below, listen, and shadow the AI.</h5>
                            <button className="pt-30">
                            {speaking ?
                              ( 
                                <a
                                  onClick={cancel}
                                >
                                  <div>
                                    <p>Stop talking</p>
                                  </div>
                                </a>
                              )
                              :
                              (
                                <a
                                  onClick={() => speak({ text: apiThirdOutput })}
                                >
                                  <div>
                                    <p>Text-to-speech</p>
                                  </div>
                                </a>
                              )}
                            </button>
                            </div>
                            <div className="output">
                            <h5 className="pt-50">5. Read through the paraphrased text above.</h5>
                                <div className="output-content">
                                <small className='ml-20 pt-10'> a. Click "Start Listening" button and read the first sentence out loud.
                                <br></br> b. Click "Stop Listening" button to take a break between sentences.
                                <br></br> c. Click "Start Listening" button again to continue with the second sentences.
                                <br></br> d. Repeat the above steps to make sure the AI transcribes all the sentences.
                                </small>
                              </div>
                              <div className="input-box-height mt-30">
                              <textarea
                                placeholder="Waiting to recognize your speech ..."
                                value={valueSecond}
                                onChange={(event) => setValueSecond(event.target.value)}
                              />
                            <button >
                              <a 
                              onClick={toggle}
                              >
                              {listening ? 'Stop listening' : 'Start listening'}
                              </a>
                              <a
                                      onClick={reset}
                                    >
                                      <div>
                                        <p>Try again</p>
                                      </div>
                                    </a>
                                  </button>
                                  </div>
                              </div>
                        </div>
                      )
                    }
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        </div>    
      </section>
    </div>
  );
};

export default Home;