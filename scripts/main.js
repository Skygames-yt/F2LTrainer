"use strict";

const numberBasicCases = 42;
const trash = [];
const divContainer = [];
const caseNumber = [];
const imgContainer = [];
const imgCase = [];
const algorithm = [];
const divAlgorithm = [];
const btnEdit = [];
const imgEdit = [];
const btnDelete = [];
const imgTrash = [];

const htmlElement = document.querySelector("html");
const bodyElement = document.querySelector("body");

const editalgContainer = document.getElementById("editalg-container");
const editalgList = document.getElementById("editalg-list");
const editalgCustomalg = document.getElementById("editalg-customalg");
const editalgListentry = [];
let selectedCase = 0;
let selectedAlgNumber = 0;
const numberAlgMax = 20;
const algColors = ["transparent", "yellow"];

const selectLayout = document.getElementById("select-layout");
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

const trashElementContainer = [];
const caseNumberTrash = [];
const imgContainerTrash = [];
const imgCaseTrash = [];
const btnRecover = [];

const colors = ["rgba(0, 0, 0, 0)", "rgb(255, 255, 0)", "rgb(0, 255, 0)"];

const trainContainer = document.getElementById("train-container");

const checkboxUnlerned = document.getElementById("checkboxUnlearnedId");
const checkboxLearning = document.getElementById("checkboxLearningId");
const checkboxFinished = document.getElementById("checkboxFinishedId");

const btnSettingsTrain = document.getElementById("btn-settings-train");
const settingsTrainContainer = document.getElementById("train-cases-container");

const scrambleDiv = document.getElementById("scramble-div");
const hintDiv = document.getElementById("hint-div");
const hintImg = document.getElementById("hint-img");
let algHint = "";

let selectedTrainIndex = 0;
let hintCounter = 0;

let mode = 0; // 0: select, 1: train

