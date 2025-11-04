export const uppercase = (value: string): string => value.toUpperCase();

export const lowercase = (value: string): string => value.toLowerCase();

export const trim = (value: string): string => value.trim();

export const capitalize = (value: string): string =>
  value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
