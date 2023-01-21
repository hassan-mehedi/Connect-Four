import Logo from "../logo/Logo";

type MenuPropsType = {
    setStartGame: React.Dispatch<React.SetStateAction<boolean>>;
    setShowRules: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function Menu({ setStartGame, setShowRules }: MenuPropsType) {
    return (
        <div className="menu">
            <Logo />
            <div className="menu-button-group">
                <button
                    className="menu-button bg-red-500 text-white"
                    onClick={() => {
                        setStartGame(true);
                    }}
                >
                    PLAYER VS PLAYER
                </button>
                <button
                    className="menu-button bg-white"
                    onClick={() => {
                        setShowRules(true);
                    }}
                >
                    GAME RULES
                </button>
            </div>
        </div>
    );
}
