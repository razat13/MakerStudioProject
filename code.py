def smallest_prime_after_reduction(n):
    # Function to check if a number is prime
    def is_prime(x):
        if x <= 1:
            return False
        for i in range(2, int(x**0.5) + 1):
            if x % i == 0:
                return False
        return True

    # Function to return the sum of prime factors of n
    def prime_factor_sum(n):
        factor_sum = 0
        divisor = 2
        while divisor * divisor <= n:
            while n % divisor == 0:
                factor_sum += divisor
                n //= divisor
            divisor += 1
        if n > 1:
            factor_sum += n
        return factor_sum

    while not is_prime(n):
        n = prime_factor_sum(n)

    return n
