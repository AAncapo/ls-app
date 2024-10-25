const genId = (len = 16) => {
  let id = '';
  const pool = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  while (len >= 0) {
    len -= 1;
    const n = pool[Math.floor(Math.random() * pool.length - 1)];
    id += n;
  }
  return id;
};

export default genId;
