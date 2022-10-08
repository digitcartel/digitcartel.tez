import { useState } from "react";
import { Tezos } from "../../service/Connector/client";

export const Airdrop = ({ context }) => {
  const _FILTER = {
    Contract: useState(""),
    TokenId: useState(0),
    Drop: async () => {
      const contract = await Tezos.wallet.at(_FILTER.Contract[0]);

      let i = -1;
      let result = [];
      while (++i < context.state._Holders999.length)
        result.push({
          to_: context.state._Holders999[i].owner,
          token_id: _FILTER.TokenId[0],
          amount: context.state._Holders999[i].count,
        });

      try {
        await contract.methods
          .transfer([
            {
              from_: context.state._DigitCartel,
              txs: result,
            },
          ])
          .send();
      } catch (e) {
        console.log(e);
      }
    },
  };

  return (
    <>
      <div className=" bg-white rounded-xl p-[1.5vw]">
        <div className="flex flex-row items-center">
          <p className="ml-2 text-indigo-500 font-bold text-[2.5vw] lXs:text-[1.5vw] uppercase">
            CONTRACT
          </p>
          <input
            className=" text-black bg-transparent text-[2.5vw] lXs:text-[1.5vw] px-2"
            placeholder="address"
            onChange={(e) => {
              _FILTER.Contract[1](e.target.value);
            }}
          />
        </div>
        <div className="flex flex-row items-center">
          <p className="ml-2 text-indigo-500 font-bold text-[2.5vw] lXs:text-[1.5vw] uppercase">
            TOKEN
          </p>
          <input
            className=" text-black bg-transparent text-[2.5vw] lXs:text-[1.5vw] px-2"
            placeholder="id"
            type="number"
            onChange={(e) => {
              _FILTER.TokenId[1](e.target.value);
            }}
          />
        </div>
        <div className="flex flex-row items-center">
          <button
            className="border-indigo-500 border-2 rounded-full px-[1.5vw] lXs:px-[1vw] "
            onClick={() => {
              _FILTER.Drop();
            }}
          >
            <p className="text-indigo-500 font-bold text-[2.5vw] lXs:text-[1.5vw] uppercase">
              DROP
            </p>
          </button>
        </div>
      </div>
      <div className="flex flex-col">
        {context.state._Holders999.map((e, i) => {
          return (
            <div className="flex flex-row flex-nowrap justify-between">
              <div className="text-white text-[2.5vw] lXs:text-[1.5vw] px-[1.5vw] lXs:px-[1vw] my-1">
                {e.owner}
              </div>
              <div className="text-white text-[2.5vw] lXs:text-[1.5vw] px-[1.5vw] lXs:px-[1vw] my-1 bg-purple-500 rounded-full mr-1">
                {e.count}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};
