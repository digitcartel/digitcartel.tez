import React from "react";
import Head from "next/head";

import { Navbar } from "../src/components/Navbar";
import {
  fetchObjktCollection,
  fetchObjktLastOffers,
} from "../src/service/OBJKT/request";
import { fetch10kSupply } from "../src/utils/fetch10kSupply";
import { fetch999Holders } from "../src/utils/fetch999holders";
import { Floor } from "../src/components/Floor/_Floor";
import { Search } from "../src/components/Search/_Search";
import { Listing } from "../src/components/Profile/Listing/_Listing";
import { Bids } from "../src/components/Profile/Bids/_Bids";
import {
  fetchAddress,
  fetchTezDomLastReg,
  fetchTezDomLastSales,
} from "../src/service/TezosDomains/request";
import { Client } from "../src/service/Connector/client";

class Index extends React.Component {
  constructor({ props }) {
    super();

    this.state = {
      _account: "",
      _Contract: {
        NFT: "KT1GBZmSxmnKJXGMdMLbugPfLyUPmuLSMwKS",
        Market: "KT1Evxe1udtPDGWrkiRsEN3vMDdB6gNpkMPM",
        OBJKT: "KT1WvzYHCNBvDSdwafTHv7nJ1dWmZ8GCYuuC",
      },
      _DigitCartel: "tz1X4g93kKkH1hkRAnenzUkJe44U61AQoQn6",
      _Collection: {},
      _LastOffers: [],
      _LastSales: [],
      _LastRegs: [],
      _TezosPrice: 0,
      _EthereumPrice: 0,
      _View: "floor",
      _Profile: false,
      _Holders999: [], //vanity
      _10kSupply: 0, // vanity
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
      contract: this.state._Contract.NFT,
    }).then((e) => {
      fetchTezDomLastReg({ contract: this.state._Contract.NFT }).then((e2) => {
        fetchTezDomLastSales({ contract: this.state._Contract.NFT }).then(
          (e3) => {
            fetchObjktLastOffers({ contract: this.state._Contract.NFT }).then(
              async (e4) => {
                (await fetch("https://api.coingecko.com/api/v3/coins/tezos"))
                  .json()
                  .then((e5) => {
                    this.setState({
                      _Collection: e.data.fa[0],
                      _LastRegs: e2.data.events.items,
                      _LastSales: e3.data.events.items,
                      _LastOffers: e4.data.offer,
                      _TezosPrice: e5.market_data.current_price.usd,
                      _EthereumPrice: e5.market_data.current_price.eth,
                    });
                  });
              }
            );
          }
        );
      });
    });
  };

  componentDidMount() {
    Client.client.getActiveAccount().then((e) => {
      if (e !== undefined) {
        fetchAddress({
          lookFor: e.address,
        }).then((e2) => {
          this.setState(
            {
              _account: e.address,
              _domain:
                e2.data.reverseRecord && e2.data.reverseRecord.domain.name,
            },
            () => {
              this.props.props.context.setState({
                _connected: 1,
              });
            }
          );
        });
      }
    });
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
          {!this.state._Profile && (
            <div className="ml-auto w-[95vw] lXs:w-[60vw] mx-auto">
              {this.state._View === "floor" && <Floor context={this} />}
              {this.state._View === "search" && <Search context={this} />}
            </div>
          )}
          {this.state._Profile && (
            <div className="ml-auto w-[95vw] lXs:w-[60vw] mx-auto">
              {this.state._View === "listing" && <Listing context={this} />}
              {this.state._View === "bids" && <Bids context={this} />}
            </div>
          )}
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
