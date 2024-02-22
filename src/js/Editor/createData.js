export default function createData(array, o) {
  array.forEach((el) => {
    const key = el.dataset ? el.dataset.id : null;
    const { value } = el;

    if (!key) return;
    /* eslint-disable */
        o[key] = value;
    });
}