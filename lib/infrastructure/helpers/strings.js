export function upperFirst(word) {
    if (word.length === 1) { return word.toUpperCase(); }
    return word.charAt(0).toUpperCase() + word.substring(1);
  }
  
  export function capitalize(string) {
    /* eslint-disable no-return-assign */
    if (string) {
      const words = string.split(' ');
      const capitalizeWords = words
        .map((word) => word = upperFirst(word))
        .join(' ');
      return capitalizeWords;
    }
    return null;
  }
  