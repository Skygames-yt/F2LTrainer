"use strict";

const ELEM_EDITALG_CONTAINER = document.getElementById("editalg-container"); // renamed from editalgContainer
const ELEM_EDITALG_IMG = document.getElementById("editalg-img"); // renamed from editalgImg
const ELEM_EDITALG_LIST = document.getElementById("editalg-list"); // renamed from editalgList
const ELEM_EDITALG_CUSTOMALG = document.getElementById("editalg-customalg"); // renamed from editalgCustomalg
const ELEM_EDITALG_LISTENTRY = []; // renamed from editalgListentry

let selectedCase = 0;
let selectedAlgNumber = 0;

// Maximum number of algs per Case
const NUM_ALG = 20; // renamed!!!!! from numberAlgMax
const ALG_COLORS = ["transparent", "#009900"]; // renamed!!!!! from algColors

const ELEM_WINDOW_SELECT = document.getElementById("window-select"); // renamed!!!!! from selectLayout
const ELEM_WINDOW_TRAIN = document.getElementById("window-train"); // renamed!!!!! from trainContainer

const ELEM_GROUP_CONTAINER = Array(GROUPS.length); // renamed from selectLayoutSub
const ELEM_SIDE_CONTAINER = document.getElementById("side-container"); // renamed from ELEM_SIDE_CONTAINER
const ELEM_CHANGE_MODE = document.getElementById("change-mode"); // renamed from changeMode
const ELEM_OVERLAY = document.getElementById("overlay"); // renamed from overlay
const ELEM_INFO_CONTAINER = document.getElementById("info-container"); // renamed from infoContainer

// side buttons
// const btnSetting = document.getElementById("btn-settings");
// const btnTrash = document.getElementById("btn-trash");

const ELEM_TRASH_CONTAINER = document.getElementById("trash-container"); // renamed from trashContainer

// const ELEM_SELECT_STATE = document.getElementById("select-state"); // renamed from selectState // obsolete?
const CATEGORY_NAMES = ["Unlearned", "Learning", "Finished", "All"]; // renamed!!!!!!! from possibleStates

const CATEGORY_COLORS = ["rgba(0, 0, 0, 0)", "rgb(236 236 0)", "rgb(0 196 0)"]; // renamed!!!!! from colors
const CATEGORY_BORDERS = ["dashed", "dashed solid", "solid"]; // renamed!!!!! from borders
const CATEGORY_TEXT_COLOR = ["rgb(255 255 255)", "rgb(0 0 0)", "rgb(255 255 255)"]; // renamed!!!!! from colorsText

const IMG_PATH_RIGHT_ARROW = "./images/arrow_collapse_right.svg"; // renamed!!!!! from imgPathRightArrow
const IMG_PATH_DOWN_ARROW = "./images/arrow_collapse_down.svg"; // renamed!!!!! from imgPathDownArrow

const ELEM_CHECKBOX_UNLEARNED = document.getElementById("checkboxUnlearnedId"); // renamed from checkboxUnlerned
const ELEM_CHECKBOX_LEARNING = document.getElementById("checkboxLearningId"); // renamed from checkboxLearning
const ELEM_CHECKBOX_FINISHED = document.getElementById("checkboxFinishedId"); // renamed from checkboxFinished

// ELEM_CHECKBOX_UNLEARNED.style.backgroundColor = CATEGORY_COLORS[0]; // not working
// ELEM_CHECKBOX_LEARNING.style.backgroundColor = CATEGORY_COLORS[1]; // not working
// ELEM_CHECKBOX_FINISHED.style.backgroundColor = CATEGORY_COLORS[2]; // not working

const ELEM_CHECKBOX_BASIC = document.getElementById("checkboxGroupBasicId"); // renamed from checkboxGroupBasic
const ELEM_CHECKBOX_BASIC_BACK = document.getElementById("checkboxGroupBasicBackId"); // renamed from checkboxGroupBasicBack
const ELEM_CHECKBOX_ADVANCED = document.getElementById("checkboxGroupAdvancedId"); // renamed from checkboxGroupAdvanced
const ELEM_CHECKBOX_EXPERT = document.getElementById("checkboxGroupExpertId"); // renamed from checkboxGroupExpert

const ELEM_CHECKBOX_LEFT = document.getElementById("checkboxLeftId"); // renamed from checkboxLeft
const ELEM_CHECKBOX_RIGHT = document.getElementById("checkboxRightId"); // renamed from checkboxRigt

const ELEM_CHECKBOX_AUF = document.getElementById("checkboxAUFId"); // renamed from checkboxAddAuf

const ELEM_CHECKBOX_HINT = document.getElementById("checkboxShowHintId"); // renamed from checkboxShowHint

const ELEM_BUTTON_SETTINGS = document.getElementById("btn-settings-train"); // renamed from btnSettingsTrain
const ELEM_SETTINGS_CONTAINER = document.getElementById("train-cases-container"); // renamed from settingsTrainContainer

