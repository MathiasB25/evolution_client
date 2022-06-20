export const priceFormatter = cantidad => {
    return cantidad?.toLocaleString('en-US', { style: 'currency', currency: 'USD' })
}

export const valueFormatter = value => {
    if (parseInt(value).toString().length > 1) {
        return value.toFixed(2)
    } else if (parseInt(value).toString().length <= 1) {
        return value.toFixed(8)
    }
}