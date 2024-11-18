const dayjs = useDayjs();
export type DateTimeStyle = "shortest" | "short" | "medium" | "long" | "full";

const dateTimeFormat: Record<string, any> = {
  th: {
    merge: "",
    date: {
      shortest: "D/M/BB",
      short: "D/M/BBBB",
      medium: "D MMM BBBB",
      long: "D MMMM BBBB",
      full: "วันddddที่ D MMMM พ.ศ. BBBB",
    },
    time: {
      shortest: "H:mm",
      short: "HH:mm",
      medium: "HH.mm น.",
      long: "HH:mm:ss",
      full: "HH นาฬิกา mm นาที ss วินาที",
    },
  },
  en: {
    merge: "at",
    date: {
      shortest: "M/D/YY",
      short: "M/D/YYYY",
      medium: "MMM D, YYYY",
      long: "MMMM D, YYYY",
      full: "dddd, MMMM D, YYYY",
    },
    time: {
      shortest: "h:mm A",
      short: "hh:mm A",
      medium: "hh:mm A",
      long: "hh:mm:ss A",
      full: "hh:mm:ss A",
    },
  },
  zh: {
    merge: "at",
    date: {
      shortest: "M/D/YY",
      short: "M/D/YYYY",
      medium: "MMM D, YYYY",
      long: "MMMM D, YYYY",
      full: "dddd, MMMM D, YYYY",
    },
    time: {
      shortest: "h:mm A",
      short: "hh:mm A",
      medium: "hh:mm A",
      long: "hh:mm:ss A",
      full: "hh:mm:ss A",
    },
  },
};

export default {
  dt: (date?: Date | string) => {
    return dayjs(date);
  },
  toText: (
    date: Date | string,
    dateStyle?: DateTimeStyle | null,
    timeStyle?: DateTimeStyle | null
  ) => {
    const { locale } = useNuxtApp().$i18n;
    if (date) {
      return (
        (dateStyle !== null
          ? dayjs(date)
              .locale(locale.value)
              .format(dateTimeFormat[locale.value].date[dateStyle || "medium"])
          : "") +
        (timeStyle
          ? ` ${dateTimeFormat[locale.value].merge} ${dayjs(date)
              .locale(locale.value)
              .format(dateTimeFormat[locale.value].time[timeStyle])}`
          : "")
      );
    } else {
      return (
        (dateStyle
          ? dayjs()
              .locale(locale.value)
              .format(dateTimeFormat[locale.value].date[dateStyle || "medium"])
          : "") +
        (timeStyle
          ? ` ${dateTimeFormat[locale.value].merge} ${dayjs()
              .locale(locale.value)
              .format(dateTimeFormat[locale.value].time[timeStyle])}`
          : "")
      );
    }
  },
  age: (dateOfBirth: Date | string) => {
    return dayjs().diff(dateOfBirth, "years");
  },
  fromNow: (relativeTime: Date | string, withoutSuffix = true) => {
    return dayjs(relativeTime).fromNow(withoutSuffix);
  },
  format: (date: Date | string, format?: string) => {
    return dayjs(date).format(format);
  },
};
