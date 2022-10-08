import React, { useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { Navbar } from "../deprecated/components/Navbar";
import { char2Bytes } from "@taquito/utils";
import { MichelsonMap, OpKind } from "@taquito/taquito";
import { Floor } from "../deprecated/components/Pages/Floor";
import { Profile } from "../deprecated/components/Profile/Profile";
import { Bulk } from "../deprecated/components/Pages/Bulk";
import {
  _100kbase,
  _10kbase,
  _3dpalibase,
  _4dpalibase,
  _5dpalibase,
  _999base,
} from "../deprecated/utils/generateDomains";
import {
  fetchDomain,
  fetchFloor,
  fetchOffer,
} from "../deprecated/utils/tezosApiRequest";

class Index extends React.Component {
  constructor({ props }) {
    super();

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
      _SelectBulk: [],
      _Selector: [],
      _Selected: false,
      _batchTxInput: "",
      _bulkSearch: [],
      _BulkIndex: 0,
      _BulkLen: 0,
      _txEntry: [],
      _txPending: false,
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

  componentDidMount() {
    fetchFloor(this);
    fetchOffer({ context: this, less: false, more: false, hash: 0 });
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
      fetchDomain(this, this.state._account);
    }
  }

  render() {
    return (
      <>
        <this.Title />
        <div
          className={
            "antialiased w-full lXs:w-8/12 min-h-full mx-auto bg-black font-main"
          }
        >
          <Navbar context={this} />
          <div className="w-full flex flex-col p-[4vw] lXs:p-[2vw]">
            <div className="flex flex-row items-center">
              <h1 className="text-white text-[2.5vw] lXs:text-[1.5vw] font-bold">
                GM ANONS
              </h1>
              {!this.state._Profile && (
                <button
                  onClick={() => {
                    this.setState({
                      _bulkView: !this.state._bulkView,
                    });
                  }}
                  className={
                    "ml-auto font-bold text-[2.5vw] lXs:text-[1.5vw] px-[1.5vw] lXs:px-[1vw] mb-2 " +
                    (this.state._bulkView
                      ? "text-white bg-indigo-500 rounded-full"
                      : "text-indigo-500 border-indigo-500 border-2 rounded-full")
                  }
                >
                  BULK SEARCH
                </button>
              )}
            </div>
            {!this.state._Profile && (
              <>{this.state._bulkView && <Bulk context={this} />}</>
            )}
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
