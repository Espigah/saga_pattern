import utils from "./utils.js";
import { DURATION } from "./configs.js";

const sending = (target, fromRect, toRect) => {
  const fromOffset = {
    x: -150,
    y: -190,
  };
  const toOffset = {
    x: 0,
    y: -50,
  };
  return new Promise((resolve) => {
    animation(target, fromRect, toRect, fromOffset, toOffset, resolve);
  });
};

const success = (target, fromRect, toRect) => {
  const fromOffset = {
    x: 0,
    y: -15,
  };
  const toOffset = {
    x: -150,
    y: -150,
  };
  return new Promise((resolve) => {
    animation(target, fromRect, toRect, fromOffset, toOffset, resolve);
  });
};

const error = (target, fromRect, toRect) => {
  const fromOffset = {
    x: 0,
    y: 30,
  };
  const toOffset = {
    x: -150,
    y: -100,
  };

  return new Promise((resolve) => {
    animation(target, fromRect, toRect, fromOffset, toOffset, resolve);
  });
};

const animation = (
  target,
  fromRect,
  toRect,
  fromOffset,
  toOffset,
  callback
) => {
  target.style.position = "absolute";

  const from = utils.getOffset(fromRect);

  const left = from.left + from.offsetX + fromOffset.x;
  const top = from.top + from.offsetY + fromOffset.y;

  target.style.left = left + "px";
  target.style.top = top + "px";

  const timelineMax = new TimelineMax({
    onComplete: () => {
      target.remove();
      callback(target);
    },
  });

  let to = utils.getOffset(toRect);

  timelineMax.to(target, DURATION, {
    x: to.left + to.offsetX - left + toOffset.x,
    alpha: 0.6,
    y: to.top + to.offsetY - top + toOffset.y,
  });
};

export default {
  sending,
  success,
  error,
};
