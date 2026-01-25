// import {
//     createContext,
//     useContext,
//     useState,
//     useEffect,
//     type ReactNode
// } from 'react';
// import authService from '@/services/auth.service';
// import type { UserDto, LoginRequest, RegisterRequest } from '@/services/types';

// interface AuthContextType {
//     user: UserDto | null;
//     isAuthenticated: boolean;
//     isLoading: boolean;
//     login: (request: LoginRequest) => Promise<void>;
//     register: (request: RegisterRequest) => Promise<void>;
//     logout: () => Promise<void>;
//     refreshProfile: () => Promise<void>;
// }

// const AuthContext = createContext<AuthContextType | undefined>(undefined);

// export function AuthProvider({ children }: { children: ReactNode }) {
//     const [user, setUser] = useState<UserDto | null>(null);
//     const [isLoading, setIsLoading] = useState(true);

//     useEffect(() => {
//         // Check for existing auth on mount
//         const storedUser = authService.getStoredUser();
//         if (storedUser && authService.isAuthenticated()) {
//             setUser(storedUser);
//         }
//         setIsLoading(false);
//     }, []);

//     const login = async (request: LoginRequest) => {
//         const response = await authService.login(request);
//         setUser(response.user);
//     };

//     const register = async (request: RegisterRequest) => {
//         const response = await authService.register(request);
//         setUser(response.user);
//     };

//     const logout = async () => {
//         await authService.logout();
//         setUser(null);
//     };

//     const refreshProfile = async () => {
//         const currentUser = await authService.getCurrentUser();
//         if (currentUser) {
//             setUser(currentUser);
//             // Manually update user in localStorage
//             localStorage.setItem('user', JSON.stringify(currentUser));
//         }
//     };

//     return (
//         <AuthContext.Provider
//             value={{
//                 user,
//                 isAuthenticated: !!user,
//                 isLoading,
//                 login,
//                 register,
//                 logout,
//                 refreshProfile
//             }}>
//             {children}
//         </AuthContext.Provider>
//     );
// }

// export function useAuth() {
//     const context = useContext(AuthContext);
//     if (context === undefined) {
//         throw new Error('useAuth must be used within an AuthProvider');
//     }
//     return context;
// }

// export default AuthContext;

export function useAuth() {
    return {
        user: {
            fullName: "Admin",
            username: "Hello money",
            email: "admin@everything.com",
            userGroupName: "Admin",
            avatarUrl:
                "https://lh3.googleusercontent.com/a/ACg8ocK_NAPuqjKSxmFgv5M3KqbY96TQalMFpF1QKz0c9tC-Xv7zzSin=s288-c-no"
        },
        logout: async () => {
            console.log("logout");
        }
    };
}
