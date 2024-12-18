"use client";

import Checkbox from "@mui/material/Checkbox";
import Slider from "@mui/material/Slider";
import clsx from "clsx";
import { CopyIcon, RefreshCwIcon } from "lucide-react";
import Link from "next/link";
import { ChangeEvent, useState } from "react";
import { toast } from "sonner";

type PasswordOptions = {
  useUppercase: boolean;
  useLowercase: boolean;
  useNumbers: boolean;
  useSymbols: boolean;
};

export default function Home() {
  const [ passwordLength, setPasswordLength ] = useState(12);
  const [ options, setOptions ] = useState({
    useUppercase: true,
    useLowercase: true,
    useNumbers: true,
    useSymbols: true,
  });

  const getRandomChar = (array: string[]) => {
    return array[Math.floor(Math.random() * array.length)];
  };

  const shuffleArray = (array: string[]) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };
  
  const generatePassword = (length: number, selectedOptions: PasswordOptions) => {
    const upperCase = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
    const lowerCase = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
    const numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
    const symbols = ["!", "@", "#", "$", "%", "^", "&", "*", "(", ")", "-", "_", "=", "+", "[", "]", "{", "}", ";", ":", "'", "\"", ",", ".", "<", ">", "/", "?", "\\", "|", "~", "`"];

    let charPool: string[] = [];
    const passwordList: string[] = [];

    // Build character pool
    if (selectedOptions.useUppercase) {
      charPool = charPool.concat(upperCase);
      passwordList.push(getRandomChar(upperCase));
    }

    if (selectedOptions.useLowercase) {
      charPool = charPool.concat(lowerCase);
      passwordList.push(getRandomChar(lowerCase));
    }

    if (selectedOptions.useNumbers) {
      charPool = charPool.concat(numbers);
      passwordList.push(getRandomChar(numbers));
    }

    if (selectedOptions.useSymbols) {
      charPool = charPool.concat(symbols);
      passwordList.push(getRandomChar(symbols));
    }

    while (passwordList.length < length) {
      passwordList.push(getRandomChar(charPool));
    }

    return shuffleArray(passwordList).join("").substring(0, length);
  };

  const [ password, setPassword ] = useState(generatePassword(12, {
    useUppercase: true,
    useLowercase: true,
    useNumbers: true,
    useSymbols: true,
  }));

  const refreshPassword = (length: number, selectedOptions: PasswordOptions) => {
    setPassword(generatePassword(length, selectedOptions));
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(password)
      .then(() => {
        toast.success("Password copied to clipboard!")
      })
      .catch(() => {
        toast.error("Failed to copy the password.");
      });
  };

  return (
    <div className="px-9 py-6 bg-light-gray min-h-screen h-full w-full font-[family-name:var(--font-geist-sans)]">
      <div className="w-full h-full flex flex-col gap-6 max-w-[800px] mx-auto">
        <div className="text-xl md:text-2xl font-semibold text-center">
          Secure Your Digital Life with Strong Passwords
        </div>
        <div className="text-lg md:text-xl text-center">
          Generate unique, secure passwords instantly to keep your accounts safe and protected.
        </div>
        <div className="flex flex-col gap-3">
          <div className="flex flex-col bg-white h-24 w-full shadow-md rounded-t-lg overflow-hidden">
            <div className="flex-grow w-full p-6">
              <div className="flex gap-2 items-center w-full h-full">
                <input className="w-[100px] flex-grow text-xl font-semibold text-gray-600 h-8 focus-visible:outline-none" value={password} readOnly />
                <div className="h-8 w-8 relative group inline-block">
                  <CopyIcon className="h-8 w-8 text-gray-500 hover:text-gray-700 cursor-pointer" strokeWidth={2} onClick={copyToClipboard}/>
                  <span className="absolute left-1/2 -translate-x-1/2 mt-2 w-max px-2 py-1 text-sm text-white bg-gray-800 rounded-md opacity-0 group-hover:opacity-100 transition">Copy</span>
                </div>
                <div className="h-8 w-8 relative group inline-block">
                  <RefreshCwIcon className="h-8 w-8 text-gray-500 hover:text-gray-700 cursor-pointer" strokeWidth={2} onClick={() => { refreshPassword(passwordLength, options); }} />
                  <span className="absolute left-1/2 -translate-x-1/2 mt-2 w-max px-2 py-1 text-sm text-white bg-gray-800 rounded-md opacity-0 group-hover:opacity-100 transition">Refresh</span>
                </div>
              </div>
            </div>
            <div className="bg-null-gray h-3 w-full">
              <div className={clsx("h-full", passwordLength > 10 ? "bg-[#006B4D] w-[100%]" : passwordLength > 8 ? "bg-[#00A878] w-[75%]" : passwordLength > 6 ? "bg-[#EFC20F] w-[50%]" : passwordLength > 3 ? "bg-[#DF6661] w-[25%]" : null)}></div>
            </div>
          </div>
          <div className="flex flex-col gap-3 p-6 bg-white h-maz w-full shadow-md rounded-b-lg overflow-hidden">
            <div className="font-semibold text-xl md:text-2xl text-center border-b-2 border-light-gray">
              Customize your password
            </div>
            <div>
              <div className="flex flex-col gap-3 pb-3">
                <div>Password Length</div>
                <div className="flex gap-3 items-center">
                  <input 
                    type="number" 
                    min={1} 
                    max={50} 
                    value={passwordLength}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                      const newLength = Number(e.target.value)
                      
                      if (newLength < 1) {
                        setPasswordLength(1)
                      } else if (newLength > 50) {
                        setPasswordLength(50)
                      } else {
                        setPasswordLength(newLength)
                      }

                      refreshPassword(newLength, options);
                    }}
                    className="border-2 border-light-gray px-3 py-2 w-[68px] rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-main/50"
                  />
                  <Slider 
                    value={passwordLength}
                    min={1}
                    max={50}
                    className="mx-3"
                    onChange={(e, value) => {
                      const newLength = Number(value);
                      setPasswordLength(newLength)
                      refreshPassword(newLength, options);
                    }}
                  />
                </div>
              </div>
              <div className="flex flex-wrap gap-3">
                <div className="flex items-center">
                  <Checkbox 
                    checked={options.useUppercase}
                    onChange={() => {
                      const newValue = !options.useUppercase;

                      setOptions({
                        ...options,
                        useUppercase: newValue
                      });

                      refreshPassword(passwordLength, {
                        ...options,
                        useUppercase: newValue
                      });
                    }}
                  />
                  <div>Uppercase</div>
                </div>
                <div className="flex items-center">
                  <Checkbox 
                    checked={options.useLowercase}
                    onChange={() => {
                      const newValue = !options.useLowercase;

                      setOptions({
                        ...options,
                        useLowercase: newValue
                      });

                      refreshPassword(passwordLength, {
                        ...options,
                        useLowercase: newValue
                      });
                    }}
                  />
                  <div>Lowercase</div>
                </div>
                <div className="flex items-center">
                  <Checkbox 
                    checked={options.useNumbers}
                    onChange={() => {
                      const newValue = !options.useNumbers;

                      setOptions({
                        ...options,
                        useNumbers: newValue
                      });

                      refreshPassword(passwordLength, {
                        ...options,
                        useNumbers: newValue
                      });
                    }}
                  />
                  <div>Numbers</div>
                </div>
                <div className="flex items-center">
                  <Checkbox 
                    checked={options.useSymbols}
                    onChange={() => {
                      const newValue = !options.useSymbols;

                      setOptions({
                        ...options,
                        useSymbols: newValue
                      });

                      refreshPassword(passwordLength, {
                        ...options,
                        useSymbols: newValue
                      });
                    }}
                  />
                  <div>Symbols</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex place-content-center">
          <button className="bg-brand-main hover:bg-brand-hover px-4 py-3 rounded-lg text-white text-lg md:text-xl" onClick={copyToClipboard}>
            Copy Password
          </button>
        </div>
        <div className="text-center">
          <div className="text-center font-semibold">
            Demo Site Made by Sabrina Powell
          </div>
          <div className="text-center text-brand-main">
            Connect with me on <span className="underline italic"><Link href="https://www.linkedin.com/in/sabrina-p-15a43a1b4/" target="_blank" rel="noopener noreferrer">LinkedIn</Link></span>
          </div>
        </div>
      </div>
    </div>
  );
}
