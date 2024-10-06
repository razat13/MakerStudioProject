import math

# Helper function to find the sum of prime factors
def prime_factors_sum(n):
    result = 0
    # Check for the number of 2s that divide n
    while n % 2 == 0:
        result += 2
        n //= 2
    # n must be odd at this point so we can skip even numbers
    for i in range(3, int(math.sqrt(n)) + 1, 2):
        while n % i == 0:
            result += i
            n //= i
    # This condition is to check if n is a prime number
    if n > 2:
        result += n
    return result

# Main function to find the smallest number n can become
def smallest_prime_value(n: int) -> int:
    while True:
        sum_factors = prime_factors_sum(n)
        if sum_factors == n:  # If the number is prime and can't be broken down further
            break
        n = sum_factors
    return n

# Test cases
print(smallest_prime_value(9))  # Output: 5
print(smallest_prime_value(2))  # Output: 2
