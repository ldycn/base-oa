/**
 * Create a range iterator.
 *
 * @param start
 * @param end
 */
export const range = (start: number, end: number) =>
    Array.from({ length: end - start }, (v, k) => k + start);

/**
 * Return string with first character captalized.
 * @param str
 */
export const capitalize = (str: string) => {
    return (str = str ? str.charAt(0).toUpperCase() + str.substr(1).toLowerCase() : "");
};

/**
 * Return mapped value indexed by given property value.
 *
 * @param property
 * @param mapping
 */
const styledBy = (property: string, mapping: { [P: string]: string }) => {
    return (props: { [P: string]: string }) => mapping[props[property]];
};
