"use strict";

const htmlElement = document.querySelector("html");
const bodyElement = document.querySelector("body");

const editalgContainer = document.getElementById("editalg-container");
const editalgList = document.getElementById("editalg-list");
const editalgCustomalg = document.getElementById("editalg-customalg");
const editalgListentry = [];

let selectedCase = 0;
let selectedAlgNumber = 0;

// Maximum number of algs per Case
const numberAlgMax = 20;
const algColors = ["transparent", "yellow"];

const selectLayout = document.getElementById("select-layout");
const selectLayoutSub = [];
const sideContainer = document.getElementById("side-container");
const changeMode = document.getElementById("change-mode");
const overlay = document.getElementById("overlay");
const infoContainer = document.getElementById("info-container");

// side buttons
const btnSetting = document.getElementById("btn-settings");
const btnTrash = document.getElementById("btn-trash");
const btnInfo = document.getElementById("btn-info");

const trashContainer = document.getElementById("trash-container");

const selectState = document.getElementById("select-state");
const possibleStates = ["Unlearned", "Learning", "Finished", "All"];

const colors = ["rgba(0, 0, 0, 0)", "rgb(255, 255, 0)", "rgb(0, 255, 0)"];

// Train
const trainContainer = document.getElementById("train-container");

const checkboxUnlerned = document.getElementById("checkboxUnlearnedId");
const checkboxLearning = document.getElementById("checkboxLearningId");
const checkboxFinished = document.getElementById("checkboxFinishedId");

const checkboxGroupBasic = document.getElementById("checkboxGroupBasicId");
const checkboxGroupBasicBack = document.getElementById(
  "checkboxGroupBasicBackId"
);
const checkboxGroupAdvanced = document.getElementById(
  "checkboxGroupAdvancedId"
);
// const selectGroupTrain = document.getElementById("select-train");

const btnSettingsTrain = document.getElementById("btn-settings-train");
const settingsTrainContainer = document.getElementById("train-cases-container");

const scrambleDiv = document.getElementById("scramble-div");
const hintDiv = document.getElementById("hint-div");
const hintImg = document.getElementById("hint-img");
let algHint = "";

let selectedTrainIndex = 0;
let hintCounter = 0;

let mode = 0; // 0: select, 1: train

// List that contains all the randomly selected cases
let trainCaseList = [];
let currentTrainCase = 0;

// Basic, Basic Back, Advanced, Exert
const selectGroup = document.getElementById("select-group");

const checkboxGroupContainer = document.getElementById(
  "checkbox-group-container"
);

const labelGroupCheckbox = [];
const groupCheckbox = [];

