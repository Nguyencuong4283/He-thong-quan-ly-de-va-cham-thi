function StatCard({ title, value, subtitle, loading, error })
{
    return (
        <div className="col-md-3">
            <div className="card p-3 border-0 shadow-sm">
                <h6 className="text-secondary">{title}</h6>
                    {loading ? (
                    <div className="spinner-border text-primary"></div>
                    ) : error ? (
                    <small className="text-danger">Không tải được dữ liệu</small>
                    ) : (<>
                            <h2 className="text-primary fw-bold my-2">{value}</h2>
                            <small className="text-muted">{subtitle}</small>
                        </>)}
            </div>
        </div>
    )
}
export default StatCard;