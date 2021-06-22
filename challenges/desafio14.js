const totalMilisecondsInSeconds = 1000;
const totalSecondsMinute = 60;
const totalSecondsInHour = totalSecondsMinute * totalMilisecondsInSeconds;

db.trips.aggregate([
  { $addFields: {
    tripDuration: {
      $divide: [{ $subtract: ["$stopTime", "$startTime"] }, totalSecondsInHour] },
  } },
  { $group: {
    _id: "$bikeid",
    duracaoMedia: { $avg: "$tripDuration" },
  } },
  { $project: {
    _id: 0,
    bikeId: "$_id",
    duracaoMedia: { $ceil: "$duracaoMedia" } } },
  { $sort: { duracaoMedia: -1 } },
  { $limit: 5 },
]);
