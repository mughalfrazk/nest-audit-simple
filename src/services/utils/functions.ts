export const toSnakeCase = (string: string) => {
  return string
    .replace(/\d+/g, ' ')
    .split(/ |\B(?=[A-Z])/)
    .map((word) => word.toLowerCase())
    .join('_');
};
