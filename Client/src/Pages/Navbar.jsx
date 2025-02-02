import { Link } from "react-router-dom"

const Navbar = () => {
  return (
    <>
     <nav className="flex p-4 justify-between">
        <div className="logo flex  space-x-4">
            <img width={30} height={20} src="logo.png" alt="" />
            <Link className="p-1">CSIT Counseling System</Link>
        </div>
        <div className="navbar">
            <ul className="flex space-x-5">
                <li className="hover:text-white p-1 cursor-pointer rounded hover:bg-violet-500"><Link to="/student">Student</Link></li>
                <li className="hover:text-white p-1 cursor-pointer rounded hover:bg-violet-500"><Link to="/Employee">Employee</Link></li>
            </ul>
        </div>
    </nav>
    </>
  )
}

export default Navbar