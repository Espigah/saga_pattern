import deliveryService from "./deliveryService.js";
import consumer from "../message-broker/consumer.js";
import producer from "../message-broker/producer.js";

const DELAY_RETRY = 2000;

export default {
  consumer() {
    function deliveryOrder(data) {
      let value;
      try {
        value = JSON.parse(data.value);
      } catch (error) {
        value = {};
      }
      console.log("[observerFailure]", value);

      if (!value.detail || !value.transaction_id) {
        console.log("[observerFailure]", "invalid payload");
        return;
      }

      console.log("[ deliveryOrder ]");
      deliveryService
        .deliveryOrder({
          ...value,
          status: "ORDER_DELIVERED",
        })
        .then((data) => {
          console.log("[ deliveryOrder::success ]", data);
          producer.sendSuccess({ ...value, data });
        })
        .catch((error) => {
          console.log("[ deliveryOrder::error ]", error);
          producer.sendFailure({ ...value, error });
        });
    }

    consumer.observerFailure((data) => {
      setTimeout(() => {
        deliveryOrder(data);
      }, DELAY_RETRY);
    });

    consumer.observerTrigger((data) => {
      deliveryOrder(data);
    });
  },
};
