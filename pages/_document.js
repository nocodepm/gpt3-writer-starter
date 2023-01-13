import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html>
      <Head>
        <meta property="og:title" content="GPT-3 Writer" key="title"/>
        <meta property="og:description" content="build with buildspace" key="description"/>
        <meta
          property="og:image"
          content="https://cdn.buildspace.so/courses/gpt3-writer/project-og.jpg"
        />
        <meta name="twitter:card" content="summary_large_image"></meta>

                {/*====== Required meta tags ======*/}
                <meta charSet="utf-8" />
        <meta httpEquiv="x-ua-compatible" content="ie=edge" />
        <meta name="description" content="" />
        {/*====== Favicon Icon ======*/}
        <link rel="shortcut icon" href="images/AvidX-favicon.png" type="image/png" />
        {/*====== Bootstrap css ======*/}
        <link rel="stylesheet" href="css/bootstrap.min.css" />
        {/*====== Fontawesome css ======*/}
        <link rel="stylesheet" href="css/font-awesome.min.css" />
        {/*====== Magnific Popup css ======*/}
        <link rel="stylesheet" href="css/animate.min.css" />
        {/*====== Magnific Popup css ======*/}
        <link rel="stylesheet" href="css/magnific-popup.css" />
        {/*====== Slick css ======*/}
        <link rel="stylesheet" href="css/slick.css" />
        {/*====== Default css ======*/}
        <link rel="stylesheet" href="css/custom-animation.css" />
        <link rel="stylesheet" href="css/default.css" />
        {/*====== Style css ======*/}
        <link rel="stylesheet" href="css/style.css" />

      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
