import { useSelector } from "react-redux";

export function Display() {
    const gameIsPlaying = useSelector((state) => state.playing);
    const winner = useSelector((state) => state.winner);
    const player1Score = useSelector((state) => state.player1);
    const player2Score = useSelector((state) => state.player2);
    const advantage = useSelector((state) => state.advantage);

    if (winner) {
        const id = winner.search(/\d+/);
        return <p className="display">Player {winner[id]} wins</p>;
    } else if (!gameIsPlaying) {
        return <p className="display">Break</p>;
    } else {
        if (advantage) {
            const id = advantage.search(/\d+/);
            return <p className="display">Advantage player {advantage[id]}</p>;
        }
        return <p className="display">Score: {player1Score} - {player2Score}</p>;
    }
}