window.addEventListener("load", () => {
  // Create all Entries
  for (let i = 0; i < numberBasicCases; i++) {
    // Case Selection Page
    const caseImgPath = "./images/basic_cases/F2L" + (i + 1) + ".svg";

    divContainer.push(document.createElement("div"));
    divContainer[i].classList.add("div-container");

    caseNumber.push(document.createElement("div"));
    caseNumber[i].classList.add("case-number");

    imgContainer.push(document.createElement("div"));
    imgContainer[i].classList.add("image-container");
    imgContainer[i].id = "image-container-" + i;

    imgCase.push(document.createElement("img"));
    imgCase[i].classList.add("img-case");

    algorithm.push(document.createElement("div"));
    algorithm[i].classList.add("algorithm");

    btnEdit.push(document.createElement("div"));
    btnEdit[i].classList.add("btn-edit");

    imgEdit.push(document.createElement("img"));
    imgEdit[i].classList.add("img-edit-trash");

    divAlgorithm.push(document.createElement("div"));
    divAlgorithm[i].classList.add("div-algorithm");

    btnDelete.push(document.createElement("div"));
    btnDelete[i].classList.add("btn-trash");

    imgTrash.push(document.createElement("img"));
    imgTrash[i].classList.add("img-edit-trash");

    if (i != 36) {
      caseNumber[i].innerHTML = i + 1;
      imgCase[i].src = caseImgPath;
      // Set shown alg
      if (basicAlgorithmSelection[i] < basicAlgorithms[i + 1].length) {
        divAlgorithm[i].innerHTML =
          basicAlgorithms[i + 1][basicAlgorithmSelection[i]];
      } else {
        divAlgorithm[i].innerHTML = basicCustomAlgorithms[i];
      }

      imgEdit[i].src = "./images/edit.svg";
      imgTrash[i].src = "./images/trash.svg";

      if (basicTrash[i] == true) {
        divContainer[i].style.display = "none";
      }

      divContainer[i].style.background = colors[basicCaseSelection[i]];

      divContainer[i].appendChild(caseNumber[i]);
      divContainer[i].appendChild(imgContainer[i]);
      imgContainer[i].appendChild(imgCase[i]);
      divContainer[i].appendChild(algorithm[i]);
      algorithm[i].appendChild(btnEdit[i]);
      btnEdit[i].appendChild(imgEdit[i]);
      algorithm[i].appendChild(divAlgorithm[i]);
      algorithm[i].appendChild(btnDelete[i]);
      btnDelete[i].appendChild(imgTrash[i]);

      selectLayout.appendChild(divContainer[i]);
    }

    // Trash
    trashElementContainer.push(document.createElement("div"));
    trashElementContainer[i].classList.add("trash-element-container");

    caseNumberTrash.push(document.createElement("div"));
    caseNumberTrash[i].classList.add("case-number-trash");

    imgContainerTrash.push(document.createElement("div"));
    imgContainerTrash[i].classList.add("img-container-trash");

    imgCaseTrash.push(document.createElement("img"));
    imgCaseTrash[i].classList.add("img-case-trash");

    btnRecover.push(document.createElement("div"));
    btnRecover[i].classList.add("btn-recover");

    if (i != 36) {
      caseNumberTrash[i].innerHTML = i + 1;
      imgCaseTrash[i].src = caseImgPath;
      btnRecover[i].innerHTML = "Recover";
      if (basicTrash[i] == false) {
        trashElementContainer[i].style.display = "none";
      }

      trashElementContainer[i].appendChild(caseNumberTrash[i]);
      trashElementContainer[i].appendChild(imgContainerTrash[i]);
      imgContainerTrash[i].appendChild(imgCaseTrash[i]);
      trashElementContainer[i].appendChild(btnRecover[i]);

      trashContainer.appendChild(trashElementContainer[i]);
    }
  }

  // Edit Algorithm Elements
  for (let i = 0; i < numberAlgMax; i++) {
    editalgListentry.push(document.createElement("div"));
    editalgListentry[i].classList.add("editalg-listentry");

    editalgList.appendChild(editalgListentry[i]);
  }

  //Edit Button Event
  imgEdit.forEach(function (button, i) {
    button.addEventListener("click", function () {
      editAlgs(i);
    });
  });

  // Select algorithm
  editalgListentry.forEach(function (button, i) {
    button.addEventListener("click", function () {
      if (selectedAlgNumber < basicAlgorithms[selectedCase + 1].length) {
        editalgListentry[selectedAlgNumber].style.background = algColors[0];
      } else {
        editalgCustomalg.style.background = algColors[0];
      }
      editalgListentry[i].style.background = algColors[1];
      selectedAlgNumber = i;
    });
  });

  // Case selection
  imgContainer.forEach(function (button, i) {
    button.addEventListener("click", function () {
      basicCaseSelection[i]++;
      if (basicCaseSelection[i] >= 3) {
        basicCaseSelection[i] = 0;
      }
      divContainer[i].style.background = colors[basicCaseSelection[i]];
      // console.log(basicCaseSelection);
    });
  });

  // Delete
  imgTrash.forEach(function (button, i) {
    button.addEventListener("click", function () {
      deleteCase(i);
    });
  });

  // Change Mode
  changeMode.addEventListener("click", function () {
    if (mode == 0) {
      mode = 1;
      changeMode.innerHTML = "select cases";
      selectLayout.style.display = "none";
      sideContainer.style.display = "none";
      trainContainer.style.display = "block";
    } else {
      mode = 0;
      changeMode.innerHTML = "Train";
      selectLayout.style.display = "block";
      sideContainer.style.display = "block";
      trainContainer.style.display = "none";
    }
  });

  // Close Overlays
  overlay.addEventListener("click", function () {
    closeOverlays();
  });

  // Info
  btnInfo.addEventListener("click", function () {
    infoContainer.style.display = "block";
    overlay.style.display = "block";
  });

  // Trash
  btnTrash.addEventListener("click", function () {
    trashContainer.style.display = "block";
    overlay.style.display = "block";
  });

  // Recover
  btnRecover.forEach(function (button, i) {
    button.addEventListener("click", function () {
      basicTrash[i] = false;
      divContainer[i].style.display = "flex";
      trashElementContainer[i].style.display = "none";
    });
  });

  // Settings Train
  btnSettingsTrain.addEventListener("click", showSettingsTrain);

  document.addEventListener("keydown", keydown);
});

