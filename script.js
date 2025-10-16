let board = [
    [1,`o`], [2,null], [3,null],
    [4,null], [5,`x`], [6,null],
    [7,`x`], [8,null], [9,null]
]
const winCombos = [
    [1,2,3], [4,5,6], [7,8,9],
    [1,5,6], [7,5,3]
]

let player = {one: `x`, two: `o`}
let currentPlayer = player.one

function placeTile(cell){
    let cellLoc = cell.id
    if(board[cellLoc-1][1] != null)
        return
    board[cellLoc-1][1] = currentPlayer
    console.log(board)
    checkLine(currentPlayer)
    if(currentPlayer === `x`)
        currentPlayer = player.two
    else
        currentPlayer = player.one
}

function checkLine(currentPlayer){
    let playerLocs = board
    let movesLoc = new Array()
    playerLocs.filter(function(placedMove){
        if(placedMove[1] === currentPlayer) movesLoc.push(placedMove[0])
    })
    compareCheck(movesLoc)
}
function compareCheck(movesLoc){
    winCombos.forEach(combo => function(){
        let containNum = 0
        combo.forEach(num => function(){
            if(movesLoc.includes(num)) containNum++
            if(containsNum === 3) return `win`
        })
    })
}
