import axios from 'axios';
import { URLSearchParams } from 'url';

export const verifyCaptchaToken = async (token: string) => {
  const params = new URLSearchParams({ response: token, secret: process.env.HCAPTCHA_SECRET_KEY! });

  const response = await axios({
    method: 'POST',
    url: `https://hcaptcha.com/siteverify`,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    data: params.toString(),
  });

  return response.data.success;
};
