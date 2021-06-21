const totalMilisecondsInSeconds = 1000;
const totalSecondsMinute = 60;
const totalMinutesInHour = 60;
const totalSecondsInHour = totalMinutesInHour * totalSecondsMinute * totalMilisecondsInSeconds;

db.trips.aggregate([
  { $addFields: {
    tripDuration: {
      $divide: [{ $subtract: ["$stopTime", "$startTime"] }, totalSecondsInHour] },
  } },
  { $group: {
    _id: "$usertype",
    duracaoMedia: { $avg: "$tripDuration" },
  } },
  { $project: {
    _id: 0,
    tipo: "$_id",
    duracaoMedia: { $round: ["$duracaoMedia", 2] },
  } },
  { $sort: { duracaoMedia: 1 } },
]);
