import { setAllJobs } from '@/redux/jobSlice'
import { JOB_API_END_POINT } from '@/utils/constant'
import axios from 'axios'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const useGetAllJobs = () => {
    const dispatch = useDispatch();
    const {searchedQuery} = useSelector(store=>store.job);
    useEffect(()=>{
        const controller = new AbortController();
        const fetchAllJobs = async () => {
            try {
                const params = new URLSearchParams({ keyword: searchedQuery.trim() });
                const res = await axios.get(`${JOB_API_END_POINT}/get?${params}`, {
                    withCredentials: true,
                    signal: controller.signal,
                });
                if(res.data.success){
                    dispatch(setAllJobs(res.data.jobs));
                }
            } catch (error) {
                if (error.code !== "ERR_CANCELED") {
                    console.error("Unable to fetch jobs:", error);
                }
            }
        }
        fetchAllJobs();
        return () => controller.abort();
    }, [dispatch, searchedQuery])
}

export default useGetAllJobs
