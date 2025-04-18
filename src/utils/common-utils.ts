
/**
 * Formats a number as currency
 * @param value Number to format
 * @param currency Currency code (default: 'USD')
 * @param locale Locale string (default: 'en-US')
 * @returns Formatted currency string
 */
export function formatCurrency(
  value: number,
  currency = 'USD',
  locale = 'en-US'
): string {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}

/**
 * Formats a large number with abbreviations (K, M, B)
 * @param value Number to format
 * @param decimals Number of decimal places (default: 1)
 * @returns Formatted string with abbreviations
 */
export function formatCompactNumber(value: number, decimals = 1): string {
  if (value === 0) return '0';
  
  const isNegative = value < 0;
  const absValue = Math.abs(value);
  
  const abbreviations = [
    { threshold: 1, symbol: '' },
    { threshold: 1e3, symbol: 'K' },
    { threshold: 1e6, symbol: 'M' },
    { threshold: 1e9, symbol: 'B' },
    { threshold: 1e12, symbol: 'T' }
  ];
  
  const index = abbreviations
    .slice()
    .reverse()
    .findIndex(abbr => absValue >= abbr.threshold);
  
  const abbreviation = abbreviations[abbreviations.length - 1 - index];
  
  const scaled = absValue / abbreviation.threshold;
  const formatted = scaled.toFixed(decimals);
  const withoutTrailingZeros = parseFloat(formatted).toString();
  
  return `${isNegative ? '-' : ''}${withoutTrailingZeros}${abbreviation.symbol}`;
}

/**
 * Formats a number with thousands separators
 * @param value Number to format
 * @param locale Locale string (default: 'en-US')
 * @returns Formatted number string
 */
export function formatNumber(value: number, locale = 'en-US'): string {
  return new Intl.NumberFormat(locale).format(value);
}

/**
 * Formats a percentage value
 * @param value Number to format as percentage
 * @param decimals Number of decimal places (default: 2)
 * @returns Formatted percentage string
 */
export function formatPercentage(value: number, decimals = 2): string {
  return `${value.toFixed(decimals)}%`;
}

/**
 * Formats a date object or timestamp to a readable date string
 * @param date Date object or timestamp
 * @param format Format style: 'short', 'medium', 'long', 'full' (default: 'medium')
 * @param locale Locale string (default: 'en-US')
 * @returns Formatted date string
 */
export function formatDate(
  date: Date | number,
  format: 'short' | 'medium' | 'long' | 'full' = 'medium',
  locale = 'en-US'
): string {
  const dateObj = typeof date === 'number' ? new Date(date) : date;
  
  return dateObj.toLocaleDateString(locale, {
    dateStyle: format
  });
}

/**
 * Formats a date object or timestamp to a readable time string
 * @param date Date object or timestamp
 * @param format Format style: 'short', 'medium', 'long', 'full' (default: 'short')
 * @param locale Locale string (default: 'en-US')
 * @returns Formatted time string
 */
export function formatTime(
  date: Date | number,
  format: 'short' | 'medium' | 'long' | 'full' = 'short',
  locale = 'en-US'
): string {
  const dateObj = typeof date === 'number' ? new Date(date) : date;
  
  return dateObj.toLocaleTimeString(locale, {
    timeStyle: format
  });
}

/**
 * Formats a date object or timestamp to a relative time string (e.g., "2 hours ago")
 * @param date Date object or timestamp
 * @param locale Locale string (default: 'en-US')
 * @returns Relative time string
 */
