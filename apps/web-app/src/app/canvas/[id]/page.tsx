import { cookies } from "next/headers";
import CanvasRoom from "../../../../components/CanvasRoom";

const Page = async ({ params }: { params: Promise<{ id: number }> }) => {

    const id = (await params).id
    // console.log(id);

    // get cookies
    const cookieStore = await cookies()
    const token = cookieStore.get("token")?.value || ""
    // console.log(token);

    return (
        <CanvasRoom id={id} token={token} />
    );
}

export default Page;