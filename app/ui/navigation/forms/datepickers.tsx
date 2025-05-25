"use client";

import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { CalendarIcon } from "@heroicons/react/24/outline";

interface DateRangePickerProps {
  startDate: Date | null;
  endDate: Date | null;
  onChange: (dates: [Date | null, Date | null]) => void;
}

const DateRangePicker = ({ startDate, endDate, onChange }: DateRangePickerProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleChange = (update: [Date | null, Date | null]) => {
    onChange(update);
    // Close the calendar after both dates are selected
    if (update[0] && update[1]) {
      setIsOpen(false);
    }
  };

  const formatDate = (date: Date | null) => {
    return date ? date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : '';
  };

  return (
    <div className="relative">
      <div 
        className="flex items-center gap-2 border rounded-lg p-2 cursor-pointer bg-white border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
        onClick={() => setIsOpen(!isOpen)}
      >
        <CalendarIcon className="h-5 w-5 border " />
        <div className="flex items-center gap-1 ">
          <span className="font-medium text-gray-400">
            {startDate ? formatDate(startDate) : 'Check-in'} 
          </span>
          <span>—</span>
          <span className="font-medium text-gray-400">
            {endDate ? formatDate(endDate) : 'Check-out'}
          </span>
        </div>
      </div>
      
      {isOpen && (
        <div className="absolute z-50 mt-1">
          <DatePicker
            selected={startDate}
            onChange={handleChange}
            startDate={startDate}
            endDate={endDate}
            selectsRange
            inline
            minDate={new Date()}
            calendarClassName="border-0 shadow-lg rounded-lg"
            dayClassName={(date) => {
              if (!startDate || !endDate) return '';
              const day = new Date(date);
              return day > startDate && day < endDate 
                ? 'bg-blue-50 text-blue-600' 
                : '';
            }}
          />
        </div>
      )}
    </div>
  );
};

export default DateRangePicker;