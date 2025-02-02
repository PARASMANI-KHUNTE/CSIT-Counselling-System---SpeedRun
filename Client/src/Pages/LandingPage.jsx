import Navbar from "./Navbar"
const LandingPage = () => {
  return (
    <>
    <div className="overflow-hidden h-screen ">
   <Navbar />
    <hr />
    <div className="flex flex-col  ">
    <div className="h-[70vh] flex flex-col items-center space-y-6">
        <h1 className="mt-52">Welcome to Counselling System</h1>
        <button className="border rounded-lg p-2   hover:text-white hover:bg-gradient-to-tl from-violet-500 to-violet-700 first-letter:">Explore</button>
    </div>
    <div className="footer  h-[10]  text-center pt-28 footer bg-gradient-to-b from-violet-500 to-violet-950">
        <h1 className="text-white">Made by Parasmani Khunte</h1>
        <p>All Right 2024 Csit Department</p>
    </div>
    </div>
    </div>
    </>
  )
}

export default LandingPage