const board = document.getElementById("board");
    const message = document.getElementById("message");
    let currentPlayer = "X";
    let cells = ["", "", "", "", "", "", "", "", ""];
    let gameActive = true;

    function createBoard() {
      board.innerHTML = "";
      for (let i = 0; i < 9; i++) {
        const cell = document.createElement("div");
        cell.classList.add("cell");
        cell.dataset.index = i;
        cell.addEventListener("click", handleCellClick);
        cell.textContent = cells[i];
        board.appendChild(cell);
      }
    }

    function handleCellClick(e) {
      const index = e.target.dataset.index;

      if (cells[index] || !gameActive) return;

      cells[index] = currentPlayer;
      createBoard();
      if (checkWinner()) {
        message.textContent = Player ${currentPlayer} wins!;
        gameActive = false;
      } else if (cells.every(cell => cell)) {
        message.textContent = "It's a draw!";
        gameActive = false;
      } else {
        currentPlayer = currentPlayer === "X" ? "O" : "X";
        message.textContent = Player ${currentPlayer}'s turn;
      }
    }

    function checkWinner() {
      const winCombos = [
        [0,1,2],[3,4,5],[6,7,8],
        [0,3,6],[1,4,7],[2,5,8], 
        [0,4,8],[2,4,6]          
      ];

      return winCombos.some(combo => {
        const [a, b, c] = combo;
        return cells[a] && cells[a] === cells[b] && cells[a] === cells[c];
      });
    }

    function resetGame() {
      cells = ["", "", "", "", "", "", "", "", ""];
      currentPlayer = "X";
      gameActive = true;
      message.textContent = Player ${currentPlayer}'s turn;
      createBoard();
    }

    createBoard();