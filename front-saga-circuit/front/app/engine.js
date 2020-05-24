import rigthAnimaitons from "./animations/rigthAnimaitons.js";
import leftAnimaitons from "./animations/leftAnimaitons.js";
import images from "./assets/*.png";

let queue = [];
let isRunning = false;

const animatorDelivery = animatorFactory(
  ".card-delivery",
  ".mongodb",
  "delivery",
  "topline"
);
const animatorPayment = animatorFactory(
  ".card-payment",
  ".couchdb",
  "payment",
  "middleline"
);
const animatorOrder = animatorFactory(
  ".card-order",
  ".postgres",
  "order",
  "bottomline"
);

const actionMap = {
  ORDER_CREATE_EVENT: () => {
    return animatorOrder.sentToMessagebroker().then(() => {
      return animatorPayment.receiveFromMessagebroker();
    });
  },
  ORDER_CONCLUDE_EVENT: () => {
    return animatorOrder.sentToMessagebroker();
  },
  ORDER_CREATE_FAILURE_EVENT: () => {
    return animatorOrder.sentToMessagebroker();
  },
  ORDER_BILLED_EVENT: () => {
    return animatorPayment.sentToMessagebroker().then(() => {
      return Promise.all([
        animatorOrder.receiveFromMessagebroker(),
        animatorDelivery.receiveFromMessagebroker(),
      ]);
    });
  },
  ORDER_BILLED_FAILURE_EVENT: () => {
    return animatorPayment.sentToMessagebroker();
  },
  ORDER_DELIVERED_FAILURE_EVENT: () => {
    return animatorDelivery.sentToMessagebroker();
  },
};

//_______________________________________
//
//_______________________________________
const addProcess = (process) => {
  queue.push(process);
  execute();
};

//_______________________________________
//
//_______________________________________

function execute() {
  if (isRunning || !queue.length) {
    return;
  }
  const process = queue.shift();
  const action = actionMap[process.topic];
  if (!action) {
    return;
  }
  isRunning = true;
  action().then(() => {
    isRunning = false;
    execute();
  });
}

function animatorFactory(origin, database, system, line) {
  let originClientRect;
  let databaseClientRect;
  let messagebrokerClientRect;

  const createElement = (figure) => {
    const messageIcon = document.createElement("message-icon");
    messageIcon.setAttribute("figure", images[system + "_icon"]);
    document.querySelector("body").appendChild(messageIcon);
    return messageIcon;
  };

  setTimeout(() => {
    originClientRect = document.querySelector(origin).getBoundingClientRect();
    //
    messagebrokerClientRect = document
      .querySelector(".kafka")
      .getBoundingClientRect();
    //
    databaseClientRect = document
      .querySelector(database)
      .getBoundingClientRect();
  }, 500); //delay for screen render

  return {
    sentToDatabase: () => {
      const messageIcon = createElement(system);
      return leftAnimaitons.sending(
        messageIcon,
        originClientRect,
        databaseClientRect
      );
    },
    sentToMessagebroker: () => {
      const messageIcon = createElement(system);
      return rigthAnimaitons[line].send(
        messageIcon,
        originClientRect,
        messagebrokerClientRect
      );
    },
    receiveFromDatabaseWithSuccess: () => {
      const messageIcon = createElement(system);
      return leftAnimaitons.success(
        messageIcon,
        databaseClientRect,
        originClientRect
      );
    },
    receiveFromDatabaseWithError: () => {
      const messageIcon = createElement(system);
      return leftAnimaitons.error(
        messageIcon,
        databaseClientRect,
        originClientRect
      );
    },
    receiveFromMessagebroker: () => {
      const messageIcon = createElement(system);
      return rigthAnimaitons[line].receive(
        messageIcon,
        messagebrokerClientRect,
        originClientRect
      );
    },
  };
}

export default {
  addProcess,
};
