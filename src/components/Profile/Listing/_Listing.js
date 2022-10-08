import { useEffect, useState } from "react";

import * as Categories from "../../../data/categories.json";
import {
  fetchListing,
  fetchOwned,
} from "../../../service/TezosDomains/request";
import { Tezos } from "../../../service/Connector/client";
import { OpKind } from "@taquito/taquito";
import { Items } from "./ItemsMap";

export const Listing = ({ context }) => {
  const _FILTER = {
    List: Categories.default,
    Items: useState([]),
    Listing: useState([]),
    Loading: useState(true),
    Initialized: useState(false),
    UpdateReq: useState(false),
    ListSelectReq: useState([false, {}]),
    ListSelectedPrice: useState(0),
    ListSelector: useState([]),
    ListSelected: useState([]),
    ListSelect: (e) => {
      const compilePrice = () => {
        let i = -1;
        let price = 0;
        while (++i < _FILTER.ListSelected[0].length) {
          price += parseInt(_FILTER.ListSelected[0][i].price);
        }
        return price;
      };

      let currentListSelected = _FILTER.ListSelected[0];
      let currentListSelector = _FILTER.ListSelector[0];
      if (
        !currentListSelected.includes(e) &&
        !currentListSelector.includes(e.tokenId)
      ) {
        currentListSelected.push(e);
        currentListSelector.push(e.tokenId);
        _FILTER.ListSelector[1](currentListSelector);
        _FILTER.ListSelected[1](currentListSelected);
      } else {
        currentListSelected.splice(currentListSelected.indexOf(e), 1);
        currentListSelector.splice(currentListSelector.indexOf(e.tokenId), 1);
        _FILTER.ListSelector[1](currentListSelector);
        _FILTER.ListSelected[1](currentListSelected);
      }

      let price = compilePrice();
      _FILTER.ListSelectedPrice[1](price);
      _FILTER.ListSelectReq[1]([false, {}]);
    },
    DeListSelectReq: useState([false, {}]),
    DeListSelectedPrice: useState(0),
    DeListSelector: useState([]),
    DeListSelected: useState([]),
    DeListSelect: (e) => {
      const compilePrice = () => {
        let i = -1;
        let price = 0;
        while (++i < _FILTER.DeListSelected[0].length) {
          price += parseInt(_FILTER.DeListSelected[0][i].price);
        }
        return price;
      };

      let currentDeListSelected = _FILTER.DeListSelected[0];
      let currentDeListSelector = _FILTER.DeListSelector[0];
      if (
        !currentDeListSelected.includes(e) &&
        !currentDeListSelector.includes(e.tokenId)
      ) {
        currentDeListSelected.push(e);
        currentDeListSelector.push(e.tokenId);
        _FILTER.DeListSelector[1](currentDeListSelector);
        _FILTER.DeListSelected[1](currentDeListSelected);
      } else {
        currentDeListSelected.splice(currentDeListSelected.indexOf(e), 1);
        currentDeListSelector.splice(
          currentDeListSelector.indexOf(e.tokenId),
          1
        );
        _FILTER.DeListSelector[1](currentDeListSelector);
        _FILTER.DeListSelected[1](currentDeListSelected);
      }

      let price = compilePrice();
      _FILTER.DeListSelectedPrice[1](price);
      _FILTER.DeListSelectReq[1]([false, {}]);
    },
    Fetch: (less, more, hash) => {
      fetchOwned({
        owner: context.state._account,
        less: less,
        more: more,
        hash: hash,
      }).then(async (e) => {
        if (e.data.domains.items.length > 0) {
          let i = -1;
          let result = [];
          while (++i < e.data.domains.items.length) {
            let tmp = await fetchListing({
              lookFor: e.data.domains.items[i].name,
            });
            result.push(tmp.data.offers.items);
          }
          _FILTER.Listing[1](result);
        }
        _FILTER.Items[1](e.data);
        _FILTER.Loading[1](false);
        _FILTER.UpdateReq[1](false);
        _FILTER.Initialized[1](true);
      });
    },
    List: async (price) => {
      const contractA = await Tezos.wallet.at(context.state._Contract.Market);
      const contractB = await Tezos.wallet.at(context.state._Contract.NFT);
      const compileTransaction = () => {
        let i = -1;
        let txs = [];
        while (++i < _FILTER.ListSelected[0].length) {
          txs.push({
            kind: OpKind.TRANSACTION,
            ...contractA.methods
              .place_offer(
                context.state._Contract.NFT,
                _FILTER.ListSelected[0][i].tokenId,
                price * 10 ** 6,
                new Date(Date.now() + 3 * 24 * 60 * 60 * 1000)
              )
              .toTransferParams(),
          });
          txs.push({
            kind: OpKind.TRANSACTION,
            ...contractB.methods
              .update_operators([
                {
                  add_operator: {
                    owner: context.state._account,
                    operator: context.state._Contract.Market,
                    token_id: _FILTER.ListSelected[0][i].tokenId,
                  },
                },
              ])
              .toTransferParams(),
          });
        }

        return txs;
      };

      let txs = compileTransaction();

      try {
        Tezos.wallet.batch([...txs]).send();
        _FILTER.ListSelected[1]([]);
        _FILTER.ListSelector[1]([]);
      } catch (e) {
        console.log(e);
      }
    },
    DeList: async () => {
      const contractA = await Tezos.wallet.at(context.state._Contract.Market);
      const contractB = await Tezos.wallet.at(context.state._Contract.NFT);
      const compileTransaction = () => {
        let i = -1;
        let txs = [];
        while (++i < _FILTER.DeListSelected[0].length) {
          txs.push({
            kind: OpKind.TRANSACTION,
            ...contractA.methods
              .remove_offer(
                context.state._Contract.NFT,
                _FILTER.DeListSelected[0][i].tokenId
              )
              .toTransferParams(),
          });
          txs.push({
            kind: OpKind.TRANSACTION,
            ...contractB.methods
              .update_operators([
                {
                  add_operator: {
                    owner: context.state._account,
                    operator: context.state._Contract.Market,
                    token_id: _FILTER.DeListSelected[0][i].tokenId,
                  },
                },
              ])
              .toTransferParams(),
          });
        }

        return txs;
      };

      let txs = compileTransaction();

      try {
        Tezos.wallet.batch([...txs]).send();
        _FILTER.DeListSelected[1]([]);
        _FILTER.DeListSelector[1]([]);
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

    if (_FILTER.ListSelectReq[0][0]) {
      _FILTER.ListSelect(_FILTER.ListSelectReq[0][1]);
    }

    if (_FILTER.DeListSelectReq[0][0]) {
      _FILTER.DeListSelect(_FILTER.DeListSelectReq[0][1]);
    }
  });

  return (
    <>
      <Items _FILTER={_FILTER} context={context} />
    </>
  );
};
