import App from "next/app";
import "../styles/globals.css";
import { Client, Tezos } from "../src/service/Connector/client";

class Core extends App {
  constructor(props) {
    super(props);

    this.state = {
      _connected: 2,
    };
  }

  componentDidMount() {
    Tezos.setWalletProvider(Client);
  }

  render() {
    const { Component, pageProps } = this.props;
    return <Component context={this} {...pageProps} />;
  }
}

export default Core;
