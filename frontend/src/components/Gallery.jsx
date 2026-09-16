function Gallery() {
  const animals = [
    {
      name: "Elephant",
      image: "https://images.unsplash.com/photo-1557050543-4d5f4e07ef46?w=600",
    },
    {
      name: "Lion",
      image: "https://images.unsplash.com/photo-1546182990-dffeafbe841d?w=600",
    },
    {
      name: "Fox",
      image: "https://images.unsplash.com/photo-1474511320723-9a56873867b5?w=600",
    },
    {
      name: "Bird",
      image: "https://images.unsplash.com/photo-1444464666168-49d633b86797?w=600",
    },
  ];

  return (
    <section className="py-16 bg-green-50">
      <h2 className="text-4xl font-bold text-center text-green-800 mb-10">
        Wildlife Gallery
      </h2>

      <div className="max-w-7xl mx-auto grid md:grid-cols-2 lg:grid-cols-4 gap-8 px-6">
        {animals.map((animal, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-lg overflow-hidden hover:scale-105 transition duration-300"
          >
            <img
              src={animal.image}
              alt={animal.name}
              className="w-full h-56 object-cover"
            />

            <div className="p-4 text-center">
              <h3 className="text-xl font-bold text-green-700">
                {animal.name}
              </h3>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Gallery;