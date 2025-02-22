import React from "react";
import { RxMagnifyingGlass } from "react-icons/rx";

function SearchBar({ onChange }) {
  return (
    <React.Fragment>
      <RxMagnifyingGlass size={18} className="text-slate-500 ml-2" />
      <input
        placeholder="Search users..."
        className="outline-none bg-transparent border-none text-[12px] md:text-sm text-black placeholder-slate-500 py-3 px-2"
        onChange={(e) => onChange(e)}
      />
    </React.Fragment>
  );
}

export default SearchBar;