function updateAlg() {
  // Update Alg button clicked

  // Read text in custom Alg Textbox
  basicCustomAlgorithms[selectedCase] = editalgCustomalg.value;
  // Check if selected alg is default or custom
  if (selectedAlgNumber < basicAlgorithms[selectedCase + 1].length) {
    // If selected Alg is default
    divAlgorithm[selectedCase].innerHTML =
      basicAlgorithms[selectedCase + 1][selectedAlgNumber];
  } else {
    // If selected Alg is custom
    divAlgorithm[selectedCase].innerHTML = basicCustomAlgorithms[selectedCase];
  }
  // Save which Alg was selected
  basicAlgorithmSelection[selectedCase] = selectedAlgNumber;
  closeOverlays();
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

function editAlgs(i) {
  selectedCase = i;
  selectedAlgNumber = basicAlgorithmSelection[selectedCase];
  // Iterate through all algorithms
  for (let alg = 0; alg < numberAlgMax; alg++) {
    if (alg < basicAlgorithms[selectedCase + 1].length) {
      // Set Text to Alg
      editalgListentry[alg].innerHTML = basicAlgorithms[selectedCase + 1][alg];
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
  if (selectedAlgNumber < basicAlgorithms[selectedCase + 1].length) {
    // If alg is default set color of selected alg
    editalgListentry[basicAlgorithmSelection[selectedCase]].style.background =
      algColors[1];
    // and reset color of custom
    editalgCustomalg.style.background = algColors[0];
  } else {
    // If alg is custom set color
    editalgCustomalg.style.background = algColors[1];
  }

  // Set text in Textbox to saved value
  editalgCustomalg.value = basicCustomAlgorithms[selectedCase];
  // Make container visible
  editalgContainer.style.display = "block";
  // Make overlay visible
  overlay.style.display = "block";
}

function deleteCase(caseNumber) {
  basicTrash[caseNumber] = true;
  divContainer[caseNumber].style.display = "none";
  trashElementContainer[caseNumber].style.display = "flex";
}

function customAlgSelected() {
  // Custon Alg Textbox clicked

  // Set Background of Textbox
  editalgListentry[selectedAlgNumber].style.background = algColors[0];
  // Reset Background of previously selected Alg
  editalgCustomalg.style.background = algColors[1];
  // Set selected Alg to number of selected Alg
  selectedAlgNumber = basicAlgorithms[selectedCase + 1].length;
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
    hintCounter = 0;
    hintImg.style.visibility = "hidden";
    showNewScramble();
    hintDiv.innerText = "";
  } else if (e.keyCode === 39) {
    // rechte Pfeiltaste
    hintImg.style.visibility = "visible";
    showHint();
  }
}

function showNewScramble() {
  // Get all indices of selected cases
  let selectedCases = [];
  for (let i = 0; i < basicCaseSelection.length; i++) {
    for (let state = 0; state < 3; state++) {
      if (
        trainStateSelectioin[state] === true &&
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

function showSettingsTrain() {
  settingsTrainContainer.style.display = "block";
  overlay.style.display = "block";
}

function updateTrainCases() {
  trainStateSelectioin = [
    checkboxUnlerned.checked,
    checkboxLearning.checked,
    checkboxFinished.checked,
  ];
  closeOverlays();
}

function showHint() {
  const algList = algHint.split(" ");
  if (hintCounter < algList.length) {
    hintDiv.innerText = algList.slice(0, hintCounter + 1).join(" ");
  }
  hintCounter++;
}

// something