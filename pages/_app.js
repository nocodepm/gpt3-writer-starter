import './styles.css';
import 'regenerator-runtime/runtime';
import Head from 'next/head';
import React from 'react';

function App({ Component, pageProps }) {
  return (<Component {...pageProps} />
  )
}

export default App;
