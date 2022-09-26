import { fetchFloor, fetchOffer } from "../utils/tezosApiRequest";

export const Categories = ({ context }) => {
  return (
    <>
      <div className="w-full flex flex-col">
        <div className="w-full">
          <div className="bg-black bg-opacity-50 rounded-xl">
            <div className="w-full h-[2px] bg-indigo-500 my-3 rounded-full uppercase" />
            <div className="flex flex-row flex-wrap items-center justify-start">
              <h1 className="text-white text-[2.5vw] lXs:text-[1.5vw] font-bold mr-4">
                Club
              </h1>
              <button
                onClick={() => {
                  context.setState(
                    {
                      _FILTERBASE: context.state._999Base,
                      _ShowDomains: false,
                    },
                    () => {
                      fetchOffer({
                        context: context,
                        less: false,
                        more: false,
                        hash: 0,
                      });
                      fetchFloor(context);
                    }
                  );
                }}
                className="ml-auto flex flex-row items-center my-2 border-2 border-indigo-500 rounded-full py-1 px-[1.5vw] mr-2"
              >
                <img
                  src="./999tez.png"
                  className="w-[5vw] h-[5vw] lXs:w-[2.5vw] lXs:h-[2.5vw] mr-[1vw] rounded-full"
                />
                <h1 className="text-white text-[2vw] lXs:text-[1vw] font-bold">
                  999
                </h1>
              </button>
              <button
                onClick={() => {
                  context.setState(
                    {
                      _FILTERBASE: context.state._10kBase,
                      _ShowDomains: false,
                    },
                    () => {
                      fetchOffer({
                        context: context,
                        less: false,
                        more: false,
                        hash: 0,
                      });
                      fetchFloor(context);
                    }
                  );
                }}
                className="flex flex-row items-center my-2 border-2 border-indigo-500 rounded-full py-1 px-[1.5vw] mr-2"
              >
                <img
                  src="./10ktez.png"
                  className="w-[5vw] h-[5vw] lXs:w-[2.5vw] lXs:h-[2.5vw] mr-[1vw] rounded-full"
                />
                <h1 className="text-white text-[2vw] lXs:text-[1vw] font-bold">
                  10k
                </h1>
              </button>
              <button
                onClick={() => {
                  context.setState(
                    {
                      _FILTERBASE: context.state._100kBase,
                      _ShowDomains: false,
                    },
                    () => {
                      fetchOffer({
                        context: context,
                        less: false,
                        more: false,
                        hash: 0,
                      });
                      fetchFloor(context);
                    }
                  );
                }}
                className="flex flex-row items-center my-2 border-2 border-indigo-500 rounded-full py-1 px-[1.5vw] mr-2"
              >
                <img
                  src="./100ktez.png"
                  className="w-[5vw] h-[5vw] lXs:w-[2.5vw] lXs:h-[2.5vw] mr-[1vw] rounded-full"
                />
                <h1 className="text-white text-[2vw] lXs:text-[1vw] font-bold">
                  100k
                </h1>
              </button>
            </div>
          </div>
        </div>
        <div className="w-full">
          <div className="bg-black bg-opacity-50 rounded-xl">
            <div className="w-full h-[2px] bg-indigo-500 my-3 rounded-full uppercase" />
            <div className="flex flex-row flex-wrap items-center justify-start">
              <h1 className="text-white text-[2.5vw] lXs:text-[1.5vw] font-bold mr-4">
                Palindromes
              </h1>
              <button
                onClick={() => {
                  context.setState(
                    {
                      _FILTERBASE: context.state._3DPaliBase,
                      _ShowDomains: false,
                    },
                    () => {
                      fetchOffer({
                        context: context,
                        less: false,
                        more: false,
                        hash: 0,
                      });
                      fetchFloor(context);
                    }
                  );
                }}
                className="ml-auto flex flex-row items-center my-2 border-2 border-indigo-500 rounded-full py-1 px-[1.5vw] mr-2"
              >
                <img
                  src="./999tez.png"
                  className="w-[5vw] h-[5vw] lXs:w-[2.5vw] lXs:h-[2.5vw] mr-[1vw] rounded-full"
                />
                <h1 className="text-white text-[2vw] lXs:text-[1vw] font-bold">
                  3Digits
                </h1>
              </button>
              <button
                onClick={() => {
                  context.setState(
                    {
                      _FILTERBASE: context.state._4DPaliBase,
                      _ShowDomains: false,
                    },
                    () => {
                      fetchOffer({
                        context: context,
                        less: false,
                        more: false,
                        hash: 0,
                      });
                      fetchFloor(context);
                    }
                  );
                }}
                className="flex flex-row items-center my-2 border-2 border-indigo-500 rounded-full py-1 px-[1.5vw] mr-2"
              >
                <img
                  src="./10ktez.png"
                  className="w-[5vw] h-[5vw] lXs:w-[2.5vw] lXs:h-[2.5vw] mr-[1vw] rounded-full"
                />
                <h1 className="text-white text-[2vw] lXs:text-[1vw] font-bold">
                  4Digits
                </h1>
              </button>
              <button
                onClick={() => {
                  context.setState(
                    {
                      _FILTERBASE: context.state._5DPaliBase,
                      _ShowDomains: false,
                    },
                    () => {
                      fetchOffer({
                        context: context,
                        less: false,
                        more: false,
                        hash: 0,
                      });
                      fetchFloor(context);
                    }
                  );
                }}
                className="flex flex-row items-center my-2 border-2 border-indigo-500 rounded-full py-1 px-[1.5vw] mr-2"
              >
                <img
                  src="./100ktez.png"
                  className="w-[5vw] h-[5vw] lXs:w-[2.5vw] lXs:h-[2.5vw] mr-[1vw] rounded-full"
                />
                <h1 className="text-white text-[2vw] lXs:text-[1vw] font-bold">
                  5Digits
                </h1>
              </button>
            </div>
          </div>
        </div>
        <div className="w-full">
          <div className="bg-black bg-opacity-50 rounded-xl">
            <div className="w-full h-[2px] bg-indigo-500 my-3 rounded-full uppercase" />
          </div>
        </div>
      </div>
    </>
  );
};
