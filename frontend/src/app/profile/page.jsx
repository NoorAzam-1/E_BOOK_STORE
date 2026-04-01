import ProfilePage from "@/components/profile";
import ProtectedRoute from "@/components/ProtectedRoute";

export default function Profile() {
  return (
    <>
      <ProtectedRoute>
        <ProfilePage />
      </ProtectedRoute>
    </>
  );
}
