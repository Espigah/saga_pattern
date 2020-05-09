import './index.scss'
import io from 'socket.io-client';

import { gsap, ScrollToPlugin, Draggable, MotionPathPlugin } from "gsap/all";
gsap.registerPlugin(ScrollToPlugin, Draggable, MotionPathPlugin); 

io.on("connect", function (a) {
  console.log(" >> connect", a);
});
io.on("event", function (a) {
  console.log(">> event", a);
});

io.on("update", function (a) {
  console.log(">> update", a);
});

io.on("disconnect", function (a) {
  console.log(a);
});
