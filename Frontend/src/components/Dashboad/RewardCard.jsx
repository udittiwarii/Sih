import { useAuth } from "../../context/AuthContext";

export default function RewardCard({  }) {
  const { user } = useAuth();


  return (
    <div className="grid  grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      <div className="bg-white w-screen rounded-lg shadow-md p-6 text-center max-w-md mx-auto mt-4">
        <h3 className="text-xl font-semibold text-gray-800">My Rewards</h3>
        <p className="text-4xl font-bold text-green-600 mt-4">
          {user?.points || 0}
        </p>
        <p className="text-gray-500">Reward Points</p>
      </div>
    </div>
  );
}
