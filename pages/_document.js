import Document, { Html, Head, Main, NextScript } from "next/document";

class Meta extends Document {
  render() {
    return (
      <Html>
        <Head>
          <link rel="icon" href="999tez.png" />
          <meta name="description" content="Digitcartel - 999 Floor Checker" />
          <meta
            name="keywords"
            content="smart contract, defi, bitcoin, ethereum, eth, tezos, tez, nft, nonfungible, token, avatar, generative, art, decentralized, official, crypto, world, btc, satoshi, p2p, cryptocurrency, digital currency, cryptocurrencies, dao, algo, algorithm, pass, autonomous"
          />
          <meta name="robots" content="index, follow" />
          <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
          <meta name="language" content="English" />
          <link href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet"/>
          <meta property="og:type" content="DApp" />
          <meta property="og:description" content="Digitcartel - 999 Floor Checker" />
          <meta property="og:url" content="" />
          <meta name="twitter:description" content="Digitcartel - 999 Floor Checker" />
          <meta name="twitter:card" content="summary" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default Meta;
