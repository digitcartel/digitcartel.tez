const ItemsMap = ({ context }) => {
  const Head = () => {
    return (
      <div className="mt-2 w-full flex flex-row p-[2vw] lXs:p-[1vw] items-center bg-indigo-500 border-2 rounded-xl border-white">
        <h1 className="text-white text-[2.5vw] lXs:text-[1.5vw] px-[1.5vw] lXs:px-[1vw]">
          DIGITS
        </h1>
        <div className="ml-auto border-white border-2 flex flex-row items-center justify-center rounded-xl px-[1.5vw] lXs:px-[1vw]">
          <p className="text-white font-bold text-[2.5vw] lXs:text-[1.5vw] uppercase">
            buy
          </p>
        </div>
      </div>
    );
  };
  return (
    <>
      <Head />
      {!context.state._txPending && context.state._Selected && (
        <>
          <h1 className="text-indigo-500 text-sm px-[1.5vw] lXs:px-[1vw] mt-2">
            fee 2%
          </h1>
          <div className=" bg-white rounded-xl my-2 p-[1.5vw]">
            <button
              className="border-indigo-500 border-2 rounded-xl px-[1.5vw] lXs:px-[1vw] "
              onClick={() => {
                BuyTX(context);
              }}
            >
              <p className="text-indigo-500 font-bold text-[2.5vw] lXs:text-[1.5vw] uppercase">
                buy
              </p>
            </button>
            <div className="flex flex-row flex-wrap items-center justify-start">
              {context.state._SelectBuy.map((e, i) => {
                return (
                  <h1
                    onClick={() => {
                      let currentSelected = context.state._SelectBuy;
                      let currentSelector = context.state._Selector;
                      currentSelected.splice(currentSelected.indexOf(e), 1);
                      currentSelector.splice(
                        currentSelector.indexOf(e.tokenId),
                        1
                      );
                      context.setState({
                        _Selector: currentSelector,
                        _SelectBuy: currentSelected,
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
                    {e.domain.name}
                  </h1>
                );
              })}
            </div>
          </div>
        </>
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
      {context.state._Bulk.offers.items.map((e, i) => {
        const Price = () => {
          return (
            <div className="relative w-full mr-auto flex flex-row items-center justify-end">
              <h1 className=" text-white text-[2.5vw] lXs:text-[1.5vw] px-[1.5vw] lXs:px-[1vw] truncate">
                {(e.price / 10 ** 6).toFixed(0)}tz
              </h1>
              <h1 className=" text-white text-[2.5vw] lXs:text-[1.5vw] px-[1.5vw] lXs:px-[1vw] truncate">
                <span className="text-indigo-500">
                  {context.state._TezosPrice &&
                    (
                      context.state._TezosPrice.eth *
                      (e.price / 10 ** 6)
                    ).toFixed(2)}
                  Ξ
                </span>
              </h1>
              <h1 className=" text-white text-[2.5vw] lXs:text-[1.5vw] px-[1.5vw] lXs:px-[1vw] truncate">
                <span className="text-purple-500">
                  {context.state._TezosPrice &&
                    (
                      context.state._TezosPrice.usd *
                      (e.price / 10 ** 6)
                    ).toFixed(0)}
                  $
                </span>
              </h1>
            </div>
          );
        };

        return (
          <div key={i} className="w-full">
            <div className="w-full flex flex-row rounded-xl py-[2vw] px-[1vw] items-center">
              <h1 className="text-white text-[2.5vw] lXs:text-[1.5vw] px-[1.5vw] lXs:px-[1vw]">
                {e.domain.name}
              </h1>
              <Price />
              <button
                onClick={() => {
                  if (context.state._account != "") {
                    let currentSelected = context.state._SelectBuy;
                    let currentSelector = context.state._Selector;
                    if (
                      !currentSelected.includes(e) &&
                      !currentSelector.includes(e.tokenId)
                    ) {
                      currentSelected.push(e);
                      currentSelector.push(e.tokenId);
                      context.setState({
                        _Selector: currentSelector,
                        _SelectBuy: currentSelected,
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
                        _SelectBuy: currentSelected,
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
                  "flex flex-row items-center justify-center rounded-xl px-[1.5vw] lXs:px-[1vw] border-indigo-500 border-2 " +
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
                  {context.state._account === "" ? "connect" : "buy"}
                </p>
              </button>
            </div>
          </div>
        );
      })}
      <div className="w-full flex flex-row">
        {context.state._Bulk &&
          context.state._Bulk.offers.pageInfo.hasPreviousPage && (
            <button
              className="border-indigo-500 border-2 rounded-xl px-[1.5vw] lXs:px-[1vw] mx-auto"
              onClick={() => {
                context.fetchOffer({
                  less: true,
                  more: false,
                  hash: context.state._Bulk.offers.pageInfo.startCursor,
                });
                context.fetchFloor();
              }}
            >
              <p className="text-indigo-500 font-bold text-[2.5vw] lXs:text-[1.5vw] uppercase">
                LESS
              </p>
            </button>
          )}
        {context.state._Bulk &&
          context.state._Bulk.offers.pageInfo.hasNextPage && (
            <button
              className="border-indigo-500 border-2 rounded-xl px-[1.5vw] lXs:px-[1vw] mx-auto"
              onClick={() => {
                context.fetchOffer({
                  less: false,
                  more: true,
                  hash: context.state._Bulk.offers.pageInfo.endCursor,
                });
                context.fetchFloor();
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

export const Bulk = ({ context }) => {
  return (
    <>
      <textarea
        className="rounded-xl bg-transparent text-white border-2 border-indigo-500 p-[1.5vw]"
        onChange={(e) => {
          e.target.addEventListener("keyup", (e2) => {
            if (e2.key == "Enter") {
              let tmp = e.target.value.split(",");
              console.log(tmp);
            }
          });
        }}
      />
      <h1 className="text-white text-[2.5vw] lXs:text-[1.5vw] px-[1.5vw] lXs:px-[1vw]">
        To bulk search, please enter your wordlist separated by a commas without
        space like: 420,69420,nft,dao
      </h1>
      {!context.state._Profile && (
        <>{context.state._Bulk && <ItemsMap context={context} />}</>
      )}
    </>
  );
};
