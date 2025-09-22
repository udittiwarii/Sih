export default function About() {
  return (
    <div className="min-h-screen bg-gray-50 px-6 py-12">
      {/* Header Section */}
      <div className="max-w-4xl mx-auto text-center mb-12">
        <h2 className="text-4xl font-extrabold text-blue-700 mb-4">
          About Our Platform
        </h2>
        <p className="text-lg text-gray-600">
          Empowering citizens, workers, and administrators to protect and
          preserve the holy Ganga by reducing pollution and improving waste
          management.
        </p>
      </div>

      {/* Mission Section */}
      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8 mb-12">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-2xl font-semibold text-blue-600 mb-3">
            🌍 Our Mission
          </h3>
          <p className="text-gray-700 leading-relaxed">
            Our mission is to build a cleaner, greener future by connecting
            people and technology. We aim to make waste reporting and resolution
            simple, transparent, and effective, ensuring the Ganga river stays
            pollution-free for generations to come.
          </p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-2xl font-semibold text-blue-600 mb-3">
            🤝 Community First
          </h3>
          <p className="text-gray-700 leading-relaxed">
            Every citizen can raise complaints about waste or pollution. Workers
            are notified instantly to take action, while administrators monitor
            and ensure accountability. Together, we create a powerful chain of
            action.
          </p>
        </div>
      </div>

      {/* Government Section */}
      <div className="max-w-5xl mx-auto bg-blue-50 border border-blue-200 rounded-lg shadow-md p-8 mb-12">
        <h3 className="text-2xl font-bold text-blue-700 mb-4">
          🚀 Government Initiatives
        </h3>
        <p className="text-gray-700 leading-relaxed mb-4">
          This project aligns with national programs like{" "}
          <span className="font-semibold">Namami Gange</span> and{" "}
          <span className="font-semibold">Swachh Bharat Abhiyan</span>. Our
          system supports government efforts to:
        </p>
        <ul className="list-disc list-inside text-gray-700 space-y-2">
          <li>Track and reduce pollution sources in real-time</li>
          <li>Empower local bodies with data-driven insights</li>
          <li>Reward citizens for active participation</li>
          <li>Promote awareness and eco-friendly practices</li>
        </ul>
      </div>

      {/* Vision Section */}
      <div className="max-w-5xl mx-auto text-center">
        <h3 className="text-2xl font-bold text-blue-600 mb-3">
          🌱 Our Vision
        </h3>
        <p className="text-gray-700 leading-relaxed">
          We envision a future where technology and community come together to
          make India’s rivers clean and sustainable. By involving citizens at
          the heart of governance, we ensure long-lasting change.
        </p>
      </div>
    </div>
  );
}
