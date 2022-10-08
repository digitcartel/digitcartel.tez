import { TezosToolkit } from "@taquito/taquito";
import { BeaconWallet } from "@taquito/beacon-wallet";

export const Tezos = new TezosToolkit("https://mainnet.api.tez.ie");
export const Client = new BeaconWallet({
  name: "digitcartel",
  preferredNetwork: "mainnet",
});

export const connectBeacon = async (context) => {
  try {
    await Client.client.requestPermissions();
    context.setState({
      _connected: 1,
    });
  } catch (error) {
    context.setState(
      {
        _connected: 0,
      },
      () => {
        setTimeout(() => {
          context.setState({
            _connected: 2,
          });
        }, 10000);
      }
    );
  }
};
