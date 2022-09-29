import React from "react";
import Head from "next/head";

import { Navbar } from "../src/components/Navbar";
import { Items } from "../src/components/Floor/ItemsMap";
import { Header } from "../src/components/Floor/Header";

import * as Categories from "../src/data/categories.json";

import { fetchObjktCollection } from "../src/service/OBJKT/request";
import { fetch10kSupply } from "../src/utils/fetch10kSupply";
import { fetch999Holders } from "../src/utils/fetch999holders";
import { Floor } from "../src/components/Floor/_Floor";
import { Search } from "../src/components/Search/_Search";
import { _3dpalibase, _4dpalibase, _5dpalibase } from "../src/utils/generateDomains";

class Index extends React.Component {
  constructor({ props }) {
    super();

    this.state = {
      _account: "",
      _Contract: {
        NFT: "KT1GBZmSxmnKJXGMdMLbugPfLyUPmuLSMwKS",
        Market: "KT1Evxe1udtPDGWrkiRsEN3vMDdB6gNpkMPM",
      },
      _DigitCartel: "tz1X4g93kKkH1hkRAnenzUkJe44U61AQoQn6",
      _Collection: {},
      _TezosPrice: 0,
      _EthereumPrice: 0,
      _View: "floor",
      _Holders999: [],
      _10kSupply: 0,
    };
  }

  Title = () => {
    return (
      <Head>
        <title>DIGITCARTEL</title>
        <meta
          property="og:title"
          content="Digitcartel - Join .tez digits club"
        />
        <meta
          name="twitter:title"
          content="Digitcartel - Join .tez digits club"
        />
        <meta
          property="og:image"
          content="https://digitcartel.vercel.app/999tez.png"
        />
        <meta
          name="twitter:image"
          content="https://digitcartel.vercel.app/999tez.png"
        />
      </Head>
    );
  };

  initBase = () => {
    fetchObjktCollection({
      contract: this.state._TEZCTR,
    }).then((e) => {
      this.setState({
        _Collection: e.data.fa[0],
      });

      fetch("https://api.coingecko.com/api/v3/coins/tezos")
        .then((e) => {
          return e.json();
        })
        .then((e) => {
          this.setState({
            _TezosPrice: e.market_data.current_price.usd,
            _EthereumPrice: e.market_data.current_price.eth,
          });
        });
    });
  };

  componentDidMount() {
    this.initBase();
    ///fetch999Holders(this);
    ///fetch10kSupply(this);
  }

  render() {
    return (
      <>
        <this.Title />
        <div className="antialiased w-full min-h-full mx-auto bg-black font-main py-4">
          <Navbar context={this} />
          <div className="ml-auto w-[95vw] lXs:w-[60vw] mx-auto">
            {this.state._View === "floor" && <Floor context={this} />}
            {this.state._View === "search" && <Search context={this} />}
          </div>
        </div>
      </>
    );
  }
}

const Main = (props) => {
  return (
    <>
      <Index props={props} />
    </>
  );
};

export default Main;
