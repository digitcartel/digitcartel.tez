export const SubMap = ({ _FILTER, context }) => {
  return (
    <>
      {_FILTER.Initialized[0] && (
        <div className="w-full lex flex-col mt-2">
          <div className="mb-2 w-full flex flex-row p-[2vw] lXs:p-[1vw] items-center bg-indigo-500 border-2 rounded-xl border-white">
            <h1 className="text-white text-[2.5vw] lXs:text-[1.5vw]">
              🎈OFFERS
            </h1>
          </div>
          {_FILTER.Offers[0].offer.length > 0 && (
            <div className="w-full bg-white bg-opacity-10 border-indigo-500 border-2 mb-2 rounded-xl">
              <div className="overflow-auto no-scroll-bar h-[10vh] lXs:h-[20vh] w-full flex flex-col items-center">
                <div className="w-full flex flex-row rounded-full py-[2vw] px-[1vw] items-center">
                  {_FILTER.Offers[0] &&
                    _FILTER.Offers[0].offer.map((e, i) => {
                      return (
                        <div
                          key={i + "_lastOffers"}
                          className="w-full flex flex-row rounded-full items-center justify-between"
                        >
                          <span className="text-indigo-500">FROM:</span>
                          {e.buyer.tzdomain == null && e.buyer.address && (
                            <a
                              href={`https://tzkt.io/${e.ophash}`}
                              target="_blank"
                              className=" text-white rounded-xl hover:bg-indigo-500 hover:text-white text-[2.5vw] lXs:text-[1.5vw] px-[1.5vw] lXs:px-[1vw]"
                            >
                              {e.buyer.address.slice(0, 6)}
                              {"..."}
                              {e.buyer.address.slice(
                                e.buyer.address.length - 6,
                                e.buyer.address.length - 1
                              )}
                            </a>
                          )}
                          {e.buyer.tzdomain && (
                            <a
                              href={`https://tzkt.io/${e.ophash}`}
                              target="_blank"
                              className=" text-white rounded-xl hover:bg-indigo-500 hover:text-white text-[2.5vw] lXs:text-[1.5vw] px-[1.5vw] lXs:px-[1vw]"
                            >
                              {e.buyer.tzdomain}
                            </a>
                          )}
                          <div className="relative w-full mr-auto flex flex-row items-center justify-end">
                            <h1 className=" text-white text-[2.5vw] lXs:text-[1.5vw] px-[1.5vw] lXs:px-[1vw] truncate">
                              {(e.price / 10 ** 6 || 0).toFixed(2)}
                              tz
                            </h1>
                            <h1 className=" text-white text-[2.5vw] lXs:text-[1.5vw] px-[1.5vw] lXs:px-[1vw] truncate">
                              <span className="text-indigo-500">
                                {(
                                  context.state._EthereumPrice *
                                  (e.price / 10 ** 6 || 0)
                                ).toFixed(2)}
                                Ξ
                              </span>
                            </h1>
                            <h1 className=" text-white text-[2.5vw] lXs:text-[1.5vw] px-[1.5vw] lXs:px-[1vw] truncate">
                              <span className="text-purple-500">
                                {(
                                  context.state._TezosPrice *
                                  (e.price / 10 ** 6 || 0)
                                ).toFixed(2)}
                                $
                              </span>
                            </h1>
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>
            </div>
          )}
          {_FILTER.Offers[0].offer.length === 0 && (
            <div className="bg-white bg-opacity-10 border-indigo-500 border-2 my-2 rounded-xl">
              <div className="w-full flex flex-row rounded-full py-[2vw] px-[1vw] items-center">
                <h1 className="text-white text-[2.5vw] lXs:text-[1.5vw] px-[1.5vw] lXs:px-[1vw]">
                  No result
                </h1>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};
