export default function convertCurrency (valueInCents){
  if (!valueInCents) return
  return Number(valueInCents / 100)
    .toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}
