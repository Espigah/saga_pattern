import "./index.scss";
import socket from "./socket.js";

import { gsap, ScrollToPlugin, Draggable, MotionPathPlugin } from "gsap/all";
gsap.registerPlugin(ScrollToPlugin, Draggable, MotionPathPlugin);

socket();

const createOrderButton = document.querySelector(".create-order");
createOrderButton.addEventListener("click", createOrder);

function createOrder() {
  var myInit = {
    method: "POST",
    header: {
      'credentials': 'include',
      'csrf-token': window.csrf || '',
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ detail: "Order - " + new Date().toISOString() }),
  };
  fetch("/order/", myInit)
    .then(function (response) {
      console.log(response);
    })
    .catch(function (myBlob) {
      console.log("[ERROR]", myBlob);
    });
}
