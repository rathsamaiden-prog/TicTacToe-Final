let board
let winCombos
let player
let currentPlayer
let benchPlayer
let player1Wins = 0
let player2Wins = 0
reset()

function placeTile(cell){
    console.log(currentPlayer)
    let cellLoc = cell.id
    if(board[cellLoc-1][1] != null)
        return
    board[cellLoc-1][1] = currentPlayer[1]
    checkLine(currentPlayer[1])
    setUIVals(cell)
    if(currentPlayer[1] === `X`){
        currentPlayer = player.two
        benchPlayer = player.one
    }else{
        currentPlayer = player.one
        benchPlayer = player.two
    }
}

function setUIVals(cell){
    cell.innerHTML = `<img src="img/${currentPlayer[1]}.png" class="placedTile">`
    document.getElementById(`status`).innerHTML = `Player ${benchPlayer[0]}: ${benchPlayer[1]}`
    if(currentPlayer[2]){
        currentPlayer[3] += 1
        player1Wins = player.one[3]
        player2Wins = player.two[3]
        document.getElementById(`p${currentPlayer[0]}score`).innerHTML = currentPlayer[3]
        reset(currentPlayer)
        document.getElementById(`status`).innerHTML = `Player ${currentPlayer[0]}: ${currentPlayer[1]}`
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

function reset(winner){
    console.log(`test`)
    board = [
        [1,null], [2,null], [3,null],
        [4,null], [5,null], [6,null],
        [7,null], [8,null], [9,null]
    ]
    winCombos = [
        [1,2,3], [4,5,6], [7,8,9],
        [1,4,7], [2,5,8], [3,6,9],
        [1,5,9], [7,5,3]
    ]
    player = {one: [1,`X`,false, player1Wins], two: [2,`O`,false, player2Wins]}
    if(winner == null) winner = player.one
    winner[2] = false
    currentPlayer = winner
    if(currentPlayer[1] == player.one[1])
        benchPlayer = player.two
    else
        benchPlayer = player.one
    console.log(`Current: ${currentPlayer}`)
    let icons = document.querySelectorAll(`.placedTile`)
    icons.forEach(icon => icon.remove())
}