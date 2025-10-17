let board;
let winCombos;
let player;
let currentPlayer;
let benchPlayer;
reset()

function placeTile(cell){
    let cellLoc = cell.id
    if(board[cellLoc-1][1] != null)
        return
    board[cellLoc-1][1] = currentPlayer[1]
    console.log(board)
    checkLine(currentPlayer[1])
    if(currentPlayer[1] === `X`){
        currentPlayer = player.two
        benchPlayer = player.one
    }else{
        currentPlayer = player.one
        benchPlayer = player.two
    }
    setUIVals(cell)
}

function setUIVals(cell){
    cell.children.src = `img/${currentPlayer[1]}.png`
    document.getElementById(`status`).innerHTML = `Player ${currentPlayer[0]}: ${currentPlayer[1]}`
    if(benchPlayer[2]){
        benchPlayer[3] += 1
        document.getElementById(`p${benchPlayer[0]}score`).innerHTML = benchPlayer[3]
        reset()
    }
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
    winCombos.forEach(function(combo){
        let containNum = 0
        combo.forEach(function(num){
            if(movesLoc.includes(num)) containNum += 1
            if(containNum === 3) currentPlayer[2] = true
        })
    })
}

function reset(){
    board = [
        [1,null], [2,null], [3,null],
        [4,null], [5,null], [6,null],
        [7,null], [8,null], [9,null]
    ]
    winCombos = [
        [1,2,3], [4,5,6], [7,8,9],
        [1,4,7], [2,5,8], [3,6,9],
        [1,5,6], [7,5,3]
    ]

    player = {one: [1,`X`,false, 0], two: [2,`O`,false, 0]}
    currentPlayer = player.one
    benchPlayer = player.two
    let btns = document.querySelectorAll(`.row-button`)
    btns.forEach(btn => function(){
        btn.src = ``
    })
}