from math import exp

class LogisticRegression:
    def __init__(self):
        self.theta = [5.99257628, -1.06451169, -0.05178931, -2.75935767, -0.29326829,  0.14132016, -0.2381223]

    def h(self, x_n):
        z = sum(x_i * theta_i for x_i, theta_i in zip(x_n, self.theta))
        return 1 / (1 + exp(-z))
    
    def predict(self, xi):
        xi = [[1] + row for row in xi]
        prob = [self.h(x_i) for x_i in xi]
        return [round(p) for p in prob]
