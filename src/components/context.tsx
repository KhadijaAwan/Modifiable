"use client";
import { useRouter } from 'next/navigation';
import { ReactNode, createContext, useContext, useState } from 'react';

interface UserContextType {
    userDetails: {
        fullname: string;
        address: string;
        profession: string;
        compensation: string;
    };
    setUserDetails: React.Dispatch<React.SetStateAction<{
        fullname: string;
        address: string;
        profession: string;
        compensation: string;
    }>>;
    isEditing: boolean;
    setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
    editUser: (user: any) => void;
    deleteUser: (id: string) => void;
    resetUser: () => void;
    currentPage: number;
    setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
    itemsPerPage: number;
}

const UserContext = createContext<UserContextType>({
    userDetails: {
        fullname: "",
        address: "",
        profession: "",
        compensation: "",
    },
    setUserDetails: () => { },
    isEditing: false,
    setIsEditing: () => { },
    resetUser: () => { },
    editUser: (user: any) => { },
    deleteUser: (id: string) => { },
    currentPage: 0,
    setCurrentPage: () => { },
    itemsPerPage: 0,
});

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }: { children: ReactNode }) => {
    const router = useRouter();
    const [isEditing, setIsEditing] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 4;

    const [userDetails, setUserDetails] = useState({
        fullname: "",
        address: "",
        profession: "",
        compensation: "",
    });

    const deleteUser = async (id: string) => {
        try {
            let response = await fetch(`/api/users`, {
                method: "DELETE",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id })
            });

            response = await response.json();
            console.log("Response from server: ", response);
            router.refresh();
        } catch (error) {
            console.error("Failed to delete user:", error);
        }
    };

    const editUser = (user: any) => {
        setIsEditing(true);
        setUserDetails(user);
    };

    const resetUser = () => {
        setUserDetails({
            fullname: "",
            address: "",
            profession: "",
            compensation: "",
        });
    };

    return (
        <UserContext.Provider value={{
            userDetails, setUserDetails, isEditing, setIsEditing, deleteUser, editUser, resetUser,
            currentPage, setCurrentPage, itemsPerPage
        }}>
            {children}
        </UserContext.Provider>
    );
};