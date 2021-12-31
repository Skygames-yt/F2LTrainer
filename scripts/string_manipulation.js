let __moves = ["R", "L", "F", "B", "r", "l", "f", "b", "U", "D", "u", "d", "y"];
let __mirror = [
  "L",
  "R",
  "F",
  "B",
  "l",
  "r",
  "f",
  "b",
  "U",
  "D",
  "u",
  "d",
  "y",
];

function mirrorAlg(alg) {
  let algList = alg.split(" ");

  for (let indexAlg = 0; indexAlg < algList.length; indexAlg++) {
    const moveAlg = algList[indexAlg];

    for (let indexMirror = 0; indexMirror < __moves.length; indexMirror++) {
      const moveMirror = __moves[indexMirror];

      if (moveAlg.includes(moveMirror)) {
        algList[indexAlg] = moveAlg.replace(moveMirror, __mirror[indexMirror]);
        if (moveAlg.includes("'")) {
          algList[indexAlg] = algList[indexAlg].replace("'", "");
        } else if (!moveAlg.includes("2")) {
          algList[indexAlg] = algList[indexAlg] + "'";
          if (moveAlg.includes(")")) {
            algList[indexAlg] = algList[indexAlg].replace(")", "") + ")";
          }
        }
        break;
      }
    }
  }
  // console.log(alg);
  // console.log(algList.join(" "));
  return algList.join(" ");
}

function addRandomUMove(alg) {
  const AUF = Math.floor(Math.random() * 4);
  const algList = alg.split(" ");
  const lastMove = algList[algList.length - 1];

  if (lastMove.includes("U")) {
    algList.pop();
  }

  if (AUF === 1) {
    algList.push("U");
  } else if (AUF === 2) {
    algList.push("U2");
  } else if (AUF === 3) {
    algList.push("U'");
  }

  return algList.join(" ");
}
