import React from "react";
import Head from "next/head";

import { Navbar } from "../src/components/Navbar";
import {
  fetchObjktCollection,
  fetchObjktLastOffers,
  fetchObjktOffersReceived,
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
import { Airdrop } from "../src/components/Airdrop/_Airdrop";
import { Client } from "../src/service/Connector/client";
import { Token } from "../src/components/Object/Token/_Token";
import { Owner } from "../src/components/Object/Owner/_Owner";

class Index extends React.Component {
  constructor({ props }) {
    super();

    this.state = {
      _View: "floor",
      _Profile: false,
      _Object: false,
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

  checkConnection = () => {
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
              this.props.props.context.setState(
                {
                  _connected: 1,
                },
                async () => {
                  this.setState({
                    _OffersReceived: (
                      await fetchObjktOffersReceived({
                        owner: this.state._account,
                        contract: this.state._Contract.NFT,
                      })
                    ).data.offer.length,
                  });
                }
              );
            }
          );
        });
      }
    });
  };

  init = () => {
    this.setState({
      _Contract: this.props.props.contract,
      _DigitCartel: "tz1X4g93kKkH1hkRAnenzUkJe44U61AQoQn6",
      _Collection: this.props.props.base._Collection,
      _LastOffers: this.props.props.base._LastOffers,
      _LastSales: this.props.props.base._LastSales,
      _LastRegs: this.props.props.base._LastRegs,
      _TezosPrice: this.props.props.base._TezosPrice,
      _EthereumPrice: this.props.props.base._EthereumPrice,
    });
  };

  async componentDidMount() {
    this.checkConnection();
    this.init();
    ////fetch999Holders(this);
    ////fetch10kSupply(this);
  }

  componentDidUpdate(pP, pS) {
    if (!pS._Object && this.state._Object) {
      this.setState({
        _Profile: false,
      });
    }
  }

  render() {
    return (
      <>
        <this.Title />
        <div className="antialiased w-full min-h-full mx-auto bg-black font-main py-4">
          <Navbar context={this} />
          {!this.state._Profile && !this.state._Object && (
            <div className="ml-auto w-[95vw] lXs:w-[60vw] mx-auto">
              {this.state._View === "floor" && <Floor context={this} />}
              {this.state._View === "search" && <Search context={this} />}
              {this.state._View === "airdrop" && <Airdrop context={this} />}
            </div>
          )}
          {this.state._Profile && !this.state._Object && (
            <div className="ml-auto w-[95vw] lXs:w-[60vw] mx-auto">
              {this.state._View === "listing" && <Listing context={this} />}
              {this.state._View === "bids" && <Bids context={this} />}
            </div>
          )}
          {this.state._Object && !this.state._Profile && (
            <div className="ml-auto w-[95vw] lXs:w-[60vw] mx-auto">
              {this.state._View === "token" && <Token context={this} />}
              {this.state._View === "wallet" && <Owner context={this} />}
            </div>
          )}
        </div>
      </>
    );
  }
}

export const getServerSideProps = async (context) => {
  const _Contract = {
    NFT: "KT1GBZmSxmnKJXGMdMLbugPfLyUPmuLSMwKS",
    Market: "KT1Evxe1udtPDGWrkiRsEN3vMDdB6gNpkMPM",
    OBJKT: "KT1WvzYHCNBvDSdwafTHv7nJ1dWmZ8GCYuuC",
  };

  const initBase = async () => {
    return {
      _Collection: (
        await fetchObjktCollection({
          contract: _Contract.NFT,
        })
      ).data.fa[0],
      _LastRegs: (await fetchTezDomLastReg({ contract: _Contract.NFT })).data
        .events.items,
      _LastSales: (
        await fetchTezDomLastSales({
          contract: _Contract.NFT,
        })
      ).data.events.items,
      _LastOffers: (
        await fetchObjktLastOffers({
          contract: _Contract.NFT,
        })
      ).data.offer,
      _TezosPrice: (
        await (
          await fetch("https://api.coingecko.com/api/v3/coins/tezos")
        ).json()
      ).market_data.current_price.usd,
      _EthereumPrice: (
        await (
          await fetch("https://api.coingecko.com/api/v3/coins/tezos")
        ).json()
      ).market_data.current_price.eth,
    };
  };

  return {
    props: {
      contract: _Contract,
      base: await initBase(),
    },
  };
};

const Main = (props) => {
  return (
    <>
      <Index props={props} />
    </>
  );
};

export default Main;
