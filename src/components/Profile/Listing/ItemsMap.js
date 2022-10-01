import { useState } from "react";

const Map = ({ _FILTER, context }) => {
  const Head = () => {
    return (
      <div className="mt-2 w-full flex flex-row p-[2vw] lXs:p-[1vw] items-center bg-indigo-500 border-2 rounded-xl border-white">
        <h1 className="text-white text-[2.5vw] lXs:text-[1.5vw] px-[1.5vw] lXs:px-[1vw]">
          DOMAIN
        </h1>
        <div className="ml-auto border-white border-2 flex flex-row items-center justify-center rounded-full px-[1.5vw] lXs:px-[1vw]">
          <p className="text-white font-bold text-[2.5vw] lXs:text-[1.5vw] uppercase">
            Manage
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
              MANAGE LISTING
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
        {_FILTER.Items[0].domains.items.map((e, i) => {
          const Domain = () => {
            return (
              <h1 className="text-white text-[2.5vw] lXs:text-[1.5vw] px-[1.5vw] lXs:px-[1vw]">
                {e.name}
              </h1>
            );
          };

          const ActionButton = () => {
            return (
              <div className="ml-auto flex flex-row">
                {_FILTER.Listing[0][i].length === 0 && (
                  <button
                    onClick={() => {
                      _FILTER.ListSelectReq[1]([true, e]);
                    }}
                    className={
                      "ml-2 flex flex-row items-center justify-center rounded-full px-[1.5vw] lXs:px-[1vw] border-indigo-500 border-2 " +
                      (_FILTER.ListSelector[0].includes(e.tokenId)
                        ? "bg-indigo-500"
                        : "")
                    }
                  >
                    <p
                      className={
                        "font-bold text-[2.5vw] lXs:text-[1.5vw] uppercase " +
                        (_FILTER.ListSelector[0].includes(e.tokenId)
                          ? "text-white"
                          : "text-indigo-500")
                      }
                    >
                      List
                    </p>
                  </button>
                )}
                {_FILTER.Listing[0][i].length > 0 && (
                  <button
                    onClick={() => {
                      _FILTER.DeListSelectReq[1]([true, e]);
                    }}
                    className={
                      "ml-2 flex flex-row items-center justify-center rounded-full px-[1.5vw] lXs:px-[1vw] border-purple-500 border-2 " +
                      (_FILTER.DeListSelector[0].includes(e.tokenId)
                        ? "bg-purple-500"
                        : "")
                    }
                  >
                    <p
                      className={
                        "font-bold text-[2.5vw] lXs:text-[1.5vw] uppercase " +
                        (_FILTER.DeListSelector[0].includes(e.tokenId)
                          ? "text-white"
                          : "text-purple-500")
                      }
                    >
                      Delist
                    </p>
                  </button>
                )}
              </div>
            );
          };

          return (
            <div key={i + "_mapCollection"} className="w-full">
              <div className="w-full flex flex-row rounded-full py-[2vw] px-[1vw] items-center">
                <Domain />
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
        {_FILTER.Items[0].domains && (
          <div className="w-full flex flex-row bg-indigo-500 border-white border-2 rounded-xl p-[2vw] lXs:p-[1vw]">
            {_FILTER.Items[0].domains.pageInfo.hasPreviousPage && (
              <button
                className="border-white border-2 rounded-full px-[1.5vw] lXs:px-[1vw] mr-auto"
                onClick={() => {
                  _FILTER.Fetch(
                    true,
                    false,
                    _FILTER.Items[0].domains.pageInfo.startCursor
                  );
                }}
              >
                <p className="text-white font-bold text-[2.5vw] lXs:text-[1.5vw] uppercase">
                  LESS
                </p>
              </button>
            )}
            {_FILTER.Items[0].domains.pageInfo.hasNextPage && (
              <button
                className="border-white border-2 rounded-full px-[1.5vw] lXs:px-[1vw] ml-auto"
                onClick={() => {
                  _FILTER.Fetch(
                    false,
                    true,
                    _FILTER.Items[0].domains.pageInfo.endCursor
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
    const Price = useState(0);

    return (
      <>
        {_FILTER.ListSelected[0].length > 0 && (
          <>
            <div className=" bg-white rounded-xl my-2 p-[1.5vw]">
              <div className="flex flex-row items-center">
                <button
                  className="border-indigo-500 border-2 rounded-full px-[1.5vw] lXs:px-[1vw] "
                  onClick={() => {
                    _FILTER.List(Price[0]);
                  }}
                >
                  <p className="text-indigo-500 font-bold text-[2.5vw] lXs:text-[1.5vw] uppercase">
                    List
                  </p>
                </button>
                <p className="ml-2 text-indigo-500 font-bold text-[2.5vw] lXs:text-[1.5vw] uppercase">
                  XTZ
                </p>
                <input
                  className=" text-black bg-transparent text-[2.5vw] lXs:text-[1.5vw] px-2"
                  placeholder="price"
                  type="number"
                  onChange={(e) => {
                    Price[1](e.target.value);
                  }}
                />
              </div>
              <div className="flex flex-row flex-wrap items-center justify-start">
                {_FILTER.ListSelected[0].map((e, i) => {
                  return (
                    <button
                      onClick={() => {
                        _FILTER.ListSelectReq[1]([true, e]);
                      }}
                      className={
                        "text-white text-[2.5vw] lXs:text-[1.5vw] px-[1.5vw] lXs:px-[1vw] my-1 " +
                        (_FILTER.ListSelector[0].includes(e.tokenId)
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
        {_FILTER.DeListSelected[0].length > 0 && (
          <>
            <div className=" bg-white rounded-xl my-2 p-[1.5vw]">
              <div className="flex flex-row items-center">
                <button
                  className="border-indigo-500 border-2 rounded-full px-[1.5vw] lXs:px-[1vw] "
                  onClick={() => {
                    _FILTER.DeList();
                  }}
                >
                  <p className="text-indigo-500 font-bold text-[2.5vw] lXs:text-[1.5vw] uppercase">
                    Delist
                  </p>
                </button>
              </div>
              <div className="flex flex-row flex-wrap items-center justify-start">
                {_FILTER.DeListSelected[0].map((e, i) => {
                  return (
                    <button
                      onClick={() => {
                        _FILTER.DeListSelectReq[1]([true, e]);
                      }}
                      className={
                        "text-white text-[2.5vw] lXs:text-[1.5vw] px-[1.5vw] lXs:px-[1vw] my-1 " +
                        (_FILTER.DeListSelector[0].includes(e.tokenId)
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
            {_FILTER.Items[0].domains.items.length > 0 && <Map />}
            {_FILTER.Items[0].domains.items.length == 0 && (
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
