import { GoogleGenerativeAI } from "@google/generative-ai";
import { api_key } from "./env.config";

const genAI = new GoogleGenerativeAI(api_key as string);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
console.log(api_key);
const prompt =(
  `This prompt is coming  from a API request, 
  You don't need to explain anything just translate the given json format resembling realistic item in real world,
  and generate a response in json format resembling the response of the API. Again don't explain anything not even a little bit, 
  only return json only in response so that can be mapped in frontend of the application using this API.
  Generate Realistic API request for this json schema :\
` +
  JSON.stringify({
    categoryId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    name: "string",
    description: "string",
  })
);
export async function getResult() {
  const result = await model.generateContent(prompt);
  console.log(result.response.text());
}

