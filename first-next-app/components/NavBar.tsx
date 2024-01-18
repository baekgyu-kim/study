const NavBar = () => { 
    return (
        <div className="nav-bar">
            <div className="nav-bar__logo">
                <a href="/">
                    <img className="nav-bar__logo__img" src="./logo.png" alt="logo" />
                </a>
            </div>
            <div className="nav-bar__menu">
                <div className="nav-bar__menu-item">
                    <a href="/about">About</a>
                </div>
            </div>
            <style jsx>{`
                .nav-bar {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    padding: 0 20px;
                    height: 80px;
                    background-color: #ffffff;
                    border-bottom: 1px solid #eaeaea;
                }
                .nav-bar__logo {
                    width : 70px;
                    height : 70px;
                }
                .nav-bar__logo__img {
                    width: 70px;
                    height: 70px;
                    display: block;
                    border-radius: 50%;
                }
                .nav-bar__menu {
                    display: flex;
                    align-items: center;
                }
                .nav-bar__menu-item {
                    margin-left: 20px;
                }
                .nav-bar__menu-item a {
                    text-decoration: none;
                    color: #000000;
                }

            `}</style>
        </div>
    )
}

export default NavBar;