import HeadTitle from "@/components/HeadTitle";
import { useRouter } from "next/router";

const Detail = () => {
    const router = useRouter();
    const { movieId } = router.query;
    
    return (
        <>
            <HeadTitle title="Detail" />
            <div>
                <h1>Detail Page</h1>
            </div>
            <style jsx>{`
                .detail {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    height: 100vh;
                }
            `}</style>
        </>
    );
};

export default Detail;