export const toSnakeCase = (string: string) => {
  return string
    .replace(/\d+/g, ' ')
    .split(/ |\B(?=[A-Z])/)
    .map((word) => word.toLowerCase())
    .join('_');
};

export const workspaceName = (string: string) => {
  const spaceless = string.replace(/\s/g, '').toLowerCase();
  return `${spaceless}.audit-simple.com`;
};

export const addSeconds = (date: Date, seconds: number) => {
  date.setSeconds(date.getSeconds() + seconds);
  return date;
}

export const addHours = (date: Date, hours: number) => {
  date.setHours(date.getHours() + hours);
  return date;
}