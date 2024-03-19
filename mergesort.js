const caseArr = [3, 2, 1, 13, 8, 5, 0, 1];

function mergeSort(arr) {
  if (arr.length === 1) {
    return arr;
  } else {
    const middle = arr.length / 2;
    const left = mergeSort(arr.slice(0, middle));
    const right = mergeSort(arr.slice(middle, arr.length));

    return merge(left, right);
  }
}
function merge(left, right) {
  const result = [];
  let i = 0;
  let j = 0;
  let k = 0;
  while (i < left.length && j < right.length) {
    if (left[i] < right[j]) {
      result[k++] = left[i++];
    } else {
      result[k++] = right[j++];
    }
  }
  for (; i < left.length; i++) {
    result[k++] = left[i++];
  }
  for (; j < right.length; j++) {
    result[k++] = right[j++];
  }
  return result;
}

console.log(mergeSort(caseArr));