const ELEM_SCRAMBLE = document.getElementById("scramble"); // renamed from scrambleDiv
const ELEM_HINT = document.getElementById("hint"); // renamed from hintDiv
const ELEM_HINT_IMG = document.getElementById("hint-img"); // renamed from hintImg
let algHint = "";

let selectedTrainIndex = 0;
let hintCounter = 0;

let mode = 0; // 0: select, 1: train

// List that contains all the randomly selected cases
let trainCaseList = [];
let currentTrainCase = -1;

// Basic, Basic Back, Advanced, Exert
const ELEM_SELECT_GROUP = document.getElementById("select-group"); // renamed from selectGroup

// const checkboxGroupContainer = document.getElementById("checkbox-group-container"); // obsolete????????????

// const labelGroupCheckbox = []; // obsolete?
// const groupCheckbox = []; // obsolete?

let boolShowDebugInfo = false;
const ELEM_BTN_SHOW_HIDE_DEBUG_INFO = document.getElementById("btn-show-hide-debug-info"); // renamed from btnShowHideDebugInfo
const ELEM_DEBUG_INFO = document.getElementById("debug-info"); // renamed from divDebug

let generatedScrambles = [];

// ----------------------------------------- LOADING -------------------------------------------------------
window.addEventListener("load", () => {
  // Load User saved Data (user_saved.js)
  loadUserData();
  // Create all Entries
  addElementsToBOM();
  // addTrashElementsToBOM();
  // addSelectGroupTrain();

  // Generate placeholder for algs to select
  for (let i = 0; i < NUM_ALG; i++) {
    ELEM_EDITALG_LISTENTRY.push(document.createElement("div"));
    ELEM_EDITALG_LISTENTRY[i].classList.add("editalg-listentry");

    ELEM_EDITALG_LIST.appendChild(ELEM_EDITALG_LISTENTRY[i]);
  }

  //Edit Button - Click on Edit Button
  for (let indexGroup = 0; indexGroup < GROUPS.length; indexGroup++) {
    const GROUP = GROUPS[indexGroup];
    GROUP.imgEdit.forEach(function (button, indexCase) {
      button.addEventListener("click", function () {
        console.log("indexGroup: " + indexGroup + "\nindexCase: " + indexCase);
        editAlgs(indexGroup, indexCase);
      });
    });
  }

  // Click Event - Change Case to Unlearned, Learning, Finished
  // for (let indexGroup = 0; indexGroup < GROUPS.length; indexGroup++) {
  //   const GROUP = GROUPS[indexGroup];
  //   GROUP.imgContainer.forEach(function (button, i) {
  //     button.addEventListener("click", function () {
  //       GROUP.caseSelection[i]++;
  //       if (GROUP.caseSelection[i] >= 3) {
  //         GROUP.caseSelection[i] = 0;
  //       }
  //       GROUP.divContainer[i].style.background = CATEGORY_COLORS[GROUP.caseSelection[i]];
  //       GROUP.divContainer[i].style.color = CATEGORY_COLORSText[GROUP.caseSelection[i]];
  //       GROUP.divContainer[i].style.borderStyle = CATEGORY_BORDERS[GROUP.caseSelection[i]];
  //       // Save
  //       saveUserData();
  //     });
  //   });
  // }

  // Select algorithm - Click on algorithm
  ELEM_EDITALG_LISTENTRY.forEach(function (button, i) {
    button.addEventListener("click", function () {
      // Change Background when selected
      if (selectedAlgNumber < GROUPS[ELEM_SELECT_GROUP.selectedIndex].algorithms[selectedCase + 1].length) {
        ELEM_EDITALG_LISTENTRY[selectedAlgNumber].style.background = ALG_COLORS[0];
      } else {
        ELEM_EDITALG_CUSTOMALG.style.background = ALG_COLORS[0];
      }
      ELEM_EDITALG_LISTENTRY[i].style.background = ALG_COLORS[1];
      selectedAlgNumber = i;
    });
  });

  // Click Event - Collapse Category
  for (let indexGroup = 0; indexGroup < GROUPS.length; indexGroup++) {
    const GROUP = GROUPS[indexGroup];
    GROUP.collapseContainer.forEach(function (button, i) {
      button.addEventListener("click", function () {
        if (GROUP.categoryContainer[i].style.display == "none") {
          GROUP.categoryContainer[i].style.display = "flex";
          GROUP.categoryCollapseImg[i].src = IMG_PATH_DOWN_ARROW;
          GROUP.collapse[i] = false;
        } else {
          GROUP.categoryContainer[i].style.display = "none";
          GROUP.categoryCollapseImg[i].src = IMG_PATH_RIGHT_ARROW;
          GROUP.collapse[i] = true;
        }
        saveUserData();
      });
    });
  }

  // Click Event - Delete Button clicked
  // for (let indexGroup = 0; indexGroup < GROUPS.length; indexGroup++) {
  //   const GROUP = GROUPS[indexGroup];
  //   GROUP.imgTrash.forEach(function (button, indexCase) {
  //     button.addEventListener("click", function () {
  //       GROUP.trash[indexCase] = true;
  //       GROUP.divContainer[indexCase].style.display = "none";
  //       GROUP.trashElementContainer[indexCase].style.display = "flex";
  //       // Save
  //       saveUserData();
  //     });
  //   });
  // }

  // Click Event - Recover
  // for (let indexGroup = 0; indexGroup < GROUPS.length; indexGroup++) {
  //   // TEST
  //   const GROUP = GROUPS[indexGroup];
  //   GROUP.btnRecover.forEach(function (button, indexCase) {
  //     button.addEventListener("click", function () {
  //       GROUP.trash[indexCase] = false;
  //       GROUP.divContainer[indexCase].style.display = "flex";
  //       GROUP.trashElementContainer[indexCase].style.display = "none";

  //       // Save
  //       saveUserData();
  //     });
  //   });
  // }

  // Change Mode
  ELEM_CHANGE_MODE.addEventListener("click", function () {
    if (mode == 0) {
      mode = 1;
      nextScramble(1);
      ELEM_CHANGE_MODE.innerHTML = "Select cases";
      ELEM_WINDOW_SELECT.style.display = "none";
      // ELEM_SIDE_CONTAINER.style.display = "none";
      ELEM_SELECT_GROUP.style.display = "none";
      ELEM_WINDOW_TRAIN.style.display = "flex";
      ELEM_BUTTON_SETTINGS.style.display = "flex";
    } else {
      mode = 0;
      ELEM_CHANGE_MODE.innerHTML = "Train";
      ELEM_WINDOW_SELECT.style.display = "block";
      // ELEM_SIDE_CONTAINER.style.display = "block";
      ELEM_SELECT_GROUP.style.display = "block";
      ELEM_WINDOW_TRAIN.style.display = "none";
      ELEM_BUTTON_SETTINGS.style.display = "none";
    }
  });

  // Close Overlays
  ELEM_OVERLAY.addEventListener("click", function () {
    closeOverlays();
  });

  // Click Event - Open Trash
  // btnTrash.addEventListener("click", function () {
  //   ELEM_TRASH_CONTAINER.style.display = "block";
  //   ELEM_OVERLAY.style.display = "block";
  // });

  document.addEventListener("keydown", keydown);

  // Run this function to only show basic cases in the beginning
  showSelectedGroup();
});

