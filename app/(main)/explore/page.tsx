import { getInterviewer } from "@/actions/explore";
import { PageHeader } from "@/components/reusables";
import ExploreGrid from "./components/exploregrid";

const ExplorePage = async ()=>{
    const interviewer = await getInterviewer();
    return <div className="bg-black min-h-screen">
        <PageHeader
         label="Explore"
         gray="Find your"
         gold=" expert interviewer"
         description="Browse senior engineers from top companies."
        />
        
        <div className="max-w-6xl mx-auto px-8 xl:px-0 py-10">
            <ExploreGrid interviewers={interviewer} />
        </div>
    </div>
}


export default ExplorePage;