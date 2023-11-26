import DAY_OF_WEEK from "./DayOfWeek.js";
import Duration from "./Duration.js";
import Event from "./Event.js";
import RecurringSchedule from "./RecurringSchedule.js";
import Time from "./Time.js";

class App {
  play() {
    const schedule = new RecurringSchedule(
      "회의",
      DAY_OF_WEEK.wendsday,
      new Time(10, 30),
      new Duration(30)
    );

    const meeting = new Event(
      "회의",
      new Date(2019, 4, 9, 10, 30),
      new Duration(30)
    );

    console.log(meeting.isSatisfied(schedule));
    console.log(meeting.isSatisfied(schedule));
    if (!meeting.isSatisfied(schedule)) {
      meeting.reschedule(schedule);
    }
    console.log(meeting.isSatisfied(schedule));
  }
}

new App().play();
