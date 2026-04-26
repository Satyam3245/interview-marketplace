import { getInterviewer } from "@/actions/explore";
import { PageHeader } from "@/components/reusables";

const ExplorePage = async ()=>{
    const interviewer = await getInterviewer();
    return <div className="bg-black min-h-screen">
        <PageHeader
         label="Explore"
         gray="Find your"
         gold="expert interviewer"
         description="Browse senior engineers from top companies."
        />
        
    </div>
}


export default ExplorePage;