import Sidebar from "../components/Sidebar";
import StatCard from "../components/StatCard";
import { useState, useEffect } from "react";
import UseStatCard from "../hooks/useStatcard";

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
                            subtitle="Đề thi chưa hoàn thành"
                            loading={draftStats.loading}
                            error={draftStats.error}
                        />
                    </div>
                </main>
            </div>
        </div>
    )
}
export default Dashboard;