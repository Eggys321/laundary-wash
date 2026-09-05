import { useAuthStore } from "@/store/authStore";

const useAuth = () => {
  const user = useAuthStore((state) => state.user);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const login = useAuthStore((state) => state.login);
  const register = useAuthStore((state) => state.register);
  const logout = useAuthStore((state) => state.logout);
  const updateProfile = useAuthStore((state) => state.updateProfile);
  const resetPassword = useAuthStore((state) => state.resetPassword);
  const changePassword = useAuthStore((state) => state.changePassword);

  return {
    user,
    isAuthenticated,
    login,
    register,
    logout,
    updateProfile,
    resetPassword,
    changePassword,
  };
};

export default useAuth;
