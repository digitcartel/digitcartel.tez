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
              _domain: e2.data.reverseRecord && e2.data.reverseRecord.domain.name,
            });
          });
        }
      });
    });
  }
};
