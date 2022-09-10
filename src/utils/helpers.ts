export const count = (arr: string[], val: string) => {
    return arr.filter(item => item === val).length;
}