const isJSON = (value: string): object | boolean | number => {
  try {
    const obj = JSON.parse(value);
    return obj;
  } catch {
    return null;
  }
};

const parser = (value: string): object | boolean | number => {
  return JSON.parse(value);
};

const stringifier = (value: object | boolean | number): string => {
  return JSON.stringify(value);
};

export default isJSON;
export { parser, stringifier };
