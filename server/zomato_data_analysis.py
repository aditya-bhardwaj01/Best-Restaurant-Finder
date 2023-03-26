import pickle
import pandas as pd
import numpy as np

data = pickle.load(open('most_famous_rest_type.pkl', 'rb'))

def most_famous_rest_type(type):
    casual = data[data['rest_type'].str.contains(type)].sort_values(by=['count'], ascending=False)
    return casual

def get_rest_types():
    all_rest = data['rest_type'].unique()
    rest_types = []
    for rest_type in all_rest:
        words = rest_type.split(',')
        rest_types.extend(words)

    for i in range(len(rest_types)):
        rest_types[i] = rest_types[i].strip()

    return rest_types


# print(most_famous_rest_type('Casual Dining'))
rest_types = set(get_rest_types())