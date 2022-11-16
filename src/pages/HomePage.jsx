import Discover from "./Discover";
import TopPlay from "../components/TopPlay";

const HomePage = () => {
  return (
    <div className="flex xl:flex-row flex-col-reverse px-5">
        <div className="flex-1 h-fit">
            <Discover />
        </div>
        
        <div className="xl:sticky relative top-0 h-fit">
            <TopPlay />
        </div>
            
    </div>
  )
}

export default HomePage;