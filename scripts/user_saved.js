// Basic
let basicTrash = [
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
];
let basicCaseSelection = [
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  NaN,
  0,
  0,
  0,
  0,
  0,
]; // 0: unlearned, 1: learning, 2: finished
let basicAlgorithmSelection = [
  1, 2, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
];
let basicCustomAlgorithms = [
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
];

// Basic Back
let basicBackTrash = [
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
];
let basicBackCaseSelection = [
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  NaN,
  0,
  0,
  0,
  0,
  0,
]; // 0: unlearned, 1: learning, 2: finished
let basicBackAlgorithmSelection = [
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
];
let basicBackCustomAlgorithms = [
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
];

// Advanced
let advancedTrash = [
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
];
let advancedCaseSelection = [
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
]; // 0: unlearned, 1: learning, 2: finished
let advancedAlgorithmSelection = [
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
];
let advandedCustomAlgorithms = [
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
];

// 0 -> unlearned
// 1 -> learning
// 2 -> finished
let trainStateSelection = [false, true, false];

// 0 -> basic
// 1 -> basic back
// 2 -> advanced
let trainGroupSelection = [true, true, true];

let hintSelection = true;

// Save - Load Functions
function saveUserData() {
  console.log("Saving User Data");

  // Saving trainStateSelection
  for (let i = 0; i < trainStateSelection.length; i++) {
    localStorage.setItem("trainStateSelection" + i, trainStateSelection[i]);
  }
  // Saving trainGroupSelection
  for (let i = 0; i < trainGroupSelection.length; i++) {
    localStorage.setItem("trainGroupSelection" + i, trainGroupSelection[i]);
  }
  // Saving hint settings
  localStorage.setItem("hintSelection", hintSelection);

  for (let indexGroup = 0; indexGroup < groups.length; indexGroup++) {
    const group = groups[indexGroup];
    // console.log(group);

    for (let indexCase = 0; indexCase < group.numberCases; indexCase++) {
      // Save Trash
      localStorage.setItem(
        group.saveName + "trash" + indexCase,
        group.trash[indexCase]
      );
      // Save Case Selection
      localStorage.setItem(
        group.saveName + "caseSelection" + indexCase,
        group.caseSelection[indexCase]
      );
      // Save Custom Algorithms
      localStorage.setItem(
        group.saveName + "customAlgorithms" + indexCase,
        group.customAlgorithms[indexCase]
      );
      // Save Algorithm Selection
      localStorage.setItem(
        group.saveName + "algorithmSelection" + indexCase,
        group.algorithmSelection[indexCase]
      );
    }
  }
  updateHintVisibility();
}

function loadUserData() {
  console.log("Loading User Data");

  // Load trainStateSelection
  for (let i = 0; i < trainStateSelection.length; i++) {
    const temp = localStorage.getItem("trainStateSelection" + i);
    if (temp !== null) {
      if (temp == "true") {
        trainStateSelection[i] = true;
      } else {
        trainStateSelection[i] = false;
      }
    }
  }

  // Load trainGroupSelection
  for (let i = 0; i < trainGroupSelection.length; i++) {
    const temp = localStorage.getItem("trainGroupSelection" + i);
    if (temp !== null) {
      if (temp == "true") {
        trainGroupSelection[i] = true;
      } else {
        trainGroupSelection[i] = false;
      }
    }
  }

  const temp = localStorage.getItem("hintSelection");
  if (temp != null) {
    if (temp == "true") {
      hintSelection = true;
    } else {
      hintSelection = false;
    }
  }

  for (let indexGroup = 0; indexGroup < groups.length; indexGroup++) {
    const group = groups[indexGroup];
    let temp = 0;

    for (let indexCase = 0; indexCase < group.numberCases; indexCase++) {
      // Load Trash
      temp = localStorage.getItem(group.saveName + "trash" + indexCase);
      if (temp !== null) {
        group.trash[indexCase] = temp;
      }

      // Load Case Selection
      temp = localStorage.getItem(group.saveName + "caseSelection" + indexCase);
      if (temp !== null) {
        group.caseSelection[indexCase] = temp;
      }
      // Load Custom Algorithms
      temp = localStorage.getItem(
        group.saveName + "customAlgorithms" + indexCase
      );
      if (temp !== null) {
        group.customAlgorithms[indexCase] = temp;
      }

      // Load Algorithm Selection
      temp = localStorage.getItem(
        group.saveName + "algorithmSelection" + indexCase
      );
      if (temp !== null) {
        group.algorithmSelection[indexCase] = temp;
      }
    }
  }

  updateCheckboxStatus();
  updateHintVisibility();
}

function clearUserData() {
  console.log("Clearing");
  localStorage.clear();
  console.log(localStorage);
}
