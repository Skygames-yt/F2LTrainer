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

// View selection
let viewSelection = 0;

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
  flagSave = true;

  // Saving trainStateSelection
  for (let i = 0; i < trainStateSelection.length; i++) {
    localStorage.setItem("trainStateSelection" + i, trainStateSelection[i]);
  }
  // Saving trainGroupSelection
  for (let i = 0; i < trainGroupSelection.length; i++) {
    localStorage.setItem("trainGroupSelection" + i, trainGroupSelection[i]);
  }

  // Saving viewSelection
  localStorage.setItem("viewSelection", viewSelection);

  // Saving left right train selection
  localStorage.setItem("leftSelection", leftSelection);
  localStorage.setItem("rightSelection", rightSelection);

  // Saving AUF selection
  localStorage.setItem("aufSelection", aufSelection);

  // Saving hint settings
  localStorage.setItem("hintSelection", hintSelection);

  for (let indexGroup = 0; indexGroup < GROUPS.length; indexGroup++) {
    const GROUP = GROUPS[indexGroup];
    for (let indexCategory = 0; indexCategory < GROUP.categoryCases.length; indexCategory++) {
      localStorage.setItem(GROUP.saveName + "collapse" + indexCategory, GROUP.collapse[indexCategory]);

      let categoryItems = GROUP.categoryCases[indexCategory];
      for (let indexCategoryItem = 0; indexCategoryItem < categoryItems.length; indexCategoryItem++) {
        let indexCase = categoryItems[indexCategoryItem] - 1;
      }

      for (let indexCategoryItem = 0; indexCategoryItem < categoryItems.length; indexCategoryItem++) {
        let indexCase = categoryItems[indexCategoryItem] - 1;

        // Save Trash
        localStorage.setItem(GROUP.saveName + "trash" + indexCase, GROUP.trash[indexCase]);
        // Save Case Selection
        localStorage.setItem(GROUP.saveName + "caseSelection" + indexCase, GROUP.caseSelection[indexCase]);
        // Save Custom Algorithms
        localStorage.setItem(GROUP.saveName + "customAlgorithms" + indexCase, GROUP.customAlgorithms[indexCase]);
        // Save Algorithm Selection
        localStorage.setItem(GROUP.saveName + "algorithmSelection" + indexCase, GROUP.algorithmSelection[indexCase]);
      }
    }
  }
  updateHintVisibility();
}

// Load
function loadUserData() {
  console.log("Loading User Data");
  let temp;

  // Load viewSelection
  temp = localStorage.getItem("viewSelection");
  if (temp != null) viewSelection = parseInt(temp);

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

  for (let indexGroup = 0; indexGroup < GROUPS.length; indexGroup++) {
    const GROUP = GROUPS[indexGroup];

    for (let indexCategory = 0; indexCategory < GROUP.categoryCases.length; indexCategory++) {
      temp = localStorage.getItem(GROUP.saveName + "collapse" + indexCategory);
      if (temp !== null && temp == "true") {
        GROUP.collapse.push(true);
      } else {
        GROUP.collapse.push(false);
      }
    }

    for (let indexCase = 0; indexCase < GROUP.numberCases; indexCase++) {
      // Load Trash
      temp = localStorage.getItem(GROUP.saveName + "trash" + indexCase);
      if (temp !== null) {
        GROUP.trash.push(temp);
      } else {
        GROUP.trash.push(false);
      }

      // Load Case Selection
      temp = localStorage.getItem(GROUP.saveName + "caseSelection" + indexCase);
      if (temp !== null) {
        GROUP.caseSelection.push(temp);
      } else {
        // If site visited first time - set basic cases -> category 1 to "Learning"
        if (indexGroup == 0 && GROUP.categoryCases[0].includes(indexCase + 1)) {
          GROUP.caseSelection.push(1);
        } else {
          GROUP.caseSelection.push(0);
        }
      }

      // Load Custom Algorithms
      temp = localStorage.getItem(GROUP.saveName + "customAlgorithms" + indexCase);
      if (temp !== null) {
        GROUP.customAlgorithms.push(temp);
      } else {
        GROUP.customAlgorithms.push("");
      }

      // Load Algorithm Selection
      temp = localStorage.getItem(GROUP.saveName + "algorithmSelection" + indexCase);
      if (temp !== null) {
        GROUP.algorithmSelection.push(temp);
      } else {
        GROUP.algorithmSelection.push(0);
      }
    }
  }

  updateCheckboxStatus();
  updateHintVisibility();
}

function loadBoolean(saveName, varName) {
  const TEMP = localStorage.getItem(saveName);
  if (TEMP != null) {
    if (TEMP == "true") {
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
