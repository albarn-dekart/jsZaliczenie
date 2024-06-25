let field = new Array(100).fill(false);
let mines = 0;
let over = false;

while (mines < 10) {
    let newPos = Math.floor(Math.random() * 100);
    if (!field[newPos]) {
        field[newPos] = true;
        mines++;
    }
}

const app = document.getElementById("app");

for (let i = 0; i < 100; i++) {
    const cell = document.createElement("div");
    cell.classList.add("cell");

    cell.addEventListener("click", () => {
        if (!over){
            if (field[i]) {
                cell.classList.add("mine");
                over = true;
                alert("Game Over! You hit a mine.");
                showMines();
            } else {
                cell.classList.add("revealed");
                cell.textContent = countMines(i) == 0 ? "" : countMines(i);
            }
        }
    });

    app.appendChild(cell);
}

function countMines(index) {
    const row = Math.floor(index / 10);
    const col = index % 10;

    const adjacentIndices = [
        [row - 1, col - 1], [row - 1, col], [row - 1, col + 1],
        [row, col - 1],   /* current */ [row, col + 1],
        [row + 1, col - 1], [row + 1, col], [row + 1, col + 1]
    ];

    return adjacentIndices.reduce((count, [r, c]) => {
        if (r >= 0 && r < 10 && c >= 0 && c < 10 && field[r * 10 + c]) {
            count++;
        }
        return count;
    }, 0);
}

function showMines() {
    const cells = document.querySelectorAll(".cell");
    field.forEach((isMine, index) => {
        if (isMine) {
            cells[index].classList.add("mine");
        }
    });
}