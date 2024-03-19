function fibs(n) {
  let arr = [0, 1];

  for (let i = 2; i < n; i++) {
    arr[i] = arr[i - 1] + arr[i - 2];
  }
  return arr;
}
console.log(fibs(6));

function fibsRec(n, arr = [0, 1]) {
  if (arr.length === n) {
    return arr;
  } else {
    const next = arr[arr.length - 1] + arr[arr.length - 2];
    arr.push(next);
    return fibsRec(n, arr);
  }
}
console.log(fibsRec(6));
