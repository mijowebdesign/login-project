import React from 'react';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import { productsItems } from "@/constants/navbarItems";

import { Badge } from "@/components/ui/badge"

const defaultOpenItems = ["Povrce", "Sveze voce", "Mleko i mlečni proizvodi"];

const SidebarFiltersArea: React.FC = () => {
    return (
        <ScrollArea className="h-full ">
          <div className="space-y-4 py-4">
            {/* <h2 className="text-lg font-semibold tracking-tight">Filteri</h2> */}

            <Accordion
              type="multiple"
              defaultValue={defaultOpenItems}
              className="w-full border rounded-md bg-popover p-3 shadow-xl "
            >
              {productsItems.map((item) => (
                <AccordionItem value={item.title}>
                  <AccordionTrigger className='flex'>{ item.title}  <Badge variant="secondary">2</Badge></AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-2">
                      {item.subItems?.map((subItem) => (
                        <div
                          key={subItem}
                          className="flex items-center space-x-2"
                        >
                          <Checkbox id={subItem} />
                          <label
                            htmlFor={subItem}
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            {subItem}
                          </label>
                        </div>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </ScrollArea>
    );
};

export default SidebarFiltersArea;