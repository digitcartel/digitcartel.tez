import { Items } from "./ItemsMap";

import * as Categories from "../../data/categories.json";
import { useEffect, useState } from "react";
import {
  fetchTezDomOffers,
  fetchDomain,
} from "../../service/TezosDomains/request";
import { Tezos } from "../../service/Connector/client";
import { OpKind } from "@taquito/taquito";

export const Search = ({ context }) => {
  const _FILTER = {
    List: Categories.default,
    Items: useState([]),
    SearchIndex: useState(0),
    SearchLength: useState(0),
    SearchAvailable: useState(0),
    Loading: useState(true),
    UpdateReq: useState([false, {}]),
    Mode: useState(false),
    Fetch: async (e) => {
      const compileAsDomain = () => {
        let i = -1;
        let result = [];
        while (++i < e.length) {
          result.push(e[i].toLowerCase() + ".tez");
        }
        return result;
      };

      let data = compileAsDomain();
      _FILTER.SearchLength[1](data.length);
      _FILTER.Loading[1](false);

      let i = -1;
      let result = [];
      while (++i < data.length) {
        let tmp = (
          await fetchDomain({
            lookFor: data[i],
          })
        ).data;

        if (tmp.domain === null) {
          result.push(data[i]);
          _FILTER.Items[1](result);
          _FILTER.SearchAvailable[1](result.length);
        }
        _FILTER.SearchIndex[1](i);
      }

      _FILTER.UpdateReq[1]([false, {}]);
    },
    Reset: () => {
      _FILTER.Mode[1](!_FILTER.Mode[0]);
    },
  };

  useEffect(() => {
    if (_FILTER.UpdateReq[0][0]) {
      _FILTER.Fetch(_FILTER.UpdateReq[0][1]);
    }
  });

  return (
    <>
      <Items _FILTER={_FILTER} context={context} />
    </>
  );
};
