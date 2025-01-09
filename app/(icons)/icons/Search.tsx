"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Icon from "@/components/layout/Icon";
import { iconNames } from "@/icons/gtp-icon-names";

const SearchIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g clipPath="url(#clip0_6590_27443)">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M17.6 8.8C17.6 13.6601 13.6601 17.6 8.8 17.6C3.93989 17.6 0 13.6601 0 8.8C0 3.93989 3.93989 0 8.8 0C13.6601 0 17.6 3.93989 17.6 8.8ZM8.8 15.2C12.3346 15.2 15.2 12.3346 15.2 8.8C15.2 5.26538 12.3346 2.4 8.8 2.4C5.26538 2.4 2.4 5.26538 2.4 8.8C2.4 12.3346 5.26538 15.2 8.8 15.2Z"
        fill="url(#paint0_linear_6590_27443)"
      />
      <circle
        cx="8.75"
        cy="8.75"
        r="5.75"
        fill="url(#paint1_linear_6590_27443)"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M23.1638 23.2927C22.7733 23.6833 22.1401 23.6833 21.7496 23.2927L13.707 15.2501C13.3164 14.8596 13.3164 14.2264 13.707 13.8359L13.8359 13.707C14.2264 13.3164 14.8596 13.3164 15.2501 13.707L23.2927 21.7496C23.6833 22.1401 23.6833 22.7733 23.2927 23.1638L23.1638 23.2927Z"
        fill="url(#paint2_linear_6590_27443)"
      />
    </g>
    <defs>
      <linearGradient
        id="paint0_linear_6590_27443"
        x1="8.8"
        y1="0"
        x2="20.6644"
        y2="16.6802"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#FE5468" />
        <stop offset="1" stopColor="#FFDF27" />
      </linearGradient>
      <linearGradient
        id="paint1_linear_6590_27443"
        x1="8.75"
        y1="14.5"
        x2="8.75"
        y2="3"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#10808C" />
        <stop offset="1" stopColor="#1DF7EF" />
      </linearGradient>
      <linearGradient
        id="paint2_linear_6590_27443"
        x1="18.4998"
        y1="13.4141"
        x2="25.3567"
        y2="23.054"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#FE5468" />
        <stop offset="1" stopColor="#FFDF27" />
      </linearGradient>
      <clipPath id="clip0_6590_27443">
        <rect width="24" height="24" fill="white" />
      </clipPath>
    </defs>
  </svg>
);

export default function IconsSearch() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");

  // Ref to control focus
  const inputRef = useRef<HTMLInputElement>(null);

  // Automatically focus input when search expands
  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
    }
  }, [isOpen]);

  // Function to highlight the matched substring
  const boldSearch = useCallback(
    (text: string) => {
      const searchLower = search.toLowerCase();
      const textLower = text.toLowerCase();
      const index = textLower.indexOf(searchLower);

      if (!search || index === -1) return text; // no highlight if no search
      return (
        <>
          {text.substring(0, index)}
          <span className="font-bold underline">
            {text.substring(index, index + search.length)}
          </span>
          {text.substring(index + search.length)}
        </>
      );
    },
    [search],
  );

  // Filter icon suggestions based on search
  const suggestions = useMemo(() => {
    if (!search) return [];

    return iconNames
      .filter((name) => name.toLowerCase().includes(search.toLowerCase()))
      .sort(); // or any sorting you prefer
  }, [search]);

  return (
    <div className="relative w-full max-w-[400px] mx-auto">
      {/* Semi-transparent backdrop when open */}
      <div
        className="fixed inset-0 bg-black/10 z-0"
        onClick={() => setIsOpen(false)}
        style={{
          opacity: isOpen ? 0.5 : 0,
          pointerEvents: isOpen ? "auto" : "none",
        }}
      />
      {/* Search bar container */}
      <div
        className={`
          relative 
          transition-all 
          duration-300 
          ${isOpen ? "z-10" : ""} 
        `}
        onClick={() => setIsOpen(true)}
      >
        {/* The background & shape of the search input */}
        <div
          className="
            absolute 
            inset-0 
            bg-[#1F2726] 
            rounded-[22px]
            min-h-[44px]
          "
        />
        <div className="relative flex items-center min-h-[44px] rounded-[22px] z-[2]">
          {/* Search  icon */}
          <div className="flex items-center justify-center w-[42px] h-[44px]">
            {isOpen ? (
              <Icon icon="feather:chevron-down" className="w-[16px] h-[16px]" />
            ) : (
              <SearchIcon />
            )}
          </div>

          {/* Text input */}
          <input
            ref={inputRef}
            className={`
              flex-1
              bg-transparent
              text-white
              placeholder-[#CDD8D3]
              border-none
              outline-none
            `}
            placeholder="Search icons..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyUp={(e) => {
              if (e.key === "Enter") {
                console.log(`Search for: ${search}`);
              }
            }}
          />
        </div>

        {/* Suggestions box */}
        <div
          className={`
            absolute 
            left-0 
            right-0
            top-[calc(100%+5px)]
            bg-[#151A19]
            rounded-b-[10px]
            transition-all
            duration-300
            overflow-hidden
            shadow-[0px_0px_50px_0px_#000000]
            ${isOpen ? "max-h-[300px] p-[8px]" : "max-h-0 p-0"}
          `}
        >
          <div className="flex flex-col gap-y-[5px] text-[14px] text-white">
            {suggestions.slice(0, 15).map((iconName) => (
              <div
                key={iconName}
                className="
                  cursor-pointer
                  hover:bg-[#344240]
                  rounded-[5px]
                  px-[8px]
                  py-[5px]
                  transition-colors
                  duration-200
                "
                onClick={() => {
                  setSearch(iconName);
                  setIsOpen(false);
                }}
              >
                {boldSearch(iconName)}
              </div>
            ))}
            {isOpen && search && suggestions.length === 0 && (
              <div className="px-[8px] py-[5px] text-[#CDD8D3]">
                No matches found.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
