import { FaPaw, FaTree, FaGlobeAsia } from "react-icons/fa";

function Stats() {
  const cards = [
    {
      title: "Wildlife Species",
      value: "1,250+",
      icon: <FaPaw size={40} />,
    },
    {
      title: "Protected Forests",
      value: "85",
      icon: <FaTree size={40} />,
    },
    {
      title: "Monitoring Locations",
      value: "320",
      icon: <FaGlobeAsia size={40} />,
    },
  ];

  return (
    <section className="bg-gray-100 py-16">
      <h2 className="text-4xl font-bold text-center text-green-800 mb-10">
        Wildlife Statistics
      </h2>

      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8 px-6">
        {cards.map((card, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl shadow-lg p-8 text-center hover:scale-105 transition"
          >
            <div className="text-green-700 flex justify-center mb-4">
              {card.icon}
            </div>

            <h3 className="text-3xl font-bold">{card.value}</h3>

            <p className="mt-3 text-gray-600">{card.title}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Stats;