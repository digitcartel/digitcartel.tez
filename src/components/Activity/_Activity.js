export const Activity = ({ context }) => {
  return (
    <div className="flex flex-row items-center">
      <div className="w-full lex flex-col">
        <div className="mb-2 w-full flex flex-row px-[2vw] lXs:px-[1vw] py-2 items-center bg-indigo-500 border-2 rounded-xl border-white">
          <h1 className="text-white text-[2.5vw] lXs:text-[1.5vw]">🔥SALES</h1>
        </div>
        <div className="w-full bg-white bg-opacity-10 border-indigo-500 border-2 mb-2 rounded-xl">
          <div className="overflow-auto no-scroll-bar h-[8vh] lXs:h-[15vh] w-full flex flex-col my-[1vw] items-center">
            {context.state._LastSales && context.state._LastSales.map((e, i) => {
              return (
                <div
                  key={i + "_lastSales"}
                  className="w-full flex flex-row rounded-full px-[1vw] items-center justify-between"
                >
                  <h1 className="text-white text-[2vw] lXs:text-[1vw] px-[1.5vw] lXs:px-[1vw] truncate">
                    {e.domainName}
                  </h1>
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
        <div className="w-full bg-white bg-opacity-10 border-indigo-500 border-2 mb-2 rounded-xl">
          <div className="overflow-auto no-scroll-bar h-[8vh] lXs:h-[15vh] w-full flex flex-col my-[1vw] items-center">
            {context.state._LastOffers && context.state._LastOffers.map((e, i) => {
              return (
                <div
                  key={i + "_lastOffers"}
                  className="w-full flex flex-row rounded-full px-[1vw] items-center justify-between"
                >
                  <h1 className="text-white text-[2vw] lXs:text-[1vw] px-[1.5vw] lXs:px-[1vw] truncate">
                    {e.token && e.token.name}
                    {!e.token && (
                      <span className="text-purple-500 uppercase">
                        Collection
                      </span>
                    )}
                  </h1>
                  <h1 className="text-indigo-500 font-bold text-[2vw] lXs:text-[1vw] px-[1.5vw] lXs:px-[1vw]">
                    {e.price / 10 ** 6}tz
                  </h1>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div className="w-full lex flex-col">
        <div className="mb-2 w-full flex flex-row px-[2vw] lXs:px-[1vw] py-2 items-center bg-indigo-500 border-2 rounded-xl border-white">
          <h1 className="text-white text-[2.5vw] lXs:text-[1.5vw]">
            💾REGISTRATION
          </h1>
        </div>
        <div className="w-full bg-white bg-opacity-10 border-indigo-500 border-2 mb-2 rounded-xl">
          <div className="overflow-auto no-scroll-bar h-[8vh] lXs:h-[15vh] w-full flex flex-col my-[1vw] items-center">
            {context.state._LastRegs && context.state._LastRegs.map((e, i) => {
              return (
                <div
                  key={i + "_lastReg"}
                  className="w-full flex flex-row rounded-full px-[1vw] items-center justify-between"
                >
                  <h1 className="text-white text-[2vw] lXs:text-[1vw] px-[1.5vw] lXs:px-[1vw] truncate">
                    {e.domainName}
                  </h1>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
