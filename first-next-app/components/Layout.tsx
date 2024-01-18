import NavBar from "./NavBar";

type AppLayoutProps = {
    children: React.ReactNode;

}

const Layout = ({children} : AppLayoutProps) => {
    return (
        <>
            <NavBar />
            <div>
                {children}
            </div>
        </>

    )
}
export default Layout;