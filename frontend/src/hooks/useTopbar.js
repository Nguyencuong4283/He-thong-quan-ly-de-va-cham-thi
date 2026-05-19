import { use, useState} from "react";
import { getUserProfile } from "../services/TopbarService";
import { useEffect } from "react";

export default function useTopbar() {
    const [user, setUser] = useState({ name: '', email: '', profileImageUrl: '', loading: true, error: false });
    useEffect(() => {
        const loadUserProfile = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                setUser({ name: '', email: '', profileImageUrl: '', loading: false, error: true });
                return;
            }

            try {
                const response = await getUserProfile(token);
                const { name, email, profileImageUrl } = response.data;
                setUser({ name, email, profileImageUrl: profileImageUrl || '', loading: false, error: false });
            } catch (error) {
                console.error('Error fetching user profile:', error);
                setUser({ name: '', email: '', profileImageUrl: '', loading: false, error: true });
            }
        };

        loadUserProfile();
    }, []);

    return user;
}
