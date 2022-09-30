import { requestBeaconConnection } from "../../service/Connector/request";

const Map = ({ _FILTER, context }) => {
  const Head = () => {
    return (
      <div className="mt-2 w-full flex flex-row p-[2vw] lXs:p-[1vw] items-center bg-indigo-500 border-2 rounded-xl border-white">
        <h1 className="text-white text-[2.5vw] lXs:text-[1.5vw] px-[1.5vw] lXs:px-[1vw]">
          DOMAIN
        </h1>
        <div className="ml-auto border-white border-2 flex flex-row items-center justify-center rounded-full px-[1.5vw] lXs:px-[1vw]">
          <p className="text-white font-bold text-[2.5vw] lXs:text-[1.5vw] uppercase">
            Offers
          </p>
        </div>
      </div>
    );
  };

  const Floor = () => {
    return (
      <div className="w-full">
        <div className="w-full bg-white border-indigo-500 border-2 bg-opacity-10 flex flex-row rounded-b-xl p-[2vw] lXs:p-[1vw] items-center">
          {_FILTER.Loading[0] && (
            <h1 className="text-white text-[2.5vw] lXs:text-[1.5vw] px-[1.5vw] lXs:px-[1vw]">
              LOADING, PLEASE WAIT
            </h1>
          )}
          {!_FILTER.Loading[0] && _FILTER.Items[0].offers.items.length > 0 && (
            <h1 className="text-white text-[2.5vw] lXs:text-[1.5vw] px-[1.5vw] lXs:px-[1vw]">
              {_FILTER.Base[0].name} .TEZ FLOOR:{" "}
              <span className="font-bold">
                {_FILTER.Floor[0] / 10 ** 6}
                tz
              </span>
            </h1>
          )}
          {!_FILTER.Loading[0] &&
            _FILTER.Items[0].offers.items.length === 0 && (
              <h1 className="text-white text-[2.5vw] lXs:text-[1.5vw] px-[1.5vw] lXs:px-[1vw]">
                {_FILTER.Base[0].name} .TEZ
              </h1>
            )}
          <a
            href="https://twitter.com/tezos999club"
            target="_blank"
            className="ml-auto flex flex-row items-center justify-center rounded-full px-[1.5vw] lXs:px-[1vw]"
          >
            <img
              src="./icons/twitter.svg"
              className="w-4 h-4 lXs:w-8 lXs:h-8"
            />
          </a>
          <a
            href="https://discord.gg/nA5k4bpuXN"
            target="_blank"
            className="flex flex-row items-center justify-center rounded-full px-[1.5vw] lXs:px-[1vw]"
          >
            <img
              src="./icons/discord.svg"
              className="w-4 h-4 lXs:w-8 lXs:h-8"
            />
          </a>
        </div>
      </div>
    );
  };

  const Map = () => {
    return (
      <>
        {_FILTER.Items[0].offers.items.map((e, i) => {
          const Domain = () => {
            return (
              <h1 className="text-white text-[2.5vw] lXs:text-[1.5vw] px-[1.5vw] lXs:px-[1vw]">
                {e.domain.name}
              </h1>
            );
          };

          const Price = () => {
            return (
              <div className="relative w-full mr-auto flex flex-row items-center justify-end">
                <h1 className=" text-white text-[2.5vw] lXs:text-[1.5vw] px-[1.5vw] lXs:px-[1vw] truncate">
                  {(
                    _FILTER.Items[0].offers.items[i].price / 10 ** 6 || 0
                  ).toFixed(2)}
                  tz
                </h1>
                <h1 className=" text-white text-[2.5vw] lXs:text-[1.5vw] px-[1.5vw] lXs:px-[1vw] truncate">
                  <span className="text-indigo-500">
                    {(
                      context.state._EthereumPrice *
                      (_FILTER.Items[0].offers.items[i].price / 10 ** 6 || 0)
                    ).toFixed(2)}
                    Ξ
                  </span>
                </h1>
                <h1 className=" text-white text-[2.5vw] lXs:text-[1.5vw] px-[1.5vw] lXs:px-[1vw] truncate">
                  <span className="text-purple-500">
                    {(
                      context.state._TezosPrice *
                      (_FILTER.Items[0].offers.items[i].price / 10 ** 6 || 0)
                    ).toFixed(2)}
                    $
                  </span>
                </h1>
              </div>
            );
          };

          const ActionButton = () => {
            return (
              <>
                {context.state._account != "" && (
                  <button
                    onClick={() => {
                      _FILTER.SelectReq[1]([true, e]);
                    }}
                    className={
                      "flex flex-row items-center justify-center rounded-full px-[1.5vw] lXs:px-[1vw] border-indigo-500 border-2 " +
                      (_FILTER.Selector[0].includes(e.tokenId)
                        ? "bg-indigo-500"
                        : "")
                    }
                  >
                    <p
                      className={
                        "font-bold text-[2.5vw] lXs:text-[1.5vw] uppercase " +
                        (_FILTER.Selector[0].includes(e.tokenId)
                          ? "text-white"
                          : "text-indigo-500")
                      }
                    >
                      Buy
                    </p>
                  </button>
                )}
                {context.state._account === "" && (
                  <button
                    className="flex flex-row items-center justify-center rounded-full px-[1.5vw] lXs:px-[1vw] border-indigo-500 border-2"
                    onClick={() => {
                      requestBeaconConnection(
                        context.props.props.context.state._connected,
                        context
                      );
                    }}
                  >
                    <p className="font-bold text-[2.5vw] lXs:text-[1.5vw] uppercase text-indigo-500">
                      Connect
                    </p>
                  </button>
                )}
              </>
            );
          };

          return (
            <div key={i + "_mapCollection"} className="w-full">
              <div className="w-full flex flex-row rounded-full py-[2vw] px-[1vw] items-center">
                <Domain />
                <Price />
                <ActionButton />
              </div>
            </div>
          );
        })}
      </>
    );
  };

  const PageManager = () => {
    return (
      <>
        {_FILTER.Items[0].offers && (
          <div className="w-full flex flex-row bg-indigo-500 border-white border-2 rounded-xl p-[2vw] lXs:p-[1vw]">
            {_FILTER.Items[0].offers.pageInfo.hasPreviousPage && (
              <button
                className="border-white border-2 rounded-full px-[1.5vw] lXs:px-[1vw] mr-auto"
                onClick={() => {
                  _FILTER.Fetch(
                    true,
                    false,
                    _FILTER.Items[0].offers.pageInfo.startCursor
                  );
                }}
              >
                <p className="text-white font-bold text-[2.5vw] lXs:text-[1.5vw] uppercase">
                  LESS
                </p>
              </button>
            )}
            {_FILTER.Items[0].offers.pageInfo.hasNextPage && (
              <button
                className="border-white border-2 rounded-full px-[1.5vw] lXs:px-[1vw] ml-auto"
                onClick={() => {
                  _FILTER.Fetch(
                    false,
                    true,
                    _FILTER.Items[0].offers.pageInfo.endCursor
                  );
                }}
              >
                <p className="text-white font-bold text-[2.5vw] lXs:text-[1.5vw] uppercase">
                  MORE
                </p>
              </button>
            )}
          </div>
        )}
      </>
    );
  };

  const TxManager = () => {
    return (
      <>
        {_FILTER.Selected[0].length > 0 && (
          <>
            <div className=" bg-white rounded-xl my-2 p-[1.5vw]">
              <div className="flex flex-row items-center">
                <button
                  className="border-indigo-500 border-2 rounded-full px-[1.5vw] lXs:px-[1vw] "
                  onClick={() => {
                    _FILTER.Buy();
                  }}
                >
                  <p className="text-indigo-500 font-bold text-[2.5vw] lXs:text-[1.5vw] uppercase">
                    buy
                  </p>
                </button>
                <p className="ml-2 text-indigo-500 font-bold text-[2.5vw] lXs:text-[1.5vw] uppercase">
                  total
                </p>
                <p className="ml-2 text-indigo-500 text-opacity-80 text-[2.5vw] lXs:text-[1.5vw]">
                  {(_FILTER.SelectedPrice[0] +
                    (2 * _FILTER.SelectedPrice[0]) / 100) /
                    10 ** 6}
                  tz
                </p>
              </div>
              <div className="flex flex-row flex-wrap items-center justify-start">
                {_FILTER.Selected[0].map((e, i) => {
                  return (
                    <button
                      onClick={() => {
                        _FILTER.SelectReq[1]([true, e]);
                      }}
                      className={
                        "text-white text-[2.5vw] lXs:text-[1.5vw] px-[1.5vw] lXs:px-[1vw] my-1 " +
                        (_FILTER.Selector[0].includes(e.tokenId)
                          ? "bg-indigo-500 rounded-full mr-1"
                          : "")
                      }
                    >
                      {e.domain.name}
                    </button>
                  );
                })}
              </div>
            </div>
          </>
        )}
      </>
    );
  };

  return (
    <>
      <Floor />
      {!_FILTER.Loading[0] && (
        <>
          <Head />
          <TxManager />
          <div className="bg-white bg-opacity-10 border-indigo-500 border-2 my-2 rounded-xl">
            {_FILTER.Items[0].offers.items.length > 0 && <Map />}
            {_FILTER.Items[0].offers.items.length == 0 && (
              <div className="w-full flex flex-row rounded-full py-[2vw] px-[1vw] items-center">
                <h1 className="text-white text-[2.5vw] lXs:text-[1.5vw] px-[1.5vw] lXs:px-[1vw]">
                  No result
                </h1>
              </div>
            )}
          </div>
          <PageManager />
        </>
      )}
    </>
  );
};

export const Items = ({ _FILTER, context }) => {
  return <Map _FILTER={_FILTER} context={context} />;
};
