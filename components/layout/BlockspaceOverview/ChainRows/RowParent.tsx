import { useTheme } from "next-themes";
import { useMemo, useCallback } from "react";
import { Icon } from "@iconify/react";
import { useRowContext } from "./RowContext";
import RowChildren from "./RowChildren";
import { RowParentInterface } from "./ContextInterface";
import { Tooltip, TooltipTrigger, TooltipContent } from "../../Tooltip";
import Link from "next/link";
import { useMaster } from "@/contexts/MasterContext";

export default function RowParent({ chainKey, index }) {
  const { theme } = useTheme();

  const { AllChainsByKeys } = useMaster();

  const {
    data,
    selectedMode,
    forceSelectedChain,
    isCategoryHovered,
    selectedChain,
    selectedTimespan,
    categories,
    allCats,
    setAllCats,
    unhoverCategory,
    hoverCategory,
  } = useRowContext() as RowParentInterface;

  const DisabledStates: {
    [mode: string]: {
      [chain: string]: {
        text: string;
        reason: string;
      };
    };
  } = {
    gas_fees_share_eth: {
      imx: {
        text: "No Gas Fees",
        reason: "IMX does not charge Gas Fees",
      },
    },
    gas_fees_share_usd: {
      imx: {
        text: "No Gas Fees",
        reason: "IMX does not charge Gas Fees",
      },
    },
    gas_fees_usd_absolute: {
      imx: {
        text: "No Gas Fees",
        reason: "IMX does not charge Gas Fees",
      },
    },
    gas_fees_eth_absolute: {
      imx: {
        text: "No Gas Fees",
        reason: "IMX does not charge Gas Fees",
      },
    },
  };

  const lightenHexColor = (color: string, percent: number) => {
    const num = parseInt(color.replace("#", ""), 16),
      amt = Math.round(2.55 * percent),
      R = (num >> 16) + amt,
      B = ((num >> 8) & 0x00ff) + amt,
      G = (num & 0x0000ff) + amt;

    return (
      "#" +
      (
        0x1000000 +
        (R < 255 ? (R < 1 ? 0 : R) : 255) * 0x10000 +
        (B < 255 ? (B < 1 ? 0 : B) : 255) * 0x100 +
        (G < 255 ? (G < 1 ? 0 : G) : 255)
      )
        .toString(16)
        .slice(1)
    );
  };

  return (
    <div key={index} className="w-full h-full relative">
      {DisabledStates[selectedMode] &&
      DisabledStates[selectedMode][chainKey] ? (
        <>
          <div
            className={`flex flex-row flex-grow h-full pl-[2px] items-center rounded-full text-xs font-medium text-white dark:text-[#CDD8D3]`}
            style={{
              backgroundColor: lightenHexColor(
                AllChainsByKeys[chainKey].colors[theme ?? "dark"][1],
                50,
              ),
              boxShadow: `0px 0px 0px 2px ${
                AllChainsByKeys[chainKey].colors[theme ?? "dark"][1]
              } inset`,
              // borderWidth: "2px",
              // boxSizing: "border-box",
            }}
          >
            <div className="flex items-center h-[31px] w-[155px] gap-x-[15px] pl-[3px] min-w-[155px] z-10 rounded-full bg-[#1F2726]">
              <div
                className="flex justify-center items-center w-[30px] h-full z-20 "
                style={{
                  color: AllChainsByKeys[chainKey].colors["dark"][0],
                }}
              >
                <Icon
                  icon={`gtp:${chainKey}-logo-monochrome`}
                  className="w-[15px] h-[15px]"
                />
              </div>
              <Link
                href={`/chains/${AllChainsByKeys[chainKey].urlKey}/`}
                className="hover:underline"
              >
                {AllChainsByKeys[chainKey].label}
              </Link>
            </div>
            {/* Additional content */}

            <div className="flex flex-col w-full justify-center items-center px-4 h-[35px] z-10">
              <div className="flex flex-row w-full justify-center items-center text-sm">
                {DisabledStates[selectedMode][chainKey].text}
                <Tooltip placement="right" allowInteract>
                  <TooltipTrigger>
                    <div className="p-1 z-10 mr-0 md:-mr-0.5">
                      <Icon icon="feather:info" className="w-4 h-4" />
                    </div>
                  </TooltipTrigger>
                  <TooltipContent className="z-50 flex items-center justify-center pr-[3px]">
                    <div className="px-3 text-sm font-medium bg-forest-100 dark:bg-[#4B5553] text-forest-900 dark:text-forest-100 rounded-xl shadow-lg z-50 w-autow-[420px] h-[80px] flex items-center">
                      {DisabledStates[selectedMode][chainKey].reason}
                    </div>
                  </TooltipContent>
                </Tooltip>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div
          className={`flex flex-row flex-grow h-full pl-[2px] items-center rounded-full text-xs font-medium ${
            AllChainsByKeys[chainKey].darkTextOnBackground === true
              ? "text-white dark:text-black"
              : "text-white"
          }`}
          style={{
            backgroundColor:
              AllChainsByKeys[chainKey].colors[theme ?? "dark"][1],
          }}
        >
          <div
            className={`flex items-center h-[31px] pl-[3px] w-[155px] gap-x-[15px] min-w-[155px] rounded-full bg-[#1F2726] text-[#CDD8D3] ${
              forceSelectedChain
                ? isCategoryHovered("all_chain")
                  ? isCategoryHovered("all_chain") && allCats
                    ? `rounded-l-full py-[25px] -my-[5px] z-[2] shadow-lg`
                    : `rounded-l-full py-[24px] -my-[5px] z-[2] shadow-lg`
                  : allCats
                  ? `rounded-l-full py-[25px] -my-[5px] z-[2] shadow-lg`
                  : "z-1"
                : ""
            }  ${
              forceSelectedChain
                ? "hover:cursor-pointer"
                : "hover:cursor-default"
            } `}
            style={{
              backgroundColor: forceSelectedChain
                ? isCategoryHovered("all_chain")
                  ? isCategoryHovered("all_chain") && allCats
                    ? AllChainsByKeys[chainKey].colors[theme ?? "dark"][1]
                    : AllChainsByKeys[chainKey].colors[theme ?? "dark"][1]
                  : allCats
                  ? AllChainsByKeys[chainKey].colors[theme ?? "dark"][1]
                  : ""
                : "",
            }}
            onMouseEnter={() => {
              // setIsCategoryHovered((prev) => ({
              //   ...prev,
              //   ["all_chain"]: true,
              // }));
              hoverCategory("all_chain");
            }}
            onMouseLeave={() => {
              // setIsCategoryHovered((prev) => ({
              //   ...prev,
              //   ["all_chain"]: false,
              // }));
              unhoverCategory("all_chain");
            }}
            onClick={() => {
              if (forceSelectedChain) {
                setAllCats(!allCats);
              }
            }}
          >
            <div
              className="flex justify-center items-center w-[30px]  h-full"
              style={{
                color: AllChainsByKeys[chainKey].colors["dark"][0],
              }}
            >
              <Icon
                icon={`gtp:${chainKey.replace("_", "-")}-logo-monochrome`}
                className="w-[15px] h-[15px]"
              />
            </div>
            <Link
              href={`/chains/${AllChainsByKeys[chainKey].urlKey}/`}
              className="hover:underline"
            >
              {AllChainsByKeys[chainKey].label}
            </Link>
          </div>
          <div className="flex w-full items-center max-h-[35px] pr-[2px]  py-[2px] relative">
            {/*Children */}
            {Object.keys(categories).map((categoryKey, i) => {
              const rawChainCategories = Object.keys(
                data[chainKey].overview[selectedTimespan],
              );

              const chainCategories = Object.keys(categories).filter((x) =>
                rawChainCategories.includes(x),
              );

              const categoryIndex = chainCategories.indexOf(categoryKey);

              return (
                <RowChildren
                  key={`${chainKey}-${categoryKey}`}
                  chainKey={chainKey}
                  categoryKey={categoryKey}
                  i={i}
                  categoryIndex={categoryIndex}
                  chainCategories={chainCategories}
                />
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
