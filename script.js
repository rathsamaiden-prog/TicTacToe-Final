let board
let winCombos
let player
let currentPlayer
let benchPlayer
let player1Wins = 0
let player2Wins = 0
let tieCount = 0
let tieCheck
let winMove
reset()

function placeTile(cell){
    if(winMove) return
    let cellLoc = cell.id
    if(board[cellLoc-1][1] != null)
        return
    cell.classList.replace(`row-button`, `selected-row-button`)
    board[cellLoc-1][1] = currentPlayer[1]
    checkLine(currentPlayer[1])
    if(setUIVals(cell)) return
    if(currentPlayer[1] === `X`){
        currentPlayer = player.two
        benchPlayer = player.one
    }else{
        currentPlayer = player.one
        benchPlayer = player.two
    }
}

function setUIVals(cell){
    if(tieCheck){
        let btns = document.querySelectorAll(`.selected-row-button`)
        btns.forEach(function(btn){
            btn.classList.replace(`selected-row-button`, `row-button`)
        })
        tieCheck = false
        return
    }
    if(cell == null){
        tieCount += 1
        document.getElementById(`tiecount`).innerHTML = `${tieCount} ties`
        tieCheck = true
        reset()
        return
    }
    cell.innerHTML = `<img src="img/${currentPlayer[1]}.png" class="placedTile">`
    cell.classList.replace("row-button", "selected-row-button");
    document.getElementById(`status`).innerHTML = `Player ${benchPlayer[0]}: ${benchPlayer[1]}`
    if(currentPlayer[2]){
        document.getElementById(`status`).id = `status2`
        document.getElementById(`status2`).innerHTML = `Player ${currentPlayer[1]} Wins`
        setTimeout(() => {
            benchPlayer[3] += 1
            player1Wins = player.one[3]
            player2Wins = player.two[3]
            document.getElementById(`p${benchPlayer[0]}score`).innerHTML = benchPlayer[3]
            document.getElementById(`status2`).innerHTML = `Player ${benchPlayer[0]}: ${benchPlayer[1]}`
            setTimeout(() => {
                reset(benchPlayer)
            }, 1);
            return true
        }, 2000);
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
            if(currentPlayer[2] === true) winMove = combo
        })
    })
    if(movesLoc.length === 5 && !currentPlayer[2]) setUIVals(null)
}

function reset(winner){
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
    winMove = null
    let btns = document.querySelectorAll(`.selected-row-button`)
    btns.forEach(function(btn){
        btn.classList.replace(`selected-row-button`, `row-button`)
        btn.classList.replace(`winningTile`, `row-button`)
    })
    if(!tieCheck) document.getElementById(`status2`).id = `status`
    let icons = document.querySelectorAll(`.placedTile`)
    icons.forEach(icon => icon.remove())
    return currentPlayer
}