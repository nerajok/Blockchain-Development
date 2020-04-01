
Ex1:

db.getCollection('Restaurants').find()


Ex2:

db.getCollection('Restaurants').find(
    {"cuisine": {$eq: 'Japanese'}},
    {"cuisine":1,"_id":1,"name":1,"city":1,"restaurant_id":1 }).sort({'restaurant_id':1})
	
Ex3:

db.getCollection('Restaurants').find(
{"cuisine":{$eq:"Delicatessen"}, "city":{$ne:"Brooklyn"}},
{"_id":0,"cuisine":1,"name":1,"city":1}
).sort({"name":1})

Ex4:

db.getCollection('Restaurants').find(
    {$and:[{"cuisine":{$in:["Bakery","Chicken","Hamburgers","American"]}},
    {"city":{$ne:"Brooklyn"}},
    {"restaurant_id":{$gt:"400000"}}],
    },
    {"_id":0,"cuisine":1,"name":1,"city":1,"restaurant_id":1}
 ).sort({"restaurant_id":-1})
 
 // In the expected output screenshot given in the question, restaurant_id is arranged in ascending order. The above query answers to descending order as 
 // required in the question. To change the sort order to ascending, the "minus" sign in the last line of query needs to be removed.
 
Ex5:

db.getCollection('Restaurants').find(
	{$or:[{"address.zipcode":{$eq:"17988"}},{"address.street":{$eq:"Street"}},{"name":{$eq:"Thai"}}]})
