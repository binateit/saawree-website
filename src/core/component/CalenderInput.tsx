"use client";
import React from "react";
import { Calendar } from "primereact/calendar";
import { format, parse, isValid } from "date-fns";

interface CalendarInputProps {
  value: Date | null;
  name: string;
  setFieldValue: (
    field: string,
    value: string,
    shouldValidate?: boolean
  ) => void;
  placeholder?: string;
  className?: string;
  minDate?: Date; // Minimum selectable date
  maxDate?: Date; // Maximum selectable date
  disabled?: boolean;
}

const CalendarInput: React.FC<CalendarInputProps> = ({
  value,
  name,
  setFieldValue,
  placeholder = "Select date",
  className = "",
  minDate,
  maxDate,
  disabled,
}) => {
  // const [typedValue, setTypedValue] = useState<string | null>(null);
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    // setTypedValue(inputValue); // Keep track of the typed value

    // Attempt to parse the input into a valid date
    const parsedDate = parse(inputValue, "dd-MM-yyyy", new Date());
    if (isValid(parsedDate)) {
      const newDate: string = format(parsedDate, "yyyy-MM-dd");
      setFieldValue(name, newDate);
    } else {
      setFieldValue(name, ""); // Clear the value if the input is invalid
    }
  };

  return (
    <Calendar
      dateFormat='dd-mm-yy'
      value={value}
      placeholder={placeholder}
      name={name}
      inputClassName={className}
      disabled={disabled}
      minDate={minDate} // Pass minDate to Calendar
      maxDate={maxDate} // Pass maxDate to Calendar
      onChange={(e) => {
        const selectedDate = e.value as Date;

        if (isValid(selectedDate)) {
          setFieldValue(name, format(selectedDate, "yyyy-MM-dd"));
        }
      }}
      onInput={handleInputChange} // Handle typed input
      inputId={`${name}-input`} // Unique input ID for accessibility
      showButtonBar
      onClearButtonClick={() => {
        setFieldValue(name, "");
      }}
    />
  );
};

export default CalendarInput;
