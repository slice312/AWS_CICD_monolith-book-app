import {HttpClient} from "/src/shared/lib/httpClient";


// TODO: dotenv
const WEB_API_URL = "http://localhost:1717";


export const httpInstance = new HttpClient(WEB_API_URL, 15_000);
