import { Client, connectBeacon } from "./client";
import { fetchAddress } from "../TezosDomains/request";

export const requestBeaconConnection = (connected, context) => {
  if (connected == 2) {
    connectBeacon(context.props.props.context).then(() => {
      Client.client.getActiveAccount().then((e) => {
        if (e !== undefined) {
          fetchAddress({
            lookFor: e.address,
          }).then((e2) => {
            context.setState({
              _account: e.address,
              _domain:
                e2.data.reverseRecord && e2.data.reverseRecord.domain.name,
            });
          });
        }
      });
    });
  }
};

export const requestBeaconDisconnection = async (connected, context) => {
  if (connected == 1) {
    Client.client.clearActiveAccount().then(() => {
      context.setState(
        {
          _account: "",
          _domain: "",
          _Profile: false,
          _View: "floor"
        },
        () => {
          context.props.props.context.setState({
            _connected: 2,
          });
        }
      );
    });
  }
};
