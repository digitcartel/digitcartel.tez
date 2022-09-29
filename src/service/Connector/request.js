import { Client, connectBeacon } from "./client";

export const requestBeaconConnection = (connected, context) => {
  if (connected == 2) {
    connectBeacon(context.props.props.context).then(() => {
      Client.client.getActiveAccount().then((e) => {
        if (e !== undefined) {
          context.setState({
            _account: e.address,
          });
        }
      });
    });
  }
};
