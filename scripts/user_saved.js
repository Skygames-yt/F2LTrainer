// Basic
let basicTrash = [];
let basicCaseSelection = [];
let basicAlgorithmSelection = [];
let basicCustomAlgorithms = [];
let basicCollapse = [];

// Basic Back
let basicBackTrash = [];
let basicBackCaseSelection = [];
let basicBackAlgorithmSelection = [];
let basicBackCustomAlgorithms = [];
let basicBackCollapse = [];

// Advanced
let advancedTrash = [];
let advancedCaseSelection = [];
let advancedAlgorithmSelection = [];
let advandedCustomAlgorithms = [];
let advancedCollapse = [];

// Expert
let expertTrash = [];
let expertCaseSelection = [];
let expertAlgorithmSelection = [];
let expertCustomAlgorithms = [];
let expertCollapse = [];

// 0 -> unlearned
// 1 -> learning
// 2 -> finished
let trainStateSelection = [false, true, false];

// 0 -> basic
// 1 -> basic back
// 2 -> advanced
// 3 -> expert
let trainGroupSelection = [true, true, true, true];

let leftSelection = true;
let rightSelection = true;
let aufSelection = true;
let hintSelection = true;

// Save
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

  // Saving left right train selection
  localStorage.setItem("leftSelection", leftSelection);
  localStorage.setItem("rightSelection", rightSelection);

  // Saving AUF selection
  localStorage.setItem("AUF", aufSelection);

  // Saving hint settings
  localStorage.setItem("hintSelection", hintSelection);

  for (let indexGroup = 0; indexGroup < groups.length; indexGroup++) {
    const group = groups[indexGroup];
    // console.log(group);
    for (let indexCategory = 0; indexCategory < group.categoryCases.length; indexCategory++) {
      /*console.log(
        "saveName: " +
          group.saveName +
          "collapse" +
          indexCategory +
          "\ngroup.collapse[" +
          indexCategory +
          "]: " +
          group.collapse[indexCategory]
      );*/
      localStorage.setItem(group.saveName + "collapse" + indexCategory, group.collapse[indexCategory]);
    }

    for (let indexCase = 0; indexCase < group.numberCases; indexCase++) {
      // Save Trash
      localStorage.setItem(group.saveName + "trash" + indexCase, group.trash[indexCase]);
      // Save Case Selection
      localStorage.setItem(group.saveName + "caseSelection" + indexCase, group.caseSelection[indexCase]);
      // Save Custom Algorithms
      localStorage.setItem(group.saveName + "customAlgorithms" + indexCase, group.customAlgorithms[indexCase]);
      // Save Algorithm Selection
      localStorage.setItem(group.saveName + "algorithmSelection" + indexCase, group.algorithmSelection[indexCase]);
    }
  }
  updateHintVisibility();
}

// Load
function loadUserData() {
  console.log("Loading User Data");
  let temp;

  // Load trainStateSelection
  for (let i = 0; i < trainStateSelection.length; i++) {
    trainStateSelection[i] = loadBoolean("trainStateSelection" + i, trainStateSelection[i]);
  }

  // Load trainGroupSelection
  for (let i = 0; i < trainGroupSelection.length; i++) {
    trainGroupSelection[i] = loadBoolean("trainGroupSelection" + i, trainGroupSelection[i]);
  }

  leftSelection = loadBoolean("leftSelection", leftSelection);
  rightSelection = loadBoolean("rightSelection", rightSelection);
  aufSelection = loadBoolean("aufSelection", aufSelection);
  hintSelection = loadBoolean("hintSelection", hintSelection);

  for (let indexGroup = 0; indexGroup < groups.length; indexGroup++) {
    const group = groups[indexGroup];

    for (let indexCategory = 0; indexCategory < group.categoryCases.length; indexCategory++) {
      temp = localStorage.getItem(group.saveName + "collapse" + indexCategory);
      if (temp !== null && temp == "true") {
        group.collapse.push(true);
      } else {
        group.collapse.push(false);
      }
    }

    for (let indexCase = 0; indexCase < group.numberCases; indexCase++) {
      // Load Trash
      temp = localStorage.getItem(group.saveName + "trash" + indexCase);
      if (temp !== null) {
        group.trash.push(temp);
      } else {
        group.trash.push(false);
      }

      // Load Case Selection
      temp = localStorage.getItem(group.saveName + "caseSelection" + indexCase);
      if (temp !== null) {
        group.caseSelection.push(temp);
      } else {
        // If site visited first time - set basic cases -> category 1 to "Learning"
        if (indexGroup == 0 && group.categoryCases[0].includes(indexCase + 1)) {
          group.caseSelection.push(1);
        } else {
          group.caseSelection.push(0);
        }
      }

      // Load Custom Algorithms
      temp = localStorage.getItem(group.saveName + "customAlgorithms" + indexCase);
      if (temp !== null) {
        group.customAlgorithms.push(temp);
      } else {
        group.customAlgorithms.push("");
      }

      // Load Algorithm Selection
      temp = localStorage.getItem(group.saveName + "algorithmSelection" + indexCase);
      if (temp !== null) {
        group.algorithmSelection.push(temp);
      } else {
        group.algorithmSelection.push(0);
      }
    }
  }

  updateCheckboxStatus();
  updateHintVisibility();
}

function loadBoolean(saveName, varName) {
  const temp = localStorage.getItem(saveName);
  if (temp != null) {
    if (temp == "true") {
      return true;
    } else {
      return false;
    }
  } else {
    return varName;
  }
}

function clearUserData() {
  console.log("Clearing");
  localStorage.clear();
  console.log("localStorage: " + localStorage);
}