function addElementsToBOM() {
  // Iterate "Basic", "Basic Back", "Advanced"
  for (let indexGroup = 0; indexGroup < GROUPS.length; indexGroup++) {
    const GROUP = GROUPS[indexGroup];
    ELEM_GROUP_CONTAINER[indexGroup] = document.createElement("div");
    ELEM_GROUP_CONTAINER[indexGroup].classList.add("group-container"); // renamed!!!!! from all-alg-container

    // Iterate over all cases
    for (let indexCategory = 0; indexCategory < GROUP.categoryCases.length; indexCategory++) {
      let categoryItems = GROUP.categoryCases[indexCategory];
      GROUP.categoryContainer[indexCategory] = document.createElement("div");
      GROUP.categoryContainer[indexCategory].classList.add("category-container"); // renamed from div-category-container

      GROUP.collapseContainer.push(document.createElement("button"));
      GROUP.collapseContainer[indexCategory].type = "button";
      GROUP.collapseContainer[indexCategory].classList.add("collapse-container");

      GROUP.categoryCollapseImg.push(document.createElement("img"));
      GROUP.categoryCollapseImg[indexCategory].classList.add("img-collapse-category");

      if (GROUP.collapse[indexCategory]) {
        GROUP.categoryContainer[indexCategory].style.display = "none";
        GROUP.categoryCollapseImg[indexCategory].src = IMG_PATH_RIGHT_ARROW;
      } else {
        GROUP.categoryCollapseImg[indexCategory].src = IMG_PATH_DOWN_ARROW;
      }
      //ELEM_GROUP_CONTAINER[indexGroup].appendChild(GROUP.categoryCollapseImg[indexCategory]);

      GROUP.headingCategoryName.push(document.createElement("h2"));
      GROUP.headingCategoryName[indexCategory].classList.add("heading-category-name");

      GROUP.headingCategoryName[indexCategory].innerHTML = GROUP.categoryNames[indexCategory];
      //ELEM_GROUP_CONTAINER[indexGroup].appendChild(GROUP.headingCategoryName[indexCategory]);

      GROUP.collapseContainer[indexCategory].appendChild(GROUP.categoryCollapseImg[indexCategory]);
      GROUP.collapseContainer[indexCategory].appendChild(GROUP.headingCategoryName[indexCategory]);
      ELEM_GROUP_CONTAINER[indexGroup].appendChild(GROUP.collapseContainer[indexCategory]);

      for (let indexCategoryItem = 0; indexCategoryItem < categoryItems.length; indexCategoryItem++) {
        let indexCase = categoryItems[indexCategoryItem] - 1;
        // Check if selected algorithm is valid
        if (GROUP.algorithms[indexCase + 1] == undefined) {
          console.warn("Trying to access invalid Case\nindexGroup: " + indexGroup + "\nindexCase: " + indexCase);
          continue;
        }
        // Case Selection Page
        const IMG_CASE_PATH = GROUP.imgPath + "right/F2L" + (indexCase + 1) + ".svg";

        GROUP.divContainer[indexCase] = document.createElement("div");
        GROUP.divContainer[indexCase].classList.add("case-container"); // renamed from div-container
        GROUP.divContainer[indexCase].style.background = CATEGORY_COLORS[GROUP.caseSelection[indexCase]];
        GROUP.divContainer[indexCase].style.color = CATEGORY_TEXT_COLOR[GROUP.caseSelection[indexCase]];
        GROUP.divContainer[indexCase].style.borderStyle = CATEGORY_BORDERS[GROUP.caseSelection[indexCase]];

        GROUP.caseNumber[indexCase] = document.createElement("div");
        GROUP.caseNumber[indexCase].classList.add("case-number");

        GROUP.imgContainer[indexCase] = document.createElement("button");
        GROUP.imgContainer[indexCase].classList.add("img-case-container"); // renamed from image-container
        // GROUP.imgContainer[indexCase].setAttribute("onclick", "changeCategory(indexGroup, indexCase)");
        GROUP.imgContainer[indexCase].onclick = function () {
          // console.log("indexGroup: " + indexGroup + ", indexCase: " + indexCase);
          changeCategory(indexGroup, indexCase);
        };
        // GROUP.imgContainer[indexCase].id = "img-case-container-" + indexCase;

        // console.log(GROUP.imgContainer[indexCase]);

        GROUP.imgCase[indexCase] = document.createElement("img");
        GROUP.imgCase[indexCase].classList.add("img-case");

        GROUP.algorithm[indexCase] = document.createElement("div");
        GROUP.algorithm[indexCase].classList.add("algorithm");

        GROUP.btnEdit[indexCase] = document.createElement("div");
        GROUP.btnEdit[indexCase].classList.add("btn-edit");
        GROUP.btnEdit[indexCase].title = "Edit";

        GROUP.imgEdit[indexCase] = document.createElement("img");
        GROUP.imgEdit[indexCase].classList.add("img-edit-trash");
        // console.log("Creating:\nindexGroup: " + indexGroup + "\nindexCase: " + indexCase);

        GROUP.divAlgorithm[indexCase] = document.createElement("div");
        GROUP.divAlgorithm[indexCase].classList.add("div-algorithm");

        GROUP.btnDelete[indexCase] = document.createElement("div");
        GROUP.btnDelete[indexCase].classList.add("btn-trash");
        GROUP.btnDelete[indexCase].title = "Delete";

        GROUP.imgTrash[indexCase] = document.createElement("img");
        GROUP.imgTrash[indexCase].classList.add("img-edit-trash");

        GROUP.caseNumber[indexCase].innerHTML = indexCase + 1;
        GROUP.imgCase[indexCase].src = IMG_CASE_PATH;
        // Set shown alg
        if (GROUP.algorithmSelection[indexCase] < GROUP.algorithms[indexCase + 1].length) {
          GROUP.divAlgorithm[indexCase].innerHTML =
            GROUP.algorithms[indexCase + 1][GROUP.algorithmSelection[indexCase]];
        } else {
          GROUP.divAlgorithm[indexCase].innerHTML = GROUP.customAlgorithms[indexCase];
        }

        GROUP.imgEdit[indexCase].src = "./images/edit.svg";
        GROUP.imgTrash[indexCase].src = "./images/trash.svg";

        if (GROUP.trash[indexCase] == true) {
          GROUP.divContainer[indexCase].style.display = "none";
        }

        GROUP.divContainer[indexCase].style.background = CATEGORY_COLORS[GROUP.caseSelection[indexCase]];

        GROUP.divContainer[indexCase].appendChild(GROUP.caseNumber[indexCase]); // Don't show case number

        GROUP.divContainer[indexCase].appendChild(GROUP.imgContainer[indexCase]);
        GROUP.imgContainer[indexCase].appendChild(GROUP.imgCase[indexCase]);
        GROUP.divContainer[indexCase].appendChild(GROUP.algorithm[indexCase]);
        // GROUP.algorithm[indexCase].appendChild(GROUP.btnEdit[indexCase]);
        // GROUP.btnEdit[indexCase].appendChild(GROUP.imgEdit[indexCase]);
        GROUP.algorithm[indexCase].appendChild(GROUP.divAlgorithm[indexCase]);
        GROUP.algorithm[indexCase].appendChild(GROUP.btnEdit[indexCase]);
        GROUP.btnEdit[indexCase].appendChild(GROUP.imgEdit[indexCase]);
        // GROUP.algorithm[indexCase].appendChild(GROUP.btnDelete[indexCase]);
        //GROUP.btnDelete[indexCase].appendChild(GROUP.imgTrash[indexCase]);

        GROUP.categoryContainer[indexCategory].appendChild(GROUP.divContainer[indexCase]);
      }
      ELEM_GROUP_CONTAINER[indexGroup].appendChild(GROUP.categoryContainer[indexCategory]);
    }
    ELEM_WINDOW_SELECT.appendChild(ELEM_GROUP_CONTAINER[indexGroup]);
  }
}

