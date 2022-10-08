import { useRef, useState } from "react";

const Map = ({ _FILTER, context }) => {
  const Head = () => {
    return (
      <div className="mt-2 w-full flex flex-row p-[2vw] lXs:p-[1vw] items-center bg-indigo-500 border-2 rounded-xl border-white">
        <h1 className="text-white text-[2.5vw] lXs:text-[1.5vw] px-[1.5vw] lXs:px-[1vw]">
          AVAILABLE{` ${_FILTER.SearchAvailable[0]}/${_FILTER.SearchLength[0]}`}
        </h1>
        <div className="ml-auto border-white border-2 flex flex-row items-center justify-center rounded-full px-[1.5vw] lXs:px-[1vw]">
          <p className="text-white font-bold text-[2.5vw] lXs:text-[1.5vw] uppercase">
            Register
          </p>
        </div>
      </div>
    );
  };

  const Map = () => {
    return (
      <>
        {_FILTER.Items[0].map((e, i) => {
          const Domain = () => {
            return (
              <h1 className="text-white text-[2.5vw] lXs:text-[1.5vw] px-[1.5vw] lXs:px-[1vw]">
                {e}
              </h1>
            );
          };

          const ActionButton = () => {
            return (
              <a
                href={"https://app.tezos.domains/domain/" + e}
                target="_blank"
                className="flex flex-row items-center justify-center rounded-full px-[1.5vw] lXs:px-[1vw] border-indigo-500 border-2 ml-auto"
              >
                <p className="font-bold text-[2.5vw] lXs:text-[1.5vw] uppercase text-indigo-500">
                  Register
                </p>
              </a>
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

  return (
    <>
      {!_FILTER.Loading[0] && (
        <>
          <Head />
          <div className="bg-white bg-opacity-10 border-indigo-500 border-2 my-2 rounded-xl">
            {_FILTER.Items[0].length > 0 && <Map />}
            {_FILTER.Items[0].length == 0 && (
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
  const InputRef = useRef();
  const InputState = useState([]);
  const TmpInputeState = useState("");

  return (
    <>
      <div className="w-full">
        <div className="w-full bg-white border-indigo-500 border-2 bg-opacity-10 flex flex-col rounded-xl p-[2vw] lXs:p-[1vw] items-center">
          <textarea
            ref={InputRef}
            rows={10}
            placeholder={
              "To bulk search in " +
              (_FILTER.Mode[0] ? "MODE [ENTER]" : "MODE [SPACE]") +
              ", please type your wordlist into the field separated by a space like:\n" +
              (_FILTER.Mode[0] ? "420\n69420\nnft\ndao" : "420 69420 nft dao") +
              "\n\n" +
              "Select your mode before typing your list"
            }
            className="w-full rounded-xl bg-transparent text-[2.5vw] lXs:text-[1.5vw] text-white border-2 border-indigo-500 p-[2vw] mt-4"
            onChange={(e) => {
              if (e.target.value !== "" && e.target.value.length >= 3) {
                let tmp = e.target.value;
                TmpInputeState[1](e.target.value);
                if (_FILTER.Mode[0]) {
                  tmp = tmp.split(" ");
                  tmp = tmp.filter((e) => e);
                  tmp = tmp[0].split("\n");
                  tmp = tmp.filter((e) => e.length >= 3);
                  tmp = new Set(tmp);
                  tmp = [...tmp];
                  if (tmp.length > 500) {
                    tmp = tmp.splice(0, 500);
                  }
                } else {
                  tmp = tmp.split("\n");
                  tmp = tmp.filter((e) => e);
                  tmp = tmp[0].split(" ");
                  tmp = tmp.filter((e) => e.length >= 3);
                  tmp = new Set(tmp);
                  tmp = [...tmp];
                  if (tmp.length > 500) {
                    tmp = tmp.splice(0, 500);
                  }
                }
                InputState[1](tmp);
              } else {
                InputState[1]([]);
              }
            }}
          />
          <div className="flex flex-row items-center">
            <button
              className="border-indigo-500 border-2 rounded-full px-[1.5vw] lXs:px-[1vw] my-4"
              onClick={() => {
                _FILTER.UpdateReq[1]([true, InputState[0]]);
                _FILTER.Fetch(InputState[0]);
              }}
            >
              <p className="text-indigo-500 font-bold text-[2.5vw] lXs:text-[1.5vw] uppercase">
                {_FILTER.UpdateReq[0][0]
                  ? `searching ${_FILTER.SearchIndex[0]}/${_FILTER.SearchLength[0]}`
                  : "search"}
              </p>
            </button>
            <button
              className="ml-2 bg-indigo-500 rounded-full px-[1.5vw] lXs:px-[1vw] my-4"
              onClick={() => {
                _FILTER.Reset();
                InputState[1]([]);
                InputRef.current.value = "";
              }}
            >
              <p className="text-white font-bold text-[2.5vw] lXs:text-[1.5vw] uppercase">
                {!_FILTER.Mode[0] ? "mode [SPACE]" : "mode [ENTER]"}
              </p>
            </button>
          </div>
        </div>
      </div>
      <Map _FILTER={_FILTER} context={context} />
    </>
  );
};
