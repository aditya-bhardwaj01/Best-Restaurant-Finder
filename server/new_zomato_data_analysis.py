#!/usr/bin/env python
# coding: utf-8

# In[2]:


import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns
import re
import ast
import missingno as msno
from geopy.geocoders import Nominatim
import folium
from tqdm import tqdm
from wordcloud import WordCloud
from wordcloud import ImageColorGenerator
from wordcloud import STOPWORDS


# In[3]:


df = pd.read_csv('./data/zomato.csv')


df.drop_duplicates(inplace=True)
df = df[~df['rate'].isnull()]


# In[10]:


df = df[~(df['rate'] == 'NEW')]


# In[13]:


df = df[~(df['rate'] == '-')]


# In[14]:


df = df[~df['approx_cost(for two people)'].isnull()]


# In[16]:


df = df.rename(columns={'approx_cost(for two people)':'cost','listed_in(type)':'type','listed_in(city)':'city'})


# In[17]:


top20rest = df['name'].value_counts()[:20]


# In[18]:


plt.figure(figsize=(12, 8))
sns.barplot(x=top20rest.values, y=top20rest.index, data=df, orient='h', palette='Set2')

plt.xlabel('Count')
plt.ylabel('Restaurant')
plt.title('Most famous restaurants')

plt.show()


# In[19]:


book_table = df['book_table'].value_counts()/df.shape[0]


# In[20]:


plt.figure(figsize=(8,6))
plt.pie(book_table, labels=book_table.index)
plt.title('Distribution of restaurants in Bengaluru offering book table')

plt.show()


# In[21]:


plt.figure(figsize=(12,11))
rate = df['rate'].apply(lambda x:float(x.split('/')[0]))
sns.distplot(rate, bins=20)


# ## Cost vs Rating

# In[22]:


c = df['cost'].dropna()
cost = c.apply(lambda x:int(x.replace(',','')))


# In[23]:


plt.figure(figsize=(7,5),dpi=100)

sns.scatterplot(x=rate,y=cost, hue='online_order', data=df)

plt.show()


# In[24]:


plt.figure(figsize=(10,7))
sns.distplot(cost)


# ## Votes vs Online order

# In[25]:


plt.figure(figsize=(8,6))
col = df['online_order']
col = col.replace({'Yes':'Accepting online orders', 'No':'Not accepting online orders'})
sns.boxplot(x = col, y='votes', data=df, palette='Set3')
plt.show()


# ## Top 10 restaurant types in restaurant

# In[26]:


to20rest_type = df['rest_type'].value_counts()[:20]


# In[27]:


plt.figure(figsize=(12,8))

sns.barplot(x=to20rest_type.values, y=to20rest_type.index, orient='h', palette='Set3')

plt.xlabel('Count')
plt.ylabel('Restaurant type')
plt.title('Top 20 restaurant types in Bengaluru')
plt.show()


# ## Cost factor for restaurants accepting online order

# In[28]:


plt.figure(figsize=(7, 5), dpi=100)
sns.boxplot(y = cost)
plt.ylabel('Price')
plt.xlabel('Accepting online orders')
plt.show()


# ## Top areas in Bengaluru for food

# In[29]:


plt.figure(figsize=(10, 8))

rest_locations = df['location'].value_counts()[:20]
sns.barplot(x=rest_locations.values, y=rest_locations.index, orient='h', palette='Set2')

plt.ylabel('Location')
plt.xlabel('Count')
plt.title('Top 20 foodie areas in Bengaluru')
plt.show()


# ## Converting cost column to float type

# In[30]:


df['cost'] = df['cost'].str.replace(',', '')
df['cost'] = df['cost'].astype(int)


# In[31]:


#Replacing all the zeroes with 
# df['col1'] = df['col1'].replace(0, mean_non_zero)
# df['cost'].isnull().sum()
df.head(1)


# ## Finding best budget restaurant in any area

# In[32]:


def best_rest(location, rest_type, cost):
    return df[(df['location'] == location) & (df['rest_type'].str.contains(rest_type)) & (df['cost'] <= cost)].sort_values(by=['rate'], ascending=False)[['name','address','rate','phone','rest_type','cuisines','location','cost']].drop_duplicates(subset='name')
# ,'address','rate','phone','rest_type','cuisines','location','cost'


# In[33]:


best_rest('Banashankari', 'Cafe', 300)


# ## Most famous cuisines in Bengaluru

# In[34]:


