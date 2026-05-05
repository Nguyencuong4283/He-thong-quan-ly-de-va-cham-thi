function Sidebar() {
    return (
        <nav className="col-md-2 d-none d-md-block bg-dark-blue vh-100 text-lightsteelblue p-3">
            <h3 className="text-light">EduManage</h3>
            <ul className="nav flex-column mt-4">
                <li className="nav-item mb-2">Trang chủ</li>
                    <li className="nav-item mb-2">Đề thi</li>
                    <li className="nav-item mb-2">Ngân hàng câu hỏi</li>
                </ul>
        </nav>
    );
}
export default Sidebar;