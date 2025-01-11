import { format } from "date-fns";

const camelize = (value: string) => {
  return value
    .replace(/(?:^\w|[A-Z]|\b\w)/g, function (word, index) {
      return index === 0 ? word.toLowerCase() : word.toUpperCase();
    })
    .replace(/\s+/g, "");
};

const formatCurrency = (value: number | undefined) =>
  value?.toLocaleString("en-IN", { style: "currency", currency: "INR" });

const formatDate = (rowData: any, dateFormat: string) => {
  const date = new Date(rowData);
  return format(date, dateFormat);
};

const isNotEmpty = (obj: unknown) => {
  return obj !== undefined && obj !== null && obj !== "";
};

export { camelize, formatCurrency, formatDate, isNotEmpty };
