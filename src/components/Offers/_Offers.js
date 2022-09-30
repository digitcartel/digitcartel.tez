import { OpKind } from "@taquito/taquito";
import { useEffect, useState } from "react";
import { Tezos } from "../../service/Connector/client";

export const Offers = ({ context, domain }) => {
  const _FILTER = {
    Input: useState(0),
    Selector: useState([]),
    Selected: useState([]),
    SelectReq: useState([false, {}]),
    Select: (e) => {
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
      _FILTER.SelectReq[1]([false, {}]);
    },
    Offer: async () => {
      const contract = await Tezos.wallet.at(context.state._Contract.OBJKT);

      try {
        contract.methodsObject
          .offer({
            token: {
              address: context.state._Contract.NFT,
              token_id: _FILTER.Selected[0][0].tokenId,
            },
            currency: {
              tez: "unit",
            },
            amount: _FILTER.Input[0],
            shares: [],
          })
          .send({
            amount: _FILTER.Input[0],
            mutez: true,
          });

        _FILTER.Input[1](0);
        _FILTER.Selected[1]([]);
        _FILTER.Selector[1]([]);
      } catch (e) {
        console.log(e);
      }
    },
  };

  useEffect(() => {
    if (_FILTER.SelectReq[0][0]) {
      _FILTER.Select(_FILTER.SelectReq[0][1]);
    }
  });

  return (
    <div className="flex flex-col">
      {_FILTER.Selected[0].length === 0 && (
        <button
          onClick={() => {
            _FILTER.SelectReq[1]([true, domain]);
          }}
          className={
            "flex flex-row items-center justify-center rounded-full px-[1.5vw] lXs:px-[1vw] border-indigo-500 border-2 " +
            (_FILTER.Selector[0].includes(domain.tokenId)
              ? "bg-indigo-500"
              : "")
          }
        >
          <p
            className={
              "font-bold text-[2.5vw] lXs:text-[1.5vw] uppercase " +
              (_FILTER.Selector[0].includes(domain.tokenId)
                ? "text-white"
                : "text-indigo-500")
            }
          >
            Offer
          </p>
        </button>
      )}
      {_FILTER.Selected[0].length > 0 && (
        <>
          <div className="flex flex-row items-center">
            <input
              onChange={(e) => {
                _FILTER.Input[1](parseInt(e.target.value * 10 ** 6));
              }}
              placeholder="price xtz"
              type="number"
              className={
                "text-white w-[9vw] text-[2.5vw] lXs:text-[1.5vw] px-[1vw] bg-indigo-500 border-indigo-500 border-2 rounded-l-xl text-right"
              }
            />
            <button
              className="border-indigo-500 border-2 px-[1vw]"
              onClick={() => {
                _FILTER.SelectReq[1]([true, _FILTER.Selected[0][0]]);
              }}
            >
              <p className="text-indigo-500 font-bold text-[2.5vw] lXs:text-[1.5vw] uppercase">
                X
              </p>
            </button>
            <button
              className="border-indigo-500 border-2 rounded-r-full px-[1vw] "
              onClick={() => {
                _FILTER.Offer();
              }}
            >
              <p className="text-indigo-500 font-bold text-[2.5vw] lXs:text-[1.5vw] uppercase">
                SEND
              </p>
            </button>
          </div>
        </>
      )}
    </div>
  );
};
