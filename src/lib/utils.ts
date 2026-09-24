/**
 * Merge class names conditionally (lightweight clsx alternative).
 * Accepts strings, undefined, null, false — filters out falsy values and joins.
 */
export function cn(
  ...inputs: (string | undefined | null | false | 0)[]
): string {
  return inputs.filter(Boolean).join(" ");
}

/**
 * Format an ISO date string to 'DD MMM YYYY'.
 * Example: '2026-03-15T10:00:00Z' → '15 Mar 2026'
 */
export function formatDate(isoDate: string): string {
  const date = new Date(isoDate);
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const day = date.getDate().toString().padStart(2, "0");
  const month = months[date.getMonth()];
  const year = date.getFullYear();
  return `${day} ${month} ${year}`;
}

/**
 * Format a number as Indian Rupee currency.
 * Example: 15000 → '₹15,000'
 */
export function formatCurrency(amount: number): string {
  return `₹${amount.toLocaleString("en-IN")}`;
}

/**
 * Get initials from a full name.
 * Example: 'Rahul Sharma' → 'RS', 'Dr. Subhash Banerjee' → 'SB'
 */
export function getInitials(name: string): string {
  const parts = name
    .replace(/^(Dr\.|Smt\.|Sri|Mr\.|Mrs\.|Ms\.)\s*/i, "")
    .trim()
    .split(/\s+/);
  if (parts.length === 0) return "";
  if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
  return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
}

/**
 * Truncate a string with ellipsis.
 * Example: truncate('Hello World', 5) → 'Hello...'
 */
export function truncate(str: string, maxLength: number): string {
  if (str.length <= maxLength) return str;
  return str.slice(0, maxLength).trimEnd() + "...";
}

/**
 * Get relative time string from an ISO date.
 * Example: '2 hours ago', '3 days ago', 'just now'
 */
export function getRelativeTime(isoDate: string): string {
  const now = Date.now();
  const then = new Date(isoDate).getTime();
  const diffMs = now - then;

  if (diffMs < 0) return "just now";

  const seconds = Math.floor(diffMs / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const weeks = Math.floor(days / 7);
  const months = Math.floor(days / 30);
  const years = Math.floor(days / 365);

  if (seconds < 60) return "just now";
  if (minutes < 60) return `${minutes} minute${minutes === 1 ? "" : "s"} ago`;
  if (hours < 24) return `${hours} hour${hours === 1 ? "" : "s"} ago`;
  if (days < 7) return `${days} day${days === 1 ? "" : "s"} ago`;
  if (weeks < 5) return `${weeks} week${weeks === 1 ? "" : "s"} ago`;
  if (months < 12) return `${months} month${months === 1 ? "" : "s"} ago`;
  return `${years} year${years === 1 ? "" : "s"} ago`;
}
