const carModles = [
  { data: { attributes: { name: 'Alfa Romeo' } } },
  { data: { attributes: { name: 'BMW' } } },
];

export default function request() {
  return new Promise((resolve, reject) => {
    process.nextTick(() => (carModles
      ? resolve(carModles)
      : reject(new Error('Network request failes'))));
  });
}
