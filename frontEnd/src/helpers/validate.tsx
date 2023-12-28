export function trimData(data: string): string {
  const trimmedData = data.replace(/^\s+|\s+$/g, "");

  return trimmedData;
}

export function returnTodayFormat() {
  const currentDate = new Date();
  interface DateTimeFormatOptions {
    weekday?: "short" | "long";
    year?: "numeric" | "2-digit";
    month?: "numeric" | "2-digit" | "short" | "long";
    day?: "numeric" | "2-digit";
    hour?: "numeric" | "2-digit";
    minute?: "numeric" | "2-digit";
    second?: "numeric" | "2-digit";
    // timeZoneName?: "short" | "long";
  }

  // Customize the format
  const options: DateTimeFormatOptions = {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    // timeZoneName: "short",
  };
  const formattedDateTime = currentDate.toLocaleString(undefined, options);

  return `Today, ${formattedDateTime}`;
}

export function returnDueDate() {
  const currentDate = new Date();
  interface DateTimeFormatOptions {
    year?: "numeric" | "2-digit";
    month?: "numeric" | "2-digit" | "short" | "long";
    day?: "numeric" | "2-digit";
    hour?: "numeric" | "2-digit";
    minute?: "numeric" | "2-digit";
    // timeZoneName?: "short" | "long";
  }

  // Customize the format
  const options: DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    // timeZoneName: "short",
  };
  const formattedDateTime = currentDate.toLocaleString(undefined, options);

  return formattedDateTime;
}