/*
function addTrashElementsToBOM() {
  for (let indexGroup = 0; indexGroup < GROUPS.length; indexGroup++) {
    // TEST
    const GROUP = GROUPS[indexGroup];

    for (let indexCase = 0; indexCase < GROUP.numberCases; indexCase++) {
      // Case Selection Page
      const caseImgPath = GROUP.imgPath + "right/F2L" + (indexCase + 1) + ".svg";

      GROUP.trashElementContainer.push(document.createElement("div"));
      GROUP.trashElementContainer[indexCase].classList.add("trash-element-container");

      GROUP.caseNumberTrash.push(document.createElement("div"));
      GROUP.caseNumberTrash[indexCase].classList.add("case-number-trash");

      GROUP.imgContainerTrash.push(document.createElement("div"));
      GROUP.imgContainerTrash[indexCase].classList.add("img-container-trash");

      GROUP.imgCaseTrash.push(document.createElement("img"));
      GROUP.imgCaseTrash[indexCase].classList.add("img-case-trash");

      GROUP.btnRecover.push(document.createElement("div"));
      GROUP.btnRecover[indexCase].classList.add("btn-recover");

      if (indexCase != 36) {
        GROUP.caseNumberTrash[indexCase].innerHTML = indexCase + 1;
        GROUP.imgCaseTrash[indexCase].src = caseImgPath;
        GROUP.btnRecover[indexCase].innerHTML = "Recover";
        if (basicTrash[indexCase] == false) {
          GROUP.trashElementContainer[indexCase].style.display = "none";
        }

        GROUP.trashElementContainer[indexCase].appendChild(GROUP.caseNumberTrash[indexCase]);
        GROUP.trashElementContainer[indexCase].appendChild(GROUP.imgContainerTrash[indexCase]);
        GROUP.imgContainerTrash[indexCase].appendChild(GROUP.imgCaseTrash[indexCase]);
        GROUP.trashElementContainer[indexCase].appendChild(GROUP.btnRecover[indexCase]);

        ELEM_TRASH_CONTAINER.appendChild(GROUP.trashElementContainer[indexCase]);
      }
    }
  }
}
*/

