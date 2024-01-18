import HeadTitle from "../components/HeadTitle"

const Home = () => { 
    return (
        <div className="home">
            <HeadTitle title="Home" />
            <h1>Home</h1>
            <style jsx>{`
                .home {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    height: 100vh;
                }
            `}</style>
        </div>
    );
}
export default Home;