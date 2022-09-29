export const Header = ({ _FILTER }) => {
  return (
    <div className="w-full bg-white border-indigo-500 border-2 bg-opacity-10 flex flex-row rounded-t-xl p-[2vw] lXs:p-[1vw] items-center  flex-nowrap overflow-x-auto">
      {_FILTER.List.map((e, i) => {
        return (
          <button
            key={i + "_FILTER"}
            className="ml-2 border-indigo-500 border-2 flex flex-row items-center justify-center rounded-full px-[1.5vw] lXs:px-[1vw]"
            onClick={() => {
              if (!_FILTER.UpdateReq[0]) {
                _FILTER.Loading[1](true);
                _FILTER.UpdateReq[1](true);
                _FILTER.Base[1](e);
              }
            }}
          >
            <p className="text-indigo-500 font-bold text-[2.5vw] lXs:text-[1.5vw] uppercase">
              {e.name}
            </p>
          </button>
        );
      })}
    </div>
  );
};
