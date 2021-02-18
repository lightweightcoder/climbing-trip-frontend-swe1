export default function createListOfDifficulty() {
  const listOfClimbingDifficulty = ['1', '2', '3', '4', '5.0'];
  for (let i = 1; i < 16; i += 1) {
    listOfClimbingDifficulty.push(`5.${i}`);
  }
  return listOfClimbingDifficulty;
}
