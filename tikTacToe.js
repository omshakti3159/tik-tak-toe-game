const X_CLASS = 'x'
const CIRCLE_CLASS = 'circle'
const cellElemensts = document.querySelectorAll('[data-cell]')
const winningmessagetextelement = document.querySelector('[data-winning-message]')

const board = document.getElementById('board')
const winningmessage = document.getElementById('winningMessage')
const restartbutton = document.getElementById('restartgame')
const turn = document.getElementById('turn')
let circleturn
const WINNING_COMBINATION = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]

const placemark = (cell, currentClass) => {
    cell.classList.add(currentClass)
}
const swapTurn = () => {
    circleturn = !circleturn
}
const setBordHover = () => {
    board.classList.remove(X_CLASS)
    board.classList.remove(CIRCLE_CLASS)
    if (circleturn) {
        board.classList.add(CIRCLE_CLASS)
        turn.innerText = "O's turn"
    }
    else {
        board.classList.add(X_CLASS)
        turn.innerText = "X's turn"
    }
}
const checkwin = (currentClass) => {
    return WINNING_COMBINATION.some(combination => {
        return combination.every(index => {
            return cellElemensts[index].classList.contains(currentClass)
        })
    })
}
const endGame = (draw) => {
    if (draw) {
        winningmessagetextelement.innerText = "it's a Draw"
    }
    else {
        winningmessagetextelement.innerText = `${circleturn ? "O's" : "X's"} Wins!!`
    }
    winningmessage.classList.add('show')

}
const isDraw = () => {
    return [...cellElemensts].every(cell => {
        return cell.classList.contains(X_CLASS) || cell.classList.contains(CIRCLE_CLASS)
    })
}
const handleClick = (e) => {
    const cell = e.target;
    const currentClass = circleturn ? CIRCLE_CLASS : X_CLASS
    placemark(cell, currentClass)
    if (checkwin(currentClass)) {
        endGame(false)
    }
    else if (isDraw()) {
        endGame(true)
    }
    else {
        swapTurn()
        setBordHover()
    }
}
const startGame = () => {
    circleturn = false
    cellElemensts.forEach(cell => {
        cell.classList.remove(X_CLASS)
        cell.classList.remove(CIRCLE_CLASS)
        cell.removeEventListener('click', handleClick)
        cell.addEventListener('click', handleClick, { once: true })
    })
    setBordHover()
    winningmessage.classList.remove('show')
}

startGame()

restartbutton.addEventListener('click', startGame)