import {
  requestBeaconConnection,
  requestBeaconDisconnection,
} from "../service/Connector/request";
import { useRef, useState } from "react";
import { fetchAddress, fetchDomain } from "../service/TezosDomains/request";
import { Offers } from "./Offers/_Offers";
import { Activity } from "./Activity/_Activity";

export const Navbar = ({ context }) => {
  const InputRef = useRef();
  const InputState = useState(0);
  const AddressState = useState({});
  const DomainState = useState({});

  const Title = () => {
    return (
      <div className="bg-indigo-500 flex flex-row items-center justify-center rounded-full px-[1.5vw] lXs:px-[1vw]">
        <a
          className="text-white font-bold text-[2.5vw] lXs:text-[1.5vw]"
          href="/"
        >
          DIGITCARTEL
        </a>
      </div>
    );
  };

  const ConnectButton = () => {
    return (
      <>
        <div className="relative flex flex-row">
          <button
            className="ml-4 border-2 border-indigo-500 rounded-full px-[1.5vw] lXs:px-[1vw]"
            onClick={() => {
              if (context.props.props.context.state._connected == 2) {
                requestBeaconConnection(
                  context.props.props.context.state._connected,
                  context
                );
              } else {
                context.setState(
                  {
                    _View: context.state._Profile ? "floor" : "bids",
                  },
                  () => {
                    context.setState({
                      _Profile: !context.state._Profile,
                    });
                  }
                );
              }
            }}
          >
            {context.props.props.context.state._connected == 2 ? (
              <p className="text-indigo-500 font-bold text-[2.5vw] lXs:text-[1.5vw] uppercase">
                connect
              </p>
            ) : (
              <p className="text-indigo-500 font-bold text-[2.5vw] lXs:text-[1.5vw] uppercase">
                {!context.state._Profile &&
                  (context.state._domain
                    ? context.state._domain
                    : context.state._account.slice(0, 6))}
                {context.state._Profile && "Close"}
              </p>
            )}
          </button>
          {context.state._account != "" &&
            context.state._OffersReceived > 0 &&
            !context.state._Profile && (
              <div className="absolute left-3 tM:left-1 top-0 flex flex-col items-center justify-center w-3 h-3 tM:w-5 tM:h-5 rounded-full bg-purple-500 text-white font-bold text-[2vw] lXs:text-base">
                {context.state._OffersReceived}
              </div>
            )}
        </div>
      </>
    );
  };

  const InputResult = () => {
    return (
      <div className="w-[95vw] lXs:w-[60vw] mx-auto">
        {InputState[0] === 1 && (
          <div className="w-full flex flex-row bg-white rounded-xl p-[4vw] lXs:p-[2vw] items-center">
            <button
              onClick={() => {
                context.setState(
                  {
                    _Object: false,
                    _View: "floor",
                    _Viewed: "",
                  },
                  () => {
                    context.setState(
                      {
                        _Object: true,
                        _View: "token",
                        _Viewed: AddressState[0].domain.name,
                      },
                      () => {
                        InputState[1](0);
                      }
                    );
                  }
                );
              }}
              className="text-black text-[2.5vw] lXs:text-[1.5vw] px-[1.5vw] lXs:px-[1vw] whitespace-nowrap truncate w-full hover:bg-indigo-500 hover:text-white rounded-full text-left"
            >
              {AddressState[0].domain.name}
            </button>
            <button
              onClick={() => {
                context.setState(
                  {
                    _Object: false,
                    _View: "floor",
                    _Viewed: "",
                  },
                  () => {
                    context.setState(
                      {
                        _Object: true,
                        _View: "wallet",
                        _Viewed: AddressState[0].domain.owner,
                      },
                      () => {
                        InputState[1](0);
                      }
                    );
                  }
                );
              }}
              className="text-purple-500 font-bold text-[2.5vw] lXs:text-[1.5vw] px-[1.5vw] lXs:px-[1vw] whitespace-nowrap w-auto hover:bg-purple-500 hover:text-white rounded-full text-left mx-2"
            >
              {DomainState[0].reverseRecord &&
              DomainState[0].reverseRecord.domain.name
                ? DomainState[0].reverseRecord.domain.name
                : AddressState[0].domain.owner.slice(0, 16)}
            </button>
            <div className="ml-auto">
              {context.state._account != "" && (
                <Offers context={context} domain={AddressState[0].domain} />
              )}
              {context.state._account === "" && (
                <button
                  className="flex flex-row items-center justify-center rounded-full px-[1.5vw] lXs:px-[1vw] border-indigo-500 border-2"
                  onClick={() => {
                    requestBeaconConnection(
                      context.props.props.context.state._connected,
                      context
                    );
                  }}
                >
                  <p className="font-bold text-[2.5vw] lXs:text-[1.5vw] uppercase text-indigo-500">
                    Connect
                  </p>
                </button>
              )}
            </div>
          </div>
        )}
        {InputState[0] === 2 && (
          <div className="w-full flex flex-row bg-white rounded-xl p-[4vw] lXs:p-[2vw] items-center">
            <h1 className="text-black text-[2.5vw] lXs:text-[1.5vw] px-[1.5vw] lXs:px-[1vw]">
              This domain isn't registered yet
            </h1>
            <a
              href={"https://app.tezos.domains/domain/" + AddressState[0]}
              target="_blank"
              className="ml-auto border-indigo-500 border-2 flex flex-row items-center justify-center rounded-xl px-[1.5vw] lXs:px-[1vw]"
            >
              <p className="text-indigo-500 font-bold text-[2.5vw] lXs:text-[1.5vw] uppercase">
                Register
              </p>
            </a>
          </div>
        )}
        {InputState[0] === 3 && (
          <div className="w-full flex flex-row bg-white rounded-xl p-[4vw] lXs:p-[2vw]">
            <h1 className="text-black text-[2.5vw] lXs:text-[1.5vw]">
              Press ENTER to look for your query
            </h1>
          </div>
        )}
        {InputState[0] === 4 && (
          <div className="w-full flex flex-row bg-white rounded-xl p-[4vw] lXs:p-[2vw]">
            <h1 className="text-black text-[2.5vw] lXs:text-[1.5vw]">
              Looking for your query on Tezos blockchain
            </h1>
          </div>
        )}
      </div>
    );
  };

  const InputController = (e) => {
    e.target.addEventListener("keyup", (e2) => {
      if (e2.key == "Enter") {
        if (e.target.value != "" && e.target.value.length >= 3) {
          let tmp = e.target.value.split(".tez")[0];

          InputState[1](4);
          fetchDomain({
            lookFor: tmp.toLowerCase() + ".tez",
          }).then((e3) => {
            if (e3.data.domain === null) {
              InputState[1](2);
              AddressState[1](tmp + ".tez");
            }
            if (e3.data.domain !== null) {
              fetchAddress({
                lookFor: e3.data.domain.owner,
              }).then((e4) => {
                InputState[1](1);
                AddressState[1](e3.data);
                DomainState[1](e4.data);
              });
            }
          });
        }
      }
    });

    if (e.target.value === "" || e.target.value.length < 3) {
      InputState[1](0);
      AddressState[1]({});
    }

    if (e.target.value.length >= 3 && InputState[0] === 0) {
      InputState[1](3);
    }
  };

  return (
    <>
      <div className="w-[95vw] lXs:w-[60vw] flex flex-row left-0 top-0 py-2 mx-auto">
        <Title />
        <div className="w-full flex flex-row mx-[2vw]">
          <div className="w-full flex flex-row items-center justify-start rounded-xl">
            <img
              src="./icons/search.svg"
              className="w-[3vw] h-[3vw] lXs:w-[1.5vw] lXs:h-[1.5vw]"
            />
            <input
              ref={InputRef}
              className="text-white bg-transparent text-[2.5vw] lXs:text-[1.5vw] px-[1.5vw] lXs:px-[2vw]"
              placeholder="Search"
              onChange={InputController}
            />
          </div>
        </div>
        <ConnectButton />
      </div>
      <InputResult />

      <div className="w-[95vw] lXs:w-[60vw] flex flex-col mt-10 mx-auto">
        <div className="flex flex-row items-center px-2">
          <div className="flex flex-col">
            <h1 className="text-white text-[2.5vw] lXs:text-[1.5vw] font-bold leading-none">
              GM ANONS
            </h1>
            <div className="flex flex-row leading-none">
              <h1 className="text-indigo-500 font-bold uppercase text-[1.2vw]">
                Owners
              </h1>
              <h1 className="text-white font-bold text-[1.2vw] ml-1">
                {context.state._Collection && context.state._Collection.owners}
              </h1>
              <h1 className="text-purple-500 font-bold uppercase text-[1.2vw] ml-2">
                Supply
              </h1>
              <h1 className="text-white font-bold text-[1.2vw] ml-1">
                {context.state._Collection && context.state._Collection.items}
              </h1>
            </div>
          </div>
          {!context.state._Profile && !context.state._Object && (
            <>
              <button
                onClick={() => {
                  context.setState({
                    _View: "floor",
                  });
                }}
                className={
                  "ml-auto font-bold text-[2.5vw] lXs:text-[1.5vw] px-[1.5vw] lXs:px-[1vw] mb-2 border-indigo-500 border-2 " +
                  (context.state._View === "floor"
                    ? "text-white bg-indigo-500 rounded-full"
                    : "text-indigo-500 rounded-full")
                }
              >
                FLOOR
              </button>
              <button
                onClick={() => {
                  context.setState({
                    _View: "search",
                  });
                }}
                className={
                  "ml-2 font-bold text-[2.5vw] lXs:text-[1.5vw] px-[1.5vw] lXs:px-[1vw] mb-2 border-indigo-500 border-2 " +
                  (context.state._View === "search"
                    ? "text-white bg-indigo-500 rounded-full"
                    : "text-indigo-500 rounded-full")
                }
              >
                BULK SEARCH
              </button>
              {context.state._account === context.state._DigitCartel && (
                <>
                  <button
                    onClick={() => {
                      context.setState({
                        _View: "airdrop",
                      });
                    }}
                    className={
                      "ml-2 font-bold text-[2.5vw] lXs:text-[1.5vw] px-[1.5vw] lXs:px-[1vw] mb-2 border-indigo-500 border-2 " +
                      (context.state._View === "airdrop"
                        ? "text-white bg-indigo-500 rounded-full"
                        : "text-indigo-500 rounded-full")
                    }
                  >
                    AIRDROP
                  </button>
                </>
              )}
            </>
          )}
          {context.state._Profile && !context.state._Object && (
            <>
              <div className="ml-auto relative flex flex-row">
                <button
                  onClick={() => {
                    context.setState({
                      _View: "bids",
                    });
                  }}
                  className={
                    "ml-2 font-bold text-[2.5vw] lXs:text-[1.5vw] px-[1.5vw] lXs:px-[1vw] mb-2 border-indigo-500 border-2 " +
                    (context.state._View === "bids"
                      ? "text-white bg-indigo-500 rounded-full"
                      : "text-indigo-500 rounded-full")
                  }
                >
                  BIDS
                </button>
                {context.state._account != "" && context.state._Profile && (
                  <div className="absolute left-1 tM:left-0 top-0 flex flex-col items-center justify-center w-3 h-3 tM:w-5 tM:h-5 rounded-full bg-purple-500 text-white font-bold text-[2vw] lXs:text-base">
                    {context.state._OffersReceived}
                  </div>
                )}
              </div>
              <button
                onClick={() => {
                  context.setState({
                    _View: "listing",
                  });
                }}
                className={
                  "ml-2 font-bold text-[2.5vw] lXs:text-[1.5vw] px-[1.5vw] lXs:px-[1vw] mb-2 border-indigo-500 border-2 " +
                  (context.state._View === "listing"
                    ? "text-white bg-indigo-500 rounded-full"
                    : "text-indigo-500 rounded-full")
                }
              >
                LISTING
              </button>
              {context.props.props.context.state._connected == 1 && (
                <button
                  className="ml-2 border-2 border-purple-500 rounded-full px-[1.5vw] lXs:px-[1vw] mb-2"
                  onClick={() => {
                    if (context.props.props.context.state._connected == 1) {
                      requestBeaconDisconnection(
                        context.props.props.context.state._connected,
                        context
                      );
                    }
                  }}
                >
                  <p className="text-purple-500 font-bold text-[2.5vw] lXs:text-[1.5vw] uppercase">
                    Disconnect
                  </p>
                </button>
              )}
            </>
          )}
          {!context.state._Profile && context.state._Object && (
            <button
              className="ml-auto border-2 border-purple-500 rounded-full px-[1.5vw] lXs:px-[1vw] mb-2"
              onClick={() => {
                context.setState({
                  _Object: false,
                  _View: "floor",
                });
              }}
            >
              <p className="text-purple-500 font-bold text-[2.5vw] lXs:text-[1.5vw] uppercase">
                Back
              </p>
            </button>
          )}
        </div>
        {context.state._View === "floor" && <Activity context={context} />}
      </div>
    </>
  );
};
