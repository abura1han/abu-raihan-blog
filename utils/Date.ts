// Raw date string to formaded date
export const formatDate = (date: string) => {
  return new Date(date).toDateString().slice(3);
};
