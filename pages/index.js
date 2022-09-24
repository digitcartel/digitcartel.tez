import React, { useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { Navbar } from "../src/components/Navbar";
import { char2Bytes } from "@taquito/utils";
import { MichelsonMap, OpKind } from "@taquito/taquito";
import { Floor } from "../src/components/Pages/Floor";
import { Profile } from "../src/components/Profile/Profile";
import { Bulk } from "../src/components/Pages/Bulk";

class Index extends React.Component {
  constructor({ props }) {
    super();

    let i = 0;
    let _999base = [];
    let _10kbase = [];
    let _100kbase = [];
    let _3dpalibase = [];
    let _4dpalibase = [];
    let _5dpalibase = [];
    while (i < 100000) {
      let _3digits = (i < 10 ? "00" + i : i < 100 ? "0" + i : i).toString();
      let _4digits = (
        i < 10 ? "000" + i : i < 100 ? "00" + i : i < 1000 ? "0" + i : i
      ).toString();
      let _5digits = (
        i < 10
          ? "0000" + i
          : i < 100
          ? "000" + i
          : i < 1000
          ? "00" + i
          : i < 10000
          ? "0" + i
          : i
      ).toString();

      if (_3digits == _3digits.split("").reverse().join("") && i < 1000) {
        _3dpalibase.push(_3digits + ".tez");
      }

      if (_4digits == _4digits.split("").reverse().join("") && i < 10000) {
        _4dpalibase.push(_4digits + ".tez");
      }

      if (_5digits == _5digits.split("").reverse().join("") && i < 100000) {
        _5dpalibase.push(_5digits + ".tez");
      }

      if (i < 100000) {
        _100kbase.push(_5digits + ".tez");
      }

      if (i < 10000) {
        _10kbase.push(_4digits + ".tez");
      }

      if (i < 1000) {
        _999base.push(_3digits + ".tez");
      }
      i++;
    }

    this.state = {
      _FILTERBASE: {
        name: "999",
        base: _999base,
      },
      _999Base: {
        name: "999",
        base: _999base,
      },
      _10kBase: {
        name: "10k",
        base: _10kbase,
      },
      _100kBase: {
        name: "100k",
        base: _100kbase,
      },
      _3DPaliBase: {
        name: "3D Palindrome",
        base: _3dpalibase,
      },
      _4DPaliBase: {
        name: "4D Palindrome",
        base: _4dpalibase,
      },
      _5DPaliBase: {
        name: "5D Palindrome",
        base: _5dpalibase,
      },
      _Domain: [],
      _account: "",
      _result: [],
      _floor: 0,
      _Profile: false,
      _operatorView: false,
      _listingView: false,
      _transferView: false,
      _SelectOwned: [],
      _SelectOperator: [],
      _SelectList: [],
      _SelectBuy: [],
      _Selector: [],
      _Selected: false,
      _batchTxInput: "",
      _txEntry: [],
      _txPending: false,
    };
  }

  Title = () => {
    return (
      <Head>
        <title>DIGITCARTEL</title>
        <meta property="og:title" content="Digitcartel - 999 Floor Checker" />
        <meta name="twitter:title" content="Digitcartel - 999 Floor Checker" />
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

  fetchOwned = ({ less, more, hash }) => {
    const getOwneds = async (e) => {
      let OwnedData = await fetch("https://api.tezos.domains/graphql", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query: `{
            domains(
              where: { 
                owner: {
                  equalTo: ${JSON.stringify(e)} 
                }
              }
              order: { direction:ASC field:NAME } 
              ${more ? `after: "${hash}"` : ""}
              ${less ? `before: "${hash}"` : ""}
            ) {
              pageInfo {
                hasNextPage
                hasPreviousPage
                endCursor
                startCursor
              }
              items {
                name
                tokenId
              }
            }
          }`,
        }),
      });

      OwnedData = await OwnedData.json();
      if (OwnedData.data) {
        return OwnedData.data;
      }
    };

    getOwneds(this.state._account).then((e) => {
      this.setState({
        _Owned: e,
      });
    });
  };

  fetchOperator = ({ less, more, hash }) => {
    const getOperators = async (e) => {
      let OperatorData = await fetch("https://api.tezos.domains/graphql", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query: `{
            domains(
              where: { 
                owner: {
                  equalTo: ${JSON.stringify(e)} 
                }
                address: {
                  notEqualTo: ${JSON.stringify(e)}
                }
              }
              order: { direction:ASC field:NAME } 
              ${more ? `after: "${hash}"` : ""}
              ${less ? `before: "${hash}"` : ""}
            ) {
              pageInfo {
                hasNextPage
                hasPreviousPage
                endCursor
                startCursor
              }
              items {
                name
                owner
                address
                tokenId
              }
            }
          }`,
        }),
      });

      OperatorData = await OperatorData.json();
      if (OperatorData.data) {
        return OperatorData.data;
      }
    };

    getOperators(this.state._account).then((e) => {
      this.setState({
        _Operator: e,
      });
    });
  };

  fetchListing = ({ less, more, hash }) => {
    const getListings = async (e) => {
      let ListingData = await fetch("https://api.tezos.domains/graphql", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query: `{
            domains(
              where: { 
                owner: {
                  equalTo: ${JSON.stringify(this.state._account)} 
                }
                name: {
                  in: ${JSON.stringify(e)}
                }
              }
              order: { direction:ASC field:NAME } 
              ${more ? `after: "${hash}"` : ""}
              ${less ? `before: "${hash}"` : ""}
            ) {
              pageInfo {
                hasNextPage
                hasPreviousPage
                endCursor
                startCursor
              }
              items {
                name
                tokenId
              }
            }
          }`,
        }),
      });

      ListingData = await ListingData.json();
      if (ListingData.data) {
        return ListingData.data;
      }
    };

    getListings(
      this.state._999Base.base.concat(
        this.state._10kBase.base,
        this.state._100kBase.base
      )
    ).then((e) => {
      this.setState({
        _Listing: e,
      });
    });
  };

  fetchOffer = ({ less, more, hash }) => {
    this.setState({
      _floor: 0,
    });
    const getOffers = async (e) => {
      let OfferData = await fetch("https://api.tezos.domains/graphql", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query: `{
            offers(
              where: { 
                domainName: {
                  in: ${JSON.stringify(e)} 
                }
                state: {
                  in: ACTIVE
                }
              }
              order: { direction:ASC field:PRICE } 
              ${more ? `after: "${hash}"` : ""}
              ${less ? `before: "${hash}"` : ""}
            ) {
              pageInfo {
                hasNextPage
                hasPreviousPage
                endCursor
                startCursor
              }
              items {
                expiresAtUtc
                domain{
                  name
                  owner
                }
                tokenContract
                sellerAddress
                tokenId
                price
                state
              }
            }
          }`,
        }),
      });

      OfferData = await OfferData.json();
      if (OfferData.data) {
        return OfferData.data;
      }
    };

    getOffers(this.state._FILTERBASE.base).then((e) => {
      this.setState({
        _Offer: e,
      });
    });
  };

  fetchFloor = () => {
    this.setState({
      _floor: 0,
    });
    const getOffers = async (e) => {
      let OfferData = await fetch("https://api.tezos.domains/graphql", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query: `{
            offers(
              where: { 
                domainName: {
                  in: ${JSON.stringify(e)} 
                }
                state: {
                  in: ACTIVE
                }
              }
              order: { direction:ASC field:PRICE } 
            ) {
              pageInfo {
                hasNextPage
                hasPreviousPage
                endCursor
                startCursor
              }
              items {
                expiresAtUtc
                domain{
                  name
                }
                price
                state
              }
            }
          }`,
        }),
      });

      OfferData = await OfferData.json();
      if (OfferData.data) {
        return OfferData.data;
      }
    };

    getOffers(this.state._FILTERBASE.base).then((e) => {
      this.setState({
        _floor: e.offers.items[0].price / 10 ** 6,
      });
    });

    fetch("https://api.coingecko.com/api/v3/coins/tezos")
      .then((e) => {
        return e.json();
      })
      .then((e) => {
        this.setState({
          _TezosPrice: e.market_data.current_price,
        });
      });

    fetch("https://api.coingecko.com/api/v3/coins/ethereum")
      .then((e) => {
        return e.json();
      })
      .then((e) => {
        this.setState({
          _EthereumPrice: e.market_data.current_price,
        });
      });
  };

  fetchAddress = (domain) => {
    const getDomain = async (e) => {
      let DomainData = await fetch("https://api.tezos.domains/graphql", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query: `{
            domain(name: "${e}") {
              address
            }
          }
          `,
        }),
      });

      DomainData = await DomainData.json();
      if (DomainData.data) {
        return DomainData.data;
      }
    };

    getDomain(domain).then((e) => {
      this.setState({
        _batchTxInput:
          (e.domain == null && "domain unregistered") ||
          (e.domain && e.domain.address) ||
          "no reverse set",
      });
    });
  };

  fetchDomain = (domain) => {
    const getDomain = async (e) => {
      let DomainData = await fetch("https://api.tezos.domains/graphql", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query: `{
            reverseRecord(address: "${e}") {
              domain {
                name
              }
            }
          }
          `,
        }),
      });

      DomainData = await DomainData.json();
      if (DomainData.data) {
        return DomainData.data;
      }
    };

    getDomain(domain).then((e) => {
      this.setState({
        _accountDomain: e.reverseRecord.domain.name,
      });
    });
  };

  componentDidMount() {
    this.fetchFloor();
    this.fetchOffer({ less: false, more: false, hash: 0 });
    this.props.props.context.state._Wallet.client
      .getActiveAccount()
      .then((e) => {
        if (e !== undefined) {
          this.props.props.context.setState({
            _connected: 2,
          });
        }
      });
  }

  componentDidUpdate(pP, pS) {
    if (pS._account === "" && this.state._account.length > 0) {
      this.fetchDomain(this.state._account);
    }
  }

  render() {
    return (
      <>
        <this.Title />
        <div className={"antialiased w-full min-h-full bg-black font-main"}>
          <Navbar context={this} />
          <div className="w-full flex flex-col p-[4vw] lXs:p-[2vw]">
            <div className="flex flex-row items-center">
              <h1 className="text-white text-[4vw] tM:text-[2.5vw] lXs:text-[1.5vw] px-[1.5vw] lXs:px-[1vw] font-bold">
                GM ANONS
              </h1>
              <button
                onClick={() => {
                  this.setState({
                    _bulkView: !this.state._bulkView,
                  });
                }}
                className={
                  "font-bold text-[2.5vw] lXs:text-[1.5vw] px-[1.5vw] lXs:px-[1vw] " +
                  (this.state._bulkView
                    ? "text-white bg-indigo-500 rounded-full mr-2"
                    : "text-indigo-500 border-indigo-500 border-2 rounded-full mr-2")
                }
              >
                BULK SEARCH
              </button>
            </div>
            {this.state._bulkView && <Bulk context={this} />}
            {!this.state._bulkView && <Floor context={this} />}
            <Profile context={this} />
          </div>
        </div>
      </>
    );
  }
}

const Main = (props) => {
  const getPath = () => {
    const router = useRouter();
    let path = router.asPath;
    path = path.split("/");
    return path;
  };

  let path = getPath();
  return (
    <>
      <Index props={props} path={path} />
    </>
  );
};

export default Main;
