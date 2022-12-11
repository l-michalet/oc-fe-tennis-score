import { useDispatch } from "react-redux";
import { restartGame } from "./actions";

export function ResetButton() {
    const dispatch = useDispatch();

    return (
        <button className="button"
                onClick={() => { dispatch(restartGame()); }}>
            Reset to zero
        </button>
    );
}