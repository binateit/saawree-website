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

const formatDate = (rowData: string, dateFormat: string) => {
  const date = new Date(rowData);
  return format(date, dateFormat);
};

const isNotEmpty = (obj: unknown) => {
  return obj !== undefined && obj !== null && obj !== "";
};

function urlExists(url: string, callback: (status: boolean) => void) {
  fetch(url, { method: "get" }).then(function (status) {
    callback(status.ok);
  });
}

// function CheckImage(path: string) {
//   axios
//     .get(path)
//     .then((res) => {
//       console.log(res);
//       return true;
//     })
//     .catch((err) => {
//       console.log(err);
//       return false;
//     });
// }
const checkIfImageExists = (
  url: string,
  callback: (exists: boolean) => void
) => {
  const img = new Image();
  img.src = url;

  if (img.complete) {
    callback(true);
  } else {
    img.onload = () => {
      callback(true);
    };

    img.onerror = () => {
      callback(false);
    };
  }
};
// const generateOptions = (enumObject) => {
//   return Object.keys(enumObject || {})
//     .filter((key) => !isNaN(Number(enumObject?.[key])))
//     .map((key) => ({
//       value: enumObject?.[key],
//       label: key.replace(/([A-Z])/g, " $1").trim(),
//     }));
// };

const dateOptions = [
  {
    label: "Last 7 Days",
    value: {
      from: new Date().toISOString(),
      to: new Date(new Date().setDate(new Date().getDate() - 7)).toISOString(),
    },
  },
  {
    label: "Last 15 Days",
    value: {
      from: new Date().toISOString(),
      to: new Date(new Date().setDate(new Date().getDate() - 15)).toISOString(),
    },
  },
  {
    label: "This Month",
    value: {
      from: new Date(
        new Date().getFullYear(),
        new Date().getMonth(),
        1
      ).toISOString(),
      to: new Date(
        new Date().getFullYear(),
        new Date().getMonth() + 1,
        0
      ).toISOString(),
    },
  },
  // {
  //   label: 'This Quarter',
  //   value: getQuarterDateRange(new Date(), 'current'),
  // },
  // {
  //   label: 'Previous Quarter',
  //   value: getQuarterDateRange(new Date(), 'previous'),
  // },
  // {
  //   label: "This Year",
  //   value: {
  //     from: (() => {
  //       const now = new Date();
  //       return new Date(
  //         now.getMonth() < 3 ? now.getFullYear() - 1 : now.getFullYear(),
  //         3,
  //         1
  //       ).toString();
  //     })(),
  //     to: (() => {
  //       const now = new Date();
  //       return new Date(
  //         now.getMonth() < 3 ? now.getFullYear() : now.getFullYear() + 1,
  //         2,
  //         31
  //       ).toISOString();
  //     })(),
  //   },
  // },
  // {
  //   label: "Previous Year",
  //   value: {
  //     from: (() => {
  //       const now = new Date();
  //       return new Date(
  //         now.getMonth() < 3 ? now.getFullYear() - 2 : now.getFullYear() - 1,
  //         3,
  //         1
  //       ).toISOString();
  //     })(),
  //     to: (() => {
  //       const now = new Date();
  //       return new Date(
  //         now.getMonth() < 3 ? now.getFullYear() - 1 : now.getFullYear(),
  //         2,
  //         31
  //       ).toISOString();
  //     })(),
  //   },
  // },
  {
    label: "Custom",
    value: "custom",
  },
];

function toCamelCase(str: string) {
  // First, handle different possible input formats by splitting on common separators
  return str
    .replace(/[^a-zA-Z0-9]+(.)/g, (match, chr) => chr.toUpperCase())
    .replace(/^[A-Z]/, (chr) => chr.toLowerCase());
}
export {
  camelize,
  formatCurrency,
  formatDate,
  isNotEmpty,
  urlExists,
  dateOptions,
  checkIfImageExists,
  // generateOptions,
  toCamelCase,
};