function updateAlg() {
  // Update Alg button clicked
  const GROUP = GROUPS[ELEM_SELECT_GROUP.selectedIndex];

  // Read text in custom Alg Textbox
  GROUP.customAlgorithms[selectedCase] = ELEM_EDITALG_CUSTOMALG.value;
  // Check if selected alg is default or custom
  if (selectedAlgNumber < GROUP.algorithms[selectedCase + 1].length) {
    // If selected Alg is default
    GROUP.divAlgorithm[selectedCase].innerHTML = GROUP.algorithms[selectedCase + 1][selectedAlgNumber];
  } else {
    // If selected Alg is custom
    GROUP.divAlgorithm[selectedCase].innerHTML = GROUP.customAlgorithms[selectedCase];
  }
  // Save which Alg was selected
  GROUP.algorithmSelection[selectedCase] = selectedAlgNumber;
  closeOverlays();

  // Save
  saveUserData();
}

function closeOverlays() {
  ELEM_INFO_CONTAINER.style.display = "none";
  ELEM_TRASH_CONTAINER.style.display = "none";
  ELEM_EDITALG_CONTAINER.style.display = "none";
  ELEM_SETTINGS_CONTAINER.style.display = "none";
  ELEM_OVERLAY.style.display = "none";
}

function editAlgs(indexGroup, indexCase) {
  selectedCase = indexCase;
  const GROUP = GROUPS[indexGroup];
  selectedAlgNumber = GROUP.algorithmSelection[selectedCase];

  // Set image
  ELEM_EDITALG_IMG.src = GROUP.imgPath + "right/F2L" + (selectedCase + 1) + ".svg";

  // Iterate through all algorithms
  for (let alg = 0; alg < NUM_ALG; alg++) {
    if (alg < GROUP.algorithms[selectedCase + 1].length) {
      // Set Text to Alg
      ELEM_EDITALG_LISTENTRY[alg].innerHTML = GROUP.algorithms[selectedCase + 1][alg];
      // Make all used elements visible
      ELEM_EDITALG_LISTENTRY[alg].style.display = "block";
    } else {
      // Make all unused elements invisible
      ELEM_EDITALG_LISTENTRY[alg].style.display = "none";
    }
    // Reset all backgrounds
    ELEM_EDITALG_LISTENTRY[alg].style.background = ALG_COLORS[0];
  }
  // Check if previously saved alg is default of custom
  if (selectedAlgNumber < GROUP.algorithms[selectedCase + 1].length) {
    // If alg is default set color of selected alg
    ELEM_EDITALG_LISTENTRY[GROUP.algorithmSelection[selectedCase]].style.background = ALG_COLORS[1];
    // and reset color of custom
    ELEM_EDITALG_CUSTOMALG.style.background = ALG_COLORS[0];
  } else {
    // If alg is custom set color
    ELEM_EDITALG_CUSTOMALG.style.background = ALG_COLORS[1];
  }

  // Set text in Textbox to saved value
  ELEM_EDITALG_CUSTOMALG.value = GROUP.customAlgorithms[selectedCase];
  // Make container visible
  ELEM_EDITALG_CONTAINER.style.display = "block";
  // Make overlay visible
  ELEM_OVERLAY.style.display = "block";
}

