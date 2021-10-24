function eratos(n) {
  const primes = new Array(n + 1).fill(true);
  primes[0] = false;
  primes[1] = false;

  for (let i = 2; i * i <= n; i++) {
    if (primes[i]) {
      for (let j = i * i; j <= n; j += i) {
        primes[j] = false;
      }
    }
  }

  return primes;
}
