function getRandomColor() {
    const [r,g,b] = [0,0,0].map(() => Math.floor(Math.random()*256))
    return `rgb(${r},${g},${b})`;
}

function paintCell(e) {
    let color = settings.activeColor;
    if (settings.rainbow) {
        color = getRandomColor();
    }
    e.target.style.backgroundColor = color;
}

function createBoard() {
    const { boardSize } = settings;
    const board = document.getElementById("board");
    board.innerHTML = "";

    for (let row = 0; row < boardSize; row++) {
        const eRow = document.createElement("div");
        eRow.classList.add("row");
        for (let col = 0; col < boardSize; col++) {
            const cell = document.createElement("div");
            cell.classList.add("cell");
            
            cell.onmouseenter = paintCell;
            eRow.appendChild(cell);
        }
        board.appendChild(eRow);
    }
}

const settings = {
    rainbow: false,
    colormode: false,
    color: "#000",
    activeColor: "#000",
    boardSize: 4,
    boardSizeIndex: 0,
};

function toggleRainbow() {
    const rainbowBtn = document.getElementById("rainbow");
    settings.rainbow = !settings.rainbow;

    if (settings.rainbow) {
        rainbowBtn.classList.add("active");
    } else {
        rainbowBtn.classList.remove("active");
    }
}

function toggleGridSize() {
    // const boardSizes = [4,8,12,16,24,32,48,64];
    const boardSizes = [4,16,48];
    const boardSizeLabels = ["S", "M", "L"]
    const boardSizeIndex = (settings.boardSizeIndex+1) % boardSizes.length;
    
    settings.boardSize = boardSizes[boardSizeIndex]
    settings.boardSizeIndex = boardSizeIndex;
    document.getElementById("gridsize-btn").innerText = "Size " + boardSizeLabels[boardSizeIndex];
    createBoard();
}

function setColor(color) {
    settings.color = color;
    updateColorControl();
}

function toggleColor() {
    settings.colormode = !settings.colormode;
    updateColorControl();
}

function updateColorControl() {
    const elem = document.getElementById("color-control");
    if (settings.colormode) {
        elem.style.borderColor = settings.color;
        settings.activeColor = settings.color;
    } else {
        elem.style.borderColor = null;
        settings.activeColor = "#000";
    }
}

createBoard()