window.addEventListener("load", () => {
  // Load User saved Data
  loadUserData();
  // Create all Entries
  addElementsToBOM();
  addTrashElementsToBOM();
  // addSelectGroupTrain();

  // Generate placeholder for algs to select
  for (let i = 0; i < numberAlgMax; i++) {
    editalgListentry.push(document.createElement("div"));
    editalgListentry[i].classList.add("editalg-listentry");

    editalgList.appendChild(editalgListentry[i]);
  }

  //Edit Button - Click on Edit Button
  for (let indexGroup = 0; indexGroup < groups.length; indexGroup++) {
    // TEST
    const group = groups[indexGroup];
    group.imgEdit.forEach(function (button, indexCase) {
      button.addEventListener("click", function () {
        editAlgs(indexGroup, indexCase);
      });
    });
  }

  // Select algorithm - Click on algorithm
  editalgListentry.forEach(function (button, i) {
    button.addEventListener("click", function () {
      // Change Background when selected
      if (
        selectedAlgNumber <
        groups[selectGroup.selectedIndex].algorithms[selectedCase + 1].length
      ) {
        editalgListentry[selectedAlgNumber].style.background = algColors[0];
      } else {
        editalgCustomalg.style.background = algColors[0];
      }
      editalgListentry[i].style.background = algColors[1];
      selectedAlgNumber = i;
    });
  });

  // Click Event - Change Case to Unlearned, Learning, Finished
  for (let indexGroup = 0; indexGroup < groups.length; indexGroup++) {
    // TEST
    const group = groups[indexGroup];
    group.imgContainer.forEach(function (button, i) {
      button.addEventListener("click", function () {
        group.caseSelection[i]++;
        if (group.caseSelection[i] >= 3) {
          group.caseSelection[i] = 0;
        }
        group.divContainer[i].style.background = colors[group.caseSelection[i]];
        // Save
        saveUserData();
      });
    });
  }

  // Click Event - Delete Button clicked
  for (let indexGroup = 0; indexGroup < groups.length; indexGroup++) {
    const group = groups[indexGroup];
    group.imgTrash.forEach(function (button, indexCase) {
      button.addEventListener("click", function () {
        group.trash[indexCase] = true;
        group.divContainer[indexCase].style.display = "none";
        group.trashElementContainer[indexCase].style.display = "flex";
        // Save
        saveUserData();
      });
    });
  }

  // Click Event - Recover
  for (let indexGroup = 0; indexGroup < groups.length; indexGroup++) {
    // TEST
    const group = groups[indexGroup];
    group.btnRecover.forEach(function (button, indexCase) {
      button.addEventListener("click", function () {
        group.trash[indexCase] = false;
        group.divContainer[indexCase].style.display = "flex";
        group.trashElementContainer[indexCase].style.display = "none";

        // Save
        saveUserData();
      });
    });
  }

  // Change Mode
  changeMode.addEventListener("click", function () {
    if (mode == 0) {
      mode = 1;
      changeMode.innerHTML = "select cases";
      selectLayout.style.display = "none";
      sideContainer.style.display = "none";
      selectGroup.style.display = "none";
      trainContainer.style.display = "block";
    } else {
      mode = 0;
      changeMode.innerHTML = "Train";
      selectLayout.style.display = "block";
      sideContainer.style.display = "block";
      selectGroup.style.display = "block";
      trainContainer.style.display = "none";
    }
  });

  // Close Overlays
  overlay.addEventListener("click", function () {
    closeOverlays();
  });

  // Click Event - Info
  btnInfo.addEventListener("click", function () {
    infoContainer.style.display = "block";
    overlay.style.display = "block";
  });

  // Click Event - Open Trash
  btnTrash.addEventListener("click", function () {
    trashContainer.style.display = "block";
    overlay.style.display = "block";
  });

  // Settings Train
  btnSettingsTrain.addEventListener("click", showSettingsTrain);

  document.addEventListener("keydown", keydown);

  // Run this function to only show basic cases in the beginning
  groupSelected();
});

