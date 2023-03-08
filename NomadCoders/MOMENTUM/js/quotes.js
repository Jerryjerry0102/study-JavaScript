const quotes = [
  { quote: "Be brave", author: "jerry" },
  { quote: "Let's be active!", author: "jerry" },
  { quote: "If you want to do something, just do it", author: "jerry" },
  { quote: "Let's enjoy", author: "jerry" },
  { quote: "Let's be thankful", author: "jerry" },
  {
    quote:
      "행동이 항상 행복을 가져다주는 것은 아니다. 그러나 행동 없이는 행복도 없다.",
    author: "jerry",
  },
  {
    quote: "All progress takes place outside the comfort zone.",
    author: "jerry",
  },
  {
    quote: "Wer kämpft, kann verlieren. Wer nicht kämpft, hat schon verloren.",
    author: "Bertolt Brecht",
  },
  { quote: "Wege entstehen dadurch, dass man sie geht", author: "Franz Kafka" },
  {
    quote: "Auf einfache Wege schickt man nur die Schwachen",
    author: "Hermann Hesse",
  },
];

const quote = document.querySelector("#quote span:first-child");
const author = document.querySelector("#quote span:last-child");

const todaysQuote = quotes[Math.floor(Math.random() * quotes.length)];

quote.innerText = todaysQuote.quote;
author.innerText = todaysQuote.author;
