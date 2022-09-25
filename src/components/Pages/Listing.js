import { useState } from "react";
import { ListTx } from "./_Tx";

const ItemsMap = ({ context }) => {
  let Price = useState(0);

  const Head = () => {
    return (
      <div className="mt-2 w-full flex flex-row p-[2vw] lXs:p-[1vw] items-center bg-indigo-500 border-2 rounded-xl border-white">
        <h1 className="text-white text-[2.5vw] lXs:text-[1.5vw] px-[1.5vw] lXs:px-[1vw]">
          DIGITS
        </h1>
        <div className="ml-auto border-white border-2 flex flex-row items-center justify-center rounded-full px-[1.5vw] lXs:px-[1vw]">
          <p className="text-white font-bold text-[2.5vw] lXs:text-[1.5vw] uppercase">
            list
          </p>
        </div>
      </div>
    );
  };

  return (
    <>
      <Head />
      {!context.state._txPending && context.state._Selected && (
        <div className=" bg-white rounded-xl my-2 p-[1.5vw] mt-2">
          <div className="flex flex-row items-center">
            <button
              className="border-indigo-500 border-2 rounded-full px-[1.5vw] lXs:px-[1vw] "
              onClick={() => {
                ListTx(context, Price[0]);
              }}
            >
              <p className="text-indigo-500 font-bold text-[2.5vw] lXs:text-[1.5vw] uppercase">
                list
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
            {context.state._SelectList.map((e, i) => {
              return (
                <h1
                  onClick={() => {
                    let currentSelected = context.state._SelectList;
                    let currentSelector = context.state._Selector;
                    currentSelected.splice(currentSelected.indexOf(e), 1);
                    currentSelector.splice(
                      currentSelector.indexOf(e.tokenId),
                      1
                    );
                    context.setState({
                      _Selector: currentSelector,
                      _SelectList: currentSelected,
                      _Selected: currentSelected.length > 0 ? true : false,
                    });
                  }}
                  className={
                    "text-white text-[2.5vw] lXs:text-[1.5vw] px-[1.5vw] lXs:px-[1vw] my-1 " +
                    (context.state._Selected
                      ? context.state._Selector.includes(e.tokenId)
                        ? "bg-indigo-500 rounded-full mr-1"
                        : ""
                      : "")
                  }
                >
                  {e.name}
                </h1>
              );
            })}
          </div>
        </div>
      )}
      {context.state._txEntry.length > 0 && (
        <div className="w-full flex flex-row justify-between mt-6">
          <p className="text-indigo-500 text-[2.5vw] lXs:text-[1.5vw] px-[1.5vw] lXs:px-[1vw] font-bold uppercase">
            Transaction confirmed
          </p>
        </div>
      )}
      {context.state._txPending && (
        <div className="w-full flex flex-row justify-between mt-6">
          <p className="text-indigo-500 text-[2.5vw] lXs:text-[1.5vw] px-[1.5vw] lXs:px-[1vw] font-bold uppercase">
            Transaction pending
          </p>
        </div>
      )}
      {context.state._Listing.domains.items.map((e, i) => {
        return (
          <div key={i} className="w-full">
            <div className="w-full flex flex-row rounded-full py-[2vw] px-[1vw] items-center">
              <h1 className="text-white text-[2.5vw] lXs:text-[1.5vw] px-[1.5vw] lXs:px-[1vw]">
                {e.name}
              </h1>
              <button
                onClick={() => {
                  if (context.state._account != "") {
                    let currentSelected = context.state._SelectList;
                    let currentSelector = context.state._Selector;
                    if (
                      !currentSelected.includes(e) &&
                      !currentSelector.includes(e.tokenId)
                    ) {
                      currentSelected.push(e);
                      currentSelector.push(e.tokenId);
                      context.setState({
                        _Selector: currentSelector,
                        _SelectList: currentSelected,
                        _Selected: true,
                      });
                    } else {
                      currentSelected.splice(currentSelected.indexOf(e), 1);
                      currentSelector.splice(
                        currentSelector.indexOf(e.tokenId),
                        1
                      );
                      context.setState({
                        _Selector: currentSelector,
                        _SelectList: currentSelected,
                        _Selected: currentSelected.length > 0 ? true : false,
                      });
                    }
                  } else {
                    if (context.props.props.context.state._connected == 2) {
                      context.props.props.context.connect().then(() => {
                        context.props.props.context.state._Wallet.client
                          .getActiveAccount()
                          .then((e) => {
                            if (e !== undefined) {
                              context.setState({
                                _account: e.address,
                              });
                            }
                          });
                      });
                    }
                  }
                }}
                className={
                  "ml-auto flex flex-row items-center justify-center rounded-full px-[1.5vw] lXs:px-[1vw] border-indigo-500 border-2 " +
                  (context.state._Selected
                    ? context.state._Selector.includes(e.tokenId)
                      ? "bg-indigo-500"
                      : ""
                    : "")
                }
              >
                <p
                  className={
                    "font-bold text-[2.5vw] lXs:text-[1.5vw] uppercase " +
                    (context.state._Selected
                      ? context.state._Selector.includes(e.tokenId)
                        ? "text-white"
                        : "text-indigo-500"
                      : "text-indigo-500")
                  }
                >
                  list
                </p>
              </button>
            </div>
          </div>
        );
      })}
      <div className="w-full flex flex-row">
        {context.state._Listing &&
          context.state._Listing.domains.pageInfo.hasPreviousPage && (
            <button
              className="border-indigo-500 border-2 rounded-full px-[1.5vw] lXs:px-[1vw] mx-auto"
              onClick={() => {
                context.fetchListing({
                  less: true,
                  more: false,
                  hash: context.state._Listing.domains.pageInfo.startCursor,
                });
              }}
            >
              <p className="text-indigo-500 font-bold text-[2.5vw] lXs:text-[1.5vw] uppercase">
                LESS
              </p>
            </button>
          )}
        {context.state._Listing &&
          context.state._Listing.domains.pageInfo.hasNextPage && (
            <button
              className="border-indigo-500 border-2 rounded-full px-[1.5vw] lXs:px-[1vw] mx-auto"
              onClick={() => {
                context.fetchListing({
                  less: false,
                  more: true,
                  hash: context.state._Listing.domains.pageInfo.endCursor,
                });
              }}
            >
              <p className="text-indigo-500 font-bold text-[2.5vw] lXs:text-[1.5vw] uppercase">
                MORE
              </p>
            </button>
          )}
      </div>
    </>
  );
};

export const Listing = ({ context }) => {
  return (
    <>
      {context.state._Profile && context.state._listingView && (
        <>{context.state._Listing && <ItemsMap context={context} />}</>
      )}
    </>
  );
};