function addElementsToBOM() {
  for (let indexGroup = 0; indexGroup < groups.length; indexGroup++) {
    // TEST
    const group = groups[indexGroup];
    selectLayoutSub.push(document.createElement("div"));

    for (let indexCase = 0; indexCase < group.numberCases; indexCase++) {
      // Case Selection Page
      const caseImgPath = group.imgPath + (indexCase + 1) + ".svg";

      group.divContainer.push(document.createElement("div"));
      group.divContainer[indexCase].classList.add("div-container");

      group.caseNumber.push(document.createElement("div"));
      group.caseNumber[indexCase].classList.add("case-number");

      group.imgContainer.push(document.createElement("div"));
      group.imgContainer[indexCase].classList.add("image-container");
      group.imgContainer[indexCase].id = "image-container-" + indexCase;

      group.imgCase.push(document.createElement("img"));
      group.imgCase[indexCase].classList.add("img-case");

      group.algorithm.push(document.createElement("div"));
      group.algorithm[indexCase].classList.add("algorithm");

      group.btnEdit.push(document.createElement("div"));
      group.btnEdit[indexCase].classList.add("btn-edit");
      group.btnEdit[indexCase].title = "Edit";

      group.imgEdit.push(document.createElement("img"));
      group.imgEdit[indexCase].classList.add("img-edit-trash");

      group.divAlgorithm.push(document.createElement("div"));
      group.divAlgorithm[indexCase].classList.add("div-algorithm");

      group.btnDelete.push(document.createElement("div"));
      group.btnDelete[indexCase].classList.add("btn-trash");
      group.btnDelete[indexCase].title = "Delete";

      group.imgTrash.push(document.createElement("img"));
      group.imgTrash[indexCase].classList.add("img-edit-trash");

      if (indexCase != 36) {
        group.caseNumber[indexCase].innerHTML = indexCase + 1;
        group.imgCase[indexCase].src = caseImgPath;
        // Set shown alg
        if (
          group.algorithmSelection[indexCase] <
          group.algorithms[indexCase + 1].length
        ) {
          group.divAlgorithm[indexCase].innerHTML =
            group.algorithms[indexCase + 1][
              group.algorithmSelection[indexCase]
            ];
        } else {
          group.divAlgorithm[indexCase].innerHTML =
            group.customAlgorithms[indexCase];
        }

        group.imgEdit[indexCase].src = "./images/edit.svg";
        group.imgTrash[indexCase].src = "./images/trash.svg";

        if (group.trash[indexCase] == true) {
          group.divContainer[indexCase].style.display = "none";
        }

        group.divContainer[indexCase].style.background =
          colors[group.caseSelection[indexCase]];

        group.divContainer[indexCase].appendChild(group.caseNumber[indexCase]);
        group.divContainer[indexCase].appendChild(
          group.imgContainer[indexCase]
        );
        group.imgContainer[indexCase].appendChild(group.imgCase[indexCase]);
        group.divContainer[indexCase].appendChild(group.algorithm[indexCase]);
        group.algorithm[indexCase].appendChild(group.btnEdit[indexCase]);
        group.btnEdit[indexCase].appendChild(group.imgEdit[indexCase]);
        group.algorithm[indexCase].appendChild(group.divAlgorithm[indexCase]);
        group.algorithm[indexCase].appendChild(group.btnDelete[indexCase]);
        group.btnDelete[indexCase].appendChild(group.imgTrash[indexCase]);

        selectLayoutSub[indexGroup].appendChild(group.divContainer[indexCase]);
      }
    }
    selectLayout.appendChild(selectLayoutSub[indexGroup]);
  }
}

function addTrashElementsToBOM() {
  for (let indexGroup = 0; indexGroup < groups.length; indexGroup++) {
    // TEST
    const group = groups[indexGroup];

    for (let indexCase = 0; indexCase < group.numberCases; indexCase++) {
      // Case Selection Page
      const caseImgPath = group.imgPath + (indexCase + 1) + ".svg";

      group.trashElementContainer.push(document.createElement("div"));
      group.trashElementContainer[indexCase].classList.add(
        "trash-element-container"
      );

      group.caseNumberTrash.push(document.createElement("div"));
      group.caseNumberTrash[indexCase].classList.add("case-number-trash");

      group.imgContainerTrash.push(document.createElement("div"));
      group.imgContainerTrash[indexCase].classList.add("img-container-trash");

      group.imgCaseTrash.push(document.createElement("img"));
      group.imgCaseTrash[indexCase].classList.add("img-case-trash");

      group.btnRecover.push(document.createElement("div"));
      group.btnRecover[indexCase].classList.add("btn-recover");

      if (indexCase != 36) {
        group.caseNumberTrash[indexCase].innerHTML = indexCase + 1;
        group.imgCaseTrash[indexCase].src = caseImgPath;
        group.btnRecover[indexCase].innerHTML = "Recover";
        if (basicTrash[indexCase] == false) {
          group.trashElementContainer[indexCase].style.display = "none";
        }

        group.trashElementContainer[indexCase].appendChild(
          group.caseNumberTrash[indexCase]
        );
        group.trashElementContainer[indexCase].appendChild(
          group.imgContainerTrash[indexCase]
        );
        group.imgContainerTrash[indexCase].appendChild(
          group.imgCaseTrash[indexCase]
        );
        group.trashElementContainer[indexCase].appendChild(
          group.btnRecover[indexCase]
        );

        trashContainer.appendChild(group.trashElementContainer[indexCase]);
      }
    }
  }
}

