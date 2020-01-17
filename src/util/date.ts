/**
 * Get the max date from a date array.
 */
export function getMaxDateFromArray(dateArray: Date[]) {
    const maxValue = dateArray
        .map(date => Number(date))
        .reduce((date1, date2) => Math.max(date1, date2))
    return new Date(maxValue);
}

