import { GoogleSpreadsheet } from "google-spreadsheet";

export const credentials = {
  type: process.env.REACT_APP_DRIVE_API_TYPE,
  project_id: process.env.REACT_APP_DRIVE_API_PROJECT_ID,
  private_key_id: process.env.REACT_APP_DRIVE_API_PRIVATE_KEY_ID,
  private_key: process.env.REACT_APP_DRIVE_API_PRIVATE_KEY,
  client_email: process.env.REACT_APP_DRIVE_API_CLIENT_EMAIL,
  client_id: process.env.REACT_APP_DRIVE_API_CLIENT_ID,
  auth_uri: process.env.REACT_APP_DRIVE_API_AUTH_URI,
  token_uri: process.env.REACT_APP_DRIVE_API_TOKEN_URI,
  auth_provider_x509_cert_url: process.env.REACT_APP_DRIVE_API_AUTH_PROVIDER,
  client_x509_cert_url: process.env.REACT_APP_DRIVE_API_CLIENT_URL,
};

export const sheetId = process.env.REACT_APP_DRIVE_API_SHEET_ID;

export async function sendToSheet(data){
  const file = new GoogleSpreadsheet(sheetId);
  
  await file.useServiceAccountAuth({
    client_email: credentials.client_email,
    private_key: credentials.private_key.replace(/\\n/g, "\n"),
  });

  await file.loadInfo();
  const sheet = file.sheetsByIndex[0];
  await sheet.addRow({
    "Pedido": data.id,
    "Nome": data.name,
    "CPF": data.cpf,
    "Email": data.email,
    "Telefone": data.phone,
    "Igreja": data.church,
    "Lider": data.leader,
    "Cidade": data.city,
    "Local": data.place,
    "Valor": 50,
    "Pago": 0
  });
}