import { useNavigate } from "react-router-dom";
import Features from "./FeaturesPage"

const Home = () => {
  const navigate = useNavigate();
  
  const handleLogin = () => {
    navigate("/dashboard");  // Redirect to Dashboard after login
  };
  
  return (
    <div className="bg-[#172550] text-white">
      <nav className="w-full p-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">VCD</h1>
        <button
          className="bg-[#1A1F2E] text-white px-6 py-2 rounded-lg border-2 border-white"
          onClick={handleLogin}
        >
          Login
        </button>
      </nav>
      <hr className="border-t-2 border-gray-300 w-full mt-2" />
      <div className="container mx-auto px-4 flex flex-col lg:flex-row items-center justify-between py-12">
        <div className="lg:w-1/2 mb-8 lg:mb-0">
          <h1 className="text-3xl lg:text-5xl font-bold mb-4">
            CNN-based Vehicle Collision Detection and Emergency Response System
          </h1>
          <p className="text-gray-400 mb-6">
            A system that will continuously monitor for the accident through the CCTV installed and notify the concerned authorities for instant rescue.
          </p>
          <button className="bg-[#1A1F2E] border-2 border-white text-white px-8 py-3 rounded-lg">
            Discover More
          </button>
        </div>
        <div className="lg:w-1/2">
          <div className="overflow-hidden px-8">
            <img src="Images/accident.png" alt="car" />
            <div className="aspect-w-16 aspect-h-9 bg-gray-300"></div>
          </div>
        </div>
      </div>
      
      <Features/>
      {/* Footer */}
      <footer className="bg-[#172550] py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <h2 className="text-xl font-bold">VCD</h2>
              <p className="text-gray-400 mt-2">Vehicle Collision Detection System</p>
            </div>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white">Contact</a>
              <a href="#" className="text-gray-400 hover:text-white">Privacy Policy</a>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-6 pt-6 text-center">
            <p className="text-gray-400">© 2025 VCD. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
