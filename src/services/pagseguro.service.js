import axios from "axios";

export const tokenAPI = axios.create({
  baseURL:
    !process.env.NODE_ENV || process.env.NODE_ENV === "development"
      ? process.env.REACT_APP_TICKETS_API_URL_DEV
      : process.env.REACT_APP_TICKETS_API_URL_PROD,
});

export function sendCreditCardCharge({
  referenceId,
  description,
  value,
  cardNumber,
  cardExpirationMonth,
  cardExpirationYear,
  cardSecurityCode,
  cardHolderName,
}) {
  const body = composePayload({
    referenceId,
    description,
    value,
    cardNumber,
    cardExpirationMonth,
    cardExpirationYear,
    cardSecurityCode,
    cardHolderName,
  });

  return tokenAPI.post("payment/credit", body);
}

function composePayload({
  referenceId,
  description,
  value,
  cardNumber,
  cardExpirationMonth,
  cardExpirationYear,
  cardSecurityCode,
  cardHolderName,
}) {
  const UMIC_BRASIL = "UMIC Brasil";
  const CREDIT_CARD = "CREDIT_CARD";
  const DEFAULT_CURRENCY = "BRL";
  const DEFAULT_INSTALLMENTS = 1;
  const NOTIFICATION_URL = "https://google.com";

  return {
    reference_id: referenceId,
    description,
    amount: {
      value,
      currency: DEFAULT_CURRENCY,
    },
    payment_method: {
      type: CREDIT_CARD,
      installments: DEFAULT_INSTALLMENTS,
      capture: false,
      soft_descriptor: UMIC_BRASIL,
      card: {
        number: cardNumber,
        exp_month: cardExpirationMonth,
        exp_year: cardExpirationYear,
        security_code: cardSecurityCode,
        holder: {
          name: cardHolderName,
        },
      },
    },
    notification_urls: [NOTIFICATION_URL],
  };
}
