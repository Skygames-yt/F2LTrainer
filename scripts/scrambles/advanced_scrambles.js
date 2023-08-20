const advancedScrambles = {
  1: [
    "F R2 F' R2 U",
    "R F R2 F' R'",
    "U' F R2 F' R2 U",
    "U2 F R2 F' R2 U",
    "U F R2 F' R2 U",
    "R U2 R2 U2 R U",
    "B F' U2 B' F U",
    "F' U' B U' B' F",
    "B F' U2 B' U' F U2",
    "B U' F' U2 B' F U",
    "B U2 F' U2 B' F U",
    "B U F' U2 B' F U",
    "F' U B U B' F U",
    "B F' U' F U' B' U",
    "B' R B F R2 F' R'",
    "L R F R2 F' L' R'",
    "B' F R2 F' R' B R'",
    "F R2 B' F' R' B R'",
    "F' U2 B' F R B R'",
    "R U2 R2 F' U2 F R",
  ],
  2: [
    "R U2 B U B2 R' B",
    "R U2 B' R' B2 U B' U'",
    "R U' R' B' R B R' U2",
    "F D R' D' F2 U F U2",
    "F D R' D' F2 U2 F U",
    "F' L' U2 L F R' U R",
    "F' L' R' U' R U2 L F",
    "F' R' U' L' R U2 L F",
    "F' U F U2 R B' R' B",
    "R U' R' B' R B U' R' U'",
    "F D F' U' F R' D' F' U'",
    "B R B U2 B' R' U B' U'",
    "R B U2 B' R' B U B' U'",
    "B R U' B U' B' R' B' U'",
    "D' L F L' D F' U' F R'",
    "F' U' L' U' L F R' U R",
    "F' R B' R' B R' U' R F",
    "F' R' U' R U' L' U' L F",
    "D F' L' R' U' L R F D'",
    "D B' D' U' R' D U B D'",
    "R U' B' R' B R B' R' B",
    "R U' B L' B L B R' B",
    "F' R B' R' F D' R' D B",
  ],
  3: [
    "L' R U2 L R' U'",
    "F' U2 F2 U2 F' U'",
    "F' U' F2 U F' U'",
    "R U L' U L R'",
    "D' F2 D R2 U' R2",
    "D' L2 U' L2 D F2",
    "R U' L' U' L R' U'",
    "L' U' R U2 L R' U'",
    "L' U2 R U2 L R' U'",
    "L' U R U2 L R' U'",
    "R' F2 R F U' F U'",
    "R' F2 R F U2 F U'",
    "R' F2 R F U F U'",
    "L' R U R' U L U'",
    "L' R U2 L U R' U2",
    "L' R B U2 B' L R'",
    "L F' L' R' F2 R F",
    "R U2 L R' F' L' F",
    "L R' F2 R F L' F",
    "R' F2 L R F L' F",
    "B' F' R' F2 R B F",
    "R U' R' U L' U2 L",
  ],
  4: [
    "R' D' F D R2 U2 R' U'",
    "R' D' F D R2 U' R' U2",
    "F2 L' U' L F U F2 U2",
    "F' U F L F' L' F U2",
    "F' U2 L F L2 U' L U",
    "R B F U F' U2 B' R'",
    "R F U B F' U2 B' R'",
    "R B U2 B' R' F U' F'",
    "R U' R' U2 F' L F L'",
    "L' F' U F L R U2 R' U'",
    "L' F' U F L R U' R' U2",
    "R F R U R' U F' R' U2",
    "R B' F U F' U' B R' U2",
    "R' D' R U R' F D R U",
    "F' U F L F' L' U F U",
    "L' F' L' U2 L F U' L U",
    "F' L' U2 L F L' U' L U",
    "L' F' U L' U L F L U",
    "F' U2 F L' U' L R U R'",
    "R B U2 B' F U' F' U R'",
    "R U' F R' U2 R F' U R'",
    "F' U2 F L' R U' L U R'",
    "R F' L F L' F U F' R'",
    "R F U F' U B U B' R'",
    "R U B U B' R' F U' F'",
  ],
  5: [
    "L2 D F2 D' L2 U2",
    "B2 D' R2 D B2 U2",
    "D2 R2 D B2 D' R2 D2",
    "D2 F2 D' L2 D F2 D2",
    "F U2 L2 F' L2 U2 F' U'",
    "L R F U2 F' L' R' U2",
    "R2 B R' B2 R B' R2 U2",
    "R2 B' L' B2 L B R2 U2",
    "B' F' R' U2 R B F U2",
    "L2 B2 D F2 D' B2 L2 U2",
    "B2 R2 U' R2 U R2 B2 U2",
    "B2 L2 D' R2 D L2 B2 U2",
    "R' U2 B2 R B2 U2 R U",
    "R2 B2 R' U2 B U2 B2 R'",
    "F2 L2 F U2 L' U2 L2 F",
  ],
  6: [
    "R B' U2 B U' R'",
    "B' U' B R U2 R'",
    "R B' U' B U2 R'",
    "L U L' F' U2 F",
    "F' L U L' U2 F",
    "B' U' R U2 R' B",
    "B' R U R' U B U'",
    "L F' U' F U' L' U",
    "B' U' B U R U R'",
    "L' B L B' R U R'",
    "L' R B L B' U R'",
    "L U L' U' F' U' F",
    "B L' B' L F' U' F",
    "B F' L' B' L U' F",
    "L D F' U' F D' L'",
  ],
  7: [
    "B F' U2 B' U2 F",
    "L' R2 B' R2 B L",
    "R' U' R' B' R2 B",
    "R' U2 R' B' R2 B",
    "R' U R' B' R2 B",
    "R F R2 F' U2 R' U'",
    "R F R2 F' U' R' U2",
    "B' R B U' R2 U R",
    "L R U' R2 U L' R",
    "B' R' B U2 F R' F'",
    "R' B U2 B' F R' F'",
    "R' B' R2 B F R F'",
    "R' B' F R2 B R F'",
    "B U' F' U2 B' U2 F",
    "B U F' U2 B' U2 F",
    "F' U B U B' U2 F",
    "R' F R' B' F' R2 B",
    "B' R B R B' R2 B",
  ],
  8: [
    "B U' R U' R' B'",
    "B U2 R U' R' B'",
    "B U R U' R' B'",
    "F' R' U' R U2 F U2",
    "F' R' U' R U' F U",
    "R U F R' F' U' R'",
    "F' U2 F U2 R' U' R",
    "F' U' F U R' U' R",
    "R' F R F' R' U' R",
    "F D U R' D' U' F'",
    "L F D R' D' F' L'",
    "R U' R' U B U' B'",
    "B L R U' L' R' B'",
  ],
  9: [
    "L' R U2 L U2 R'",
    "F U' F L F2 L'",
    "F U2 F L F2 L'",
    "F U F L F2 L'",
    "F' R' F2 R U F U2",
    "F' R' F2 R U2 F U",
    "R U' L' U' L U2 R'",
    "L' U' R U2 L U2 R'",
    "L' U R U2 L U2 R'",
    "F L F2 L' R' F' R",
    "F L R' F2 L' F' R",
    "L F L' U2 R' F R",
    "F L' U2 L R' F R",
    "L F' L' U F2 U' F'",
    "B' F' U F2 U' B F'",
  ],
  10: [
    "L' U' F' U F L",
    "L' U2 F' U F L",
    "L' U F' U F L",
    "R F U F' U R' U'",
    "R F U F' U2 R' U2",
    "R' D' U' F D U R",
    "F2 U F U' R' F2 R",
    "R U R2 D' F' D R",
    "R U R' U' F U F'",
    "R U2 R' U2 F U F'",
    "F R' F' R F U F'",
    "F2 R' F2 R F U F'",
    "F' U' R' F R U F",
    "F' U F U' L' U L",
    "L' B' F' U B F L",
    "B' R' D' F D R B",
  ],
  11: [
    "R U L' U L U2 R' U'",
    "R U L' U L U' R' U2",
    "L F L' F L F' L' U2",
    "R U' R' U2 L' U L U2",
    "F' U L F L2 U L U2",
    "F' R' F' L R F L' U",
    "L' U' R U' R' U' L U",
    "L' U2 R U' R' U' L U",
    "L' U R U' R' U' L U",
    "R U2 R' U' L' U L U",
    "R F U' F' L' U' L R'",
    "R B L' U2 L U B' R'",
    "L' R U2 L B U B' R'",
    "L' R U' R U' L U R2",
    "R U' L' R U' L U R2",
    "F' R' F R F L' U2 L",
  ],
  12: [
    "R U' R' U' F U' F' U2",
    "F' U' F U' L' U' L U2",
    "F' U' R' F R U' F U",
    "L D F D' L' R U' R'",
    "R B F U B' F' U' R'",
    "R U' F R U2 R' F' R'",
    "L' R U' L R' F U2 F'",
    "B' F D R' D' B U2 F'",
    "F D F R F' R' D' F'",
    "F' U F L F' L' U' F",
    "R U' R' D' F U2 F' D",
    "F' R' F' R F L' U L",
    "B R F U F' U' R' B'",
    "B' R F U F' U' R' B",
  ],
  13: [
    "F' U' B F U' B' U'",
    "B F' U F U B' U'",
    "F' U B F U B' U'",
    "F' U2 F U B U' B' U'",
    "B U' F' U F U B' U'",
    "B U2 F' U F U B' U'",
    "B U F' U F U B' U'",
    "R F R B' F' R' B U'",
    "F' U' B U' B' U F U2",
    "R U' B' R' B2 U' B' U2",
    "F' U F U2 B U' B' U2",
    "B' R' B R' B' R B U2",
    "F' U' B U' B' U2 F U",
    "B F' U2 B' L' U' L F",
    "F' L' B U2 B' U' L F",
    "F' R' U R B U B' F",
    "R F R' F' R' B U2 B'",
  ],
  14: [
    "R U2 R' B U B' U2",
    "R U F R' F' U R' U'",
    "F' U F U R' U R U2",
    "R U R' U B U B' U2",
    "R U' R' B' R B U R'",
    "B F' U B' F R' U2 R",
    "L R' D' F D L' U2 R",
    "F' R' U' R F2 R' F' R",
    "R' D' R' F' R F D R",
    "F' L' R' U' L R U F",
    "B' D' R' D B F' U F",
    "F' U R' F' U2 F R F",
    "F' U F D R' U2 R D'",
    "L F' R' U' R U F L'",
    "L' F' R' U' R U F L",
    "R F R F' R' B U' B'",
  ],
  15: [
    "L U' L' R U' R' U'",
    "L R U' L' U' R' U'",
    "B' U' B F' U' F U'",
    "B' U' F' U' B F U'",
    "B' U' F' U' F U' B",
    "R U' L U' L' U' R' U'",
    "R U2 L U' L' U' R' U'",
    "R U L U' L' U' R' U'",
    // "R' B2 R B U2 B R U'",
    "B' U2 B U F' U' F U'",
    "B' U' F' U2 B U F U'",
    "L F L F' L' F' L' U'",
    "L D R U2 R' D' L' U'",
    "L U R U R' U2 L' U2",
    "L U' L' U R U2 R' U",
    "R B' L' B L U2 B R'",
    "L R F U2 F' R' U' L'",
    "B' F' L' U2 L F U2 B",
  ],
  16: [
    "L U2 L' F' U F U2",
    "F2 L F U' L' F U2",
    "F' U' L U' L' F U2",
    "F' U2 L U' L' F U2",
    "F' U L U' L' F U2",
    "B' R U R' U' B U2",
    "R B2 U' B U B2 R'",
    "L U2 F' U F U2 L'",
    "L U' L' U' F' U F U'",
    "L U' L' F R' F' R U2",
    "L U' L' U F' U' F U2",
    "L U L' U F' U F U2",
    "B' U' R U2 R' U' B U2",
    "L U2 F' U F U L' U",
    "B' U2 B R B' U' B R'",
    "B' R U B' R' B U2 B",
    "R B' U B R' B' U B",
  ],
  17: [
    "L U L' R U R' U",
    "L U R U L' R' U",
    "B' U B F' U F U",
    "B' F' U B U F U",
    "L U R U R' U L'",
    "B' U B U' F' U2 F U'",
    "B' U' F' U' F U2 B U2",
    "L U R U2 L' U' R' U",
    "L U2 L' U' R U R' U",
    "F' U' B' U B U F U",
    "F' U2 B' U B U F U",
    "F' U B' U B U F U",
    "F' R' B' U2 B R F U",
    "B' R' B' R B R B U",
    "B' D' F' U2 F D B U",
    "F' L B L' B' U2 L' F",
    "L R B U2 B' R' U2 L'",
    "F D2 B D2 F' L U2 L'",
    "L B R U2 R' B' U2 L'",
  ],
  18: [
    "B' U2 B R U' R' U2",
    "R2 B' R' U B R' U2",
    "R U' B' U B R' U2",
    "R U2 B' U B R' U2",
    "R U B' U B R' U2",
    "L F' U' F U L' U2",
    "B' U2 R U' R' U2 B",
    "D2 B' R U R' B D2 U'",
    "B' U2 R U' R' U' B U'",
    "B' U' B U' R U' R' U2",
    "B' U B U' R U R' U2",
    "B' U B R' F R F' U2",
    "L U F' U2 F U L' U2",
    "B' U B U R U' R' U",
    "L U2 L' F' L U L' F",
    "F' L U' L' F L U' L'",
    "L F' U' L F L' U2 L'",
  ],
  19: [
    "R U' L' U L U' R' U'",
    "R U2 L' U L U' R' U'",
    "R U L' U L U' R' U'",
    "L' U2 L U R U R' U'",
    "F L F' L' R' F' R U'",
    "L F L' F L F' L' U'",
    "L' U' R U R' U L U2",
    "L' U L U R U2 R' U",
    "L' U' R U R' U2 L U",
  ],
  20: [
    "R' F' R F R' F R",
    "F U' F' U F' U2 F",
    "F2 U F U' F U F",
    "F U F' U2 F' U' F U2",
    "F U2 F' U F' U' F U2",
    "F U' F' U2 F' U F U2",
    "F L F' L' U2 R' F' R",
    "F L F' R' F2 L' F' R",
    "F R' F2 R F R' F R",
    "D F D' F D F2 D' F",
    "L' U L F' L' U' L F",
    "F L F L' F L F2 L'",
  ],
  21: [
    "L' U L U2 F' U F",
    "L' U' R U' L U' R' U2",
    "F U F' U2 F R' F' R",
    "F U2 F' U F R' F' R",
    "F U' L F L' R' F' R",
    "F U' R' F' R F' U F",
    "F U2 R U R' F2 U F",
  ],
  22: [
    "F U F' U2 R U R' U",
    "F U2 F' U R U R' U",
    "F U2 F' U' F' U2 F U",
    "R' F R U F2 U2 F U",
    "F R U R' F2 U2 F U",
    "L' U' L2 F' L' U2 F U",
    "F U F' U F' U F U",
    "R' F R U2 F2 U F U",
    "F U2 F2 L' U L F U",
    "F U F2 U2 L F L' U",
    "F U2 F2 U L F L' U",
    "L' R U2 L R2 F R F'",
    "F L F L' U F2 U F",
    "F U2 F' D' L' U2 L D",
    "F U F2 U2 F L' U L",
    "F U2 F2 U F L' U L",
    "L' R U2 R2 F R F' L",
  ],
  23: [
    "L' R U2 L U R'",
    "R U' L' U' L R'",
    "R U2 L' U' L R'",
    "R U L' U' L R'",
    "L' U R U2 L R'",
    "L' U' L F' U' F",
    "L' U' F' U' F L",
    "L' R U' R' U' L U",
    "L' U' L U R U' R'",
    "F' L F L' R U' R'",
    "R F' L F L' U' R'",
    "R U' L' U2 L U R'",
    "R U L' U2 L U R'",
    "L' U R U L U R'",
    "R F R U' R' F' R'",
    "L' R B U' B' L R'",
    "L' R B' U' B L R'",
    "R B L' U' L B' R'",
    "F D R U' R' D' F'",
    "L' U2 L U F' U' F",
  ],
  24: [
    "R F U' F' U' R' U2",
    "F U' F' R U' R' U",
    "L F' L' F' R' F2 R",
    "R' F' D' F' D F2 R",
    "F U' F' U' F' U' F U'",
    "R U' F U' F' U' R' U2",
    "R U2 F U' F' U' R' U2",
    "R U F U' F' U' R' U2",
    "F U' F' U R U2 R' U2",
    "L' U' L R' F R F' U",
    "L' U' R' F R F' L U",
    "D' B' F U' F' U B D",
    "L' U' R' F R F' U L",
    "L' F' U L' U' L F L",
  ],
  25: [
    "B U B' F' U' F U",
    "B U' B' F' U F U",
    "B F' U' B' U F U",
    "B U F' U' F U B'",
    "B U' B' U' F' U2 F U'",
    "B U F' U' F U2 B' U'",
    "B U F' U' F U' B' U2",
    "R' B' R B F R F' U",
    "B U2 B' U' F' U' F U",
    "F' U' B U' B' U F U",
    "F' U2 B U' B' U F U",
    "F' U B U' B' U F U",
    "B' R' B R' B' R B U",
  ],
  26: [
    "R2 U' R' U R' U' R'",
    "R' U R U' R U2 R'",
    "F R F' R' F R' F'",
    "R' U R U2 R U' R' U2",
    "R' U2 R U' R U R' U2",
    "R' U' R U2 R U R' U2",
    "D' R' D R' D' R2 D R'",
    "B U' B' R B U B' R'",
    "R' F R2 F' R' F R' F'",
    "R' B' R B U2 F R F'",
    "R' B' R F R2 B R F'",
    "R' B' R' B R' B' R2 B",
  ],
  27: [
    "B U' B' U2 R U' R'",
    "R2 F2 D' F' D R2 F'",
    "R' U F' U' F2 R F'",
    "R2 F D R D' R F'",
    "B U' B' U F' U' F U2",
    "B U F' U B' U F U2",
    "B U' B' U' R U2 R' U",
    "B' R B2 U' B' U R' U",
    "R' U2 F' U' F R2 U' R'",
    "R' U F R F' R U' R'",
    "R' U2 R U' R' F R F'",
    "R' U' R U2 R' F R F'",
    "R' U B' R' B F R F'",
  ],
  28: [
    "B' R2 B R' U R' U'",
    "R' B' R' B R2 U2 R'",
    "F R' F' U2 R2 U' R' U'",
    "R' U' R U' R U' R' U'",
    "R' U2 R U R U2 R' U'",
    "B U B2 R B U2 R' U'",
    "R' U2 R2 B U' B' R' U'",
    "R' U2 R U' F' U' F U'",
    "R' U' R U2 F' U' F U'",
    "R' U2 R2 U' B' R' B U'",
    "R' U' R2 U2 B' R' B U'",
    "R' B' R' B U' R2 U' R'",
    "R' U2 R D B U2 B' D'",
  ],
  29: [
    "B U B' R U R'",
    "B U B2 R2 B R2",
    "B F' U2 B' U' F",
    "B U' F' U2 B' F",
    "F' U' B U B' F",
    "F' U2 B U B' F",
    "F' U B U B' F",
    "B U R U R' B'",
    "B F' U F U B' U'",
    "B U2 B' U' R U R'",
    "R' D' F' U F D R",
    "B U' F' U' B' U' F",
    "B U B' U' F' U F",
    "R B' R' B F' U F",
    "F' R B' R' B U F",
    "F' R' F' U F R F",
    "F' L' B U B' L F",
    "B F' L U L' B' F",
    "B F' L' U L B' F",
    "B L F' U F L' B'",
  ],
  30: [
    "R' U R F' U F U'",
    "F' R' U R U F U2",
    "R2 F R F' R2 U' R'",
    "B' R B R F R2 F'",
    "F R D R D' R2 F'",
    "B U B' F R' F' R U'",
    "B U F R' F' R B' U'",
    "R' U R2 B U B' R' U2",
    "R' U R U' F' U2 F U2",
    "F' U' R' U R U F U2",
    "F' U2 R' U R U F U2",
    "F' U R' U R U F U2",
    "R' U R U R U R' U",
    "D L R' U R U' L' D'",
    "B U F R' F' R U' B'",
    "B R U' B U B' R' B'",
  ],
  31: [
    "L U' L' F' U2 F U'",
    "L U2 L' F' U' F U",
    "F' L U' L' U2 F U",
    "L U2 F' U' F L' U",
    "L U2 R U2 L' U2 R'",
    "L U2 F' U' F U L'",
    "L U2 F' U' F U2 L' U'",
    "L U L' U F' U' F U",
    "F' U' L U' L' U2 F U",
    "F' U2 L U' L' U2 F U",
    "F' U L U' L' U2 F U",
    "L U' L' U F' U F U",
    "B' D R' U R D' B U",
    "B' U2 F D R D' B F'",
    "L U2 F' U' F2 U F' L'",
    "L D' U' L' U' L D L'",
  ],
  32: [
    "R B' U B U2 R' U'",
    "B' U2 B R U R' U'",
    "B' U2 R U R' B U'",
    "B' U B R U2 R' U",
    "B' U2 F' U2 B U2 F",
    "B' U2 R U R' U' B ",
    "B' U B U' R U' R' U'",
    "R U' B' U B U2 R' U'",
    "R U2 B' U B U2 R' U'",
    "R U B' U B U2 R' U'",
    "B' U' B U' R U R' U'",
    "L D' F U' F' D L' U'",
    "B' U2 R U R' U2 B U",
    "L U2 R' D' F' D L' R",
    "B' D U B U B' D' B",
  ],
  33: [
    "L U2 L' R U R'",
    "L U2 R U L' R'",
    "L U L' F' U F",
    "F' L U L' U F",
    "F' U' L U2 L' F",
    "F' U2 L U2 L' F",
    "F' U L U2 L' F",
    "L U F' U F L'",
    "L F' U2 F U L' U'",
    "L F' U2 F U' L' U",
    "L U L' U R U R'",
    "L U L' U' F' U2 F",
    "L U2 L' U2 F' U2 F",
    "B L' B' L F' U2 F",
    "B F' L' B' L U2 F",
    "L U2 L' U' F' U F",
    "F' U' L U L' U F",
    "F' U2 L U L' U F",
    "F' U L U L' U F",
  ],
  34: [
    "B' U' B R U' R'",
    "R B' U' B U' R'",
    "R U' B' U2 B R'",
    "R U2 B' U2 B R'",
    "R U B' U2 B R'",
    "B' U2 B F' U' F",
    "B' U2 F' U' B F",
    "B' U' R U' R' B",
    "B' R U2 R' U B U'",
    "B' R U2 R' U' B U",
    "B' U2 B U R U' R'",
    "R U' B' U' B U' R'",
    "R U2 B' U' B U' R'",
    "R U B' U' B U' R'",
    "B' U' B U R U2 R'",
    "L' B L B' R U2 R'",
    "L' R B L B' U2 R'",
    "B' U' B U' F' U' F",
  ],
  35: [
    "L U' L' R U2 R' U",
    "L R U' L' U2 R' U",
    "R B' U R B R2 U",
    "L U' L' U' R U' R'",
    "B' U2 B R' F R F'",
    "B' U2 R' F R B F'",
    "L U' L' U2 F' U' F U2",
    "F' L2 F' L' F L' F U2",
    "R U' L U' L' U2 R' U",
    "R U2 L U' L' U2 R' U",
    "R U L U' L' U2 R' U",
    "L F U2 F' R U' L' R'",
    "B' U' B U' R' F R F'",
    "B' U2 B' R' F R B2 F'",
  ],
  36: [
    "F' L U' F' L' F2 U'",
    "B' U B F' U2 F U'",
    "B' F' U B U2 F U'",
    "L U2 L' F R' F' R",
    "L U2 F R' F' L' R",
    "B' U B U F' U F",
    "F' U' L U' F' L' F2 U'",
    "F' U2 L U' F' L' F2 U'",
    "F' U L U' F' L' F2 U'",
    "F' U' B' U B U2 F U'",
    "F' U2 B' U B U2 F U'",
    "F' U B' U B U2 F U'",
    "L F' U2 F2 U F' L' U'",
    "B' U B U2 R U R' U2",
    "L U L' U F R' F' R",
    "B' R' U2 R F' U B F",
  ],
};
