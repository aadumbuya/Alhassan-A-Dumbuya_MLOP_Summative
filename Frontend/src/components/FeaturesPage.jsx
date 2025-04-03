const FeaturesPage = () => {
    const features = [
      {
        icon: "🎥",
        title: "Real-time Accident Detection",
        description: "Real-time accident detection using advanced deep learning (CNN) on CCTV camera video."
      },
      {
        icon: "🎯",
        title: "Location Identification",
        description: "Integrated location services pinpoint accident locations, vital for swift emergency response."
      },
      {
        icon: "🚨",
        title: "Emergency Alert Generation",
        description: "Post-accident detection, the system sends rapid emergency alerts to authorities with location information for prompt response."
      },
      {
        icon: "📱",
        title: "Integration with Communication Channels",
        description: "Integrated with SMS, the system sends video links notifying traffic authorities for coordinated accident response."
      }
    ];
  
    return (
      <div className="bg-white">
        <div className="container mx-auto px-4 py-16">
          <h2 className="text-3xl font-bold text-center mb-12 text-black">Our Selected Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-[#FFF1F1] rounded-lg p-6">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold mb-2 text-black">{feature.title}</h3>
                <p className="text-black">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

export default FeaturesPage;