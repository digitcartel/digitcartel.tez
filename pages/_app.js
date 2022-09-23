import App from "next/app";
import "../styles/globals.css";

import { TezosToolkit } from "@taquito/taquito";
import { BeaconWallet } from "@taquito/beacon-wallet";

const Tezos = new TezosToolkit("https://mainnet.api.tez.ie");
const Client = new BeaconWallet({
  name: "digitcartel",
  preferredNetwork: "mainnet",
});

class Core extends App {
  constructor(props) {
    super(props);

    this.state = {
      _Tezos: Tezos,
      _Wallet: Client,
      _connected: 2,
    };
  }

  connect = async () => {
    try {
      await this.state._Wallet.client.requestPermissions();
      this.setState({
        _connected: 1,
      });
    } catch (error) {
      console.log(error);
      this.setState(
        {
          _connected: 0,
        },
        () => {
          setTimeout(() => {
            this.setState({
              _connected: 2,
            });
          }, 10000);
        }
      );
    }
  };

  componentDidMount() {
    this.state._Tezos.setWalletProvider(this.state._Wallet);
  }

  render() {
    const { Component, pageProps } = this.props;
    return <Component context={this} {...pageProps} />;
  }
}

export default Core;
