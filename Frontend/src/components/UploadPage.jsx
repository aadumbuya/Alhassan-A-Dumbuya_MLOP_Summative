const UploadPage = () => {
    return (
      <div className="bg-white">
        <div className="container mx-auto px-4 py-16">
          <h2 className="text-3xl font-bold text-center mb-8">Give our model a try!</h2>
          <div className="max-w-2xl mx-auto">
            <div className="bg-gray-100 rounded-lg p-12 text-center">
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-12">
                <p className="text-gray-500 mb-4">CLICK TO UPLOAD</p>
                <input 
                  type="file" 
                  className="hidden" 
                  id="file-upload"
                  accept="video/*"
                />
                <label 
                  htmlFor="file-upload"
                  className="cursor-pointer bg-gray-200 hover:bg-gray-300 px-6 py-2 rounded-lg"
                >
                  Choose File
                </label>
              </div>
              <button className="w-full bg-[#1A1F2E] text-white py-3 rounded-lg mt-6">
                Submit this Video
              </button>
            </div>
          </div>
        </div>
        <footer className="text-center py-4 text-gray-600">
          All rights reserved. VCD © 2024.
        </footer>
      </div>
    );
  };
  export default UploadPage;