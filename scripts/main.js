"use strict";

const ELEM_BODY = document.querySelector("body");

// Get colors from css
const COLOR_BACKGROUND = getComputedStyle(document.documentElement).getPropertyValue("--color-background");
const COLOR_TEXT = getComputedStyle(document.documentElement).getPropertyValue("--color-text");
const COLOR_TEXT_INVERTED = getComputedStyle(document.documentElement).getPropertyValue("--color-text-inverted");
const FILTER_IMG = getComputedStyle(document.documentElement).getPropertyValue("--filter-img");
const FILTER_WHITE = getComputedStyle(document.documentElement).getPropertyValue("--filter-white");
const FILTER_BLACK = getComputedStyle(document.documentElement).getPropertyValue("--filter-black");
const COLOR_IMG = getComputedStyle(document.documentElement).getPropertyValue("--color-img");
const COLOR_POPUP = getComputedStyle(document.documentElement).getPropertyValue("--color-popup");
const COLOR_BTN_HOVER = getComputedStyle(document.documentElement).getPropertyValue("--color-btn-hover");
const COLOR_OVERLAY = getComputedStyle(document.documentElement).getPropertyValue("--color-overlay");
const COLOR_UNLEARNED = getComputedStyle(document.documentElement).getPropertyValue("--color-unleaned");
const COLOR_LEARNING = getComputedStyle(document.documentElement).getPropertyValue("--color-learning");
const COLOR_FINISHED = getComputedStyle(document.documentElement).getPropertyValue("--color-finished");

const ELEM_EDITALG_CONTAINER = document.getElementById("editalg-container");
const ELEM_EDITALG_IMG = document.getElementById("editalg-img");
const ELEM_EDITALG_LIST = document.getElementById("editalg-list");
const ELEM_EDITALG_CUSTOMALG = document.getElementById("editalg-customalg");
const ELEM_EDITALG_LISTENTRY = [];

let selectedCase = 0;
let selectedAlgNumber = 0;

// Maximum number of algs per Case
const NUM_ALG = 20;
const COLORS_ALG = ["transparent", "#009900"];

const ELEM_WINDOW_SELECT = document.getElementById("window-select");
const ELEM_WINDOW_TRAIN = document.querySelector(".window-train");

const ELEM_GROUP_CONTAINER = Array(GROUPS.length);
const ELEM_SIDE_CONTAINER = document.getElementById("side-container");
const ELEM_CHANGE_MODE = document.getElementById("change-mode");
const ELEM_OVERLAY = document.getElementById("overlay");
const ELEM_INFO_CONTAINER = document.getElementById("info-container");
const ELEM_LOADING_SCREEN = document.getElementById("loading-screen");
const ELEM_CHANGE_STATE_POPUP = document.getElementById("popup-change-state");

// side buttons
// const btnTrash = document.getElementById("btn-trash");

const ELEM_TRASH_CONTAINER = document.getElementById("trash-container");

const CATEGORY_NAMES = ["Unlearned", "Learning", "Finished", "All"];

const CATEGORY_COLORS = [COLOR_UNLEARNED, COLOR_LEARNING, COLOR_FINISHED];
// const CATEGORY_BORDERS = ["dashed", "dashed solid", "solid"];
const CATEGORY_BORDERS = ["solid", "solid", "solid"];
const CATEGORY_TEXT_COLOR = [COLOR_TEXT, COLOR_TEXT_INVERTED, COLOR_TEXT_INVERTED];
const COLORS_BTN_EDIT = [FILTER_IMG, FILTER_BLACK, FILTER_BLACK];

const IMG_PATH_RIGHT_ARROW = "./images/arrow_collapse_right.svg";
const IMG_PATH_DOWN_ARROW = "./images/arrow_collapse_down.svg";

const ELEM_LABEL_CHOOSE_GROUP = document.querySelector(".acessibility-label");
const ELEM_CONTAINER_SELECT_GROUP = document.querySelector(".container-select-group");

const ELEM_CHECKBOX_UNLEARNED = document.getElementById("checkboxUnlearnedId");
const ELEM_CHECKBOX_LEARNING = document.getElementById("checkboxLearningId");
const ELEM_CHECKBOX_FINISHED = document.getElementById("checkboxFinishedId");

