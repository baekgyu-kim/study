import HeadTitle from "../components/HeadTitle";

const About = () => { 
    return (
        <div className="about">
            <HeadTitle title="About" />
            <h1>About</h1>
            <style jsx>{`
                .about {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    height: 100vh;
                }
            `}</style>
        </div>
    )
}
export default About;