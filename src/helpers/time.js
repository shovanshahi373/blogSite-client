export const getRelativeTime = (givenTime) => {
  const currentTime = Math.floor(Date.now() / 1000);
  const stampedTime = Math.floor(new Date(givenTime).getTime() / 1000);
  const timeElapsed = currentTime - stampedTime;
  const formattedTime =
    timeElapsed <= 60
      ? timeElapsed + " sec ago"
      : timeElapsed <= 60 * 60
      ? Math.floor(timeElapsed / 60) + " minutes ago"
      : timeElapsed <= 24 * 60 * 60
      ? Math.floor((timeElapsed / (24 * 60 * 60)) * 24) + " hours ago"
      : givenTime.split("T")[0];
  return formattedTime;
};
