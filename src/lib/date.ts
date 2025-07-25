import dayjs from "dayjs";

export const formatFullDate = (date?: string) => {
  if (!date) return "";
  return dayjs(date).format("DD MMM YYYY");
};

export const getTimeAgo = (date?: string) => {
  if (!date) return "";
  return dayjs(date).fromNow();
};

export const getCurrentYear = () => new Date().getFullYear();
