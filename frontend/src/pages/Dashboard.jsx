import Sidebar from "../components/Sidebar";
import StatCard from "../components/StatCard";
import { useState, useEffect } from "react";
import UseStatCard from "../hooks/useStatcard";
import ReportCard from "../components/ReportCard";

function Dashboard() {
    const { totalStats, completedStats, draftStats } = UseStatCard();
    return (
        <div className="container-fluid">
            <div className="row">
                <Sidebar />
                <main className="col-md-10 bg-light p-4">
                    <h2>Trang chủ</h2>
                    <p className="text-muted">Tổng quan hệ thống quản lý đề thi</p>

                    <div className="row">
                       <StatCard
                            title="Tổng số đề thi"
                            value={totalStats.total}
                            subtitle="Đề thi đã tạo"
                            loading={totalStats.loading}
                            error={totalStats.error}
                        />
                        <StatCard
                            title="Đề thi đã hoàn thành"
                            value={completedStats.total}
                            subtitle="Đề thi đã chấm điểm"
                            loading={completedStats.loading}
                            error={completedStats.error}
                        />
                        <StatCard
                            title="Đề thi đang soạn"
                            value={draftStats.total}
                            subtitle="Cần hoàn thiện"
                            loading={draftStats.loading}
                            error={draftStats.error}
                        />
                        <StatCard
                            title="Đang chấm"
                            value={draftStats.total}
                            subtitle="Chờ xử lý"
                            loading={draftStats.loading}
                            error={draftStats.error}
                        />
                    </div>
                    <p className="text-muted">Thống kê</p>
                    <div className="row">
                        <ReportCard title="Số lượng đề thi theo tháng" 
                            chartData={[
                                { name: 'T1', exams: 30 },
                                { name: 'T2', exams: 45 },
                                { name: 'T3', exams: 60 }
                        ]} />
                    </div>
                </main>
            </div>
        </div>
    )
}
export default Dashboard;