df_1=df.groupby(['location','cuisines']).agg('count')
data_cuisines_loc=df_1.sort_values(['url'],ascending=False).groupby(['location'],
                as_index=False).apply(lambda x : x.sort_values(by="url",ascending=False).head(3))['url'].reset_index().rename(columns={'url':'count'})


# In[35]:


data_cuisines_loc.head(10)


''' Geopy to be done later
# ## Extracting location information using Geopy

# In[36]:


# location = pd.DataFrame({'Name': df['location'].unique()})
# location['Name'] = location['Name'].apply(lambda x: "Bangalore, " + str(x))

# lat_lon = []
# geolocator = Nominatim(user_agent="geoapiExercises")
# for name in location['Name']:
#     loc = geolocator.geocode(name)
#     if loc is None:
#         lat_lon.append('None')
#     else:
#         lat_lon.append((loc.latitude, loc.longitude))
        
# location['geo_loc'] = lat_lon


# In[37]:


# location.to_csv('./data/locations.csv', index=False)


# ## Heatmap of restaurant count on each location

# In[38]:


locations = pd.read_csv('./data/locations.csv')


# In[39]:


locations.head()


# In[40]:


locations = locations[~(locations['geo_loc'] == 'None')]


# In[41]:


locations['latitude'] = locations['geo_loc'].apply(lambda x: float(x[1:-1].split(',')[0]))
locations['longitude'] = locations['geo_loc'].apply(lambda x: float(x[1:-1].split(',')[1]))


# In[42]:


locations = locations.drop(['geo_loc'], axis=1)


# In[43]:


m = folium.Map(location=[locations['latitude'].mean(), locations['longitude'].mean()], zoom_start=13)


# In[44]:


folium.plugins.HeatMap(data=locations[['latitude', 'longitude']].values.tolist(), radius=8, max_zoom=13).add_to(m)


# In[45]:


m.save('heatmap.html')
m
'''


# ## Which are the most popular cuisines in Bengaluru

# In[46]:


cuisines = df[df['cuisines'].notnull()]['cuisines'].value_counts()[:20]


# In[47]:


plt.figure(figsize=(12, 8))
sns.barplot(x=cuisines.values, y=cuisines.index, orient='h', palette='Set2')

plt.xlabel('Count')
plt.ylabel('Cuisines')
plt.title('Most famous cuisines in Bengaluru')

plt.show()


# ## Hotspot of North India restaurant

# In[48]:


def produce_data(cuisine):
    cuisines = df[df['cuisines'].notnull()][['cuisines','location']]
    return cuisines[(cuisines['cuisines'].str.contains(cuisine))].reset_index()


# In[49]:


produce_data('North Indian')


# ## Analysing restaurant chains

# In[50]:


df_1=df.groupby(['rest_type','name']).agg('count')
data=df_1.sort_values(['url'],ascending=False).groupby(['rest_type'], as_index=False).apply(lambda x : x.sort_values(by="url",ascending=False).head(3))['url'].reset_index().rename(columns={'url':'count'})


# ## Which are most popular casual dining restaurant?

# In[51]:


casual = data[data['rest_type'].str.contains('Casual Dining')].sort_values(by=['count'], ascending=False).head(5)
casual


# ## Analysing Reviews

# In[52]:


# all_rating = []
# regex = r'\(\'Rated.*?\)'

# for i in tqdm(df.index):
#     split_string = re.findall(regex, df['reviews_list'][i][1:-1])
#     for rating in split_string:
#         if rating:
#             all_rating.append([df['name'][i], rating[8:11], rating[23:-2]])
# # df['reviews_list'][0][1:-1]


# In[53]:


# all_rating[:1]


# In[54]:


# rating_df = pd.DataFrame(all_rating,columns=['name','rating','review'])
# rating_df['review']=rating_df['review'].apply(lambda x : re.sub('[^a-zA-Z0-9\s]',"",x))


# In[55]:


# rating_df.head()


# In[56]:


# rating_df.to_csv('./data/Ratings.csv')


# In[57]:


rating_df = pd.read_csv('./data/Ratings.csv')


# In[58]:


rating_df = rating_df.drop(['Unnamed: 0'], axis=1)
rating_df.head()


# ## Wordcloud of reviews of restaurants chain

# In[62]:


count = 0
for i in tqdm(rating_df.index):
    if not isinstance(rating_df['review'][i], str):
        print(rating_df['review'][i])
        count = count+1
count


# In[ ]:




