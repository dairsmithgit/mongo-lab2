// 1.
db.people.aggregate([ {$group: {_id: null, avgAge: {$avg: "$age"}}}]);
// 2.
db.people.aggregate([
    {$group: {
        _id: "$gender",
        avgAge: {$avg: "$age"}
    }}
]);
// 3.
db.people.aggregate([
    {$group: {
        _id: "$gender",
        count: {$sum: 1}
    }}
]);
// 4.
db.people.aggregate([
    {$sort: {age: -1}},
    {$limit: 3}
]);
// 5.
db.people.aggregate([
    { $sort: { age: 1 } },
    {$limit: 5},
    { $project: { full_name: { $concat: ["$first_name", " ", "$last_name",] }, age: true },  }
  ]);
  // patrick offered alt answer to 5 to get it to match the example answer exactly
  db.people.aggregate([
    { $sort: { age: 1 } },
    {$limit: 5},
    { $project: { full_name: { $concat: ["$first_name", " ", "$last_name", " ", { $substrBytes: ["$age", 0, 2]}] }  }  }
  ]);
  // 6.
  db.people.aggregate([
      {$group: {
          _id: "$people.children",
          totalChildren: {$avg: {$size: "$children"}}
      }}
  ]);
  // 7. not right but close?
  db.people.aggregate([
      { $unwind: "$children" },
      { $match: {state: "Michigan"}},
      { $project: {children: {  name: true, age: {$lt: 10} } } }
  ]);
  // 8.
db.people.aggregate([
    { $unwind: "$children" },
    {$group: {
        _id: "$state",
        avgAge: {$avg: "$children.age"}
    }},
    {$sort: {avgAge: -1}}
]);
// 9.
db.orders.aggregate([
    {$group: {
        _id: null,
        totalSales: {$sum: "$total"}
    }}
]);
// 10.
db.orders.aggregate([
    {$match: {date: "2017-05-22"}},
    {$group: {
        _id: null,
        totalSales: {$sum: "$total"}
    }}
]);
// 11.
