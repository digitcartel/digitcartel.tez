import { Header } from "./Header";
import { Items } from "./ItemsMap";

import * as Categories from "../../data/categories.json";
import { useEffect, useState } from "react";
import { fetchTezDomOffers } from "../../service/TezosDomains/request";
import { Tezos } from "../../service/Connector/client";
import { OpKind } from "@taquito/taquito";
import { fetchObjktOffers } from "../../service/OBJKT/request";

export const Offers = ({ context }) => {
  const _FILTER = {
    List: Categories.default,
    Base: useState(Categories[0]),
    Items: useState([]),
    Floor: useState(0),
    Loading: useState(true),
    Initialized: useState(false),
    UpdateReq: useState(false),
    SelectReq: useState([false, {}]),
    SelectedPrice: useState(0),
    Selector: useState([]),
    Selected: useState([]),
    Select: (e) => {
      const compilePrice = () => {
        let i = -1;
        let price = 0;
        while (++i < _FILTER.Selected[0].length) {
          price += parseInt(_FILTER.Selected[0][i].price);
        }
        return price;
      };

      let currentSelected = _FILTER.Selected[0];
      let currentSelector = _FILTER.Selector[0];
      if (
        !currentSelected.includes(e) &&
        !currentSelector.includes(e.tokenId)
      ) {
        currentSelected.push(e);
        currentSelector.push(e.tokenId);
        _FILTER.Selector[1](currentSelector);
        _FILTER.Selected[1](currentSelected);
      } else {
        currentSelected.splice(currentSelected.indexOf(e), 1);
        currentSelector.splice(currentSelector.indexOf(e.tokenId), 1);
        _FILTER.Selector[1](currentSelector);
        _FILTER.Selected[1](currentSelected);
      }

      let price = compilePrice();
      _FILTER.SelectedPrice[1](price);
      _FILTER.SelectReq[1]([false, {}]);
    },
    Fetch: (less, more, hash) => {
      fetchObjktOffers({}).then((e) => {
        fetchTezDomOffers({
          lookFor: _FILTER.Base[0].data,
          less: less,
          more: more,
          hash: hash,
        }).then((e) => {
          if (e.data.offers.items.length > 0)
            if (!less && !more) _FILTER.Floor[1](e.data.offers.items[0].price);
          _FILTER.Items[1](e.data);
          _FILTER.Loading[1](false);
          _FILTER.UpdateReq[1](false);
          _FILTER.Initialized[1](true);
        });
      });
    },
    Buy: async () => {
      const contract = await Tezos.wallet.at(context.state._Contract.Market);
      const compileTransaction = () => {
        let i = -1;
        let txs = [];
        while (++i < _FILTER.Selected[0].length) {
          txs.push({
            kind: OpKind.TRANSACTION,
            ...contract.methods
              .execute_offer(
                _FILTER.Selected[0][i].tokenContract,
                _FILTER.Selected[0][i].tokenId,
                _FILTER.Selected[0][i].domain.owner
              )
              .toTransferParams({
                amount: _FILTER.Selected[0][i].price,
                mutez: true,
              }),
          });
        }
        return txs;
      };

      const addFees = (txs) => {
        txs.push({
          kind: OpKind.TRANSACTION,
          to: context.state._DigitCartel,
          amount: `${(2 * _FILTER.SelectedPrice[0]) / 100}`,
          mutez: true,
        });
        return txs;
      };

      let txs = addFees(compileTransaction());

      try {
        Tezos.wallet.batch([...txs]).send();
        _FILTER.SelectedPrice[1](0);
        _FILTER.Selected[1]([]);
        _FILTER.Selector[1]([]);
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

    if (_FILTER.SelectReq[0][0]) {
      _FILTER.Select(_FILTER.SelectReq[0][1]);
    }
  });

  return (
    <>
      <Header _FILTER={_FILTER} />
      <Items _FILTER={_FILTER} context={context} />
    </>
  );
};
