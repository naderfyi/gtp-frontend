"use client";
import Image from "next/image";
import { useMemo, useState, useEffect, useRef } from "react";
import { Tooltip, TooltipContent, TooltipTrigger } from "./Tooltip";
import Link from "next/link";
import { Icon } from "@iconify/react";
import { useTheme } from "next-themes";
import { Chains } from "@/types/api/ChainOverviewResponse";
import { AllChainsByKeys } from "@/lib/chains";
import { color } from "highcharts";
import { useHover } from "usehooks-ts";
import { Chart } from "../charts/chart";

export default function OverviewMetrics({
  data,
  showEthereumMainnet,
  setShowEthereumMainnet,
  selectedTimespan,
  setSelectedTimespan,
}: {
  data: Chains;
  showEthereumMainnet: boolean;
  setShowEthereumMainnet: (show: boolean) => void;
  selectedTimespan: string;
  setSelectedTimespan: (timespan: string) => void;
}) {
  const [selectedScale, setSelectedScale] = useState("txcount_share");
  const [isCategoryMenuExpanded, setIsCategoryMenuExpanded] = useState(true);

  const categories = useMemo<{ [key: string]: string }>(() => {
    return {
      chains: "Chains",
      native_transfers: "Native Transfer",
      token_transfers: "Token Transfer",
      nft_fi: "NFT",
      defi: "DeFi",
      cefi: "CeFi",
      utility: "Utility",
      scaling: "Scaling",
      gaming: "Gaming",
    };
  }, []);

  const [isCategoryHovered, setIsCategoryHovered] = useState<{
    [key: string]: boolean;
  }>({
    native_transfers: false,
    token_transfers: false,
    nft_fi: false,
    defi: false,
    cefi: false,
    utility: false,
    scaling: false,
    gaming: false,
  });

  const [selectedCategory, setSelectedCategory] = useState("native_transfers");

  const [selectedChain, setSelectedChain] = useState<string | null>(null);

  const [relativePercentage, setRelativePercentage] = useState(
    100 -
      (Object.keys(data["arbitrum"].overview[selectedTimespan]).length - 1) * 2,
    // For right now determine the amount of categories  based on gasfees length
    // In the future if different categories have different amount of value will refactor.
  );

  const relativePercentageByChain = useMemo(() => {
    return {
      optimism:
        100 -
        (Object.keys(data["optimism"].overview[selectedTimespan]).length - 1) *
          2,
      arbitrum:
        100 -
        (Object.keys(data["arbitrum"].overview[selectedTimespan]).length - 1) *
          2,
      imx:
        100 -
        (Object.keys(data["imx"].overview[selectedTimespan]).length - 1) * 2,
    };
  }, [data, selectedTimespan]);

  const { theme } = useTheme();
  const timespans = useMemo(() => {
    return {
      "7d": {
        label: "7 days",
        value: 7,
        xMin: Date.now() - 7 * 24 * 60 * 60 * 1000,
        xMax: Date.now(),
      },
      "30d": {
        label: "30 days",
        value: 30,
        xMin: Date.now() - 30 * 24 * 60 * 60 * 1000,
        xMax: Date.now(),
      },
      "90d": {
        label: "90 days",
        value: 90,
      },
      // "180d": {
      //   label: "180 days",
      //   value: 180,
      // },
      "365d": {
        label: "1 year",
        value: 365,
      },
      // max: {
      //   label: "Maximum",
      //   value: 0,
      // },
    };
  }, []);

  const chartSeries = useMemo(() => {
    if (selectedChain)
      return [
        {
          id: [selectedChain, selectedCategory, selectedScale].join("_"),
          name: selectedChain,
          unixKey: "unix",
          dataKey: selectedScale,
          data: data[selectedChain].daily[selectedCategory].data,
        },
      ];
    return [
      {
        id: ["all_l2s", selectedCategory, selectedScale].join("_"),
        name: "all_l2s",
        unixKey: "unix",
        dataKey: selectedScale,
        data: data.all_l2s.daily[selectedCategory].data,
      },
    ];
  }, [selectedChain, selectedCategory, selectedScale, data]);

  console.log(data["optimism"].overview.types.indexOf("gas_fees_share"));
  console.log(relativePercentage);
  return (
    <>
      {/* <div>{selectedScale}</div> */}
      <div
        className={
          "flex w-full justify-between items-center text-xs rounded-full bg-forest-50 dark:bg-[#1F2726] p-0.5 z-10"
        }
      >
        <div className="hidden md:flex justify-center items-center ml-0.5">
          {/* <Icon icon="gtp:chain" className="w-7 h-7 lg:w-9 lg:h-9" /> */}
          <div className="flex justify-between md:justify-center items-center  space-x-[4px] md:space-x-1 mr-0 md:mr-2.5 w-full md:w-auto ">
            <button
              className={`rounded-full px-[16px] py-[8px] grow text-sm md:text-base lg:px-4 lg:py-3 xl:px-6 xl:py-4 font-medium   ${
                "gas_fees_share" === selectedScale
                  ? "bg-forest-500 dark:bg-forest-1000"
                  : "hover:bg-forest-500/10"
              }`}
              onClick={() => {
                setSelectedScale("gas_fees_share");
              }}
            >
              Gas Fees
            </button>
            <button
              className={`rounded-full px-[16px] py-[8px] grow text-sm md:text-base lg:px-4 lg:py-3 xl:px-6 xl:py-4 font-medium   ${
                "txcount_share" === selectedScale
                  ? "bg-forest-500 dark:bg-forest-1000"
                  : "hover:bg-forest-500/10"
              }`}
              onClick={() => {
                setSelectedScale("txcount_share");
              }}
            >
              Transaction Count
            </button>
          </div>
        </div>

        <div className="flex w-full md:w-auto justify-between md:justify-center items-stretch md:items-center space-x-[4px] md:space-x-1">
          {Object.keys(timespans).map((timespan) => (
            <button
              key={timespan}
              className={`rounded-full px-[16px] py-[8px] grow text-sm md:text-base lg:px-4 lg:py-3 xl:px-6 xl:py-4 font-medium ${
                selectedTimespan === timespan
                  ? "bg-forest-500 dark:bg-forest-1000"
                  : "hover:bg-forest-500/10"
              }`}
              onClick={() => {
                setSelectedTimespan(timespan);
                // setXAxis();
              }}
            >
              {timespans[timespan].label}
            </button>
          ))}
        </div>
      </div>
      <div className="overflow-x-scroll lg:overflow-x-visible z-100 w-full scrollbar-thin scrollbar-thumb-forest-900 scrollbar-track-forest-500/5 scrollbar-thumb-rounded-full scrollbar-track-rounded-full scroller">
        <div
          className={
            "relative min-w-[820px] md:min-w-[850px] w-[97.5%] h-[60px] m-auto border-x-[1px] border-t-[1px] rounded-t-[15px] text-forest-50 dark:text-forest-50 border-forest-400 dark:border-forest-800 bg-forest-900 dark:bg-forest-1000 mt-8 overflow-hidden"
          }
        >
          <div className="flex w-full h-full text-[12px]">
            {Object.keys(categories).map((category, i) =>
              categories[category] !== "Chains" ? (
                <div
                  key={category}
                  className={`relative flex w-full h-full justify-center items-center ${
                    selectedCategory === category
                      ? "borden-hidden rounded-[0px]"
                      : "h-full"
                  }`}
                  onMouseEnter={() => {
                    setIsCategoryHovered((prev) => ({
                      ...prev,
                      [category]: true,
                    }));
                  }}
                  onMouseLeave={() => {
                    setIsCategoryHovered((prev) => ({
                      ...prev,
                      [category]: false,
                    }));
                  }}
                  style={{
                    backgroundColor:
                      selectedCategory === category
                        ? "#5A6462"
                        : `rgba(0, 0, 0, ${
                            0.06 + (i / Object.keys(categories).length) * 0.94
                          })`,
                  }}
                >
                  <button
                    key={category}
                    className={`flex flex-col flex-1 h-full justify-center items-center border-x border-transparent overflow-hidden ${
                      selectedCategory === category ? "" : "hover:bg-white/5"
                    } 
                    ${isCategoryHovered[category] ? "bg-white/5" : ""}
                    `}
                    onClick={() => {
                      setSelectedCategory(category);
                      setSelectedChain(null);
                    }}
                  >
                    <div
                      className={`${
                        selectedCategory === category
                          ? "text-sm font-bold"
                          : "text-xs font-medium hover:bg-white/5"
                      }`}
                    >
                      {categories[category]}
                    </div>
                  </button>
                </div>
              ) : (
                // Different response for "Chains" category
                <div
                  key={category}
                  className={`relative flex w-full h-full justify-center items-center ${
                    selectedCategory === category
                      ? "borden-hidden rounded-[0px]"
                      : "h-full"
                  }`}
                >
                  <button
                    key={category}
                    className="flex flex-col flex-1 h-full justify-center items-center border-x border-transparent overflow-hidden"
                  >
                    <div
                      className={`relative right-[30px] top-[17px] ${
                        selectedCategory === category
                          ? "text-sm font-bold"
                          : "text-xs font-medium hover:bg-white/5"
                      }`}
                    >
                      {categories[category]}
                    </div>
                    <div
                      className={`relative left-[30px] bottom-[20px] ${
                        selectedCategory === category
                          ? "text-sm font-bold"
                          : "text-xs font-medium hover:bg-white/5"
                      }`}
                    >
                      Categories
                    </div>
                  </button>
                  <svg
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: "100%",
                      height: "100%",
                    }}
                  >
                    <line
                      strokeDasharray="2, 2"
                      x1="0"
                      y1="0"
                      x2="100%"
                      y2="100%"
                      style={{ stroke: "white", strokeWidth: 1 }}
                    />
                  </svg>
                </div>
              ),
            )}
          </div>
        </div>
        {/* <colorful rows> */}
        {/* {selectedScale === "gasfees" ? ( */}
        <div className="flex flex-col space-y-[10px] min-w-[820px] md:min-w-[850px] mb-8">
          {
            //chain name is key
            Object.keys(data)
              .filter((c) => c !== "all_l2s")
              .map((chainKey, index) => {
                return (
                  <div
                    key={index}
                    className={`flex flex-row flex-grow h-full items-center rounded-full text-xs font-medium ${
                      ["arbitrum", "imx", "all_l2s"].includes(chainKey)
                        ? "text-white dark:text-black"
                        : "text-white"
                    } ${AllChainsByKeys[chainKey].backgrounds[theme][1]} ${
                      chainKey === "imx" && selectedScale === "gas_fees_share"
                        ? "saturation-0 grayscale"
                        : ""
                    }`}
                  >
                    <div className="flex items-center h-[45px] pl-[20px] w-[150px] min-w-[150px]">
                      <div className="flex justify-center items-center w-[30px]">
                        <Icon
                          icon={`gtp:${chainKey}-logo-monochrome`}
                          className="w-[15px] h-[15px]"
                        />
                      </div>
                      <div className="-mb-0.5">
                        {AllChainsByKeys[chainKey].label}
                      </div>
                    </div>
                    <div className="flex w-full pr-[2px] py-[2px] relative">
                      {chainKey === "imx" &&
                        selectedScale === "gas_fees_share" && (
                          <div className="flex flex-col w-full h-[41px] justify-center items-center px-4 py-5 ">
                            <div className="flex flex-row w-full justify-center items-center text-sm">
                              No Gas Fees{" "}
                              <Tooltip placement="right" allowInteract>
                                <TooltipTrigger>
                                  <div className="p-1 z-10 mr-0 md:-mr-0.5">
                                    <Icon
                                      icon="feather:info"
                                      className="w-4 h-4"
                                    />
                                  </div>
                                </TooltipTrigger>
                                <TooltipContent className="z-50 flex items-center justify-center pr-[3px]">
                                  <div className="px-3 text-sm font-medium bg-forest-100 dark:bg-[#4B5553] text-forest-900 dark:text-forest-100 rounded-xl shadow-lg z-50 w-autow-[420px] h-[80px] flex items-center">
                                    IMX does not charge gas fees.
                                  </div>
                                </TooltipContent>
                              </Tooltip>
                            </div>
                          </div>
                        )}
                      {(selectedScale !== "gas_fees_share" ||
                        chainKey !== "imx") &&
                        Object.keys(categories).map((categoryKey, i) => {
                          if (
                            !(
                              categoryKey in
                              data[chainKey].overview[selectedTimespan]
                            )
                          )
                            return null;

                          const rawChainCategories = Object.keys(
                            data[chainKey].overview[selectedTimespan],
                          );

                          const chainCategories = Object.keys(
                            categories,
                          ).filter((x) => rawChainCategories.includes(x));

                          const categoryIndex =
                            chainCategories.indexOf(categoryKey);

                          return (
                            <div
                              key={categoryKey}
                              onClick={() => {
                                if (
                                  selectedCategory === categoryKey &&
                                  selectedChain === chainKey
                                ) {
                                  setSelectedCategory(categoryKey);
                                  setSelectedChain(null);
                                } else {
                                  // if (selectedChain !== chainKey)
                                  //   setSelectedChain(chainKey);
                                  // else
                                  // setSelectedChain(null);
                                  setSelectedCategory(categoryKey);
                                  setSelectedChain(chainKey);
                                }

                                // if (selectedChain !== chainKey)

                                // else setSelectedChain(null);
                              }}
                              onMouseEnter={() => {
                                setIsCategoryHovered((prev) => ({
                                  ...prev,
                                  [categoryKey]: true,
                                }));
                              }}
                              onMouseLeave={() => {
                                setIsCategoryHovered((prev) => ({
                                  ...prev,
                                  [categoryKey]: false,
                                }));
                              }}
                              className={`flex flex-col h-[41px] justify-center items-center px-4 py-5 cursor-pointer relative
                            ${
                              selectedCategory === categoryKey &&
                              (selectedChain === chainKey ||
                                selectedChain === null)
                                ? `py-[25px] -my-[5px] px-[25px] -mx-[5px] z-10 shadow-lg ${AllChainsByKeys[chainKey].backgrounds[theme][1]}`
                                : ""
                            } ${
                                categoryIndex ===
                                Object.keys(
                                  data[chainKey].overview[selectedTimespan],
                                ).length -
                                  1
                                  ? selectedCategory === categoryKey &&
                                    (selectedChain === chainKey ||
                                      selectedChain === null)
                                    ? ""
                                    : "rounded-r-full"
                                  : ""
                              }`}
                              style={{
                                backgroundColor:
                                  selectedCategory === categoryKey &&
                                  (selectedChain === chainKey ||
                                    selectedChain === null)
                                    ? ""
                                    : `rgba(0, 0, 0, ${
                                        0.06 +
                                        (i / Object.keys(categories).length) *
                                          0.94
                                      })`,
                                width: `${
                                  selectedCategory === categoryKey &&
                                  (selectedChain === chainKey ||
                                    selectedChain === null)
                                    ? data[chainKey].overview[selectedTimespan][
                                        categoryKey
                                      ][
                                        data[chainKey].overview.types.indexOf(
                                          selectedScale,
                                        )
                                      ] *
                                        relativePercentageByChain[chainKey] +
                                      4
                                    : data[chainKey].overview[selectedTimespan][
                                        categoryKey
                                      ][
                                        data[chainKey].overview.types.indexOf(
                                          selectedScale,
                                        )
                                      ] *
                                        relativePercentageByChain[chainKey] +
                                      2
                                }%`,
                                borderRadius: `${
                                  selectedCategory === categoryKey &&
                                  (selectedChain === chainKey ||
                                    selectedChain === null)
                                    ? categoryIndex ===
                                      Object.keys(
                                        data[chainKey].overview[
                                          selectedTimespan
                                        ],
                                      ).length -
                                        1
                                      ? "20000px 99999px 99999px 20000px"
                                      : "5px"
                                    : categoryIndex ===
                                      Object.keys(
                                        data[chainKey].overview[
                                          selectedTimespan
                                        ],
                                      ).length -
                                        1
                                    ? "0px 99999px 99999px 0px"
                                    : "0px"
                                }`,

                                // borderR: `${
                                //   selectedCategory === categoryKey ? 0 : "10px"
                              }}
                            >
                              {/* highlight on hover div */}
                              {isCategoryHovered[categoryKey] &&
                                !(
                                  selectedCategory === categoryKey &&
                                  selectedChain === null
                                ) && (
                                  <div
                                    className={`absolute inset-0 bg-white/30 mix-blend-hard-light`}
                                    style={{
                                      borderRadius: `${
                                        selectedCategory === categoryKey &&
                                        (selectedChain === chainKey ||
                                          selectedChain === null)
                                          ? categoryIndex ===
                                            Object.keys(
                                              data[chainKey].overview[
                                                selectedTimespan
                                              ],
                                            ).length -
                                              1
                                            ? "20000px 99999px 99999px 20000px"
                                            : "5px"
                                          : categoryIndex ===
                                            Object.keys(
                                              data[chainKey].overview[
                                                selectedTimespan
                                              ],
                                            ).length -
                                              1
                                          ? "0px 99999px 99999px 0px"
                                          : "0px"
                                      }`,
                                    }}
                                  />
                                )}
                              <div
                                className={`mix-blend-luminosity font-medium 
                            ${
                              selectedCategory === categoryKey &&
                              (selectedChain === chainKey ||
                                selectedChain === null)
                                ? `text-lg ${
                                    ["arbitrum", "imx", "all_l2s"].includes(
                                      chainKey,
                                    )
                                      ? "text-black"
                                      : "text-white"
                                  }`
                                : ["arbitrum", "imx", "all_l2s"].includes(
                                    chainKey,
                                  )
                                ? i > 4
                                  ? "text-white/60 text-xs"
                                  : "text-black text-xs"
                                : i > 4
                                ? "text-white/60 text-xs"
                                : "text-white/80 text-xs"
                            }
                            
                            `}
                              >
                                {(
                                  data[chainKey].overview[selectedTimespan][
                                    categoryKey
                                  ][
                                    data[chainKey].overview.types.indexOf(
                                      selectedScale,
                                    )
                                  ] * 100.0
                                ).toFixed(2)}
                                %
                              </div>
                            </div>
                          );
                        })}
                      {index ===
                        Object.keys(data).filter((c) => c !== "all_l2s")
                          .length -
                          1 && (
                        <div className="absolute flex flex-1 justify-between w-full h-[15px] -bottom-[15px] left-0">
                          {[0, 20, 40, 60, 80, 100].map((x, i) => (
                            <div key={x} className="relative">
                              <div className="h-[15px] border-r border-forest-900 dark:border-forest-500"></div>
                              {x === 0 && (
                                <div className="text-forest-900 dark:text-forest-500 absolute top-[100%] left-0">
                                  {x}%
                                </div>
                              )}
                              {x === 100 && (
                                <div className="text-forest-900 dark:text-forest-500 absolute top-[100%] right-0">
                                  {x}%
                                </div>
                              )}
                              {x !== 0 && x !== 100 && (
                                <div className="text-forest-900 dark:text-forest-500 absolute w-8 top-[100%] -left-3">
                                  {x}%
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })
          }
        </div>
      </div>
      <Chart
        types={
          selectedChain === null
            ? data.all_l2s.daily.types
            : data[selectedChain].daily.types
        }
        timespan={selectedTimespan}
        series={chartSeries}
        yScale="percentage"
      />
    </>
  );
}