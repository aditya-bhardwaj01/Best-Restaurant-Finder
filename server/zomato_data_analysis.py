import pickle
import pandas as pd
import numpy as np
import matplotlib
import matplotlib.pyplot as plt
import seaborn as sns
import os
import collections

matplotlib.use('agg')

stats_location_folder = "../client/src/images/stats/location"

famous_rest_type = pickle.load(open('./datasets/most_famous_rest_type.pkl', 'rb'))
maindata = pickle.load(open('./datasets/maindata.pkl', 'rb'))
forLocation = pickle.load(open('./datasets/forLocation.pkl', 'rb'))

# For famous restaurant type
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

##############################################################################

# Getting results for location search
def getLocations(searchedLocation):
    all_location = maindata['location'].unique()
    matchedLocation = []
    
    for location in all_location:
        if searchedLocation.lower() in location.lower():
            matchedLocation.append(location)
    return matchedLocation

##################################################################################

# Results for the location searched
# Best budget restaurant
def best_budget_restaurant(location, rest_type, cost):
    return forLocation[
        (forLocation['location'].apply(lambda x: x.lower()) == location.lower()) & 
        (forLocation['rest_type'].str.lower().str.contains(rest_type.lower())) &  
        (forLocation['cost'] <= cost)
    ].sort_values(by=['rate'], ascending=False)[['name', 'address', 'rate', 'phone', 'rest_type', 'cuisines', 'location', 'cost']].drop_duplicates(subset='name')


# Rating distribution in a location
def produceRatingDist(location):
  rating = forLocation[forLocation['location'].apply(lambda x: x.lower()) == location.lower()]['rate'].value_counts()
  fig, ax = plt.subplots(figsize=(12, 8))
#   plt.figure(figsize=(12, 8))
  sns.barplot(x = rating.index, y = rating.values)
  plt.xlabel('Rating')
  plt.ylabel('Count')

  file_path = os.path.join(stats_location_folder, (location+"_rating_dist.png"))
  fig.canvas.draw()
  plt.savefig(file_path, bbox_inches='tight')
  plt.close()

# Cuisines distribution in a location
def produceCuisinesDist(location):
    new_data = forLocation[forLocation['location'].apply(lambda x: x.lower() == location.lower())]
    cuisines = []
    for i in new_data['cuisines']:
        if not isinstance(i, str):
            continue
        for j in i.split(','):
            cuisines.append(j.strip())
            
    counter = collections.Counter(cuisines)
    top_items = counter.most_common(20)
    x1 = [item[0] for item in top_items]
    y1 = [item[1] for item in top_items]
    
    fig, ax = plt.subplots(figsize=(12, 8))
    # plt.figure(figsize=(12, 8))
    sns.barplot(x = x1, y = y1)
    plt.xlabel('Cuisines')
    plt.ylabel('Count')
    plt.xticks(rotation=90)

    file_path = os.path.join(stats_location_folder, (location+"_cuisines_dist.png"))
    fig.canvas.draw()
    plt.savefig(file_path, bbox_inches='tight')
    plt.close()

# Reataurant type distribution in a location
def produceRestaurantTypeDist(location):
    new_data = forLocation[forLocation['location'].apply(lambda x: x.lower() == location.lower())]
    rest_type = []
    for i in new_data['rest_type']:
        if not isinstance(i, str):
            continue
        for j in i.split(','):
            rest_type.append(j.strip())
            
    counter = collections.Counter(rest_type)
    top_items = counter.most_common(20)
    x1 = [item[0] for item in top_items]
    y1 = [item[1] for item in top_items]
    
    fig, ax = plt.subplots(figsize=(12, 8))
    # plt.figure(figsize=(12, 8))
    sns.barplot(x = x1, y = y1)
    plt.xlabel('Restaurant type')
    plt.ylabel('Count')
    plt.xticks(rotation=90)

    file_path = os.path.join(stats_location_folder, (location+"_resttype_dist.png"))
    fig.canvas.draw()
    plt.savefig(file_path, bbox_inches='tight')
    plt.close()

# Average cost for different rating range in a location
def produceAvgCostForRatingRange(location):
    display = []
    new_df = forLocation[forLocation['location'].apply(lambda x: x.lower() == location.lower())]
    range_df = new_df[new_df['rate'] >= 4.0]
    if range_df.shape[0] > 0:
        display.append(1)
        display.append(int(range_df['cost'].mean()))
        
    range_df = new_df[(new_df['rate'] >= 3.0) & (new_df['rate'] < 4.0)]
    if range_df.shape[0] > 0:
        display.append(2)
        display.append(int(range_df['cost'].mean()))
        
    range_df = new_df[new_df['rate'] < 3.0]
    if range_df.shape[0] > 0:
        display.append(3)
        display.append(int(range_df['cost'].mean()))
        
    return display


#################################################################################################

# Getting results for restaurant search
def getRestaurants(searchedRestaurant):
    all_restaurant = maindata['name'].unique()
    matchedRestaurant = []

    for restaurant in all_restaurant:
        if searchedRestaurant.lower() in restaurant.lower():
            matchedRestaurant.append(restaurant)

    return matchedRestaurant
