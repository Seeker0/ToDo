const arr = [
  { urgent: true },
  { urgent: false },
  { urgent: false },
  { urgent: false },
  { urgent: true }
];

arr.sort((a, b) => {
  const [at, bt] = [a.urgent, b.urgent];
  if ((at && bt) || (!at && !bt)) return 0;
  if (at && !bt) return -1;
  if (!at && bt) return 1;
});

console.log(arr);
