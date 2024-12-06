import { GoogleGenerativeAI } from "@google/generative-ai";
import { api_key } from "./env.config";

const genAI = new GoogleGenerativeAI(api_key as string);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
console.log(api_key);
export async function getResult(schema: string, item:string) {
  const prompt =
    `This prompt is coming  from a API request, 
  You don't need to explain anything just translate the given json format resembling realistic item in real world,
  and generate a response in json format resembling the response of the API. Again don't explain anything not even a little bit, 
  only return json  in response so that can be mapped in frontend of the application using this API. 
  The response should not contain even a single unnecessary or more letter, if the provided json is in this format:
  "{
  "name": "string",
  "description": "string"
}", 
the response should be in this format:
"{
  "name":"Beer",
  "description":"A refreshing drink made from malted grains, hops, and yeast."
}"

And this is just for the refererence the given json schema is related to ${item}
Only these much no more no less, don't explain anything not even a little bit and don't decorate or anything just only this,
Also don't put inside code block you don't need to put in inside or anything I should be able to directly parse the response you send using JSON.parse() function.
Any extra response you send will cause the error.
  Generate Realistic API request for this json schema :\
` + schema;
  const result = await model.generateContent(prompt);
  console.log({
    "result": result.response.text(),
  })
  return JSON.parse(result.response.text());
}
