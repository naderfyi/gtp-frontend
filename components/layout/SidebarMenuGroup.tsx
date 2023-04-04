"use client";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/solid";
import { useEffect, useState, ReactNode } from "react";
import { Icon } from "@iconify/react";
import { useMediaQuery } from "@react-hook/media-query";
import Link from "next/link";
import { MasterResponse } from "@/types/api/MasterResponse";
// import { useMetricsData } from "@/context/MetricsProvider";
import useSWR from "swr";
import { usePathname } from "next/navigation";
import { Tooltip, TooltipTrigger, TooltipContent } from "./Tooltip";

export type SidebarItem = {
  name: string;
  label: string;
  key?: string;
  icon: ReactNode;
  sidebarIcon: ReactNode;
  options: {
    // name?: string;
    label: string;
    icon: ReactNode;
    key?: string;
    rootKey?: string;
  }[];
};

type SidebarProps = {
  item: SidebarItem;
  trigger: ReactNode;
  className?: string;
  // open?: boolean;
  onToggle?: () => void;
  onOpen?: () => void;
  onClose?: () => void;
  children?: ReactNode;
  sidebarOpen?: boolean;
};

export default function SidebarMenuGroup({
  item,
  trigger,
  className = "",
  // open = false,
  onToggle = () => {},
  onOpen = () => {},
  onClose = () => {},
  sidebarOpen,
}: SidebarProps) {
  const { data: master } = useSWR<any>(
    "https://d2cfnw27176mbd.cloudfront.net/v0_2/master.json"
  );

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const pathname = usePathname();

  // const [first, second] = pathname.slice(1).split("/");

  const [urlParts, setUrlParts] = useState<string[]>(["", ""]);

  useEffect(() => {
    const parts = pathname.slice(1).split("/");
    switch (parts.length) {
      case 0:
        setUrlParts(["", ""]);
        break;
      case 1:
        setUrlParts([parts[0], ""]);
        break;
      case 2:
        setUrlParts([parts[0], parts[1]]);
        break;
      default:
        setUrlParts(parts);
    }
  }, [item.name, pathname]);

  useEffect(() => {
    setIsOpen((isOpen) =>
      urlParts[0].toLowerCase() == item.name.toLowerCase() ? true : isOpen
    );
  }, [urlParts]);

  const handleToggle = () => {
    if (isOpen) {
      handleClose();
    } else {
      handleOpen();
    }
  };

  const handleOpen = () => {
    setIsOpen(true);
    onOpen();
  };

  const handleClose = () => {
    setIsOpen(false);
    onClose();
  };

  if (item.name === "Blockspace")
    return (
      <div className="flex flex-col">
        <div className="flex items-center justify-items-center mb-8 opacity-50">
          <div className="w-6 mx-0">
            <div className="text-white bg-forest-800 rounded-md w-6 mx-auto">
              {item.sidebarIcon}
            </div>
          </div>
          <div className="">
            <div className="text-sm font-medium mx-4 w-60 flex">
              {item.label}
              <div className="text-[0.6rem] leading-[1.75] px-1 py-[0.1rem] font-bold ml-2 rounded-[4px] bg-forest-800 text-forest-50">
                SOON
              </div>
            </div>{" "}
          </div>
        </div>
      </div>
    );

  return (
    <div className="flex flex-col">
      <div className="text-xs"></div>
      <div
        className="flex items-center justify-items-center mb-2 cursor-pointer"
        onClick={handleToggle}
      >
        <div className="w-6 mx-0">
          <div className="text-white bg-forest-800 rounded-md w-6 mx-auto">
            {item.sidebarIcon}
          </div>
        </div>
        <div className={``}>
          <div className="text-sm font-medium mx-4 w-60">{item.label}</div>
        </div>
      </div>
      <div
        className={`flex flex-col overflow-hidden mb-6 w-60 ${
          isOpen ? "h-auto" : "h-0"
        }`}
      >
        {master &&
          item.options
            .filter((option) =>
              Object.keys(master.metrics).includes(option.key)
            )
            .map((option) => {
              if (!sidebarOpen) {
                return (
                  <Tooltip key={option.label} placement="right">
                    <TooltipTrigger>
                      <Link
                        className={`flex items-center justify-items-center rounded-l-full my-[0.25rem] hover:bg-forest-600 relative ${
                          urlParts[1].trim().localeCompare(option.key) === 0
                            ? "bg-forest-800 text-forest-100"
                            : ""
                        }`}
                        href={`${item.label.toLowerCase()}/${option.key?.toLowerCase()}`}
                      >
                        {/* <div className="w-6"> */}
                        <div className="w-6 absolute top-1.5 left-0">
                          {option.icon}
                        </div>
                        {/* </div> */}
                        <div className="text-sm py-1 ml-10 w-36 font-normal break-inside-auto">
                          {option.label}
                        </div>
                      </Link>
                    </TooltipTrigger>
                    <TooltipContent className="bg-forest-900 text-forest-50 rounded-md p-2 text-xs font-medium break-inside-auto -ml-48 shadow-md">
                      {option.label}
                    </TooltipContent>
                  </Tooltip>
                );
              } else {
                return (
                  <Link
                    key={option.label}
                    className={`flex items-center justify-items-center rounded-l-full my-[0.25rem] hover:bg-forest-600 relative ${
                      urlParts[1].trim().localeCompare(option.key) === 0
                        ? "bg-forest-800 text-forest-100"
                        : ""
                    }`}
                    href={`${item.label.toLowerCase()}/${option.key?.toLowerCase()}`}
                  >
                    {/* <div className="w-6"> */}
                    <div className="w-6 absolute top-1.5 left-0">
                      {option.icon}
                    </div>
                    {/* </div> */}
                    <div className="text-sm py-1 ml-10 w-36 font-normal break-inside-auto">
                      {option.label}
                    </div>
                  </Link>
                );
              }
            })}

        {/* <div className="flex items-center justify-center w-6 h-6 rounded-full bg-forest-400 "></div> */}
      </div>
    </div>
  );
}