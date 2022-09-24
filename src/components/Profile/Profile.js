import { Transfer } from "../Pages/Transfer";
import { Reverse } from "../Pages/Reverse";
import { Listing } from "../Pages/Listing";

export const Profile = ({ context }) => {
  return (
    <>
      {context.state._Profile && (
        <>
          <div className=" bg-white rounded-xl my-2 p-[1.5vw] mt-2">
            <button
              onClick={() => {
                context.setState(
                  {
                    _listingView: !context.state._listingView,
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
                    if (context.state._listingView) {
                      context.fetchListing({
                        less: false,
                        more: false,
                        hash: 0,
                      });
                    }
                  }
                );
              }}
              className={
                "font-bold text-[2.5vw] lXs:text-[1.5vw] px-[1.5vw] lXs:px-[1vw] " +
                (context.state._listingView
                  ? "text-white bg-indigo-500 rounded-full mr-2"
                  : "text-indigo-500 border-indigo-500 border-2 rounded-full mr-2")
              }
            >
              LISTING
            </button>
            <button
              onClick={() => {
                context.setState(
                  {
                    _transferView: !context.state._transferView,
                    _listingView: false,
                    _operatorView: false,
                    _Selected: false,
                    _Selector: [],
                    _SelectOwned: [],
                    _SelectOperator: [],
                    _SelectList: [],
                    _batchTxInput: "",
                  },
                  () => {
                    if (context.state._transferView) {
                      context.fetchOwned({
                        less: false,
                        more: false,
                        hash: 0,
                      });
                    }
                  }
                );
              }}
              className={
                "font-bold text-[2.5vw] lXs:text-[1.5vw] px-[1.5vw] lXs:px-[1vw] " +
                (context.state._transferView
                  ? "text-white bg-indigo-500 rounded-full mr-2"
                  : "text-indigo-500 border-indigo-500 border-2 rounded-full mr-2")
              }
            >
              TRANSFER
            </button>
            <button
              onClick={() => {
                context.setState(
                  {
                    _operatorView: !context.state._operatorView,
                    _listingView: false,
                    _transferView: false,
                    _Selected: false,
                    _Selector: [],
                    _SelectOwned: [],
                    _SelectOperator: [],
                    _SelectList: [],
                    _batchTxInput: "",
                  },
                  () => {
                    if (context.state._operatorView) {
                      context.fetchOperator({
                        less: false,
                        more: false,
                        hash: 0,
                      });
                    }
                  }
                );
              }}
              className={
                "font-bold text-[2.5vw] lXs:text-[1.5vw] px-[1.5vw] lXs:px-[1vw] " +
                (context.state._operatorView
                  ? "text-white bg-indigo-500 rounded-full mr-2"
                  : "text-indigo-500 border-indigo-500 border-2 rounded-full mr-2")
              }
            >
              REVERSE
            </button>
          </div>
          {context.state._transferView && <Transfer context={context} />}
          {context.state._operatorView && <Reverse context={context} />}
          {context.state._listingView && <Listing context={context} />}
        </>
      )}
    </>
  );
};
