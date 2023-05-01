const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: "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",
});
const openai = new OpenAIApi(configuration);

async function processData(text) {
  const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: `Decide whether a movies review sentiment is positive, neutral, or negative.\n\n.The review is:${text}`,
    temperature: 0,
    max_tokens: 60,
    top_p: 1.0,
    frequency_penalty: 0.5,
    presence_penalty: 0.0,
  });
  return response;
}

module.exports = processData;
