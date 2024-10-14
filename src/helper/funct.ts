/** @format */

export function formatNumber(num: number) {
    if (num >= 1000) {
        return (num / 1000).toFixed(num % 1000 === 0 ? 0 : 1) + "k";
    }
    return num.toString();
}

export function formatRate(rate: number) {
    return (rate * 100).toFixed(0) + "%";
}