function updateAlg() {
  // Update Alg button clicked
  const group = groups[selectGroup.selectedIndex];

  // Read text in custom Alg Textbox
  group.customAlgorithms[selectedCase] = editalgCustomalg.value;
  // Check if selected alg is default or custom
  if (selectedAlgNumber < group.algorithms[selectedCase + 1].length) {
    // If selected Alg is default
    group.divAlgorithm[selectedCase].innerHTML =
      group.algorithms[selectedCase + 1][selectedAlgNumber];
  } else {
    // If selected Alg is custom
    group.divAlgorithm[selectedCase].innerHTML =
      group.customAlgorithms[selectedCase];
  }
  // Save which Alg was selected
  group.algorithmSelection[selectedCase] = selectedAlgNumber;
  closeOverlays();
  console.log(group.algorithmSelection);

  // Save
  saveUserData();
}

function closeOverlays() {
  infoContainer.style.display = "none";
  trashContainer.style.display = "none";
  editalgContainer.style.display = "none";
  settingsTrainContainer.style.display = "none";
  overlay.style.display = "none";
  // htmlElement.style.overflow = "visible";
  // bodyElement.style.overflow = "visible";
}

function editAlgs(indexGroup, indexCase) {
  console.log(indexGroup);
  selectedCase = indexCase;
  const group = groups[indexGroup];
  selectedAlgNumber = group.algorithmSelection[selectedCase];
  // Iterate through all algorithms
  console.log(numberAlgMax);
  for (let alg = 0; alg < numberAlgMax; alg++) {
    if (alg < group.algorithms[selectedCase + 1].length) {
      // Set Text to Alg
      editalgListentry[alg].innerHTML = group.algorithms[selectedCase + 1][alg];
      console.log(group.algorithms[selectedCase + 1][alg]);
      // Make all used elements visible
      editalgListentry[alg].style.display = "block";
    } else {
      // Make all unused elements invisible
      editalgListentry[alg].style.display = "none";
    }
    // Reset all backgrounds
    editalgListentry[alg].style.background = algColors[0];
  }
  // Check if previously saved alg is default of custom
  if (selectedAlgNumber < group.algorithms[selectedCase + 1].length) {
    // If alg is default set color of selected alg
    editalgListentry[group.algorithmSelection[selectedCase]].style.background =
      algColors[1];
    // and reset color of custom
    editalgCustomalg.style.background = algColors[0];
  } else {
    // If alg is custom set color
    editalgCustomalg.style.background = algColors[1];
  }

  // Set text in Textbox to saved value
  editalgCustomalg.value = group.customAlgorithms[selectedCase];
  // Make container visible
  editalgContainer.style.display = "block";
  // Make overlay visible
  overlay.style.display = "block";
}

function customAlgSelected() {
  // Custon Alg Textbox clicked

  // Set Background of Textbox
  editalgListentry[selectedAlgNumber].style.background = algColors[0];
  // Reset Background of previously selected Alg
  editalgCustomalg.style.background = algColors[1];
  // Set selected Alg to number of selected Alg
  selectedAlgNumber =
    groups[selectGroup.selectedIndex].algorithms[selectedCase + 1].length;
}

