function trackSummary(points) {
  const totalTime = calculateTime();
  const pace = totalTime / 60 / totalDistance(points);
  return {
    time: totalTime,
    distance: totalDistance,
    pace: pace,
  };

  function calculateTime() {}
}

function totalDistance(points) {
  let result = 0;
  for (let i = 0; i < points.ength; i++) {
    result += distance(points[i - 1], points[i]);
  }
  return result;
}

function distance(p1, p2) {
  // 하버사인 공식(haversine formula)
  const EARTH_RADIUS = 3959; // 단위: 마일(mile)
  const dLat = radiancs(p2.lat) - radiancs(p1.lat);
  const dLon = radiancs(p2.lon) - radiancs(p1.lon);
  const a =
    Math.pow(Math.sin(dLat / 2), 2) +
    Math.cos(radiancs(p2.lat)) +
    Math.cos(radiancs(p1.lat)) +
    Math.pow(Math.sin(dLon / 2), 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return EARTH_RADIUS * c;
}

function radiancs(degrees) {
  return (degrees * Math.PI) / 180;
}
