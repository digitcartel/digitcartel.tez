export const Activity = ({ context }) => {
  return (
    <div className="flex flex-row items-center">
      <div className="w-full lex flex-col">
        <div className="mb-2 w-full flex flex-row px-[2vw] lXs:px-[1vw] py-2 items-center bg-indigo-500 border-2 rounded-xl border-white">
          <h1 className="text-white text-[2.5vw] lXs:text-[1.5vw]">🔥SALES</h1>
        </div>
        <div className="w-full bg-white bg-opacity-10 border-indigo-500 border-2 mb-2 rounded-xl">
          <div className="overflow-auto no-scroll-bar h-[10vh] lXs:h-[15vh] w-full flex flex-col my-[1vw] items-center">
            {context.state._LastSales &&
              context.state._LastSales.map((e, i) => {
                return (
                  <div
                    key={i + "_lastSales"}
                    className="w-full flex flex-row rounded-full px-[1vw] items-center justify-between"
                  >
                    <button
                      onClick={() => {
                        context.setState({
                          _Object: true,
                          _View: "token",
                          _Viewed: e.domainName,
                        });
                      }}
                      className="text-white text-[2vw] lXs:text-[1vw] px-[1.5vw] lXs:px-[1vw] whitespace-nowrap truncate w-full hover:bg-indigo-500 hover:text-white rounded-full text-left"
                    >
                      {e.domainName}
                    </button>
                    <h1 className="text-indigo-500 font-bold text-[2vw] lXs:text-[1vw] px-[1.5vw] lXs:px-[1vw]">
                      {e.price / 10 ** 6}tz
                    </h1>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
      <div className="w-full lex flex-col mx-2">
        <div className="mb-2 w-full flex flex-row px-[2vw] lXs:px-[1vw] py-2 items-center bg-indigo-500 border-2 rounded-xl border-white">
          <h1 className="text-white text-[2.5vw] lXs:text-[1.5vw]">🎈OFFERS</h1>
        </div>
        <div className="w-auto bg-white bg-opacity-10 border-indigo-500 border-2 mb-2 rounded-xl">
          <div className="overflow-y-auto no-scroll-bar h-[10vh] lXs:h-[15vh] flex flex-col my-[1vw]">
            {context.state._LastOffers &&
              context.state._LastOffers.map((e, i) => {
                return (
                  <div
                    key={i + "_lastOffers"}
                    className="flex flex-row rounded-full px-[1vw] items-center justify-between"
                  >
                    {!e.token && (
                      <h1 className="text-white text-[2vw] lXs:text-[1vw] px-[1.5vw] lXs:px-[1vw] whitespace-nowrap truncate w-full text-left">
                        {!e.token && (
                          <span className="text-purple-500 uppercase">
                            Collection
                          </span>
                        )}
                      </h1>
                    )}
                    {e.token && (
                      <button
                        onClick={() => {
                          context.setState({
                            _Object: true,
                            _View: "token",
                            _Viewed: e.token.name,
                          });
                        }}
                        className="text-white text-[2vw] lXs:text-[1vw] px-[1.5vw] lXs:px-[1vw] whitespace-nowrap truncate w-full hover:bg-indigo-500 hover:text-white rounded-full text-left"
                      >
                        {e.token.name}
                      </button>
                    )}
                    <h1 className="ml-auto text-indigo-500 font-bold text-[2vw] lXs:text-[1vw] px-[1.5vw] lXs:px-[1vw]">
                      {e.price / 10 ** 6}tz
                    </h1>
                    {e.status === "concluded" && (
                      <h1 className="w-1 h-1 rounded-full bg-purple-500" />
                    )}
                    {e.status === "active" && (
                      <h1 className="w-1 h-1 rounded-full bg-indigo-500" />
                    )}
                    {e.status === "cancelled" && (
                      <h1 className="w-1 h-1 rounded-full bg-red-500" />
                    )}
                  </div>
                );
              })}
          </div>
        </div>
      </div>
      <div className="w-full lex flex-col">
        <div className="mb-2 w-full flex flex-row px-[2vw] lXs:px-[1vw] py-2 items-center bg-indigo-500 border-2 rounded-xl border-white">
          <h1 className="text-white text-[2.5vw] lXs:text-[1.5vw]">💾MINT</h1>
        </div>
        <div className="w-full bg-white bg-opacity-10 border-indigo-500 border-2 mb-2 rounded-xl">
          <div className="overflow-auto no-scroll-bar h-[10vh] lXs:h-[15vh] w-full flex flex-col my-[1vw] items-center">
            {context.state._LastRegs &&
              context.state._LastRegs.map((e, i) => {
                return (
                  <div
                    key={i + "_lastReg"}
                    className="w-full flex flex-row rounded-full px-[1vw] items-center justify-between"
                  >
                    <button
                      onClick={() => {
                        context.setState({
                          _Object: true,
                          _View: "token",
                          _Viewed: e.domainName,
                        });
                      }}
                      className="text-white text-[2vw] lXs:text-[1vw] px-[1.5vw] lXs:px-[1vw] whitespace-nowrap truncate w-full hover:bg-indigo-500 hover:text-white rounded-full text-left"
                    >
                      {e.domainName}
                    </button>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
};
