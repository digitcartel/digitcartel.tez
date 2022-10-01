import { useEffect, useState } from "react";

import * as Categories from "../../../data/categories.json";
import { Tezos } from "../../../service/Connector/client";
import { OpKind } from "@taquito/taquito";
import { Items } from "./ItemsMap";
import {
  fetchObjktOffers,
  fetchObjktOffersReceived,
  fetchObjktOffersSent,
} from "../../../service/OBJKT/request";

export const Bids = ({ context }) => {
  const _FILTER = {
    ItemsBids: useState([]),
    ItemsDeBids: useState([]),
    Loading: useState(true),
    Initialized: useState(false),
    UpdateReq: useState(false),
    BidsSelectReq: useState([false, {}]),
    BidsSelectedPrice: useState(0),
    BidsSelector: useState([]),
    BidsSelected: useState([]),
    BidsSelect: (e) => {
      const compilePrice = () => {
        let i = -1;
        let price = 0;
        while (++i < _FILTER.BidsSelected[0].length) {
          price += parseInt(_FILTER.BidsSelected[0][i].price);
        }
        return price;
      };

      let currentBidsSelected = _FILTER.BidsSelected[0];
      let currentBidsSelector = _FILTER.BidsSelector[0];
      if (
        !currentBidsSelected.includes(e) &&
        !currentBidsSelector.includes(e.tokenId)
      ) {
        currentBidsSelected.push(e);
        currentBidsSelector.push(e.tokenId);
        _FILTER.BidsSelector[1](currentBidsSelector);
        _FILTER.BidsSelected[1](currentBidsSelected);
      } else {
        currentBidsSelected.splice(currentBidsSelected.indexOf(e), 1);
        currentBidsSelector.splice(currentBidsSelector.indexOf(e.tokenId), 1);
        _FILTER.BidsSelector[1](currentBidsSelector);
        _FILTER.BidsSelected[1](currentBidsSelected);
      }

      let price = compilePrice();
      _FILTER.BidsSelectedPrice[1](price);
      _FILTER.BidsSelectReq[1]([false, {}]);
    },
    DeBidsSelectReq: useState([false, {}]),
    DeBidsSelectedPrice: useState(0),
    DeBidsSelector: useState([]),
    DeBidsSelected: useState([]),
    DeBidsSelect: (e) => {
      const compilePrice = () => {
        let i = -1;
        let price = 0;
        while (++i < _FILTER.DeBidsSelected[0].length) {
          price += parseInt(_FILTER.DeBidsSelected[0][i].price);
        }
        return price;
      };

      let currentDeBidsSelected = _FILTER.DeBidsSelected[0];
      let currentDeBidsSelector = _FILTER.DeBidsSelector[0];
      if (
        !currentDeBidsSelected.includes(e) &&
        !currentDeBidsSelector.includes(e.tokenId)
      ) {
        currentDeBidsSelected.push(e);
        currentDeBidsSelector.push(e.tokenId);
        _FILTER.DeBidsSelector[1](currentDeBidsSelector);
        _FILTER.DeBidsSelected[1](currentDeBidsSelected);
      } else {
        currentDeBidsSelected.splice(currentDeBidsSelected.indexOf(e), 1);
        currentDeBidsSelector.splice(
          currentDeBidsSelector.indexOf(e.tokenId),
          1
        );
        _FILTER.DeBidsSelector[1](currentDeBidsSelector);
        _FILTER.DeBidsSelected[1](currentDeBidsSelected);
      }

      let price = compilePrice();
      _FILTER.DeBidsSelectedPrice[1](price);
      _FILTER.DeBidsSelectReq[1]([false, {}]);
    },
    Fetch: () => {
      fetchObjktOffersSent({
        owner: context.state._account,
        contract: context.state._Contract.NFT,
      }).then(async (e) => {
        _FILTER.ItemsDeBids[1](e.data);
        fetchObjktOffersReceived({
          owner: context.state._account,
          contract: context.state._Contract.NFT,
        }).then(async (e) => {
          _FILTER.ItemsBids[1](e.data);
          _FILTER.Loading[1](false);
          _FILTER.UpdateReq[1](false);
          _FILTER.Initialized[1](true);
        });
      });
    },
    Bids: async () => {
      const contractA = await Tezos.wallet.at(context.state._Contract.OBJKT);
      const contractB = await Tezos.wallet.at(context.state._Contract.NFT);

      const compileTransaction = () => {
        let i = -1;
        let txs = [];
        let price = 0;
        while (++i < _FILTER.BidsSelected[0].length) {
          price += _FILTER.BidsSelected[0][i].price;
          txs.push({
            kind: OpKind.TRANSACTION,
            ...contractB.methods
              .update_operators([
                {
                  add_operator: {
                    owner: context.state._account,
                    operator: context.state._Contract.OBJKT,
                    token_id: parseInt(
                      _FILTER.BidsSelected[0][i].token.token_id
                    ),
                  },
                },
              ])
              .toTransferParams(),
          });
          txs.push({
            kind: OpKind.TRANSACTION,
            ...contractA.methods
              .fulfill_offer(_FILTER.BidsSelected[0][i].bigmap_key)
              .toTransferParams(),
          });
        }

        return [txs, price];
      };

      const addFees = (txs) => {
        txs[0].push({
          kind: OpKind.TRANSACTION,
          to: context.state._DigitCartel,
          amount: `${(2 * txs[1]) / 100}`,
          mutez: true,
        });
        return txs[0];
      };

      let txs = addFees(compileTransaction());

      try {
        Tezos.wallet.batch([...txs]).send();
        _FILTER.BidsSelected[1]([]);
        _FILTER.BidsSelector[1]([]);
      } catch (e) {
        console.log(e);
      }
    },
    DeBids: async () => {
      const contract = await Tezos.wallet.at(context.state._Contract.OBJKT);
      const compileTransaction = () => {
        let i = -1;
        let txs = [];
        while (++i < _FILTER.DeBidsSelected[0].length) {
          txs.push({
            kind: OpKind.TRANSACTION,
            ...contract.methods
              .retract_offer(_FILTER.DeBidsSelected[0][i].bigmap_key)
              .toTransferParams(),
          });
        }

        return txs;
      };

      let txs = compileTransaction();

      try {
        Tezos.wallet.batch([...txs]).send();
        _FILTER.DeBidsSelected[1]([]);
        _FILTER.DeBidsSelector[1]([]);
      } catch (e) {
        console.log(e);
      }
    },
  };

  useEffect(() => {
    if (!_FILTER.Initialized[0]) {
      _FILTER.Fetch();
    }

    if (_FILTER.UpdateReq[0]) {
      _FILTER.Fetch();
    }

    if (_FILTER.BidsSelectReq[0][0]) {
      _FILTER.BidsSelect(_FILTER.BidsSelectReq[0][1]);
    }

    if (_FILTER.DeBidsSelectReq[0][0]) {
      _FILTER.DeBidsSelect(_FILTER.DeBidsSelectReq[0][1]);
    }
  });

  return (
    <>
      <Items _FILTER={_FILTER} context={context} />
    </>
  );
};
