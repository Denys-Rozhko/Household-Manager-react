import process from "process";

export default async function fetchCurrency() {
  const answer = await fetch(
    "https://fixer-fixer-currency-v1.p.rapidapi.com/latest?base=RUB&symbols=EUR,RUB,USD",
    {
      headers: {
        "x-rapidapi-host": process.env.VUE_APP_FIXER_HOST,
        "x-rapidapi-key": process.env.VUE_APP_FIXER_KEY
      }
    }
  );
  const result = await answer.json();
  return result;
}