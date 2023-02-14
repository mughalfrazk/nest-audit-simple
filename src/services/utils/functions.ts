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
