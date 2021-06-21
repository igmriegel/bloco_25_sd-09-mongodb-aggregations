db.trips.aggregate([
  { $project: {
    _id: 0,
    startStationName: 1,
    diaDaSemana: { $dayOfWeek: "$startTime" } } },
  { $group: {
    _id: { startStationName: "$startStationName", day: "$diaDaSemana" },
    total: { $sum: 1 } } },
  { $project: {
    _id: 0,
    nomeEstacao: "$_id.startStationName",
    total: "$total" } },
  { $sort: { total: -1 } },
  { $limit: 1 },
]);
