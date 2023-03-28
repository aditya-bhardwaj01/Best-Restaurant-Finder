import pickle
import pandas as pd
import numpy as np

famous_rest_type = pickle.load(open('./datasets/most_famous_rest_type.pkl', 'rb'))
maindata = pickle.load(open('./datasets/maindata.pkl', 'rb'))

def most_famous_rest_type(type):
    casual = famous_rest_type[famous_rest_type['rest_type'].str.contains(type)].sort_values(by=['count'], ascending=False)
    return casual

def get_rest_types():
    all_rest = famous_rest_type['rest_type'].unique()
    rest_types = []
    for rest_type in all_rest:
        words = rest_type.split(',')
        rest_types.extend(words)

    for i in range(len(rest_types)):
        rest_types[i] = rest_types[i].strip()

    return rest_types
rest_types = set(get_rest_types())

def getLocations(searchedLocation):
    all_location = maindata['location'].unique()
    matchedLocation = []
    
    for location in all_location:
        if searchedLocation.lower() in location.lower():
            matchedLocation.append(location)
    return matchedLocation

def getRestaurants(searchedRestaurant):
    all_restaurant = maindata['name'].unique()
    matchedRestaurant = []

    for restaurant in all_restaurant:
        if searchedRestaurant.lower() in restaurant.lower():
            matchedRestaurant.append(restaurant)

    return matchedRestaurant