function customAlgSelected() {
  // Custon Alg Textbox clicked

  // Set Background of Textbox
  ELEM_EDITALG_LISTENTRY[selectedAlgNumber].style.background = ALG_COLORS[0];
  // Reset Background of previously selected Alg
  ELEM_EDITALG_CUSTOMALG.style.background = ALG_COLORS[1];
  // Set selected Alg to number of selected Alg
  selectedAlgNumber = GROUPS[ELEM_SELECT_GROUP.selectedIndex].algorithms[selectedCase + 1].length;
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
    nextScramble(1);
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
  ELEM_HINT_IMG.style.visibility = "hidden";
  ELEM_HINT.innerText = "";
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
  ELEM_HINT_IMG.src = caseImgPath;

  // Mirror at random
  if (Math.floor(Math.random() * 2)) {
    selectedScramble = mirrorAlg(selectedScramble);
    algHint = mirrorAlg(algHint);
  }

  // Add random U move
  selectedScramble = addRandomUMove(selectedScramble);

  // Show scramble
  ELEM_SCRAMBLE.innerText = selectedScramble;
}
*/

function showSettingsTrain() {
  updateCheckboxStatus();
  ELEM_SETTINGS_CONTAINER.style.display = "block";
  ELEM_OVERLAY.style.display = "block";
}

function updateTrainCases() {
  trainStateSelection = [
    ELEM_CHECKBOX_UNLEARNED.checked,
    ELEM_CHECKBOX_LEARNING.checked,
    ELEM_CHECKBOX_FINISHED.checked,
  ];
  trainGroupSelection = [
    ELEM_CHECKBOX_BASIC.checked,
    ELEM_CHECKBOX_BASIC_BACK.checked,
    ELEM_CHECKBOX_ADVANCED.checked,
    ELEM_CHECKBOX_EXPERT.checked,
  ];
  leftSelection = ELEM_CHECKBOX_LEFT.checked;
  rightSelection = ELEM_CHECKBOX_RIGHT.checked;
  aufSelection = ELEM_CHECKBOX_AUF.checked;
  hintSelection = ELEM_CHECKBOX_HINT.checked;

  currentTrainCase = -1;
  generatedScrambles = [];
  closeOverlays();
  generateTrainCaseList();
  saveUserData();
  nextScramble(1);
}

function showHint() {
  if (generatedScrambles.length == 0) return;
  // Get algorithm and convert to list
  const ALG_LIST = generatedScrambles[currentTrainCase].algHint.split(" ");
  ELEM_HINT_IMG.style.opacity = 100;
  if (hintCounter < ALG_LIST.length) {
    ELEM_HINT.innerText = ALG_LIST.slice(0, hintCounter + 1).join(" ");
  }
  hintCounter++;
}

function showSelectedGroup() {
  // renamed from groupSelected
  // Make only selected Group visible
  for (let indexGroup = 0; indexGroup < GROUPS.length; indexGroup++) {
    if (ELEM_SELECT_GROUP.selectedIndex === indexGroup) {
      ELEM_GROUP_CONTAINER[indexGroup].style.display = "flex";
    } else {
      ELEM_GROUP_CONTAINER[indexGroup].style.display = "none";
    }
  }
  // Scroll to the top
  window.scrollTo(0, 0);
}

