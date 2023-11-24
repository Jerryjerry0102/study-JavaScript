import AmountDiscountPolicy from "./AmountDiscountPolicy.js";
import DAY_OF_WEEK from "./DayOfWeek.js";
import Money from "./Money.js";
import Movie from "./Movie.js";
import PercentDiscountPolicy from "./PercentDiscountPolicy.js";
import PeriodCondition from "./PeriodCondition.js";
import Screening from "./Screening.js";
import SequenceCondition from "./SequenceCondition.js";
import Time from "./Time.js";

class App {
  play() {
    const avatar = new Movie(
      "아바타",
      120,
      new Money(10000),
      new AmountDiscountPolicy(
        new Money(800),
        new SequenceCondition(1),
        new SequenceCondition(10),
        new PeriodCondition(
          DAY_OF_WEEK.monday,
          new Time(10, 0),
          new Time(11, 59)
        ),
        new PeriodCondition(
          DAY_OF_WEEK.thursday,
          new Time(10, 0),
          new Time(20, 59)
        )
      )
    );

    const titanic = new Movie(
      "타이타닉",
      180,
      new Money(11000),
      new PercentDiscountPolicy(
        0.1,
        new PeriodCondition(
          DAY_OF_WEEK.tuesday,
          new Time(14, 0),
          new Time(16, 59)
        ),
        new SequenceCondition(2),
        new PeriodCondition(
          DAY_OF_WEEK.thursday,
          new Time(10, 0),
          new Time(13, 59)
        )
      )
    );

    const starWars = new Movie("스타워즈", 210, new Money(10000));

    new Screening(avatar, 2, new Date(2023, 11, 28, 13, 30)).reserve("tim", 3);
    new Screening(titanic, 5, new Date(2023, 11, 12, 14, 30)).reserve("tom", 2);
    new Screening(starWars, 1, new Date(2023, 11, 1, 10, 30)).reserve("tam", 3);
  }
}

new App().play();
