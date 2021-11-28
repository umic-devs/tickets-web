import axios from "axios";

const SANDBOX_EMAIL = process.env.REACT_APP_PAGSEGURO_SANDBOX_EMAIL;
const SANDBOX_TOKEN = process.env.REACT_APP_PAGSEGURO_SANDBOX_TOKEN;

export const pagseguroApi = axios.create({
  baseURL: `https://ws.sandbox.pagseguro.uol.com.br/v2/checkout?email=${SANDBOX_EMAIL}&token=${SANDBOX_TOKEN}`,
});

export const pagseguroSandboxApi = axios.create({
  baseURL: `https://ws.sandbox.pagseguro.uol.com.br/v2/checkout?email=${SANDBOX_EMAIL}&token=${SANDBOX_TOKEN}`,
});