const ELEM_CHECKBOX_BASIC = document.getElementById("checkboxGroupBasicId");
const ELEM_CHECKBOX_BASIC_BACK = document.getElementById("checkboxGroupBasicBackId");
const ELEM_CHECKBOX_ADVANCED = document.getElementById("checkboxGroupAdvancedId");
const ELEM_CHECKBOX_EXPERT = document.getElementById("checkboxGroupExpertId");

const ELEM_CHECKBOX_LEFT = document.getElementById("checkboxLeftId");
const ELEM_CHECKBOX_RIGHT = document.getElementById("checkboxRightId");

const ELEM_CHECKBOX_AUF = document.getElementById("checkboxAUFId");

const ELEM_CHECKBOX_HINT = document.getElementById("checkboxShowHintId");

const ELEM_BUTTON_SETTINGS = document.querySelector(".btn-settings-train");
const ELEM_SETTINGS_CONTAINER = document.getElementById("train-cases-container");

const ELEM_SCRAMBLE = document.getElementById("scramble");
const ELEM_HINT = document.getElementById("hint");
const ELEM_HINT_IMG = document.getElementById("hint-img");
let algHint = "";

const ELEM_RADIO_UNLEARNED = document.getElementById("radio-state-unlearned");
const ELEM_RADIO_LEARNING = document.getElementById("radio-state-learning");
const ELEM_RADIO_FINISHED = document.getElementById("radio-state-finished");
let currentTrainGroup = -1;
let currentTrainCase = -1;

let selectedTrainIndex = 0;
let hintCounter = 0;

let mode = 0; // 0: select, 1: train

// List that contains all the randomly selected cases
let trainCaseList = [];
let currentTrainCaseNumber = -1;

// Basic, Basic Back, Advanced, Exert
const ELEM_SELECT_GROUP = document.getElementById("select-group");

let boolShowDebugInfo = false;
const ELEM_BTN_SHOW_HIDE_DEBUG_INFO = document.getElementById("btn-show-hide-debug-info");
const ELEM_DEBUG_INFO = document.getElementById("debug-info");

let generatedScrambles = [];

// Flag is set when data is saved
let flagSave = false;

// ----------------------------------------- LOADING -------------------------------------------------------
window.addEventListener("load", () => {
  checkForDuplicates();
  // Load User saved Data (user_saved.js)
  loadUserData();
  ELEM_SELECT_GROUP.selectedIndex = viewSelection; // Set view
  // Create all Entries
  addElementsToDOM();
  // addTrashElementsToBOM();
  // addSelectGroupTrain();

  // Generate placeholder for algs to select
  for (let i = 0; i < NUM_ALG; i++) {
    ELEM_EDITALG_LISTENTRY.push(document.createElement("div"));
    ELEM_EDITALG_LISTENTRY[i].classList.add("editalg-listentry");
    ELEM_EDITALG_LISTENTRY[i].onclick = function () {
      // Change Background when selected
      if (selectedAlgNumber < GROUPS[ELEM_SELECT_GROUP.selectedIndex].algorithms[selectedCase + 1].length) {
        ELEM_EDITALG_LISTENTRY[selectedAlgNumber].style.background = COLORS_ALG[0];
      } else {
        ELEM_EDITALG_CUSTOMALG.style.background = COLORS_ALG[0];
      }
      ELEM_EDITALG_LISTENTRY[i].style.background = COLORS_ALG[1];
      selectedAlgNumber = i;
    };

    ELEM_EDITALG_LIST.appendChild(ELEM_EDITALG_LISTENTRY[i]);
  }

  // Click Event - Collapse Category
  /*
  for (let indexGroup = 0; indexGroup < GROUPS.length; indexGroup++) {
    const GROUP = GROUPS[indexGroup];
    GROUP.collapseContainer.forEach(function (button, indexCase) {
      button.addEventListener("click", function () {
        collapseCategory(indexGroup, indexCase);
      });
    });
  }
*/
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
  ELEM_CHANGE_MODE.onclick = function () {
    changeMode();
  };

  // Close Overlays
  ELEM_OVERLAY.onclick = function () {
    closeOverlays();
  };

  // Click Event - Open Trash
  /*
  btnTrash.onclick = function () {
    ELEM_TRASH_CONTAINER.style.display = "block";
    ELEM_OVERLAY.style.display = "block";
    ELEM_BODY.style.overflow = "hiden";
  };
*/
  document.addEventListener("keydown", keydown);

  // Run this function to only show basic cases in the beginning
  showSelectedGroup();

  // Hide Loading Screen after some time
  setTimeout(() => {
    ELEM_LOADING_SCREEN.style.display = "none";
  }, 100);
});

