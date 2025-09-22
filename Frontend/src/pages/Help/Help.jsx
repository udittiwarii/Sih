export default function Help() {
  return (
    <div className="min-h-screen px-6 py-12 bg-gray-50">
      {/* Header */}
      <div className="max-w-4xl mx-auto text-center mb-10">
        <h2 className="text-4xl font-extrabold text-blue-700 mb-4">
          Help Center
        </h2>
        <p className="text-gray-600">
          Find answers to common questions or reach out to government and NGO
          contacts for support.
        </p>
      </div>

      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8">
        {/* Section 1 - FAQs */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-2xl font-semibold text-blue-600 mb-4">
            📘 Common Questions
          </h3>
          <ul className="space-y-4 text-gray-700">
            <li>
              📌 <span className="font-medium">How to register?</span> → Go to
              the <span className="text-blue-600">Register</span> page and
              create an account.
            </li>
            <li>
              📌 <span className="font-medium">How to report waste?</span> → Log
              in as a Citizen, open your Dashboard, and submit a complaint.
            </li>
            <li>
              📌 <span className="font-medium">How to view assigned tasks?</span>{" "}
              → Log in as a Worker/Admin to track and manage tasks.
            </li>
            <li>
              📌 <span className="font-medium">How to check rewards?</span> → Go
              to Dashboard → Rewards tab.
            </li>
          </ul>
        </div>

        {/* Section 2 - Contacts */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-2xl font-semibold text-blue-600 mb-4">
            ☎️ Important Contacts
          </h3>
          <p className="text-gray-700 mb-4">
            If you need immediate assistance, you can reach out to these
            helplines and NGOs:
          </p>
          <ul className="space-y-3 text-gray-700">
            <li>
              📞 <span className="font-medium">National Ganga Helpline:</span>{" "}
              <a href="tel:18001801234" className="text-blue-600">
                1800-180-1234
              </a>
            </li>
            <li>
              📞 <span className="font-medium">Pollution Control Board:</span>{" "}
              <a href="tel:18001801500" className="text-blue-600">
                1800-180-1500
              </a>
            </li>
            <li>
              📧 <span className="font-medium">Namami Gange Mission:</span>{" "}
              <a
                href="mailto:info@namamigange.in"
                className="text-blue-600 underline"
              >
                info@namamigange.in
              </a>
            </li>
            <li>
              🤝 <span className="font-medium">Clean Ganga NGO:</span>{" "}
              <a
                href="mailto:help@cleangangango.org"
                className="text-blue-600 underline"
              >
                help@cleangangango.org
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
