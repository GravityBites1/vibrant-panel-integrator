import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar as CalendarIcon, Filter, MapPin, Store } from "lucide-react";
import { format } from "date-fns";

interface CampaignFiltersProps {
  onFilterChange: (filters: CampaignFilters) => void;
}

export interface CampaignFilters {
  dateRange: {
    from: Date | undefined;
    to: Date | undefined;
  };
  campaignType: string;
  store: string;
  city: string;
}

export function CampaignFilters({ onFilterChange }: CampaignFiltersProps) {
  const [filters, setFilters] = useState<CampaignFilters>({
    dateRange: {
      from: undefined,
      to: undefined,
    },
    campaignType: "",
    store: "",
    city: "",
  });

  const handleFilterChange = (key: keyof CampaignFilters, value: any) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  return (
    <div className="flex flex-wrap gap-4 mb-6">
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" className="flex gap-2">
            <CalendarIcon className="h-4 w-4" />
            {filters.dateRange.from ? (
              filters.dateRange.to ? (
                <>
                  {format(filters.dateRange.from, "LLL dd, y")} -{" "}
                  {format(filters.dateRange.to, "LLL dd, y")}
                </>
              ) : (
                format(filters.dateRange.from, "LLL dd, y")
              )
            ) : (
              "Date Range"
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="range"
            selected={{
              from: filters.dateRange.from,
              to: filters.dateRange.to,
            }}
            onSelect={(range) => handleFilterChange("dateRange", range || { from: undefined, to: undefined })}
            initialFocus
          />
        </PopoverContent>
      </Popover>

      <Select
        value={filters.campaignType}
        onValueChange={(value) => handleFilterChange("campaignType", value)}
      >
        <SelectTrigger className="w-[180px]">
          <Filter className="h-4 w-4 mr-2" />
          <SelectValue placeholder="Campaign Type" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="promotion">Promotion</SelectItem>
          <SelectItem value="awareness">Awareness</SelectItem>
          <SelectItem value="conversion">Conversion</SelectItem>
        </SelectContent>
      </Select>

      <Select
        value={filters.store}
        onValueChange={(value) => handleFilterChange("store", value)}
      >
        <SelectTrigger className="w-[180px]">
          <Store className="h-4 w-4 mr-2" />
          <SelectValue placeholder="Store" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="store1">Store 1</SelectItem>
          <SelectItem value="store2">Store 2</SelectItem>
          <SelectItem value="store3">Store 3</SelectItem>
        </SelectContent>
      </Select>

      <Select
        value={filters.city}
        onValueChange={(value) => handleFilterChange("city", value)}
      >
        <SelectTrigger className="w-[180px]">
          <MapPin className="h-4 w-4 mr-2" />
          <SelectValue placeholder="City" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="city1">City 1</SelectItem>
          <SelectItem value="city2">City 2</SelectItem>
          <SelectItem value="city3">City 3</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}