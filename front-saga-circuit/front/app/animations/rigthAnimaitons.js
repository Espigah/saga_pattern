import utils from "./utils.js";
import { DURATION } from "./configs.js";

const topline = {
  send(target, fromRect, toRect) {
    return new Promise((resolve) => {
      const fromOffset = {
        x: 140,
        y: -200,
      };
      const toOffset = {
        x: 0,
        y: -80,
      };
      let { timelineMax, from, to } = animation(
        target,
        fromRect,
        toRect,
        fromOffset,
        toOffset,
        resolve
      );

      target.style.left = from.x + "px";
      target.style.top = from.y + "px";

      timelineMax
        .to(target, DURATION, {
          x: to.x,
        })
        .to(target, DURATION, {
          alpha: 0.6,
          y: to.y,
        });
    });
  },
  receive(target, fromRect, toRect) {
    return new Promise((resolve) => {
      const fromOffset = {
        x: -40,
        y: -80,
      };
      const toOffset = {
        x: 140,
        y: -140,
      };
      let { timelineMax, from, to } = animation(
        target,
        fromRect,
        toRect,
        fromOffset,
        toOffset,
        resolve
      );

      target.style.left = from.x + "px";
      target.style.top = from.y + "px";

      timelineMax
        .to(target, DURATION/2, {
          y: to.y,
        })
        .to(target, DURATION/2, {
          alpha: 0.6,
          x: to.x,
        });
    });
  },
};

const middleline = {
  send(target, fromRect, toRect) {
    return new Promise((resolve) => {
      const fromOffset = {
        x: 140,
        y: -200,
      };
      const toOffset = {
        x: -50,
        y: 0,
      };
      let { timelineMax, from, to } = animation(
        target,
        fromRect,
        toRect,
        fromOffset,
        toOffset,
        resolve
      );

      target.style.left = from.x + "px";
      target.style.top = from.y + "px";

      timelineMax.to(target, DURATION, {
        alpha: 0.6,
        x: to.x,
      });
    });
  },
  receive(target, fromRect, toRect) {
    return new Promise((resolve) => {
      const fromOffset = {
        x: -50,
        y: 20,
      };
      const toOffset = {
        x: 150,
        y: 40,
      };
      let { timelineMax, from, to } = animation(
        target,
        fromRect,
        toRect,
        fromOffset,
        toOffset,
        resolve
      );

      target.style.left = from.x + "px";
      target.style.top = from.y + "px";

      timelineMax.to(target, DURATION, {
        alpha: 0.6,
        x: to.x,
      });
    });
  },
};

const bottomline = {
  send(target, fromRect, toRect) {
    return new Promise((resolve) => {
      const fromOffset = {
        x: 140,
        y: -200,
      };
      const toOffset = {
        x: -30,
        y: 30,
      };
      let { timelineMax, from, to } = animation(
        target,
        fromRect,
        toRect,
        fromOffset,
        toOffset,
        resolve
      );

      target.style.left = from.x + "px";
      target.style.top = from.y + "px";

      timelineMax
        .to(target, DURATION / 2, {
          x: to.x,
        })
        .to(target, DURATION / 2, {
          alpha: 0.6,
          y: to.y,
        });
    });
  },
  receive(target, fromRect, toRect) {
    return new Promise((resolve) => {
      const fromOffset = {
        x: -40,
        y: 0,
      };
      const toOffset = {
        x: 120,
        y: -100,
      };
      
      let { timelineMax, from, to } = animation(
        target,
        fromRect,
        toRect,
        fromOffset,
        toOffset,
        resolve
      );

      target.style.left = from.x + "px";
      target.style.top = from.y + "px";

      timelineMax
        .to(target, DURATION / 2, {
          y: to.y,
        })
        .to(target, DURATION / 2, {
          alpha: 0.6,
          x: to.x,
        });
    });
  },
};

const animation = (
  target,
  fromRect,
  toRect,
  fromOffset = { x: 0, y: 0 },
  toOffset = { x: 0, y: 0 },
  callback
) => {
  target.style.position = "absolute";

  const from = utils.getOffset(fromRect);

  const left = from.left + from.offsetX + fromOffset.x;
  const top = from.top + from.offsetY + fromOffset.y;

  const timelineMax = new TimelineMax({
    onComplete: () => {
      target.remove();
      callback(target);
    },
  });

  let to = utils.getOffset(toRect);

  return {
    to: {
      x: to.left + to.offsetX - left + toOffset.x,
      y: to.top + to.offsetY - top + toOffset.y,
    },
    from: {
      x: from.left + from.offsetX + fromOffset.x,
      y: from.top + from.offsetY + fromOffset.y,
    },
    timelineMax,
  };
};

export default {
  topline,
  middleline,
  bottomline,
};
