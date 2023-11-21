import Audience from "./Audience.js";
import Bag from "./Bag.js";
import Invitation from "./Invitation.js";
import Theater from "./Theater.js";
import Ticket from "./Ticket.js";
import TicketOffice from "./TicketOffice.js";
import TicketSeller from "./TicketSeller.js";

class App {
  play() {
    const theater = new Theater(
      new TicketSeller(
        new TicketOffice(
          10000,
          Array.from({ length: 10 }, () => new Ticket(5000))
        )
      )
    );
    theater.enter(new Audience(new Bag(10000)));
    theater.enter(new Audience(new Bag(10000, new Invitation())));
  }
}

new App().play();