export function formatRelativeTime(date: Date | number, locale = 'en-US'): string {
  const dateObj = typeof date === 'number' ? new Date(date) : date;
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - dateObj.getTime()) / 1000);
  
  const units: Intl.RelativeTimeFormatUnit[] = [
    'year', 'month', 'day', 'hour', 'minute', 'second'
  ];
  
  const rtf = new Intl.RelativeTimeFormat(locale, { numeric: 'auto' });
  
  const dividers = [31536000, 2592000, 86400, 3600, 60, 1];
  
  for (let i = 0; i < units.length; i++) {
    const unit = units[i];
    const divider = dividers[i];
    
    if (Math.abs(diffInSeconds) >= divider || unit === 'second') {
      return rtf.format(Math.round(-diffInSeconds / divider), unit);
    }
  }
  
  return rtf.format(0, 'second');
}

/**
 * Truncates text to a specified length and adds ellipsis if needed
 * @param text Text to truncate
 * @param maxLength Maximum length (default: 100)
 * @param ellipsis String to append when truncated (default: '...')
 * @returns Truncated text
 */
export function truncateText(
  text: string,
  maxLength = 100,
  ellipsis = '...'
): string {
  if (!text) return '';
  if (text.length <= maxLength) return text;
  
  return text.substring(0, maxLength) + ellipsis;
}

/**
 * Debounces a function call
 * @param fn Function to debounce
 * @param delay Delay in milliseconds
 * @returns Debounced function
 */
export function debounce<T extends (...args: any[]) => any>(
  fn: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  
  return function(...args: Parameters<T>): void {
    clearTimeout(timeout);
    timeout = setTimeout(() => fn(...args), delay);
  };
}

/**
 * Throttles a function call
 * @param fn Function to throttle
 * @param limit Time limit in milliseconds
 * @returns Throttled function
 */
export function throttle<T extends (...args: any[]) => any>(
  fn: T,
  limit: number
): (...args: Parameters<T>) => void {
  let lastCall = 0;
  
  return function(...args: Parameters<T>): void {
    const now = Date.now();
    
    if (now - lastCall >= limit) {
      lastCall = now;
      fn(...args);
    }
  };
}

/**
 * Generates a random ID
 * @param length Length of the ID (default: 10)
 * @returns Random ID string
 */
export function generateId(length = 10): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  
  return result;
}

/**
 * Extracts URL parameters from a URL string or the current window location
 * @param url Optional URL string (uses window.location if not provided)
 * @returns Object with parameter key-value pairs
 */
export function getUrlParams(url?: string): Record<string, string> {
  const urlObj = url 
    ? new URL(url) 
    : new URL(window.location.href);
  
  const params: Record<string, string> = {};
  
  urlObj.searchParams.forEach((value, key) => {
    params[key] = value;
  });
  
  return params;
}

/**
 * Checks if a value is empty (null, undefined, empty string, empty array, empty object)
 * @param value Value to check
 * @returns True if empty, false otherwise
 */
export function isEmpty(value: any): boolean {
  if (value === null || value === undefined) return true;
  if (typeof value === 'string') return value.trim() === '';
  if (Array.isArray(value)) return value.length === 0;
  if (typeof value === 'object') return Object.keys(value).length === 0;
  return false;
}

/**
 * Deep clones an object
 * @param obj Object to clone
 * @returns Cloned object
 */
export function deepClone<T>(obj: T): T {
  if (obj === null || typeof obj !== 'object') return obj;
  return JSON.parse(JSON.stringify(obj));
}

/**
 * Picks specified properties from an object
 * @param obj Source object
 * @param keys Array of keys to pick
 * @returns New object with only the specified properties
 */
export function pick<T extends object, K extends keyof T>(
  obj: T,
  keys: K[]
): Pick<T, K> {
  return keys.reduce((result, key) => {
    if (key in obj) {
      result[key] = obj[key];
    }
    return result;
  }, {} as Pick<T, K>);
}

/**
 * Omits specified properties from an object
 * @param obj Source object
 * @param keys Array of keys to omit
 * @returns New object without the specified properties
 */
export function omit<T extends object, K extends keyof T>(
  obj: T,
  keys: K[]
): Omit<T, K> {
  const result = { ...obj };
  keys.forEach(key => {
    delete result[key];
  });
  return result;
}
