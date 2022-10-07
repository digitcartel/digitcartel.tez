import { useState } from "react";

const Map = ({ _FILTER, context }) => {
  const HeadBids = () => {
    return (
      <div className="mt-2 w-full flex flex-row p-[2vw] lXs:p-[1vw] items-center bg-indigo-500 border-2 rounded-xl border-white">
        <h1 className="text-white text-[2.5vw] lXs:text-[1.5vw] px-[1.5vw] lXs:px-[1vw]">
          DOMAIN
        </h1>
        <div className="ml-auto border-white border-2 flex flex-row items-center justify-center rounded-full px-[1.5vw] lXs:px-[1vw]">
          <p className="text-white font-bold text-[2.5vw] lXs:text-[1.5vw] uppercase">
            ACCEPT
          </p>
        </div>
      </div>
    );
  };

  const HeadDeBids = () => {
    return (
      <div className="mt-2 w-full flex flex-row p-[2vw] lXs:p-[1vw] items-center bg-indigo-500 border-2 rounded-xl border-white">
        <h1 className="text-white text-[2.5vw] lXs:text-[1.5vw] px-[1.5vw] lXs:px-[1vw]">
          DOMAIN
        </h1>
        <div className="ml-auto border-white border-2 flex flex-row items-center justify-center rounded-full px-[1.5vw] lXs:px-[1vw]">
          <p className="text-white font-bold text-[2.5vw] lXs:text-[1.5vw] uppercase">
            CANCEL
          </p>
        </div>
      </div>
    );
  };

  const Floor = () => {
    return (
      <div className="w-full">
        <div className="w-full bg-white border-indigo-500 border-2 bg-opacity-10 flex flex-row rounded-xl p-[2vw] lXs:p-[1vw] items-center">
          {_FILTER.Loading[0] && (
            <h1 className="text-white text-[2.5vw] lXs:text-[1.5vw] px-[1.5vw] lXs:px-[1vw]">
              LOADING, PLEASE WAIT
            </h1>
          )}
          {!_FILTER.Loading[0] && (
            <h1 className="text-white text-[2.5vw] lXs:text-[1.5vw] px-[1.5vw] lXs:px-[1vw]">
              MANAGE BIDS
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

  const MapDeBids = () => {
    return (
      <>
        {_FILTER.ItemsDeBids[0].offer.map((e, i) => {
          const Domain = () => {
            return (
              <h1 className="text-white text-[2.5vw] lXs:text-[1.5vw] px-[1.5vw] lXs:px-[1vw] whitespace-nowrap">
                {e.token && e.token.name}
                {!e.token && "Collection Offer"}
              </h1>
            );
          };

          const Price = () => {
            return (
              <div className="relative w-full mr-auto flex flex-row items-center justify-end">
                <h1 className=" text-white text-[2.5vw] lXs:text-[1.5vw] px-[1.5vw] lXs:px-[1vw] truncate">
                  {(e.price / 10 ** 6 || 0).toFixed(2)}
                  tz
                </h1>
                <h1 className=" text-white text-[2.5vw] lXs:text-[1.5vw] px-[1.5vw] lXs:px-[1vw] truncate">
                  <span className="text-indigo-500">
                    {(
                      context.state._EthereumPrice * (e.price / 10 ** 6 || 0)
                    ).toFixed(2)}
                    Ξ
                  </span>
                </h1>
                <h1 className=" text-white text-[2.5vw] lXs:text-[1.5vw] px-[1.5vw] lXs:px-[1vw] truncate">
                  <span className="text-purple-500">
                    {(
                      context.state._TezosPrice * (e.price / 10 ** 6 || 0)
                    ).toFixed(2)}
                    $
                  </span>
                </h1>
              </div>
            );
          };

          const ActionButton = () => {
            return (
              <div className="ml-auto flex flex-row">
                <button
                  onClick={() => {
                    _FILTER.DeBidsSelectReq[1]([true, e]);
                  }}
                  className={
                    "ml-2 flex flex-row items-center justify-center rounded-full px-[1.5vw] lXs:px-[1vw] border-purple-500 border-2 " +
                    (_FILTER.DeBidsSelector[0].includes(e.token.token_id)
                      ? "bg-purple-500"
                      : "")
                  }
                >
                  <p
                    className={
                      "font-bold text-[2.5vw] lXs:text-[1.5vw] uppercase " +
                      (_FILTER.DeBidsSelector[0].includes(e.token.token_id)
                        ? "text-white"
                        : "text-purple-500")
                    }
                  >
                    Cancel
                  </p>
                </button>
              </div>
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

  const MapBids = () => {
    return (
      <>
        {_FILTER.ItemsBids[0].offer.map((e, i) => {
          const Domain = () => {
            return (
              <button
                onClick={() => {
                  context.setState({
                    _Object: true,
                    _Profile: false,
                    _View: "token",
                    _Viewed: e.token.name,
                  });
                }}
                className="text-white text-[2.5vw] lXs:text-[1.5vw] px-[1.5vw] lXs:px-[1vw] whitespace-nowrap truncate w-full hover:bg-indigo-500 rounded-full text-left"
              >
                {e.token.name}
              </button>
            );
          };

          const Price = () => {
            return (
              <div className="relative w-full mr-auto flex flex-row items-center justify-end">
                <h1 className=" text-white text-[2.5vw] lXs:text-[1.5vw] px-[1.5vw] lXs:px-[1vw] truncate">
                  {(e.price / 10 ** 6 || 0).toFixed(2)}
                  tz
                </h1>
                <h1 className=" text-white text-[2.5vw] lXs:text-[1.5vw] px-[1.5vw] lXs:px-[1vw] truncate">
                  <span className="text-indigo-500">
                    {(
                      context.state._EthereumPrice * (e.price / 10 ** 6 || 0)
                    ).toFixed(2)}
                    Ξ
                  </span>
                </h1>
                <h1 className=" text-white text-[2.5vw] lXs:text-[1.5vw] px-[1.5vw] lXs:px-[1vw] truncate">
                  <span className="text-purple-500">
                    {(
                      context.state._TezosPrice * (e.price / 10 ** 6 || 0)
                    ).toFixed(2)}
                    $
                  </span>
                </h1>
              </div>
            );
          };

          const ActionButton = () => {
            return (
              <div className="ml-auto flex flex-row">
                <button
                  onClick={() => {
                    _FILTER.BidsSelectReq[1]([true, e]);
                  }}
                  className={
                    "ml-2 flex flex-row items-center justify-center rounded-full px-[1.5vw] lXs:px-[1vw] border-indigo-500 border-2 " +
                    (_FILTER.BidsSelector[0].includes(e.token.token_id)
                      ? "bg-indigo-500"
                      : "")
                  }
                >
                  <p
                    className={
                      "font-bold text-[2.5vw] lXs:text-[1.5vw] uppercase " +
                      (_FILTER.BidsSelector[0].includes(e.token.token_id)
                        ? "text-white"
                        : "text-indigo-500")
                    }
                  >
                    ACCEPT
                  </p>
                </button>
              </div>
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

  const MapCollectionBids = () => {
    return (
      <>
        {_FILTER.ItemsCollectionBids[0].domains.items.map((e, i) => {
          const Domain = () => {
            return (
              <button
                onClick={() => {
                  context.setState({
                    _Object: true,
                    _Profile: false,
                    _View: "token",
                    _Viewed: e.name,
                  });
                }}
                className="text-white text-[2.5vw] lXs:text-[1.5vw] px-[1.5vw] lXs:px-[1vw] whitespace-nowrap truncate w-full hover:bg-indigo-500 rounded-full text-left"
              >
                {e.name}
              </button>
            );
          };

          const Price = () => {
            return (
              <div className="relative w-full mr-auto flex flex-row items-center justify-end">
                <h1 className=" text-white text-[2.5vw] lXs:text-[1.5vw] px-[1.5vw] lXs:px-[1vw] truncate">
                  {(
                    _FILTER.ItemsCollectionOffers[0][0].price / 10 ** 6 || 0
                  ).toFixed(2)}
                  tz
                </h1>
                <h1 className=" text-white text-[2.5vw] lXs:text-[1.5vw] px-[1.5vw] lXs:px-[1vw] truncate">
                  <span className="text-indigo-500">
                    {(
                      context.state._EthereumPrice *
                      (_FILTER.ItemsCollectionOffers[0][0].price / 10 ** 6 || 0)
                    ).toFixed(2)}
                    Ξ
                  </span>
                </h1>
                <h1 className=" text-white text-[2.5vw] lXs:text-[1.5vw] px-[1.5vw] lXs:px-[1vw] truncate">
                  <span className="text-purple-500">
                    {(
                      context.state._TezosPrice *
                      (_FILTER.ItemsCollectionOffers[0][0].price / 10 ** 6 || 0)
                    ).toFixed(2)}
                    $
                  </span>
                </h1>
              </div>
            );
          };

          const ActionButton = () => {
            return (
              <div className="ml-auto flex flex-row">
                <button
                  onClick={() => {
                    _FILTER.CollectionBidsSelectReq[1]([true, e]);
                  }}
                  className={
                    "ml-2 flex flex-row items-center justify-center rounded-full px-[1.5vw] lXs:px-[1vw] border-indigo-500 border-2 " +
                    (_FILTER.CollectionBidsSelector[0].includes(e.tokenId)
                      ? "bg-indigo-500"
                      : "")
                  }
                >
                  <p
                    className={
                      "font-bold text-[2.5vw] lXs:text-[1.5vw] uppercase " +
                      (_FILTER.CollectionBidsSelector[0].includes(e.tokenId)
                        ? "text-white"
                        : "text-indigo-500")
                    }
                  >
                    ACCEPT
                  </p>
                </button>
              </div>
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

  return (
    <>
      <Floor />
      {!_FILTER.Loading[0] && (
        <>
          {_FILTER.ItemsDeBids[0].offer && (
            <>
              {_FILTER.DeBidsSelected[0].length > 0 && (
                <>
                  <div className=" bg-white rounded-xl my-2 p-[1.5vw]">
                    <div className="flex flex-row items-center">
                      <button
                        className="border-indigo-500 border-2 rounded-full px-[1.5vw] lXs:px-[1vw] "
                        onClick={() => {
                          _FILTER.DeBids();
                        }}
                      >
                        <p className="text-indigo-500 font-bold text-[2.5vw] lXs:text-[1.5vw] uppercase">
                          CANCEL
                        </p>
                      </button>
                    </div>
                    <div className="flex flex-row flex-wrap items-center justify-start">
                      {_FILTER.DeBidsSelected[0].map((e, i) => {
                        return (
                          <button
                            onClick={() => {
                              _FILTER.DeBidsSelectReq[1]([true, e]);
                            }}
                            className={
                              "text-white text-[2.5vw] lXs:text-[1.5vw] px-[1.5vw] lXs:px-[1vw] my-1 " +
                              (_FILTER.DeBidsSelector[0].includes(
                                e.token.token_id
                              )
                                ? "bg-indigo-500 rounded-full mr-1"
                                : "")
                            }
                          >
                            {e.token && e.token.name}
                            {!e.token && "Collection Offer"}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </>
              )}
              <div className="my-4">
                <h1 className="text-white text-[2.5vw] lXs:text-[1.5vw] font-bold uppercase px-2">
                  Offers Placed
                </h1>
                <HeadDeBids />
                <div className="bg-white bg-opacity-10 border-indigo-500 border-2 my-2 rounded-xl">
                  {_FILTER.ItemsDeBids[0].offer.length > 0 && <MapDeBids />}
                  {_FILTER.ItemsDeBids[0].offer.length == 0 && (
                    <div className="w-full flex flex-row rounded-full py-[2vw] px-[1vw] items-center">
                      <h1 className="text-white text-[2.5vw] lXs:text-[1.5vw] px-[1.5vw] lXs:px-[1vw]">
                        You didn't placed any offers yet, if you want to place
                        an offer use the Floor checker or the search bar at the
                        top
                      </h1>
                    </div>
                  )}
                </div>
              </div>
            </>
          )}
          {_FILTER.ItemsBids[0].offer && (
            <>
              {_FILTER.BidsSelected[0].length > 0 && (
                <>
                  <div className=" bg-white rounded-xl my-2 p-[1.5vw]">
                    <div className="flex flex-row items-center">
                      <button
                        className="border-indigo-500 border-2 rounded-full px-[1.5vw] lXs:px-[1vw] "
                        onClick={() => {
                          _FILTER.Bids();
                        }}
                      >
                        <p className="text-indigo-500 font-bold text-[2.5vw] lXs:text-[1.5vw] uppercase">
                          ACCEPT
                        </p>
                      </button>
                    </div>
                    <div className="flex flex-row flex-wrap items-center justify-start">
                      {_FILTER.BidsSelected[0].map((e, i) => {
                        return (
                          <button
                            onClick={() => {
                              _FILTER.BidsSelectReq[1]([true, e]);
                            }}
                            className={
                              "text-white text-[2.5vw] lXs:text-[1.5vw] px-[1.5vw] lXs:px-[1vw] my-1 " +
                              (_FILTER.BidsSelector[0].includes(
                                e.token.token_id
                              )
                                ? "bg-indigo-500 rounded-full mr-1"
                                : "")
                            }
                          >
                            {e.token.name}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </>
              )}
              <div className="my-4">
                <h1 className="text-white text-[2.5vw] lXs:text-[1.5vw] font-bold uppercase px-2">
                  Offers Received
                </h1>
                <HeadBids />
                <div className="bg-white bg-opacity-10 border-indigo-500 border-2 my-2 rounded-xl">
                  {_FILTER.ItemsBids[0].offer.length > 0 && <MapBids />}
                  {_FILTER.ItemsBids[0].offer.length == 0 && (
                    <div className="w-full flex flex-row rounded-full py-[2vw] px-[1vw] items-center">
                      <h1 className="text-white text-[2.5vw] lXs:text-[1.5vw] px-[1.5vw] lXs:px-[1vw]">
                        You didn't received any offers yet, if someone place an
                        offer on one of your domains it will show here
                      </h1>
                    </div>
                  )}
                </div>
              </div>
            </>
          )}
          {_FILTER.ItemsCollectionBids[0].domains.items && (
            <>
              {_FILTER.CollectionBidsSelected[0].length > 0 && (
                <>
                  <div className=" bg-white rounded-xl my-2 p-[1.5vw]">
                    <div className="flex flex-row items-center">
                      <button
                        className="border-indigo-500 border-2 rounded-full px-[1.5vw] lXs:px-[1vw] "
                        onClick={() => {
                          _FILTER.CollectionBids();
                        }}
                      >
                        <p className="text-indigo-500 font-bold text-[2.5vw] lXs:text-[1.5vw] uppercase">
                          ACCEPT
                        </p>
                      </button>
                    </div>
                    <div className="flex flex-row flex-wrap items-center justify-start">
                      {_FILTER.CollectionBidsSelected[0].map((e, i) => {
                        return (
                          <button
                            onClick={() => {
                              _FILTER.CollectionBidsSelectReq[1]([true, e]);
                            }}
                            className={
                              "text-white text-[2.5vw] lXs:text-[1.5vw] px-[1.5vw] lXs:px-[1vw] my-1 " +
                              (_FILTER.CollectionBidsSelector[0].includes(
                                e.tokenId
                              )
                                ? "bg-indigo-500 rounded-full mr-1"
                                : "")
                            }
                          >
                            {e.name}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </>
              )}
              <div className="my-4">
                <h1 className="text-white text-[2.5vw] lXs:text-[1.5vw] font-bold uppercase px-2">
                  Collection Offers Available
                </h1>
                <HeadBids />
                <div className="bg-white bg-opacity-10 border-indigo-500 border-2 my-2 rounded-xl">
                  {_FILTER.ItemsCollectionBids[0].domains.items.length > 0 &&
                    _FILTER.ItemsCollectionOffers[0].length > 0 && (
                      <MapCollectionBids />
                    )}
                  {_FILTER.ItemsCollectionOffers[0].length === 0 && (
                    <div className="w-full flex flex-row rounded-full py-[2vw] px-[1vw] items-center">
                      <h1 className="text-white text-[2.5vw] lXs:text-[1.5vw] px-[1.5vw] lXs:px-[1vw]">
                        There is no collection offers on the domains you own for
                        now
                      </h1>
                    </div>
                  )}
                </div>
              </div>
            </>
          )}
        </>
      )}
    </>
  );
};

export const Items = ({ _FILTER, context }) => {
  return <Map _FILTER={_FILTER} context={context} />;
};
