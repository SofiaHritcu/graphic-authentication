export const randomFileName = (fileType: string) => {
  const unixTimestamp = new Date().getTime();
  return `${unixTimestamp}.${fileType}`;
};
