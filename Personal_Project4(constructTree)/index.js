const inputBox = document.querySelector(".input-box");
const mainBox = document.querySelector("main");
const nodeArrayLike = document.getElementsByClassName("node");

inputBox.addEventListener("submit", addNode);

async function addNode(event) {
  event.preventDefault();
  const newNodeValue = event.target[0].value;

  if(!newNodeValue || newNodeValue[0] === "0") return;

  const newNode = makeNode(newNodeValue);
  const nodeArray =   [...nodeArrayLike].map((tag) => +tag.textContent);
  const sequenceArray = makeLeftRightSequenceArray(transArrToBST(nodeArray), +newNodeValue);

  moveNode(sequenceArray, newNode);
  event.target[0].value = "";
}

function makeNode(value) {
  const newDiv = document.createElement("div");

  newDiv.textContent = value;
  newDiv.classList.add("node");

  mainBox.append(newDiv);

  return newDiv;
}

function ConstructNode(val) {
  this.val = val;
  this.left = null;
  this.right = null;
}

function transArrToBST(arr) {
  let root = new ConstructNode(arr[0]);

  for (let i = 1; i < arr.length; i++) {
    root = insertNodeToBST(root, arr[i]);
  }

  return root;
}

function insertNodeToBST(root, val) {
  if (!root) return new ConstructNode(val);

  if (root.val < val) {
    root.right ? insertNodeToBST(root.right, val) : root.right = new ConstructNode(val);
  } else {
    root.left ? insertNodeToBST(root.left, val) : root.left = new ConstructNode(val);
  }

  return root;
}

function makeLeftRightSequenceArray(root, value) {
  const resultArray = ["downSequence"];

  return cycleBST(root, value);

  function cycleBST(root, value) {
    if (!root) {
      return resultArray;
    }

    if (root.val === value) {
      return resultArray;
    }

    if (root.val <= value) {
      resultArray.push("rightSequence");
      return cycleBST(root.right, value);
    } else {
      resultArray.push("leftSequence");
      return cycleBST(root.left, value);
    }
  }
}

async function moveNode(sequenceArr, tag) {
  let index = 0;
  let posX = 750;
  let posY = 50;

  while (index < sequenceArr.length) {
    const currentSequence = sequenceArr[index];

    switch (currentSequence) {
      case "downSequence":
        const downSequence = new Promise((resolve) => {
          setTimeout(() => {
            posY += 60;
            tag.style.transform = `translate(${posX}px, ${posY}px)`;
            resolve();
          }, 0);
        });

        await downSequence;
        break;

      case "rightSequence":
        const rightSequence = new Promise((resolve) => {
          setTimeout(() => {
            posX += 100
            posY += 50;
            tag.style.transform = `translate(${posX}px, ${posY}px)`;
            resolve();
          }, 1000);
        });

        await rightSequence;
        break;

      case "leftSequence":
        const leftSequence = new Promise((resolve) => {
          setTimeout(() => {
            posX -= 100
            posY += 50;
            tag.style.transform = `translate(${posX}px, ${posY}px)`;
            resolve();
          }, 1000);
        });

        await leftSequence;
        break;
    }

    index++;
  }
}
