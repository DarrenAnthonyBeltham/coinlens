"use client";

import { useState, useRef } from "react";
import { useOnClickOutside } from "@/hooks/useOnClickOutside";

type Option = {
  id: string;
  name: string;
  current_price: number;
};

type CustomDropdownProps = {
  options: Option[];
  value: Option;
  onChange: (option: Option) => void;
};

export default function CustomDropdown({ options, value, onChange }: CustomDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  useOnClickOutside(dropdownRef as any, () => setIsOpen(false));

  const handleSelect = (option: Option) => {
    onChange(option);
    setIsOpen(false);
  };

  const formElementStyle = "w-full h-14 px-4 py-3 bg-slate-800/50 border border-slate-700/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg text-white";

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`${formElementStyle} text-left flex justify-between items-center`}
      >
        <span>{value.name}</span>
        <svg className={`w-5 h-5 text-slate-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
      </button>

      {isOpen && (
        <div className="absolute top-full mt-2 w-full max-h-60 overflow-y-auto bg-slate-900 border border-slate-700/50 rounded-lg z-20 custom-scrollbar">
          <ul>
            {options.map((option) => (
              <li
                key={option.id}
                onClick={() => handleSelect(option)}
                className="px-4 py-3 text-white hover:bg-slate-800 cursor-pointer"
              >
                {option.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}