const JoinDiscord = () => {
    return (
        <div className="h-screen w-screen fixed flex items-center justify-center pb-24">
            <div className="w-1/2 h-full bg-purple-500 flex shadow-inner items-center justify-center">
                <img src="spinlogo.gif" width="600" alt="logo" />
            </div>
            <div className="w-1/2 h-full  flex items-center justify-center">
                <a href="https://discord.gg/7XkQjJY8pG" target="_blank"
                    className="bg-green-400 p-5 rounded">
                    Join Server Now
                </a>
            </div>
        </div>
    );
}

export default JoinDiscord;