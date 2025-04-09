'use client'

import { cn } from "@/lib/utils";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {useState} from "react";
import { Button } from "@/components/ui/button";
import {CalendarIcon} from "lucide-react";
import { Calendar } from "../ui/calendar";
import { format } from "date-fns";
import {getAccesToken} from "@/actions/auth";

export default function DownloadRange() {
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date>(new Date());

  const handleClick = async () => {
    const response = await fetch(`http://localhost:8000/api/tasks/report/?start=${startDate.getFullYear()}-${startDate.getMonth() + 1}-${startDate.getDate()}&end=${endDate.getFullYear()}-${endDate.getMonth() + 1}-${endDate.getDate()}`, {
      headers: {
        'Authorization': `Bearer ${await getAccesToken()}`,
      },
      method: 'POST'
    });

    const link = document.createElement("a");
    link.href = URL.createObjectURL(await response.blob());
    link.download = `report_${startDate.toDateString()}_${endDate.toDateString()}.csv`;
    link.click();
  }

  return (
    <div className={'flex items-center gap-4'}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className={cn(
              "w-[240px] justify-start text-left font-normal",
              !startDate && "text-muted-foreground"
            )}
          >
            <CalendarIcon />
            {startDate ? format(startDate, "PPP") : <span>Pick a date</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={startDate}
            onSelect={(e) => {
              if (e instanceof Date) {
                setStartDate(e);
              }
            }}
            initialFocus
          />
        </PopoverContent>
      </Popover>

      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className={cn(
              "w-[240px] justify-start text-left font-normal",
              !endDate && "text-muted-foreground"
            )}
          >
            <CalendarIcon />
            {endDate ? format(endDate, "PPP") : <span>Pick a date</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={endDate}
            onSelect={(e) => {
              if (e instanceof Date) {
                setEndDate(e);
              }
            }}
          />
        </PopoverContent>
      </Popover>

      <Button onClick={handleClick}>Download</Button>
    </div>
  )
}