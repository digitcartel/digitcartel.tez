import { requestBeaconConnection } from "../service/Connector/request";
import { useRef, useState } from "react";
import { fetchDomain } from "../service/TezosDomains/request";

export const Navbar = ({ context }) => {
  const InputRef = useRef();
  const InputState = useState(0);
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
      <button
        className="ml-4 border-2 border-indigo-500 rounded-full px-[1.5vw] lXs:px-[1vw]"
        onClick={() => {
          requestBeaconConnection(
            context.props.props.context.state._connected,
            context
          );
        }}
      >
        {context.props.props.context.state._connected == 2 ? (
          <p className="text-indigo-500 font-bold text-[2.5vw] lXs:text-[1.5vw] uppercase">
            connect
          </p>
        ) : (
          <p className="text-indigo-500 font-bold text-[2.5vw] lXs:text-[1.5vw] uppercase">
            {context.state._account.slice(0, 6)}
          </p>
        )}
      </button>
    );
  };

  const InputResult = () => {
    return (
      <div className="w-[95vw] lXs:w-[60vw] mx-auto">
        {InputState[0] === 1 && (
          <div className="w-full flex flex-row bg-white rounded-xl p-[4vw] lXs:p-[2vw] items-center">
            <div className="w-[3vw] h-[3vw] bg-black border-indigo-500 border-8 rounded-full" />
            <h1 className="text-black text-[2.5vw] lXs:text-[1.5vw] px-[1.5vw] lXs:px-[1vw]">
              {DomainState[0].domain.name}
            </h1>
            <h1 className="text-black text-[2.5vw] lXs:text-[1.5vw] px-[1.5vw] lXs:px-[1vw] truncate">
              {DomainState[0].domain.owner.slice(0, 16)}
            </h1>
            <a
              href={
                "https://app.tezos.domains/domain/" + DomainState[0].domain.name
              }
              target="_blank"
              className="ml-auto border-indigo-500 text-black border-2 flex flex-row items-center justify-center rounded-xl px-[1.5vw] lXs:px-[1vw]"
            >
              <p className="text-indigo-500 font-bold text-[2.5vw] lXs:text-[1.5vw] uppercase">
                VIEW
              </p>
            </a>
          </div>
        )}
        {InputState[0] === 2 && (
          <div className="w-full flex flex-row bg-white rounded-xl p-[4vw] lXs:p-[2vw] items-center">
            <h1 className="text-black text-[2.5vw] lXs:text-[1.5vw] px-[1.5vw] lXs:px-[1vw]">
              context domain isn't registered yet
            </h1>
            <a
              href={"https://app.tezos.domains/domain/" + DomainState[0]}
              target="_blank"
              className="ml-auto border-indigo-500 border-2 flex flex-row items-center justify-center rounded-xl px-[1.5vw] lXs:px-[1vw]"
            >
              <p className="text-indigo-500 font-bold text-[2.5vw] lXs:text-[1.5vw] uppercase">
                VIEW
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
          InputState[1](4);
          fetchDomain({
            lookFor: e.target.value.toLowerCase() + ".tez",
          }).then((e3) => {
            console.log(e3);
            if (e3.data.domain === null) {
              InputState[1](2);
              DomainState[1](e.target.value + ".tez");
            }
            if (e3.data.domain !== null) {
              InputState[1](1);
              DomainState[1](e3.data);
            }
          });
        }
      }
    });

    if (e.target.value === "" || e.target.value.length < 3) {
      InputState[1](0);
      DomainState[1]({});
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
          <h1 className="text-white text-[2.5vw] lXs:text-[1.5vw] font-bold">
            GM ANONS
          </h1>
          <button
            onClick={() => {
              context.setState({
                _View: context.state._View === "offers" ? "floor" : "offers",
              });
            }}
            className={
              "ml-auto font-bold text-[2.5vw] lXs:text-[1.5vw] px-[1.5vw] lXs:px-[1vw] mb-2 border-indigo-500 border-2 " +
              (context.state._View === "offers"
                ? "text-white bg-indigo-500 rounded-full"
                : "text-indigo-500 rounded-full")
            }
          >
            FLOOR
          </button>
          <button
            onClick={() => {
              context.setState({
                _View: context.state._View === "offers" ? "floor" : "offers",
              });
            }}
            className={
              "ml-2 font-bold text-[2.5vw] lXs:text-[1.5vw] px-[1.5vw] lXs:px-[1vw] mb-2 border-indigo-500 border-2 " +
              (context.state._View === "offers"
                ? "text-white bg-indigo-500 rounded-full"
                : "text-indigo-500 rounded-full")
            }
          >
            OFFERS
          </button>
          <button
            onClick={() => {
              context.setState({
                _View: context.state._View === "search" ? "floor" : "search",
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
        </div>
      </div>
    </>
  );
};
