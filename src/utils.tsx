export const objToArray = <T extends {}>(obj: { [key: string]: T }): T[] =>
  Array.from(Object.values(obj));

export const groupBy = <T extends {}>(cb: (el: T) => string) => {
  return (arr: Array<T>) => {
    return arr.reduce<{ [key: string]: T[] }>((acc, curr) => {
      const groupName = cb(curr);
      if (acc.hasOwnProperty(groupName)) {
        acc[groupName].push(curr);
      } else {
        acc[groupName] = [curr];
      }
      return acc;
    }, {})
  }
};
