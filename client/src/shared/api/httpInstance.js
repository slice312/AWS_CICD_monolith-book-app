import {HttpClient} from "/src/shared/lib/httpClient";


const WEB_API_URL = process.env?.WEB_API_URL;


export const httpInstance = new HttpClient(WEB_API_URL, 15_000);
