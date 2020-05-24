const getOffset = (rect) => {
  const offsetX = (rect.right - rect.left) / 2;
  const offsetY = (rect.right - rect.left) / 2;
  return {
    right: rect.right,
    left: rect.left,
    top: rect.top,
    bottom: rect.bottom,
    x: rect.x,
    y: rect.y,
    offsetX,
    offsetY,
  };
};

export default {
  getOffset
};
