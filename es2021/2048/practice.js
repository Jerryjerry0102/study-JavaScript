const data = [
  [0, 2, 4, 2],
  [0, 8, 2, 2],
  [2, 2, 2, 2],
  [0, 16, 0, 4],
];

const newData = [[], [], [], []];

data.forEach((row, r) => {
  row.forEach((cell, c) => {
    if (cell) {
      newData[r].push(cell);
    }
  });
});
[1, 2, 3, 4].forEach((row, r) => {
  [1, 2, 3, 4].forEach((cell, c) => {
    data[r][c] = newData[r][c] || 0;
  });
});
console.log(newData);
console.log(data);
