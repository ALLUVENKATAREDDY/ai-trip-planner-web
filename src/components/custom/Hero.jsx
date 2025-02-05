import { Button } from '../ui/button';
import { Link } from 'react-router-dom';

function Hero() {
  return (
    <div className='mt-10 mb-0 pt-16'>
    <h1 className="font-extrabold  text-center mt-2 text-2xl sm:text-3xl md:text-4xl">
    Travel Journal
</h1>
    <div className="flex flex-col md:flex-row items-center md:items-start max-w-6xl mx-auto px-6 gap-6 mt-5 p-20 pl-30">
      {/* Left Section - Text */}
      <div className="md:w-1/2 flex flex-col justify-center items-center md:items-start text-center md:text-left gap-6">
      <h1 className="font-extrabold text-2xl sm:text-3xl md:text-4xl text-[#f56551]">
  Discover Your Perfect Trip Plan Worldwide
</h1>
<p className="text-lg md:text-xl text-gray-800">
  Create your ideal travel itinerary by entering details like your destination, duration, budget, and travel companions. We provide tailored hotel recommendations and daily plans, ensuring a stress-free travel experience.
</p>

        <Link to="/create-trip">
          <Button className="px-6 py-2 bg-blue-600 text-white hover:bg-blue-700 transition-colors duration-200">
            Get Started
          </Button>
        </Link>
      </div>

      {/* Right Section - Image */}
      <div className="md:w-1/2 flex justify-center items-center mt-10 md:mt-0 text-center">
      <img
        src="https://res.cloudinary.com/df67zy4wm/image/upload/v1729792396/g5yvu1zajm1s9v5v0vgp.avif"
        alt="Tourist Destination"
        className="w-full h-auto rounded-md object-cover"
      />
</div>

    </div>
    </div>
  );
}

export default Hero;
