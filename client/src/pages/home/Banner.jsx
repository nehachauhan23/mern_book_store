import bannerImg from "../../assets/banner.png"

const Banner = () => {
  return (
    <div className="flex flex-col md:flex-row py-16 justify-between items-center gap-12">
      {/* left div */}
      <div>
        <h1 className="md:text-5xl text-2xl font-medium mb-7">New Releases This Week</h1>
        <p className="mb-10">"Step into a world where every book holds a new adventure,  
        where the pages turn with the promise of excitement, knowledge, and discovery,  
        and every story brings you closer to a new realm of imagination and wonder."</p>
        <button className="btn-primary">
           Subscribe
        </button>
      </div>
      {/* right div  */}
      <div className="md:w-1/2 w-full flex items-center md:justify-end" >
        <img src={bannerImg} alt="" />
      </div>
    </div>
  )
}

export default Banner