function addElementsToDOM() {
  // Iterate "Basic", "Basic Back", "Advanced", "Expert"
  for (let indexGroup = 0; indexGroup < GROUPS.length; indexGroup++) {
    const GROUP = GROUPS[indexGroup];
    ELEM_GROUP_CONTAINER[indexGroup] = document.createElement("div");
    ELEM_GROUP_CONTAINER[indexGroup].classList.add("group-container");

    // Iterate over all cases
    for (let indexCategory = 0; indexCategory < GROUP.categoryCases.length; indexCategory++) {
      let categoryItems = GROUP.categoryCases[indexCategory];
      GROUP.categoryContainer[indexCategory] = document.createElement("div");
      GROUP.categoryContainer[indexCategory].classList.add("category-container");
      GROUP.categoryContainer[indexCategory].id = "expand-contract-group" + indexGroup + "-category" + indexCategory;
      GROUP.collapseContainer.push(document.createElement("button"));
      GROUP.collapseContainer[indexCategory].type = "button";
      GROUP.collapseContainer[indexCategory].classList.add("collapse-container");
      GROUP.collapseContainer[indexCategory].onclick = function () {
        collapseCategory(indexGroup, indexCategory);
        // const COLLAPSECLASS = "#expand-contract-group" + indexGroup + "-category" + indexCategory;
        // $(COLLAPSECLASS).slideToggle(200);
      };

      GROUP.categoryCollapseImg.push(document.createElement("img"));
      GROUP.categoryCollapseImg[indexCategory].classList.add("img-collapse-category");
      GROUP.categoryCollapseImg[indexCategory].alt = "collapse category";

      GROUP.categoryCollapseImg[indexCategory].src = IMG_PATH_RIGHT_ARROW;
      if (GROUP.collapse[indexCategory]) {
        // GROUP.categoryContainer[indexCategory].style.display = "none";
        GROUP.categoryContainer[indexCategory].classList.add("display-none");
      } else {
        GROUP.categoryCollapseImg[indexCategory].classList.add("rotate-arrow");
      }

      GROUP.headingCategoryName.push(document.createElement("h2"));
      GROUP.headingCategoryName[indexCategory].classList.add("heading-category-name");

      GROUP.headingCategoryName[indexCategory].innerHTML = GROUP.categoryNames[indexCategory];

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
        GROUP.divContainer[indexCase].classList.add("case-container");
        GROUP.divContainer[indexCase].style.background = CATEGORY_COLORS[GROUP.caseSelection[indexCase]];
        GROUP.divContainer[indexCase].style.color = CATEGORY_TEXT_COLOR[GROUP.caseSelection[indexCase]];
        GROUP.divContainer[indexCase].style.borderStyle = CATEGORY_BORDERS[GROUP.caseSelection[indexCase]];

        GROUP.caseNumber[indexCase] = document.createElement("div");
        GROUP.caseNumber[indexCase].classList.add("case-number");

        GROUP.imgContainer[indexCase] = document.createElement("button");
        GROUP.imgContainer[indexCase].classList.add("img-case-container");
        GROUP.imgContainer[indexCase].onclick = function () {
          changeState(indexGroup, indexCase);
        };

        GROUP.imgCase[indexCase] = document.createElement("img");
        GROUP.imgCase[indexCase].classList.add("img-case");

        GROUP.algorithm[indexCase] = document.createElement("div");
        GROUP.algorithm[indexCase].classList.add("algorithm");

        GROUP.btnEdit[indexCase] = document.createElement("div");
        GROUP.btnEdit[indexCase].classList.add("btn-edit");
        GROUP.btnEdit[indexCase].title = "Edit";

        GROUP.imgEdit[indexCase] = document.createElement("img");
        GROUP.imgEdit[indexCase].classList.add("img-edit-trash");
        GROUP.imgEdit[indexCase].style.filter = COLORS_BTN_EDIT[GROUP.caseSelection[indexCase]];
        GROUP.imgEdit[indexCase].alt = "edit case " + (indexCase + 1);
        GROUP.imgEdit[indexCase].onclick = function () {
          editAlgs(indexGroup, indexCase);
        };

        GROUP.divAlgorithm[indexCase] = document.createElement("div");
        GROUP.divAlgorithm[indexCase].classList.add("div-algorithm");

        GROUP.btnDelete[indexCase] = document.createElement("div");
        GROUP.btnDelete[indexCase].classList.add("btn-trash");
        GROUP.btnDelete[indexCase].title = "Delete";

        GROUP.imgTrash[indexCase] = document.createElement("img");
        GROUP.imgTrash[indexCase].classList.add("img-edit-trash");

        GROUP.caseNumber[indexCase].innerHTML = indexCase + 1;
        GROUP.imgCase[indexCase].src = IMG_CASE_PATH;
        GROUP.imgCase[indexCase].alt = GROUP.name + ", Case " + (indexCase + 1);

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
        GROUP.algorithm[indexCase].appendChild(GROUP.divAlgorithm[indexCase]);
        GROUP.algorithm[indexCase].appendChild(GROUP.btnEdit[indexCase]);
        GROUP.btnEdit[indexCase].appendChild(GROUP.imgEdit[indexCase]);

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
  ELEM_CHANGE_STATE_POPUP.style.display = "none";
  ELEM_BODY.style.overflow = "auto";
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
    ELEM_EDITALG_LISTENTRY[alg].style.background = COLORS_ALG[0];
  }
  // Check if previously saved alg is default of custom
  if (selectedAlgNumber < GROUP.algorithms[selectedCase + 1].length) {
    // If alg is default set color of selected alg
    ELEM_EDITALG_LISTENTRY[GROUP.algorithmSelection[selectedCase]].style.background = COLORS_ALG[1];
    // and reset color of custom
    ELEM_EDITALG_CUSTOMALG.style.background = COLORS_ALG[0];
  } else {
    // If alg is custom set color
    ELEM_EDITALG_CUSTOMALG.style.background = COLORS_ALG[1];
  }

  // Set text in Textbox to saved value
  ELEM_EDITALG_CUSTOMALG.value = GROUP.customAlgorithms[selectedCase];
  // Make container visible
  ELEM_EDITALG_CONTAINER.style.display = "block";
  // Make overlay visible
  ELEM_OVERLAY.style.display = "block";
  // Disable scolling on main page
  ELEM_BODY.style.overflow = "hidden";
}

function customAlgSelected() {
  // Custon Alg Textbox clicked

  // Set Background of Textbox
  ELEM_EDITALG_LISTENTRY[selectedAlgNumber].style.background = COLORS_ALG[0];
  // Reset Background of previously selected Alg
  ELEM_EDITALG_CUSTOMALG.style.background = COLORS_ALG[1];
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

function showSettingsTrain() {
  updateCheckboxStatus();
  ELEM_SETTINGS_CONTAINER.style.display = "block";
  ELEM_OVERLAY.style.display = "block";
  ELEM_BODY.style.overflow = "hidden";
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

  currentTrainCaseNumber = -1;
  generatedScrambles = [];
  closeOverlays();
  generateTrainCaseList();
  saveUserData();
  nextScramble(1);
}

function showHint() {
  if (generatedScrambles.length == 0) return;
  // Get algorithm and convert to list
  const ALG_LIST = generatedScrambles[currentTrainCaseNumber].algHint.split(" ");
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
  viewSelection = ELEM_SELECT_GROUP.selectedIndex;
  saveUserData();
}

function generateTrainCaseList() {
  trainCaseList = [];
  // currentTrainCaseNumber = 0;

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
}

function nextScramble(nextPrevious) {
  updateHintVisibility();
  hintCounter = 0;
  ELEM_HINT.innerText = "Press to show hint";
  if (flagSave) {
    generateTrainCaseList();
    flagSave = false;
  }
  if (nextPrevious) {
    currentTrainCaseNumber++;
    if (currentTrainCaseNumber >= generatedScrambles.length) {
      generateTrainCaseList();
      if (generatedScrambles.length <= 0) {
        return;
      }
    }
  } else if (currentTrainCaseNumber > 0) {
    currentTrainCaseNumber--;
  }

  if (generatedScrambles[currentTrainCaseNumber] == undefined) return;

  const INDEX_GROUP = generatedScrambles[currentTrainCaseNumber].indexGroup;
  const INDEX_CASE = generatedScrambles[currentTrainCaseNumber].indexCase;
  const INDEX_SCRAMBLE = generatedScrambles[currentTrainCaseNumber].indexScramble;
  const MIRRORING = generatedScrambles[currentTrainCaseNumber].mirroring;
  const SELECTED_SCRAMBLE = generatedScrambles[currentTrainCaseNumber].selectedScramble;
  const ALG_HINT = generatedScrambles[currentTrainCaseNumber].algHint;

  const GROUP = GROUPS[INDEX_GROUP];

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
    ", State: " +
    CATEGORY_NAMES[GROUPS[INDEX_GROUP].caseSelection[INDEX_CASE]] +
    ", Algorithm: " +
    GROUPS[INDEX_GROUP].algorithmSelection[INDEX_CASE] +
    ", mirrored: " +
    MIRRORING;

  currentTrainGroup = INDEX_GROUP;
  currentTrainCase = INDEX_CASE;
}

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
  ELEM_BODY.style.overflow = "hidden";
}

// Called when image is clicked
function changeState(indexGroup, indexCase) {
  const GROUP = GROUPS[indexGroup];
  GROUP.caseSelection[indexCase]++;
  if (GROUP.caseSelection[indexCase] >= 3) {
    GROUP.caseSelection[indexCase] = 0;
  }
  GROUP.divContainer[indexCase].style.background = CATEGORY_COLORS[GROUP.caseSelection[indexCase]];
  GROUP.divContainer[indexCase].style.color = CATEGORY_TEXT_COLOR[GROUP.caseSelection[indexCase]];
  GROUP.divContainer[indexCase].style.borderStyle = CATEGORY_BORDERS[GROUP.caseSelection[indexCase]];
  GROUP.imgEdit[indexCase].style.filter = COLORS_BTN_EDIT[GROUP.caseSelection[indexCase]];
  saveUserData();
}

function collapseCategory(indexGroup, indexCategory) {
  const GROUP = GROUPS[indexGroup];
  const CATEGORY_CONATINER = GROUP.categoryContainer[indexCategory];
  if (GROUP.collapse[indexCategory] == true) {
    // expand
    GROUP.categoryCollapseImg[indexCategory].classList.add("rotate-arrow");
    expand(CATEGORY_CONATINER, 300);
    GROUP.collapse[indexCategory] = false;
  } else {
    // colapse
    GROUP.categoryCollapseImg[indexCategory].classList.remove("rotate-arrow");
    collapse(CATEGORY_CONATINER, 300);
    GROUP.collapse[indexCategory] = true;
  }
  saveUserData();
}

function collapse(target, duration = 300) {
  target.style.transitionProperty = "height, margin, padding";
  target.style.transitionDuration = duration + "ms";
  target.style.boxSizing = "border-box";
  target.style.height = target.offsetHeight + "px";
  target.offsetHeight;
  target.style.overflow = "hidden";
  target.style.height = 0;
  target.style.paddingTop = 0;
  target.style.paddingBottom = 0;
  target.style.marginTop = 0;
  target.style.marginBottom = 0;
  window.setTimeout(() => {
    target.classList.add("display-none");
    target.style.removeProperty("height");
    target.style.removeProperty("padding-top");
    target.style.removeProperty("padding-bottom");
    target.style.removeProperty("margin-top");
    target.style.removeProperty("margin-bottom");
    target.style.removeProperty("overflow");
    target.style.removeProperty("transition-duration");
    target.style.removeProperty("transition-property");
  }, duration);
}

let expand = (target, duration = 300) => {
  target.classList.remove("display-none");
  let height = target.offsetHeight;
  target.style.overflow = "hidden";
  target.style.height = 0;
  target.style.paddingTop = 0;
  target.style.paddingBottom = 0;
  target.style.marginTop = 0;
  target.style.marginBottom = 0;
  target.offsetHeight;
  target.style.boxSizing = "border-box";
  target.style.transitionProperty = "height, margin, padding";
  target.style.transitionDuration = duration + "ms";
  target.style.height = height + "px";
  target.style.removeProperty("padding-top");
  target.style.removeProperty("padding-bottom");
  target.style.removeProperty("margin-top");
  target.style.removeProperty("margin-bottom");
  window.setTimeout(() => {
    target.style.removeProperty("height");
    target.style.removeProperty("overflow");
    target.style.removeProperty("transition-duration");
    target.style.removeProperty("transition-property");
  }, duration);
};

function changeMode() {
  if (mode == 0) {
    mode = 1;
    updateTrainCases();
    // nextScramble(1);
    ELEM_CHANGE_MODE.innerHTML = "Select cases";
    // ELEM_WINDOW_SELECT.style.display = "none";
    ELEM_WINDOW_SELECT.classList.add("display-none");
    // ELEM_WINDOW_TRAIN.style.display = "flex";
    ELEM_WINDOW_TRAIN.classList.remove("display-none");
    ELEM_BUTTON_SETTINGS.classList.remove("display-none");
    ELEM_CONTAINER_SELECT_GROUP.classList.add("display-none");
  } else {
    mode = 0;
    ELEM_CHANGE_MODE.innerHTML = "Train";
    // ELEM_WINDOW_SELECT.style.display = "block";
    ELEM_WINDOW_SELECT.classList.remove("display-none");
    // ELEM_WINDOW_TRAIN.style.display = "none";
    ELEM_WINDOW_TRAIN.classList.add("display-none");
    ELEM_BUTTON_SETTINGS.classList.add("display-none");
    ELEM_CONTAINER_SELECT_GROUP.classList.remove("display-none");
  }
}

function checkForDuplicates() {
  for (let indexGroup = 0; indexGroup < GROUPS.length; indexGroup++) {
    const GROUP = GROUPS[indexGroup];
    const FLATTENED_LIST = GROUP.categoryCases.flat();
    for (let i = 0; i < FLATTENED_LIST.length; i++) {
      const CASE_I = FLATTENED_LIST[i];
      for (let j = 0; j < FLATTENED_LIST.length; j++) {
        if (i == j) continue;
        const CASE_J = FLATTENED_LIST[j];
        if (CASE_I == CASE_J) console.warn("Duplicate Case in Group " + GROUP.name + ", Case " + CASE_I);
      }
    }
  }
}

function showSetStateMenu() {
  const STATE = GROUPS[currentTrainGroup].caseSelection[currentTrainCase];
  console.log("indexGroup: " + currentTrainGroup + ", indexCase: " + currentTrainCase + "caseSelection: " + STATE);
  if (STATE == 0 || STATE == "0") {
    ELEM_RADIO_UNLEARNED.checked = true;
    console.log("0 here");
  } else if (STATE == 1 || STATE == "1") {
    ELEM_RADIO_LEARNING.checked = true;
    console.log("1 here");
  } else if (STATE == 2 || STATE == "2") {
    ELEM_RADIO_FINISHED.checked = true;
    console.log("2 here");
  }

  ELEM_CHANGE_STATE_POPUP.style.display = "block";
  ELEM_OVERLAY.style.display = "block";
  ELEM_BODY.style.overflow = "hidden";
}

function changeStateRadio() {
  const GROUP = GROUPS[currentTrainGroup];
  if (GROUP == undefined) return;
  console.log(GROUP.caseSelection[currentTrainCase]);
  if (ELEM_RADIO_UNLEARNED.checked == true) GROUP.caseSelection[currentTrainCase] = 0;
  if (ELEM_RADIO_LEARNING.checked == true) GROUP.caseSelection[currentTrainCase] = 1;
  if (ELEM_RADIO_FINISHED.checked == true) GROUP.caseSelection[currentTrainCase] = 2;
  console.log(GROUP.caseSelection[currentTrainCase]);
  GROUP.divContainer[currentTrainCase].style.background = CATEGORY_COLORS[GROUP.caseSelection[currentTrainCase]];
  GROUP.divContainer[currentTrainCase].style.color = CATEGORY_TEXT_COLOR[GROUP.caseSelection[currentTrainCase]];
  GROUP.divContainer[currentTrainCase].style.borderStyle = CATEGORY_BORDERS[GROUP.caseSelection[currentTrainCase]];
  GROUP.imgEdit[currentTrainCase].style.filter = COLORS_BTN_EDIT[GROUP.caseSelection[currentTrainCase]];

  saveUserData();

  closeOverlays();
}
