import math

# Precompute primes using the Sieve of Eratosthenes up to a certain limit
def sieve(limit):
    sieve_list = [True] * (limit + 1)
    sieve_list[0] = sieve_list[1] = False
    for i in range(2, int(math.sqrt(limit)) + 1):
        if sieve_list[i]:
            for j in range(i * i, limit + 1, i):
                sieve_list[j] = False
    return [i for i in range(2, limit + 1) if sieve_list[i]]

# Efficient prime factor sum using precomputed primes
def prime_factors_sum(n, primes):
    result = 0
    original_n = n
    for prime in primes:
        if prime * prime > n:  # No need to check beyond sqrt(n)
            break
        while n % prime == 0:
            result += prime
            n //= prime
    if n > 1:  # If remaining n is prime
        result += n
    return result if result != 0 else original_n

# Main function to find the smallest number n can become
def smallest_prime_value(n: int) -> int:
    limit = int(math.sqrt(n)) + 1
    primes = sieve(limit)
    while True:
        sum_factors = prime_factors_sum(n, primes)
        if sum_factors == n:
            break
        n = sum_factors
    return n

# Test cases including edge cases
print(smallest_prime_value(9))    # Output:
