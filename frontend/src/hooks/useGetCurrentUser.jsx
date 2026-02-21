import { setUser } from '@/redux/authSlice';
import { USER_API_END_POINT } from '@/utils/constant';
import axios from 'axios'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

const useGetCurrentUser = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await axios.get(
                    `${USER_API_END_POINT}/me`,
                    { withCredentials: true }
                );

                dispatch(setUser(res.data.user));
            } catch (error) {
                dispatch(setUser(null));
            }
        };

        fetchUser();
    }, []);
};

export default useGetCurrentUser;
