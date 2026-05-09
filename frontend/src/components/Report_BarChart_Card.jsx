import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

function ReportCard({ title, chartData }) {
    return (  
            <div className="col-md-6">
                <div className="card p-3 border-0 shadow-sm">
                    <h6 className="text-secondary">{title}</h6>
                    {/*Khung cho chart*/}
                    <div style={{ width: '100%', height: 300 }}>
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={chartData} margin={{ top: 10, right: 0, left: 0, bottom: 0 }}>
                                {/* Lưới nền nét đứt */}
                                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                {/* Trục X hiển thị T1, T2... */}
                                <XAxis dataKey="name" axisLine={false} tickLine={false} />
                                {/* Trục Y hiển thị số lượng */}
                                <YAxis axisLine={false} tickLine={false} />
                                {/* Hiệu ứng khi di chuột vào cột */}
                                <Tooltip cursor={{fill: 'transparent'}} />
                                {/* Cột dữ liệu, màu xanh blue giống trong ảnh, bo tròn góc trên */}
                                <Bar dataKey="exams" fill="#4285F4" radius={[5, 5, 0, 0]} barSize={40} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
    );
}
export default ReportCard;