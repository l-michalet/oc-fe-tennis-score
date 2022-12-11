import { createStore } from "redux";
import produce from "immer";

const initialState = {
    player1: 0,
    player2: 0,
    advantage: null,
    winner: null,
    playing: true,
    history: [],
};

function reducer(state = initialState, action) {
    if (action.type === "restart") {
        return initialState;
    }
    if (action.type === "playPause") {
        if (state.winner) {
            return state;
        }
        return produce(state, draft => {
            draft.playing = !draft.playing;
        });
    }
    if (action.type === "pointScored") {
        const player = action.payload.player;
        const otherPlayer = player === "player1" ? "player2" : "player1";
        if (state.winner || !state.playing) {
            return state;
        }
        return produce(state, (draft) => {
            const currentPlayerScore = draft[player];
            if (currentPlayerScore <= 15) {
                draft[player] += 15;
                return;
            }
            if (currentPlayerScore === 30) {
                draft[player] = 40;
                return;
            }
            if (currentPlayerScore === 40) {
                if (draft[otherPlayer] !== 40 || draft.advantage === player) {
                    draft.winner = player;
                    return;
                }
                if (draft.advantage === null) {
                    draft.advantage = player;
                    return;
                }
                draft.advantage = null;
                return;
            }
        });
    }
    return state;
}

export const store = createStore(reducer);

store.subscribe(() => {
    console.log(store.getState());
});