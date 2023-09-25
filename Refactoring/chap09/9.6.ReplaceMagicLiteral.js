function potentialEnergy(mass, height) {
  return mass * 9.81 * height;
}

// better
const STANDARD_GRAVITY = 9.81;
function potentialEnergy(mass, height) {
  return mass * STANDARD_GRAVITY * height;
}
