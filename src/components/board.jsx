import './board.style.css'

export default function Board({Game}){

    return (
        <main>
            <div id="board">
                {Game.currentBoard?.map((row, x) => {
                    return row?.map((cell, y) => <div onClick={() => Game.makeMove(x,y)} className="cell" key={`cell${x}${y}`}>{cell}</div>)
                })}
            </div>
        </main>
    )    
}