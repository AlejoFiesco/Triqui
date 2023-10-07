import { useState, useEffect } from "react";
export default function useGame() {
    const PIECES = ['o', 'x']
    const [currentBoard, setCurrentBoard] = useState(null)
    const [turn, setTurn] = useState(0)
    const [isGameStopped, setisGameStopped] = useState(0)
    const [currentPiece, setCurrentPiece] = useState(PIECES[turn % 2])
    const [winner, setWinner] = useState(null)

    const emptyBoard = () => { return [[' ', ' ', ' '], [' ', ' ', ' '], [' ', ' ', ' ']] }
    const nextTurn = () => setTurn((turn) => turn+=1)

    useEffect(() => {
        setCurrentPiece(PIECES[turn % 2])
    }, [turn])

    useEffect(() => {
        if (!hasWinner()){
            if(turn < 9) nextTurn()
            else setWinner('draw')
        }else {
                setisGameStopped(true);
                setWinner(currentPiece);
            }
    }, [currentBoard])

    const newGame = () => {
        setisGameStopped(false)
        setTurn(0)
        setCurrentBoard(emptyBoard())
        setWinner(null)
    }

    const makeMove = (x, y) => {
        if (!isGameStopped && currentBoard[x][y] === ' ') {
            setCurrentBoard(currentBoard => {
                let tempBoard = structuredClone(currentBoard)
                tempBoard[x][y] = currentPiece
                return tempBoard
            } );
        }
    }
    const hasWinner = () => {
        return (checkRows(currentBoard) || checkRows(flipBoard(currentBoard)));
    }

    const flipBoard = (currentBoard) => {
        if(currentBoard){
            let tempBoard = structuredClone(currentBoard);
            for (let i = 0; i < tempBoard?.length; i++) {
                for (let j = 0; j < tempBoard[i].length; j++) {
                    tempBoard[j][i] = currentBoard[i][j]
                }
            }
            return [...tempBoard]
        }
    }

    const checkRows = (currentBoard) => {
        let hasAWinner = false;
        if(currentBoard){
            for (let row of currentBoard) {
                let line = row?.every((piece) => piece === currentPiece);
                if (line) hasAWinner = true;
            }
            if(!hasAWinner){
                let firstDiagLine = [currentBoard[0][0], currentBoard[1][1], currentBoard[2][2]]
                let secondDiagLine = [currentBoard[0][2], currentBoard[1][1], currentBoard[2][0]]
                if(
                    firstDiagLine.every(piece => piece === currentPiece) 
                    || secondDiagLine.every(piece => piece === currentPiece)
                ) hasAWinner = true;
            }
        }
        return hasAWinner 
    }

    return { newGame, makeMove, currentBoard, isGameStopped, currentPiece, winner }
}