function keydown(e) {
  /*
  rechts: 39
  links: 37
  Leertaste: 32
  */
  if (mode === 0) return; // Do nothing when in case select mode

  if (e.keyCode === 32) {
    // Leertaste
    nextScramble();
  } else if (e.keyCode === 39) {
    // rechte Pfeiltaste
    showHint();
  } else if (e.keyCode === 37) {
    // linke Pfeiltaste
  } else if (e.keyCode === 83) {
    // S
    saveUserData();
  } else if (e.keyCode === 76) {
    // L
    loadUserData();
  } else if (e.keyCode === 67) {
    // C
    clearUserData();
  } else if (e.keyCode === 71) {
    // G
    // Log Local Storage
    console.log(localStorage);
  } else {
    console.log("Key pressed: " + e.keyCode);
  }
}

/*
function nextScramble___() {
  hintCounter = 0;
  hintImg.style.visibility = "hidden";
  hintDiv.innerText = "";
  // Get all indices of selected cases
  let selectedCases = [];
  for (let i = 0; i < basicCaseSelection.length; i++) {
    for (let state = 0; state < 3; state++) {
      if (
        trainStateSelection[state] === true &&
        basicCaseSelection[i] === state
      ) {
        selectedCases.push(i);
        break;
      }
    }
  }

  // Select a case at random
  selectedTrainIndex =
    selectedCases[Math.floor(Math.random() * selectedCases.length)];
  // console.log("Case: " + (selectedTrainIndex + 1));

  // Select a scramble at random
  let selectedScramble =
    basicScrambles[selectedTrainIndex + 1][
      Math.floor(Math.random() * basicScrambles[selectedTrainIndex + 1].length)
    ];

  // Set the hint to selected alg
  algHint =
    basicAlgorithms[selectedTrainIndex + 1][
      basicAlgorithmSelection[selectedTrainIndex]
    ];

  const caseImgPath =
    "./images/basic_cases/F2L" + (selectedTrainIndex + 1) + ".svg";
  hintImg.src = caseImgPath;

  // Mirror at random
  if (Math.floor(Math.random() * 2)) {
    selectedScramble = mirrorAlg(selectedScramble);
    algHint = mirrorAlg(algHint);
  }

  // Add random U move
  selectedScramble = addRandomUMove(selectedScramble);

  // Show scramble
  scrambleDiv.innerText = selectedScramble;
}
*/

function showSettingsTrain() {
  settingsTrainContainer.style.display = "block";
  overlay.style.display = "block";
}

function updateTrainCases() {
  trainStateSelection = [
    checkboxUnlerned.checked,
    checkboxLearning.checked,
    checkboxFinished.checked,
  ];
  trainGroupSelection = [
    checkboxGroupBasic.checked,
    checkboxGroupBasicBack.checked,
    checkboxGroupAdvanced.checked,
  ];
  closeOverlays();
  generateTrainCaseList();
  saveUserData();
}

function showHint() {
  hintImg.style.visibility = "visible";

  const algList = algHint.split(" ");
  if (hintCounter < algList.length) {
    hintDiv.innerText = algList.slice(0, hintCounter + 1).join(" ");
  }
  hintCounter++;
}

function groupSelected() {
  // Make only selected Group visible
  for (let indexGroup = 0; indexGroup < groups.length; indexGroup++) {
    if (selectGroup.selectedIndex === indexGroup) {
      selectLayoutSub[indexGroup].style.display = "block";
    } else {
      selectLayoutSub[indexGroup].style.display = "none";
    }
  }
  // Scroll to the top
  window.scrollTo(0, 0);
}

function generateTrainCaseList() {
  trainCaseList = [];
  currentTrainCase = 0;

  for (let indexGroup = 0; indexGroup < groups.length; indexGroup++) {
    const group = groups[indexGroup];

    if (trainGroupSelection[indexGroup] === false) continue;

    for (let indexCase = 0; indexCase < group.numberCases; indexCase++) {
      for (let state = 0; state < trainStateSelection.length; state++) {
        if (
          trainStateSelection[state] === true &&
          group.caseSelection[indexCase] === state
        ) {
          const caseToAdd = { indexGroup: indexGroup, indexCase: indexCase };

          trainCaseList.push(caseToAdd);
          break;
        }
      }
    }
  }

  // Randomize Cases
  for (let i = trainCaseList.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = trainCaseList[i];
    trainCaseList[i] = trainCaseList[j];
    trainCaseList[j] = temp;
  }

  // console.log(trainCaseList);
}

