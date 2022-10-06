const Map = ({ _FILTER, context }) => {
  const Head = () => {
    return (
      <div className="mt-2 w-full flex flex-row p-[2vw] lXs:p-[1vw] items-center bg-indigo-500 border-2 rounded-xl border-white">
        <h1 className="text-white text-[2.5vw] lXs:text-[1.5vw] px-[1.5vw] lXs:px-[1vw]">
          EVENTS
        </h1>
        <div className="ml-auto border-white border-2 flex flex-row items-center justify-center rounded-full px-[1.5vw] lXs:px-[1vw]">
          <p className="text-white font-bold text-[2.5vw] lXs:text-[1.5vw] uppercase">
            Log
          </p>
        </div>
      </div>
    );
  };

  const Map = () => {
    return (
      <>
        {_FILTER.Events[0].events.items.map((e, i) => {
          const Event = () => {
            return (
              <a
                href={`https://tzkt.io/${e.operationGroupHash}`}
                target="_blank"
                className="text-white text-[2.5vw] lXs:text-[1.5vw] px-[1.5vw] lXs:px-[1vw] whitespace-nowrap hover:bg-indigo-500 rounded-xl"
              >
                {e.type
                  .replace("_", " ")
                  .replace("_EVENT", "")
                  .replace("OFFER", "LISTING")}
              </a>
            );
          };

          const Price = () => {
            return (
              <div className="relative w-full mr-auto flex flex-row items-center justify-end">
                <h1 className=" text-white text-[2.5vw] lXs:text-[1.5vw] px-[1.5vw] lXs:px-[1vw] truncate">
                  {(
                    (e.price || e.bidAmount || e.winningBid) / 10 ** 6 || 0
                  ).toFixed(2)}
                  tz
                </h1>
                <h1 className=" text-white text-[2.5vw] lXs:text-[1.5vw] px-[1.5vw] lXs:px-[1vw] truncate">
                  <span className="text-indigo-500">
                    {(
                      context.state._EthereumPrice *
                      ((e.price || e.bidAmount || e.winningBid) / 10 ** 6 || 0)
                    ).toFixed(2)}
                    Ξ
                  </span>
                </h1>
                <h1 className=" text-white text-[2.5vw] lXs:text-[1.5vw] px-[1.5vw] lXs:px-[1vw] truncate">
                  <span className="text-purple-500">
                    {(
                      context.state._TezosPrice *
                      ((e.price || e.bidAmount || e.winningBid) / 10 ** 6 || 0)
                    ).toFixed(2)}
                    $
                  </span>
                </h1>
              </div>
            );
          };

          const Transfer = () => {
            return (
              <div className="relative w-full mr-auto flex flex-col items-end truncate">
                {e.sourceAddressReverseRecord == null && e.sourceAddress && (
                  <button
                    onClick={() => {
                      context.setState({
                        _Object: true,
                        _View: "wallet",
                        _Viewed: e.sourceAddress,
                      });
                    }}
                    className=" text-indigo-500 rounded-xl hover:bg-indigo-500 hover:text-white text-[2vw] lXs:text-[1vw] px-[1.5vw] lXs:px-[1vw]"
                  >
                    {e.sourceAddress.slice(0, 6)}
                    {"..."}
                    {e.sourceAddress.slice(
                      e.sourceAddress.length - 6,
                      e.sourceAddress.length - 1
                    )}
                  </button>
                )}
                {e.sourceAddressReverseRecord &&
                  e.sourceAddressReverseRecord.domain && (
                    <button
                      onClick={() => {
                        context.setState({
                          _Object: true,
                          _View: "wallet",
                          _Viewed: e.sourceAddress,
                        });
                      }}
                      className=" text-indigo-500 rounded-xl hover:bg-indigo-500 hover:text-white text-[2vw] lXs:text-[1vw] px-[1.5vw] lXs:px-[1vw]"
                    >
                      {e.sourceAddressReverseRecord.domain.name}
                    </button>
                  )}
                {e.newOwnerReverseRecord === null && e.newOwner && (
                  <button
                    onClick={() => {
                      context.setState({
                        _Object: true,
                        _View: "wallet",
                        _Viewed: e.newOwner,
                      });
                    }}
                    className=" text-purple-500 rounded-xl hover:bg-purple-500 hover:text-white text-[2vw] lXs:text-[1vw] px-[1.5vw] lXs:px-[1vw]"
                  >
                    {e.newOwner.slice(0, 6)}
                    {"..."}
                    {e.newOwner.slice(
                      e.newOwner.length - 6,
                      e.newOwner.length - 1
                    )}
                  </button>
                )}
                {e.newOwnerReverseRecord && e.newOwnerReverseRecord.domain && (
                  <button
                    onClick={() => {
                      context.setState({
                        _Object: true,
                        _View: "wallet",
                        _Viewed: e.newOwner,
                      });
                    }}
                    className=" text-purple-500 rounded-xl hover:bg-purple-500 hover:text-white text-[2vw] lXs:text-[1vw] px-[1.5vw] lXs:px-[1vw]"
                  >
                    {e.newOwnerReverseRecord.domain.name}
                  </button>
                )}
              </div>
            );
          };

          const Time = () => {
            return (
              <div className="relative w-full mr-auto flex flex-col items-end truncate">
                <h1 className=" text-white text-[2.5vw] lXs:text-[1.5vw] px-[1.5vw] lXs:px-[1vw] truncate">
                  {e.durationInDays}
                </h1>
              </div>
            );
          };

          if (e.type)
            return (
              <div key={i + "_mapCollection"} className="w-full">
                <div className="w-full flex flex-row rounded-full py-[2vw] px-[1vw] items-center">
                  <Event />
                  {(e.price || e.bidAmount || e.winningBid) && <Price />}
                  {e.sourceAddress && <Transfer />}
                  {e.durationInDays && <Time />}
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
        {_FILTER.Events[0].events && (
          <div className="w-full flex flex-row bg-indigo-500 border-white border-2 rounded-xl p-[2vw] lXs:p-[1vw]">
            {_FILTER.Events[0].events.pageInfo.hasPreviousPage && (
              <button
                className="border-white border-2 rounded-full px-[1.5vw] lXs:px-[1vw] mr-auto"
                onClick={() => {
                  _FILTER.Fetch(
                    true,
                    false,
                    _FILTER.Events[0].events.pageInfo.startCursor
                  );
                }}
              >
                <p className="text-white font-bold text-[2.5vw] lXs:text-[1.5vw] uppercase">
                  LESS
                </p>
              </button>
            )}
            {_FILTER.Events[0].events.pageInfo.hasNextPage && (
              <button
                className="border-white border-2 rounded-full px-[1.5vw] lXs:px-[1vw] ml-auto"
                onClick={() => {
                  _FILTER.Fetch(
                    false,
                    true,
                    _FILTER.Events[0].events.pageInfo.endCursor
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

  return (
    <>
      {!_FILTER.Loading[0] && (
        <>
          <Head />
          <div className="bg-white bg-opacity-10 border-indigo-500 border-2 my-2 rounded-xl">
            {_FILTER.Events[0].events.items.length > 0 && <Map />}
            {_FILTER.Events[0].events.items.length == 0 && (
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
