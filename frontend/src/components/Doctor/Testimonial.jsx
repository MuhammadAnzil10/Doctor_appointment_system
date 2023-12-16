const Testimonial = () => {
  return (
    <div className="max-w-lg mx-auto">
      <div className="relative">
        <div className="flex  justify-center items-center h-64 w-96 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg overflow-hidden">
          <div className="px-8">
            <p className="text-lg font-medium text-white mb-2">
              "The best experience ever"
            </p>
            <p className="text-white">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce
              auctor nisi eget ornare ultrices. Proin laoreet ultrices nunc vel
              dapibus.
            </p>
            <div className="mt-4 flex items-center">
              <img
                className="h-10 w-10 rounded-full mr-4"
                src="https://randomuser.me/api/portraits/women/68.jpg"
                alt="Avatar of person"
              />
              <div>
                <p className="text-white font-medium">Mary Johnson</p>
                <p className="text-gray-200">CEO, Acme Inc.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonial;
