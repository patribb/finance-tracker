export const currencyFormatter = (amount) => {
    const formatter =Intl.NumberFormat('EUR', {
        style: 'currency',
        currency: 'EUR'
    })
    return formatter.format(amount)
}