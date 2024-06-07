import { useWindowSize } from "@/hooks";
import {  NavigationProjects, cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { FaAngleLeft } from "react-icons/fa6";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { NavLink, useLocation } from "react-router-dom";
import { Logo } from "@/assets/svgs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

function SideBar() {
  const [expanded, setExpanded] = useState(false);
  const size = useWindowSize();
  const location = useLocation();
  useEffect(() => {
    window.onresize = () => {
      if (size.width) {
        setExpanded(size.width > 1000 ? true : false);
      }
    };
    if (typeof window !== "undefined" && size.width) {
      setExpanded(size.width > 1000 ? true : false);
    }
  }, [size.width]);
  if (
    !localStorage.getItem("reload") ||
    localStorage.getItem("reload") == "true"
  ) {
    localStorage.setItem("reload", "false");
    window.location.reload();
  }
  return (
    <aside
      className={cn(
        `bg-primary shadow-[0px_0px_8px_1px_rgba(0,0,0,0.4)] transition-all relative border-l min-h-svh`,
        {
          "w-[300px]": expanded,
          "w-[60px]": !expanded,
        }
      )}
    >
      <div className="pt-4 justify-center flex  flex-col items-center">
        <Logo width={70} height={70} />
        <h1 className="text-white text-xl font-md">
          HTC {expanded && "Company"}
        </h1>
      </div>
      <Button
        variant="outline"
        className="absolute top-2 end-0 -translate-x-1/2 aspect-square rounded-full w-9 h-9 p-1"
        onClick={() => {
          setExpanded((prev) => !prev);
        }}
      >
        <FaAngleLeft
          size={"1rem"}
          className={cn("transition-all", { "rotate-180": expanded })}
        />
      </Button>
      <div className={`flex flex-col items-center py-8 mx-6 ${!expanded && '!mx-2'}`}>
        {NavigationProjects.map((link, index) =>
          link.list ? (
            <Accordion
              key={index}
              type="single"
              className="w-full sidebar-menu border-b border-white"
              collapsible
            >
              <AccordionItem
                value="item-1"
                className="border-none w-full  text-white"
              >
                <AccordionTrigger
                  className={cn(`hover:no-underline px-6 max-lg:px-2`, {
                    "bg-background text-primary hover:bg-background":
                      location.pathname.startsWith(link.path!),
                  })}
                >
                  <div className="flex-shrink-0 flex gap-4 ">
                    {link.icon} {expanded && link.title}
                  </div>
                </AccordionTrigger>
                {link.list.map((linkLevel2: any, indexLevel2: any) => (
                  <NavLink
                    to={`${link.path! + linkLevel2!.path}`}
                    key={`${index}-${indexLevel2}`}
                  >
                    {({ isActive }) => (
                      <AccordionContent
                        onClick={() => {
                          // localStorage.setItem("relo ad", "true");
                        }}
                        className={cn(
                          "ps-4 hover:bg-white transition-all py-3 hover:text-primary flex gap-2",
                          {
                            "bg-white text-primary hover:text-primary hover:bg-background flex gap-2":
                              isActive,
                          }
                        )}
                      >
                        <span> {link.icon}</span>{" "}
                        {expanded && linkLevel2.titleLink}
                      </AccordionContent>
                    )}
                  </NavLink>
                ))}
              </AccordionItem>
            </Accordion>
          ) : expanded ? (
            <NavLink
              to={link.path!}
              key={`${index}`}
              className={cn("w-full bg-transparent rounded-b-none ")}
            >
              {({ isActive }) => (
                <Button
                  onClick={() => {
                    // localStorage.setItem("reload", "true");
                  }}
                  variant={isActive ? "outline" : "default"}
                  className={cn(
                    `justify-start  bg-transparent text-white hover:bg-white hover:text-black !rounded-lg   w-full px-6  text-md`,
                    { "text-black bg-white ": isActive }
                  )}
                >
                  {link.icon}
                  {link.titleLink}
                </Button>
              )}
            </NavLink>
          ) : (
            <NavLink key={`${index}`} to={link.path!}>
              {({ isActive }) => (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger className="w-full h-full text-center justify-center flex items-center">
                      <Button
                        key={`${index}`}
                        variant={isActive ? "outline" : "default"}
                        className="w-full"
                        size="icon"
                        asChild
                      >
                        {link.icon}
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{link.titleLink}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              )}
            </NavLink>
          )
        )}
      </div>
    </aside>
  );
}

export default SideBar;
