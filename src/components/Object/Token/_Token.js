import { OpKind } from "@taquito/taquito";
import { useEffect, useState } from "react";
import { Tezos } from "../../../service/Connector/client";
import { fetchObjktOffersReceivedForItems } from "../../../service/OBJKT/request";
import {
  fetchAddress,
  fetchDomain,
  fetchListing,
  fetchTezDomEventFor,
} from "../../../service/TezosDomains/request";
import { Header } from "./Header";
import { SubMap } from "./SubMap";
import { Items } from "./ItemsMap";

export const Token = ({ context }) => {
  const _FILTER = {
    Owner: useState(""),
    Item: useState({}),
    Market: useState({}),
    Events: useState({}),
    Offers: useState({}),
    Loading: useState(true),
    Initialized: useState(false),
    UpdateReq: useState(false),
    Fetch: (less, more, hash) => {
      fetchDomain({
        lookFor: context.state._Viewed,
      }).then((e) => {
        fetchAddress({
          lookFor: e.data.domain.owner,
        }).then((e2) => {
          fetchListing({
            lookFor: context.state._Viewed,
          }).then((e3) => {
            fetchObjktOffersReceivedForItems({
              lookFor: context.state._Viewed,
            }).then((e4) => {
              fetchTezDomEventFor({
                lookFor: context.state._Viewed,
                less: less,
                more: more,
                hash: hash,
              }).then((e5) => {
                _FILTER.Item[1](e.data);
                _FILTER.Market[1](e3.data);
                _FILTER.Offers[1](e4.data);
                _FILTER.Events[1](e5.data);
                _FILTER.Owner[1](
                  e2.data.reverseRecord &&
                    e2.data.reverseRecord.domain != null &&
                    e2.data.reverseRecord.domain.name
                );
                _FILTER.Loading[1](false);
                _FILTER.UpdateReq[1](false);
                _FILTER.Initialized[1](true);
              });
            });
          });
        });
      });
    },
    Buy: async () => {
      const contract = await Tezos.wallet.at(context.state._Contract.Market);
      const compileTransaction = () => {
        let txs = [];
        txs.push({
          kind: OpKind.TRANSACTION,
          ...contract.methods
            .execute_offer(
              _FILTER.Market[0].offers.items[0].tokenContract,
              _FILTER.Market[0].offers.items[0].tokenId,
              _FILTER.Market[0].offers.items[0].sellerAddress
            )
            .toTransferParams({
              amount: _FILTER.Market[0].offers.items[0].price,
              mutez: true,
            }),
        });
        return txs;
      };

      const addFees = (txs) => {
        txs.push({
          kind: OpKind.TRANSACTION,
          to: context.state._DigitCartel,
          amount: `${(2 * _FILTER.Market[0].offers.items[0].price) / 100}`,
          mutez: true,
        });
        return txs;
      };

      let txs = addFees(compileTransaction());

      try {
        Tezos.wallet.batch([...txs]).send();
      } catch (e) {
        console.log(e);
      }
    },
  };

  useEffect(() => {
    if (!_FILTER.Initialized[0]) {
      _FILTER.Fetch();
    }
  });

  return (
    <>
      <Header _FILTER={_FILTER} context={context} />
      <SubMap _FILTER={_FILTER} context={context} />
      <div className="w-full mt-2">
        <Items _FILTER={_FILTER} context={context} />
      </div>
    </>
  );
};
