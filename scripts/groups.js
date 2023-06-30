const basicCollection = {
  saveName: "basic_",
  name: "Basic Cases",
  idName: "Basic",
  scrambles: basicScrambles,
  algorithms: basicAlgorithms,
  // User saved
  algorithmSelection: basicAlgorithmSelection,
  caseSelection: basicCaseSelection,
  customAlgorithms: basicCustomAlgorithms,
  trash: basicTrash,
  //
  imgPath: "./images/basic_cases/",
  numberCases: 42,

  numberCategories: 6,
  categoryNames: [
    "Corner on top, white facing up",
    "Corner on top, white facing front",
    "Corner on top, white facing up",
    "Corner in correct slot, white facing front",
    "Corner in correct slot, white facing side",
    "Corner solved",
  ],
  categoryCases: [
    [2, 4, 6, 8, 10, 12, 14, 16, 34, 36],
    [1, 3, 5, 7, 9, 11, 13, 15, 33, 35],
    [17, 18, 19, 20, 21, 22, 23, 24, 31, 32],
    [27, 29, 39, 41],
    [28, 30, 40, 42],
    [25, 26, 38],
  ],

  divContainer: [],
  caseNumber: [],
  imgContainer: [],
  imgCase: [],
  algorithm: [],
  divAlgorithm: [],
  btnEdit: [],
  imgEdit: [],
  btnDelete: [],
  imgTrash: [],
  trashElementContainer: [],
  caseNumberTrash: [],
  imgContainerTrash: [],
  imgCaseTrash: [],
  btnRecover: [],
};

const basicBackCollection = {
  saveName: "basicBack_",
  name: "Basic Cases Backslot",
  idName: "BasicBack",
  scrambles: basicScramblesBack,
  algorithms: basicAlgorithmsBack,
  // User saved
  algorithmSelection: basicBackAlgorithmSelection,
  caseSelection: basicBackCaseSelection,
  customAlgorithms: basicBackCustomAlgorithms,
  trash: basicTrash,
  //
  imgPath: "./images/basic_cases_back/",
  numberCases: 42,

  numberCategories: 6,
  categoryNames: [
    "Corner on top, white facing up",
    "Corner on top, white facing front",
    "Corner on top, white facing up",
    "Corner in correct slot, white facing front",
    "Corner in correct slot, white facing side",
    "Corner solved",
  ],
  categoryCases: [
    [2, 4, 6, 8, 10, 12, 14, 16, 34, 36],
    [1, 3, 5, 7, 9, 11, 13, 15, 33, 35],
    [17, 18, 19, 20, 21, 22, 23, 24, 31, 32],
    [27, 29, 39, 41],
    [28, 30, 40, 42],
    [25, 26, 38],
  ],

  divContainer: [],
  caseNumber: [],
  imgContainer: [],
  imgCase: [],
  algorithm: [],
  divAlgorithm: [],
  btnEdit: [],
  imgEdit: [],
  btnDelete: [],
  imgTrash: [],
  trashElementContainer: [],
  caseNumberTrash: [],
  imgContainerTrash: [],
  imgCaseTrash: [],
  btnRecover: [],
};

const advancedCollection = {
  saveName: "advanced_",
  name: "Advanced Cases",
  idName: "Advanced",
  scrambles: advancedScrambles,
  algorithms: advancedAlgorithms,
  // User saved
  algorithmSelection: advancedAlgorithmSelection,
  caseSelection: advancedCaseSelection,
  customAlgorithms: advandedCustomAlgorithms,
  trash: advancedTrash,
  //
  imgPath: "./images/advanced_cases/",
  numberCases: 36,

  numberCategories: 2,
  categoryNames: [
    "Corner on top, white facing up",
    "Corner on top, white facing front",
  ],
  categoryCases: [
    [2, 4, 6, 8, 10, 12, 14, 16, 34, 36],
    [1, 3, 5, 7, 9, 11, 13, 15, 33, 35],
  ],

  divContainer: [],
  caseNumber: [],
  imgContainer: [],
  imgCase: [],
  algorithm: [],
  divAlgorithm: [],
  btnEdit: [],
  imgEdit: [],
  btnDelete: [],
  imgTrash: [],
  trashElementContainer: [],
  caseNumberTrash: [],
  imgContainerTrash: [],
  imgCaseTrash: [],
  btnRecover: [],
};

const groups = [basicCollection, basicBackCollection, advancedCollection];
