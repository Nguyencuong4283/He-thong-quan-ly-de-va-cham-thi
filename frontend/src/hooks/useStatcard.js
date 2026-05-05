import { use, useState} from "react";
import { getTotalExams,getCompletedExams,getDraftExams } from "../services/DashboardService";
import { useEffect } from "react";
export default function useStatcard() {
    const [totalStats, setTotalStats] = useState({ total: 0, growth: 0, loading: true, error: false });
    const [completedStats, setCompletedStats] = useState({ total: 0, growth: 0, loading: true, error: false });
    const [draftStats, setDraftStats] = useState({ total: 0, growth: 0, loading: true, error: false });
    useEffect(() => {
        const loadStats = async () => {
            const token = localStorage.getItem('token');
            try {
                //goi ham ben service de lay du lieu va cap nhat state
                const totalResponse = await getTotalExams(token);
                const totalCount = totalResponse.pagination.total;
                setTotalStats({ total: totalCount, growth: 0, loading: false, error: false });
                const completedResponse = await getCompletedExams(token);
                const completedTotal = completedResponse.pagination.total;
                setCompletedStats({ total: completedTotal>0? Math.round(completedTotal/totalCount*100) : 0, 
                                    growth: 0, loading: false, error: false });
                const draftResponse = await getDraftExams(token);
                setDraftStats({ total: draftResponse.pagination.total, growth: 0, loading: false, error: false });
            } catch (error) {
                setTotalStats(prev => ({ ...prev, loading: false, error: true }));
                setCompletedStats(prev => ({ ...prev, loading: false, error: true }));
                setDraftStats(prev => ({ ...prev, loading: false, error: true }));
            }
        };
        loadStats();
    }, []);
    return { totalStats, completedStats, draftStats };
}