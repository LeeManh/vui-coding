import dayjs from "@/lib/dayjs";

export const formatFullDate = (date?: string) => {
  if (!date) return "";
  return dayjs(date).format("DD MMM YYYY");
};

export const getTimeAgo = (date?: string, locale?: string) => {
  if (!date) return "";
  const dayjsInstance = locale ? dayjs(date).locale(locale) : dayjs(date);
  return dayjsInstance.fromNow();
};

export const getCurrentYear = () => new Date().getFullYear();