function generateTrainCaseList() {
  trainCaseList = [];

  for (let indexGroup = 0; indexGroup < GROUPS.length; indexGroup++) {
    const GROUP = GROUPS[indexGroup];
    if (!trainGroupSelection[indexGroup]) continue;
    for (let indexCategory = 0; indexCategory < GROUP.categoryCases.length; indexCategory++) {
      let categoryItems = GROUP.categoryCases[indexCategory];
      for (let indexCategoryItem = 0; indexCategoryItem < categoryItems.length; indexCategoryItem++) {
        let indexCase = categoryItems[indexCategoryItem] - 1;
        //for (let indexCase = 0; indexCase < GROUP.numberCases; indexCase++) {
        for (let state = 0; state < trainStateSelection.length; state++) {
          if (trainStateSelection[state] && GROUP.caseSelection[indexCase] == state) {
            if (GROUP.scrambles[indexCase + 1] == undefined)
              console.warn(
                "GROUP.scrambles[indexCase + 1] == undefined\nindexGroup: " +
                  indexGroup +
                  "\nindexCase: " +
                  indexCase +
                  "\ngroup.scrambles: " +
                  GROUP.scrambles
              );

            // Get scramble index
            const iNDEX_SCRAMBLE = parseInt(Math.random() * GROUP.scrambles[indexCase + 1].length);
            let selectedScramble = GROUP.scrambles[indexCase + 1][iNDEX_SCRAMBLE];

            // Get hint algorithm
            if (GROUP.algorithmSelection[indexCase] >= GROUP.algorithms[indexCase + 1].length) {
              algHint = GROUP.customAlgorithms[indexCase];
            } else {
              algHint = GROUP.algorithms[indexCase + 1][GROUP.algorithmSelection[indexCase]];
            }

            // Mirror if wanted
            let mirroring;
            if (rightSelection && leftSelection) {
              mirroring = parseInt(Math.floor(Math.random() * 2));
            } else if (rightSelection && !leftSelection) {
              mirroring = 0;
            } else if (!rightSelection && leftSelection) {
              mirroring = 1;
            }
            if (mirroring) {
              selectedScramble = mirrorAlg(selectedScramble);
              algHint = mirrorAlg(algHint);
            }

            // Add U move if wanted
            if (aufSelection) selectedScramble = addRandomUMove(selectedScramble);

            const CASE_TO_ADD = {
              indexGroup: indexGroup,
              indexCase: indexCase,
              indexScramble: iNDEX_SCRAMBLE,
              mirroring: mirroring,
              selectedScramble: selectedScramble,
              algHint: algHint,
            };

            trainCaseList.push(CASE_TO_ADD);
            break;
          }
        }
      }
    }
  }

  // Exit if no cases are selected
  if (trainCaseList.length == 0) ELEM_SCRAMBLE.innerHTML = "no case selected";

  // Randomize Cases
  for (let i = trainCaseList.length - 1; i > 0; i--) {
    const J = Math.floor(Math.random() * (i + 1));
    const TEMP = trainCaseList[i];
    trainCaseList[i] = trainCaseList[J];
    trainCaseList[J] = TEMP;
  }

  generatedScrambles = generatedScrambles.concat(trainCaseList);

  // console.log(generatedScrambles);
}

function nextScramble(nextPrevious) {
  updateHintVisibility();
  hintCounter = 0;
  ELEM_HINT.innerText = "Press to show hint";

  if (nextPrevious) {
    currentTrainCase++;
    if (currentTrainCase >= generatedScrambles.length) {
      generateTrainCaseList();
      if (generatedScrambles.length <= 0) {
        return;
      }
    }
  } else if (currentTrainCase > 0) {
    currentTrainCase--;
  }

  const INDEX_GROUP = generatedScrambles[currentTrainCase].indexGroup;
  const INDEX_CASE = generatedScrambles[currentTrainCase].indexCase;
  const INDEX_SCRAMBLE = generatedScrambles[currentTrainCase].indexScramble;
  const MIRRORING = generatedScrambles[currentTrainCase].mirroring;
  const SELECTED_SCRAMBLE = generatedScrambles[currentTrainCase].selectedScramble;
  const ALG_HINT = generatedScrambles[currentTrainCase].algHint;

  const GROUP = GROUPS[INDEX_GROUP];

  // Set the hint to selected alg
  // ALG_HINT = GROUP.algorithms[INDEX_CASE + 1][GROUP.algorithmSelection[INDEX_CASE]];

  if (!MIRRORING) {
    ELEM_HINT_IMG.src = GROUP.imgPath + "right/F2L" + (INDEX_CASE + 1) + ".svg";
  } else {
    ELEM_HINT_IMG.src = GROUP.imgPath + "left/F2L" + (INDEX_CASE + 1) + ".svg";
  }

  // Show scramble
  ELEM_SCRAMBLE.innerText = SELECTED_SCRAMBLE;

  ELEM_DEBUG_INFO.innerHTML =
    "Group: " +
    GROUPS[INDEX_GROUP].name +
    ", Case: " +
    (INDEX_CASE + 1) +
    ", Scramble: " +
    INDEX_SCRAMBLE +
    ", Algorithm: " +
    GROUPS[INDEX_GROUP].algorithmSelection[INDEX_CASE] +
    ", mirrored: " +
    MIRRORING;
}

