import {
  FaCamera,
  FaMicrophone,
  FaMapMarkedAlt,
  FaChartLine,
} from "react-icons/fa";

function Features() {
  const features = [
    {
      title: "AI Image Detection",
      icon: <FaCamera size={45} />,
      description:
        "Identify wildlife species using advanced AI-powered image recognition.",
    },
    {
      title: "Bird Sound Analysis",
      icon: <FaMicrophone size={45} />,
      description:
        "Detect bird species through intelligent audio classification.",
    },
    {
      title: "Habitat Mapping",
      icon: <FaMapMarkedAlt size={45} />,
      description:
        "Visualize wildlife locations using interactive habitat maps.",
    },
    {
      title: "Population Analytics",
      icon: <FaChartLine size={45} />,
      description:
        "Monitor wildlife trends with detailed dashboards and reports.",
    },
  ];

  return (
    <section className="py-16 bg-white">
      <h2 className="text-4xl font-bold text-center text-green-800 mb-12">
        Key Features
      </h2>

      <div className="max-w-7xl mx-auto grid md:grid-cols-2 lg:grid-cols-4 gap-8 px-8">
        {features.map((feature, index) => (
          <div
            key={index}
            className="bg-green-50 rounded-2xl shadow-lg p-6 hover:shadow-2xl hover:-translate-y-2 transition duration-300"
          >
            <div className="text-green-700 mb-5">{feature.icon}</div>

            <h3 className="text-2xl font-bold mb-4">
              {feature.title}
            </h3>

            <p className="text-gray-600">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Features;