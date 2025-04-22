import { format, formatDistanceToNowStrict, differenceInHours } from 'date-fns';

function formatPostTime(dateString) {
  const date = new Date(dateString);
  const hoursAgo = differenceInHours(new Date(), date);

  if (hoursAgo < 24) {
    // recent → show like 5s, 3m, 1h
    return formatDistanceToNowStrict(date, {
      addSuffix: false,
      roundingMethod: 'floor'
    }).replace(" seconds", "s")
      .replace(" second", "s")
      .replace(" minutes", "m")
      .replace(" minute", "m")
      .replace(" hours", "h")
      .replace(" hour", "h")
      .replace(" days", "d")
      .replace(" day", "d");
  } else {
    // older → show like Apr 19
    return format(date, 'MMM d');
  }
}
export default formatPostTime;