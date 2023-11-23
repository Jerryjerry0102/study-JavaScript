import Money from "./Money.js";
import Movie from "./Movie.js";
import Screening from "./Screening.js";

class App {
  play() {
    const avatar = new Movie("타이타닉", 120, new Money(10000));
    const starWars = new Movie("스타워즈", 10000);

    new Screening(avatar, 1, new Date(2023, 11, 30, 13, 30)).reserve(
      "jerry",
      3
    );
  }
}

new App().play();
