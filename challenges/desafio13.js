const totalMilisecondsInSeconds = 1000;
const totalSecondsMinute = 60;
const totalMilisecondsByMinute = totalSecondsMinute * totalMilisecondsInSeconds;

db.trips.aggregate([
  { $match: {
    $and: [
      { startTime: { $gte: ISODate("2016-03-10T00:00:00.090Z") } },
      { startTime: { $lte: ISODate("2016-03-10T23:59:59.090Z") } },
    ],
  } },
  { $addFields: {
    tripDuration: {
      $divide: [{ $subtract: ["$stopTime", "$startTime"] }, totalMilisecondsByMinute] },
  } },
  { $group: {
    _id: null,
    duracaoMedia: { $avg: "$tripDuration" },
  } },
  { $project: {
    _id: 0,
    duracaoMediaEmMinutos: { $round: ["$duracaoMedia", 0] },
  } },
]);
