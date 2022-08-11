const state = {
    gameElement: document.querySelector('.game'),
    cells: Array(9).fill(null),
    symbols:['o', 'x'],
    winningCombinations: [
        [0, 1, 2], // Top row combination
        [3, 4, 5], // Middle row combination
        [6, 7, 8], // Bottom row combination
        [0, 3, 6], // Left column combination
        [1, 4, 7], // Middle column combination
        [2, 5, 8], // Right column combination
        [0, 4, 8], // Left diagonal combination 
        [2, 4, 6] // Right diagonal combination
    ], 
    gameFinished: false
}

const drawBoard = () => {
    state.gameElement.innerHTML = ''

    for (let i = 0; i < 9; i++) {

        const cell = document.createElement('div');
        cell.classList.add('cell');
        
        if(state.cells[i]) {

            const cellSymbol = document.createElement('p');
            cellSymbol.innerText = state.cells[i];
            cellSymbol.classList.add('symbol');

            cell.append(cellSymbol);
        } else {
            cell.addEventListener('click', () => {
                if(state.gameFinished) {
                    return;
                }

                state.symbols.reverse(); 
                const currentPlayerSymbol = state.symbols[0];
                state.cells[i] = currentPlayerSymbol;

                drawBoard();

                if (checkForWinner()) {
                    drawMessage(`${state.symbols[0]} won!`)
                    state.gameFinished = true;
                    return
                }

                if (checkForDraw()) {
                    drawMessage('Draw!')
                    state.gameFinished = true;
                }
            })
        }
        state.gameElement.append(cell)
    }
}

const checkForWinner = () => {
    return state.winningCombinations.some(combo => {
        const cells = combo.map(index => state.cells[index]);

        return !(cells.includes(null)) && new Set(cells).size === 1;
    })
}

const checkForDraw = () => {
    return state.cells.every(cell => cell !== null);
}

const drawMessage = (message) => {
    const banner = document.createElement('div');
    banner.classList.add('banner');

    const h1 = document.createElement('h1');
    h1.innerText = message;
    banner.append(h1);

    state.gameElement.append(banner)
}

drawBoard()