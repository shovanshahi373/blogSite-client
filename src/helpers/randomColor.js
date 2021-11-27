const colors = [0, 60, 120, 180, 270, 360, 200, 100];

const getColor = (name = "") => {
  const index = Math.floor((name.length * 32) / 15) % colors.length;
  return colors[index];
};

export default getColor;
