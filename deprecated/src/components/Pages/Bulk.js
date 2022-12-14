import { useRef, useState } from "react";
import { fetchSearch } from "../../utils/tezosApiRequest";
import { RegisterTx } from "./_Tx";

const ItemsMap = ({ context }) => {
  const Head = () => {
    return (
      <div className="mt-2 w-full flex flex-row p-[2vw] lXs:p-[1vw] items-center bg-indigo-500 border-2 rounded-xl border-white">
        <h1 className="text-white text-[2.5vw] lXs:text-[1.5vw] px-[1.5vw] lXs:px-[1vw]">
          AVAILABLE{` ${context.state._Bulk.length}/${context.state._BulkLen}`}
        </h1>
        <div className="ml-auto border-white border-2 flex flex-row items-center justify-center rounded-full px-[1.5vw] lXs:px-[1vw]">
          <p className="text-white font-bold text-[2.5vw] lXs:text-[1.5vw] uppercase">
            register
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
          <div className=" bg-white rounded-full my-2 p-[1.5vw]">
            <button
              className="border-indigo-500 border-2 rounded-full px-[1.5vw] lXs:px-[1vw] "
              onClick={() => {
                RegisterTx(context);
              }}
            >
              <p className="text-indigo-500 font-bold text-[2.5vw] lXs:text-[1.5vw] uppercase">
                Register
              </p>
            </button>
            <div className="flex flex-row flex-wrap items-center justify-start">
              {context.state._SelectBulk.map((e, i) => {
                return (
                  <h1
                    onClick={() => {
                      let currentSelected = context.state._SelectBulk;
                      let currentSelector = context.state._Selector;
                      currentSelected.splice(currentSelected.indexOf(e), 1);
                      currentSelector.splice(
                        currentSelector.indexOf(e.domain.name),
                        1
                      );
                      context.setState({
                        _Selector: currentSelector,
                        _SelectBulk: currentSelected,
                        _Selected: currentSelected.length > 0 ? true : false,
                      });
                    }}
                    className={
                      "text-white text-[2.5vw] lXs:text-[1.5vw] px-[1.5vw] lXs:px-[1vw] my-1 " +
                      (context.state._Selected
                        ? context.state._Selector.includes(e.domain.name)
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
      {context.state._Bulk.map((e, i) => {
        return (
          <div key={i} className="w-full">
            <div className="w-full flex flex-row rounded-full py-[2vw] px-[1vw] items-center">
              <h1 className="text-white text-[2.5vw] lXs:text-[1.5vw] px-[1.5vw] lXs:px-[1vw]">
                {e.domain.name}
              </h1>
              {!context.state._bulkView && (
                <button
                  onClick={() => {
                    if (e.domain.open) {
                      if (context.state._account != "") {
                        let currentSelected = context.state._SelectBulk;
                        let currentSelector = context.state._Selector;
                        if (
                          !currentSelected.includes(e) &&
                          !currentSelector.includes(e.domain.name)
                        ) {
                          currentSelected.push(e);
                          currentSelector.push(e.domain.name);
                          context.setState({
                            _Selector: currentSelector,
                            _SelectBulk: currentSelected,
                            _Selected: true,
                          });
                        } else {
                          currentSelected.splice(currentSelected.indexOf(e), 1);
                          currentSelector.splice(
                            currentSelector.indexOf(e.domain.name),
                            1
                          );
                          context.setState({
                            _Selector: currentSelector,
                            _SelectBulk: currentSelected,
                            _Selected:
                              currentSelected.length > 0 ? true : false,
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
                    }
                  }}
                  className={
                    "ml-auto flex flex-row items-center justify-center rounded-full px-[1.5vw] lXs:px-[1vw] border-2 " +
                    (!e.domain.open
                      ? "border-red-500"
                      : context.state._Selected
                      ? context.state._Selector.includes(e.domain.name)
                        ? "bg-indigo-500  border-indigo-500"
                        : "border-indigo-500"
                      : "border-indigo-500")
                  }
                >
                  <p
                    className={
                      "font-bold text-[2.5vw] lXs:text-[1.5vw] uppercase " +
                      (!e.domain.open
                        ? "text-red-500"
                        : context.state._Selected
                        ? context.state._Selector.includes(e.domain.name)
                          ? "text-white"
                          : "text-indigo-500"
                        : "text-indigo-500")
                    }
                  >
                    {!e.domain.open
                      ? "taken"
                      : context.state._account === ""
                      ? "connect"
                      : "register"}
                  </p>
                </button>
              )}
              {context.state._bulkView && (
                <a
                  href={"https://app.tezos.domains/domain/" + e.domain.name}
                  target="_blank"
                  className={
                    "ml-auto flex flex-row items-center justify-center rounded-full px-[1.5vw] lXs:px-[1vw] border-2 " +
                    (!e.domain.open
                      ? "border-red-500"
                      : context.state._Selected
                      ? context.state._Selector.includes(e.domain.name)
                        ? "bg-indigo-500  border-indigo-500"
                        : "border-indigo-500"
                      : "border-indigo-500")
                  }
                >
                  <p
                    className={
                      "font-bold text-[2.5vw] lXs:text-[1.5vw] uppercase " +
                      (!e.domain.open
                        ? "text-red-500"
                        : context.state._Selected
                        ? context.state._Selector.includes(e.domain.name)
                          ? "text-white"
                          : "text-indigo-500"
                        : "text-indigo-500")
                    }
                  >
                    {!e.domain.open ? "taken" : "register"}
                  </p>
                </a>
              )}
            </div>
          </div>
        );
      })}
    </>
  );
};

export const Bulk = ({ context }) => {
  const InputState = useState([]);
  const InputRef = useRef();
  return (
    <>
      <textarea
        ref={InputRef}
        rows={10}
        placeholder={
          "To bulk search in " +
          (context.state._SearchMode ? "MODE [ENTER]" : "MODE [SPACE]") +
          ", please type your wordlist into the field separated by a space like:\n" +
          (context.state._SearchMode
            ? "420\n69420\nnft\ndao"
            : "420 69420 nft dao") +
          "\n\n" +
          "Select your mode before typing your list"
        }
        className="rounded-xl bg-transparent text-white border-2 border-indigo-500 p-[1.5vw] mt-4"
        onChange={(e) => {
          if (e.target.value !== "" && e.target.value.length >= 3) {
            let tmp = e.target.value;
            if (context.state._SearchMode) {
              tmp = tmp.split(" ");
              tmp = tmp.filter((e) => e);
              tmp = tmp[0].split("\n");
              tmp = tmp.filter((e) => e.length >= 3);
              tmp = new Set(tmp);
              tmp = [...tmp];
              if (tmp.length > 500) {
                tmp = tmp.splice(0, 500);
              }
              console.log(tmp);
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
            if (!context.state._bulkDisabled) {
              context.setState(
                {
                  _bulkDisabled: true,
                  _Bulk: [],
                },
                () => {
                  let i = -1;
                  let result = [];
                  while (++i < InputState[0].length)
                    if (
                      InputState[0][i].toLowerCase() !=
                      (InputState[0][i] + ".tez").toLowerCase()
                    )
                      result.push((InputState[0][i] + ".tez").toLowerCase());
                    else result.push(InputState[0][i].toLowerCase());

                  context.setState(
                    {
                      _bulkSearch: result,
                    },
                    async () => {
                      let i = -1;
                      let result = [];
                      while (++i < context.state._bulkSearch.length) {
                        let data = await fetchSearch(
                          context,
                          context.state._bulkSearch[i]
                        );
                        if (data.domain === null) {
                          data.domain = {
                            name: context.state._bulkSearch[i],
                            open: true,
                          };
                          result.push(data);
                          context.setState({
                            _Bulk: result,
                          });
                        }
                        context.setState({
                          _BulkLen: context.state._bulkSearch.length,
                          _BulkIndex: i + 1,
                        });
                      }

                      context.setState({
                        _bulkDisabled: false,
                      });
                    }
                  );
                }
              );
            }
          }}
        >
          <p className="text-indigo-500 font-bold text-[2.5vw] lXs:text-[1.5vw] uppercase">
            {context.state._bulkDisabled
              ? `searching ${context.state._BulkIndex}/${context.state._BulkLen}`
              : "search"}
          </p>
        </button>
        <button
          className="ml-2 bg-indigo-500 rounded-full px-[1.5vw] lXs:px-[1vw] my-4"
          onClick={() => {
            if (!context.state._bulkDisabled) {
              context.setState(
                {
                  _SearchMode: !context.state._SearchMode,
                  _BulkIndex: 0,
                  _BulkLen: 0,
                  _bulkSearch: [],
                  _Bulk: undefined,
                },
                () => {
                  InputState[1]([]);
                  InputRef.current.value = "";
                }
              );
            }
          }}
        >
          <p className="text-white font-bold text-[2.5vw] lXs:text-[1.5vw] uppercase">
            {!context.state._SearchMode ? "mode [SPACE]" : "mode [ENTER]"}
          </p>
        </button>
      </div>
      {!context.state._Profile && (
        <>{context.state._Bulk && <ItemsMap context={context} />}</>
      )}
    </>
  );
};