function nextScramble() {
  hintCounter = 0;
  hintImg.style.visibility = "hidden";
  hintDiv.innerText = "";

  const indexGroup = trainCaseList[currentTrainCase].indexGroup;
  const caseIndex = trainCaseList[currentTrainCase].indexCase;
  const group = groups[indexGroup];

  // Set the hint to selected alg
  algHint =
    group.algorithms[caseIndex + 1][group.algorithmSelection[caseIndex]];

  hintImg.src = group.imgPath + (caseIndex + 1) + ".svg";

  // let selectedScramble = group.scrambles[caseIndex];

  let selectedScramble =
    group.scrambles[caseIndex + 1][
      Math.floor(Math.random() * group.scrambles[caseIndex + 1].length)
    ];

  // Mirror at random
  if (Math.floor(Math.random() * 2)) {
    selectedScramble = mirrorAlg(selectedScramble);
    algHint = mirrorAlg(algHint);
  }

  // Add random U move
  selectedScramble = addRandomUMove(selectedScramble);

  // Show scramble
  scrambleDiv.innerText = selectedScramble;

  currentTrainCase++;

  if (currentTrainCase >= trainCaseList.length) {
    generateTrainCaseList();
  }
}

function addSelectGroupTrain() {
  // labelGroupCheckbox
  // groupCheckbox

  for (let indexGroup = 0; indexGroup < groups.length; indexGroup++) {
    const group = groups[indexGroup];

    //   groupCheckbox.push(document.createElement("input"));
    //   groupCheckbox[indexGroup].type = "checkbox";
    //   groupCheckbox[indexGroup].classList.add("checkbox__input");
    //   groupCheckbox[indexGroup].name = "checkboxGroup" + group.idName;
    //   groupCheckbox[indexGroup].id = "checkboxGroup" + group.idName + "Id";

    //   labelGroupCheckbox.push(document.createElement("label"));
    //   labelGroupCheckbox[indexGroup].classList.add("checkbox");
    //   labelGroupCheckbox[indexGroup].htmlFor =
    //     "checkboxGroup" + group.idName + "Id";
    //

    //labelGroupCheckbox[indexGroup].appendChild(groupCheckbox[indexGroup]);

    //labelGroupCheckbox[indexGroup].innerHTML = group.name;

    groupCheckbox.push(document.createElement("input"));

    groupCheckbox[indexGroup].type = "checkbox";
    groupCheckbox[indexGroup].classList.add("checkbox__input");
    groupCheckbox[indexGroup].name = "checkboxGroup" + group.idName;
    groupCheckbox[indexGroup].id = "checkboxGroup" + group.idName + "Id";

    // creating label for checkbox
    labelGroupCheckbox.push(document.createElement("label"));

    labelGroupCheckbox[indexGroup].classList.add("checkbox");

    labelGroupCheckbox[indexGroup].htmlFor =
      "checkboxGroup" + group.idName + "Id";

    const difAfter = document.createElement("div");
    difAfter.classList.add("checkbox__box");

    // labelGroupCheckbox[indexGroup].appendChild(
    //   document.createTextNode(group.name)
    // );

    labelGroupCheckbox[indexGroup].appendChild(groupCheckbox[indexGroup]);
    labelGroupCheckbox[indexGroup].appendChild(difAfter);
    labelGroupCheckbox[indexGroup].innerHTML = group.name;

    checkboxGroupContainer.appendChild(labelGroupCheckbox[indexGroup]);
  }
}
