import { Offers } from "../../Offers/_Offers";

export const Header = ({ _FILTER, context }) => {
  return (
    <div className="flex flex-row">
      <div className="w-[100px] tS:w-[200px] tL:w-[300px] lXs:w-[200px] lS:w-[300px] h-[100px] tS:h-[200px] tL:h-[300px] lXs:h-[200px] lS:h-[300px] bg-white bg-opacity-10 rounded-xl border-2 border-indigo-500 flex flex-col items-center justify-center">
        <h1 className="text-white text-[2.5vw] lXs:text-[1.5vw] break-all text-center">
          {context.state._Viewed}
        </h1>
      </div>
      {_FILTER.Initialized[0] && (
        <div className="flex flex-col py-2 px-3 lXs:px-6">
          <h1 className="text-white text-[3vw] lXs:text-[2vw] whitespace-nowrap">
            {context.state._Viewed}
          </h1>
          <h1 className="text-white text-[2vw] lXs:text-[1vw] whitespace-nowrap">
            Owned by{" "}
            <button
              onClick={() => {
                context.setState({
                  _Object: true,
                  _View: "wallet",
                  _Viewed: _FILTER.Item[0].domain.owner,
                });
              }}
              className="text-purple-500 font-bold hover:border-b-2 border-purple-500 leading-none"
            >
              {_FILTER.Item[0].domain.owner == context.state._account
                ? "you"
                : _FILTER.Owner[0]
                ? _FILTER.Owner[0]
                : _FILTER.Item[0].domain.owner.slice(0, 12)}
            </button>
          </h1>
          {_FILTER.Market[0].offers.items.length > 0 && (
            <div className="flex flex-row items-center">
              <h1 className="text-white font-bold text-[4.5vw] lXs:text-[2.5vw] whitespace-nowrap">
                {_FILTER.Market[0].offers.items[0].price / 10 ** 6}
                tz
              </h1>
              <h1 className="text-white font-bold text-[4.5vw] lXs:text-[2.5vw] whitespace-nowrap">
                (
              </h1>
              <div className="flex flex-col mx-2">
                <h1 className="text-indigo-500 font-bold text-[2vw] lXs:text-[1vw] whitespace-nowrap leading-none">
                  {(
                    context.state._EthereumPrice *
                    (_FILTER.Market[0].offers.items[0].price / 10 ** 6 || 0)
                  ).toFixed(2)}
                  Ξ
                </h1>
                <h1 className="text-purple-500 font-bold text-[2vw] lXs:text-[1vw] whitespace-nowrap leading-none">
                  {(
                    context.state._TezosPrice *
                    (_FILTER.Market[0].offers.items[0].price / 10 ** 6 || 0)
                  ).toFixed(2)}
                  $
                </h1>
              </div>
              <h1 className="text-white font-bold text-[4.5vw] lXs:text-[2.5vw] whitespace-nowrap">
                )
              </h1>
            </div>
          )}
          {_FILTER.Market[0].offers.items.length === 0 && (
            <div className="flex flex-row items-center">
              <h1 className="text-white text-opacity-20 font-bold text-[4.5vw] lXs:text-[2.5vw] whitespace-nowrap">
                Not listed
              </h1>
            </div>
          )}
          {_FILTER.Market[0].offers.items.length > 0 && (
            <div className="flex flex-row">
              <button
                onClick={() => {
                  _FILTER.Buy();
                }}
                className="mr-2 border-purple-500 border-2 flex flex-row items-center justify-center rounded-full px-[1.5vw] lXs:px-[1vw]"
              >
                <p className="text-purple-500 font-bold text-[2.5vw] lXs:text-[1.5vw] uppercase">
                  buy
                </p>
              </button>
              <Offers context={context} domain={_FILTER.Item[0].domain} />
            </div>
          )}
        </div>
      )}
      {!_FILTER.Initialized[0] && (
        <div className="flex flex-col py-2 px-3 lXs:px-6">
          <h1 className="text-white text-[2.5vw] lXs:text-[1.5vw] whitespace-nowrap">
            LOADING, PLEASE WAIT
          </h1>
          <div className="w-full h-1 bg-indigo-500 rounded-full" />
        </div>
      )}
    </div>
  );
};
