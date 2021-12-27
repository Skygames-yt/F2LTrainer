const advancedAlgorithms = {
  1: ["U' R' U R2 U' R'"],
  2: [
    "U2 (R' U R) U' (S R S')",
    "y R' F R2 U' R' U2 F'",
    "y2 U2 (L F' L' F) (L U L')",
  ],
  3: ["y U L U' L2' U L"],
  4: [
    "y U2 (L U' L') U (S' L' S)",
    "L F' L2' U L U2' F",
    "y' U2 (R' F R F') (R' U' R)",
  ],
  5: [
    "U2 L2' u L2 u' L2'",
    "y U2 R2 u' R2' u R2",
    "y' U2 L2' u' L2 u L2'",
    "y2 U2 R2 u R2' u' R2",
  ],
  6: [
    "L F' U F L'",
    "y R' F U' F' R",
    "y' (L' u' L) U' (L' u L)",
    "y2 (R u R') U (R u' R')",
  ],
  7: ["R' U' R2 U R'"],
  8: ["F D R D' F'", "y R (F U F') R'", "y2 F (L U L') F'", "y' R u R u' R'"],
  9: ["y L U L2' U' L"],
  10: [
    "y F' D' L' D F",
    "L' (F' U' F) L",
    "y' F' (R' U' R) F",
    "y2 L' u' L' u L",
  ],
  11: ["U' (L' U' L) (R U' R')", "y U2 L' U' L2 U L2' U' L"],
  12: ["(F U2 F') (R U R')", "y L U2 L' F U F'", "y' R U2 R' f R f'"],
  13: ["U (R U R') (L' U L)", "y' U2' R U R2' U' R2 U R'"],
  14: ["y (F' U2 F) (L' U' L)", "R' U2 R F' U' F", "y2 L' U2 L f' L' f"],
  15: [
    "U (R U R') (L U L')",
    "U' (R U2 R') U' (L U L')",
    "y U (L' U L) (R' U R)",
  ],
  16: [
    "U2 F' (L U L') F",
    "y U2 L' (B U B') L",
    "y' U2 R' (F U F') R",
    "y2 f' U L U' f",
  ],
  17: [
    "y U' (L' U' L) (R' U' R)",
    "y U (L' U2 L) U (R' U' R)",
    "U' (R U' R') (L U' L')",
  ],
  18: [
    "y U2' F (R' U' R) F'",
    "U2' R (B' U' B) R'",
    "y2 U2' L (F' U' F) L'",
    "y' f U' R' U f'",
  ],
  19: ["U (R U' R') (L' U L)"],
  20: ["y (L' U2 L) U' (L U L')", "y U2 (L' U L) U' (L U2 L')"],
  21: ["U2 (R U' R') U (L' U' L)", "y (F' L F L') U' (L U2 L')"],
  22: ["y U' L' U' L2 U2 L'"],
  23: ["(R U R') U' (L' U L)", "y (S' L S)"],
  24: [
    "U' (R U R') (F U F')",
    "y U (L' U L) U (L U L')",
    "y U' (F U F') (L U L')",
  ],
  25: ["y U' (L' U L) (R U' R')"],
  26: ["(R U2 R') U (R' U' R)", "U2 (R U' R') U (R' U2 R)"],
  27: ["(F R' F' R) U (R' U2 R)", "y U2 (L' U L) U' (R U R')"],
  28: ["U R U R2' U2 R"],
  29: ["(S R' S')", "y (L' U' L) U (R U' R')"],
  30: [
    "U (F U' F') (R' U' R)",
    "U' (R U' R') U' (R' U R)",
    "y U (L' U' L) (F' U' F)",
  ],
  31: ["U' (F' U F) (L U2 L')", "y U' (L' U L) U' (f R' f')"],
  32: ["U (R U' R') U (f' L f)", "y U (F U' F') (R' U2 R)"],
  33: ["(R U' R') (L U2 L')", "y (L' U' L) (f R' f')"],
  34: ["(R U R') (f' L f)", "y (L' U L) (R' U2 R)"],
  35: ["(R U' R') U (L U L')", "y (L F' L' F) (R' U2 R)"],
  36: ["(R' F R F') (L U2 L')", "y (L' U' L) U' (R' U' R)"],
};