// obsolete? ----------------------------------------------------------------????????????????????????
/*
function addSelectGroupTrain() {
  // labelGroupCheckbox
  // groupCheckbox

  for (let indexGroup = 0; indexGroup < GROUPS.length; indexGroup++) {
    const GROUP = GROUPS[indexGroup];

    //   groupCheckbox.push(document.createElement("input"));
    //   groupCheckbox[indexGroup].type = "checkbox";
    //   groupCheckbox[indexGroup].classList.add("checkbox__input");
    //   groupCheckbox[indexGroup].name = "checkboxGroup" + GROUP.idName;
    //   groupCheckbox[indexGroup].id = "checkboxGroup" + GROUP.idName + "Id";

    //   labelGroupCheckbox.push(document.createElement("label"));
    //   labelGroupCheckbox[indexGroup].classList.add("checkbox");
    //   labelGroupCheckbox[indexGroup].htmlFor =
    //     "checkboxGroup" + GROUP.idName + "Id";
    //

    //labelGroupCheckbox[indexGroup].appendChild(groupCheckbox[indexGroup]);

    //labelGroupCheckbox[indexGroup].innerHTML = GROUP.name;

    groupCheckbox.push(document.createElement("input"));

    groupCheckbox[indexGroup].type = "checkbox";
    groupCheckbox[indexGroup].classList.add("checkbox__input");
    groupCheckbox[indexGroup].name = "checkboxGroup" + GROUP.idName;
    groupCheckbox[indexGroup].id = "checkboxGroup" + GROUP.idName + "Id";

    // creating label for checkbox
    labelGroupCheckbox.push(document.createElement("label"));

    labelGroupCheckbox[indexGroup].classList.add("checkbox");

    labelGroupCheckbox[indexGroup].htmlFor = "checkboxGroup" + GROUP.idName + "Id";

    const difAfter = document.createElement("div");
    difAfter.classList.add("checkbox__box");

    // labelGroupCheckbox[indexGroup].appendChild(
    //   document.createTextNode(GROUP.name)
    // );

    labelGroupCheckbox[indexGroup].appendChild(groupCheckbox[indexGroup]);
    labelGroupCheckbox[indexGroup].appendChild(difAfter);
    labelGroupCheckbox[indexGroup].innerHTML = GROUP.name;

    checkboxGroupContainer.appendChild(labelGroupCheckbox[indexGroup]);
  }
}
*/

function updateCheckboxStatus() {
  ELEM_CHECKBOX_UNLEARNED.checked = trainStateSelection[0];
  ELEM_CHECKBOX_LEARNING.checked = trainStateSelection[1];
  ELEM_CHECKBOX_FINISHED.checked = trainStateSelection[2];
  ELEM_CHECKBOX_BASIC.checked = trainGroupSelection[0];
  ELEM_CHECKBOX_BASIC_BACK.checked = trainGroupSelection[1];
  ELEM_CHECKBOX_ADVANCED.checked = trainGroupSelection[2];
  ELEM_CHECKBOX_EXPERT.checked = trainGroupSelection[3];
  ELEM_CHECKBOX_LEFT.checked = leftSelection;
  ELEM_CHECKBOX_RIGHT.checked = rightSelection;
  ELEM_CHECKBOX_AUF.checked = aufSelection;
  ELEM_CHECKBOX_HINT.checked = hintSelection;
}

function updateHintVisibility() {
  if (hintSelection) {
    ELEM_HINT_IMG.style.opacity = 100;
  } else {
    ELEM_HINT_IMG.style.opacity = 0;
  }
}

function showHideDebugInfo() {
  if (boolShowDebugInfo) {
    boolShowDebugInfo = false;
    ELEM_BTN_SHOW_HIDE_DEBUG_INFO.innerHTML = "> Show info";
    ELEM_DEBUG_INFO.style.display = "none";
  } else {
    boolShowDebugInfo = true;
    ELEM_BTN_SHOW_HIDE_DEBUG_INFO.innerHTML = "> Hide info";
    ELEM_DEBUG_INFO.style.display = "block";
  }
}

function showInfo() {
  ELEM_INFO_CONTAINER.style.display = "block";
  ELEM_OVERLAY.style.display = "block";
}

// Called when image is clicked
function changeCategory(indexGroup, indexCase) {
  const GROUP = GROUPS[indexGroup];
  GROUP.caseSelection[indexCase]++;
  console.log(GROUP.caseSelection[indexCase]);
  if (GROUP.caseSelection[indexCase] >= 3) {
    GROUP.caseSelection[indexCase] = 0;
  }
  GROUP.divContainer[indexCase].style.background = CATEGORY_COLORS[GROUP.caseSelection[indexCase]];
  GROUP.divContainer[indexCase].style.color = CATEGORY_TEXT_COLOR[GROUP.caseSelection[indexCase]];
  GROUP.divContainer[indexCase].style.borderStyle = CATEGORY_BORDERS[GROUP.caseSelection[indexCase]];

  saveUserData();
}
