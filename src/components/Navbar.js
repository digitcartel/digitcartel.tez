import { useRef, useState } from "react";

const getDomain = async (domain) => {
  let DomainData = await fetch("https://api.tezos.domains/graphql", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      query: `{
        domain(name:"${domain}.tez"){
          id
          owner
          name
        }
      }`,
    }),
  });

  DomainData = await DomainData.json();
  if (DomainData.data) {
    return DomainData.data;
  }
};

export const Navbar = ({ context }) => {
  const InputRef = useRef();
  const InputState = useState(0);
  const DomainState = useState({});

  return (
    <>
      <div className="w-full flex flex-row p-[4vw] lXs:p-[2vw]">
        <div className="w-6/12 flex flex-row">
          <div className="bg-indigo-500 flex flex-row items-center justify-center rounded-full px-[1.5vw] lXs:px-[1vw]">
            <a className="text-white text-[2.5vw] lXs:text-[1.5vw]" href="/">
              DIGITCARTEL
            </a>
          </div>
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
                onChange={(e) => {
                  e.target.addEventListener("keyup", (e2) => {
                    if (e2.key == "Enter") {
                      if (e.target.value != "" && e.target.value.length >= 3) {
                        InputState[1](4);
                        getDomain(e.target.value.toLowerCase()).then((e3) => {
                          if (e3.domain === null) {
                            InputState[1](2);
                            DomainState[1](e.target.value + ".tez");
                          }
                          if (e3.domain !== null) {
                            InputState[1](1);
                            DomainState[1](e3);
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
                }}
              />
            </div>
          </div>
        </div>
        <div className="w-full flex flex-row justify-end">
          <button
            className="flex flex-row items-center justify-center border-2 border-indigo-500 rounded-full px-[1.5vw] lXs:px-[1vw]"
            onClick={() => {
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

              if (context.props.props.context.state._connected == 1) {
                context.fetchListing({ less: false, more: false, hash: 0 });
                context.setState(
                  {
                    _Profile: !context.state._Profile,
                    _listingView: false,
                    _transferView: false,
                    _operatorView: false,
                    _Selected: false,
                    _Selector: [],
                    _SelectOwned: [],
                    _SelectOperator: [],
                    _SelectList: [],
                    _batchTxInput: "",
                  },
                  () => {
                    context.state._Profile
                      ? context.setState({
                          _listingView: true,
                        })
                      : null;
                  }
                );
              }
            }}
          >
            {context.props.props.context.state._connected == 2 ? (
              <p className="text-white text-[2.5vw] lXs:text-[1.5vw] uppercase">
                connect
              </p>
            ) : context.props.props.context.state._connected == 1 ? (
              context.state._Profile ? (
                <p className="text-white text-[2.5vw] lXs:text-[1.5vw] uppercase">
                  close
                </p>
              ) : (
                <p className="text-white text-[2.5vw] lXs:text-[1.5vw] uppercase">
                  {context.state._accountDomain ||
                    context.state._account.slice(0, 6)}
                </p>
              )
            ) : (
              <p className="text-white text-[2.5vw] lXs:text-[1.5vw] uppercase">
                error
              </p>
            )}
          </button>
        </div>
      </div>
      {InputState[0] === 1 && (
        <div className="w-full px-[4vw] lXs:px-[2vw]">
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
        </div>
      )}
      {InputState[0] === 2 && (
        <div className="w-full px-[4vw] lXs:px-[2vw]">
          <div className="w-full flex flex-row bg-white rounded-xl p-[4vw] lXs:p-[2vw] items-center">
            <h1 className="text-black text-[2.5vw] lXs:text-[1.5vw] px-[1.5vw] lXs:px-[1vw]">
              This domain isn't registered yet
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
        </div>
      )}
      {InputState[0] === 3 && (
        <div className="w-full px-[4vw] lXs:px-[2vw]">
          <div className="w-full flex flex-row bg-white rounded-xl p-[4vw] lXs:p-[2vw]">
            <h1 className="text-black text-[2.5vw] lXs:text-[1.5vw]">
              Press ENTER to look for your query
            </h1>
          </div>
        </div>
      )}
      {InputState[0] === 4 && (
        <div className="w-full px-[4vw] lXs:px-[2vw]">
          <div className="w-full flex flex-row bg-white rounded-xl p-[4vw] lXs:p-[2vw]">
            <h1 className="text-black text-[2.5vw] lXs:text-[1.5vw]">
              Looking for your query on Tezos blockchain
            </h1>
          </div>
        </div>
      )}
    </>
  );
};
