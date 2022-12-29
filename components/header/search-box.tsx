import CloseIcon from "@icons/close";
import SearchIcon from "@icons/search";

interface SearchBoxProps {
  register?: any;
}

const SearchBox = ({}: SearchBoxProps) => {
  return (
    <div className="flex flex-col relative">
      <label
        htmlFor="search-box"
        className="w-80 border-[1px] border-main rounded-xl flex flex-row group focus:outline-none"
      >
        <input
          id="search-box"
          className="w-full flex-1 rounded-xl ml-3 focus:outline-none"
          type="text"
          placeholder="검색어를 입력해주세요."
        />
        <div className="m-2">
          <SearchIcon />
        </div>
      </label>
      <div className="hidden group-active:block bg-white border-[1px] border-main border-t-white rounded-b-xl py-3 w-80 absolute ">
        <div className="flex justify-between px-3 py-2">
          <h3 className="text-sm">최근 검색어</h3>
          <p className="text-xs cursor-pointer">전체삭제</p>
        </div>
        <div className="recently px-5  text-sm text-notice border-b-[1px] border-gray w-[95%] m-auto">
          {[0, 1, 2, 3].map((item, index) => {
            return (
              <div className="flex items-center justify-between">
                <div key={index}>
                  <p className="py-2">{item}</p>
                </div>
                <div>
                  <CloseIcon />
                </div>
              </div>
            );
          })}
        </div>
        <div className="topic">
          <h3 className="p-3 text-sm">급상승 검색어</h3>
          <div className="columns-2  m-auto">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item, index) => {
              return (
                <div key={index} className=" px-5 text-sm py-1 ">
                  <p>
                    <span className="text-main font-bold mx-4">
                      {index + 1}
                    </span>
                    박재현 짱짱
                  </p>
                  <div
                    className={`border-b-[1px] border-gray py-1 ${
                      index === 4 || index === 9 ? "hidden" : ""
                    }`}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchBox;
