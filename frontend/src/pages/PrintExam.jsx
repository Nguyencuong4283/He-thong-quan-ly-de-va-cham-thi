import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import examApi from "../api/examApi";
import "./printExam.css";

const PrintExam = () => {
  const { id } = useParams();
  const [searchParams] = useSearchParams();

  const type = searchParams.get("type"); 
  // "exam" | "answer"

  const [data, setData] = useState(null);
  const [summary, setSummary] = useState(null);

  useEffect(() => {
    const load = async () => {
      const res = await examApi.getExamById(id);

      if (res?.success) {
        setData(res.data);
        setSummary(res.data?.examSummary || res.data);
      }
    };

    load();
  }, [id]);

  const handlePrint = () => {
    window.print();
  };

  if (!data) return <p>Đang tải...</p>;

  return (
    <div className="print-wrapper">

      <div className="no-print mb-3">
        <button onClick={handlePrint} className="btn btn-primary">
          In {type === "exam" ? "đề thi" : "hướng dẫn chấm"}
        </button>
      </div>

      <div id="print-area" className="print-page">

        <div className="header">

          {/* LEFT */}
          <div className="header-block">
            <b>TRƯỜNG ĐẠI HỌC CÔNG NGHỆ THÔNG TIN</b>
            <div>Khoa:</div>
          </div>

          <div className="header-block">
            <b>KỲ THI ĐÁNH GIÁ {summary?.semester || "..."}</b>
            <div>Năm học: {summary?.year || "..."}</div>
            <div>Môn thi: {summary?.subjectName || "..."}</div>
            <div>Thời gian làm bài: {summary?.duration || 60} phút</div>
            <div>Mã đề: {summary?.examCode || "001"}</div>
          </div>

        </div>

        <hr />

        <h3 className="title">
          {type === "exam"
            ? "ĐỀ CHÍNH THỨC"
            : "HƯỚNG DẪN CHẤM"}
        </h3>
        <div className="content">

          {type === "exam" ? (
            data.questions?.length ? (
              data.questions.map((q, i) => (
                <div key={q.questionId} className="question">
                  <b>Câu {i + 1}:</b>
                  <div dangerouslySetInnerHTML={{ __html: q.content }} />
                </div>
              ))
            ) : (
              <p>Không có câu hỏi</p>
            )
          ) : (
            <div>
              {data.questions?.length ? (
                data.questions.map((q, i) => (
                  <div key={q.questionId} className="question">
                    <b>Câu {i + 1}:</b>
                    <div className="answer-box">
                      {q.answer || "Chưa có hướng dẫn chấm"}
                    </div>
                  </div>
                ))
              ) : (
                <p>Không có hướng dẫn chấm</p>
              )}
            </div>
          )}

        </div>

        {/* FOOTER */}
        <div className="footer">
          Trang 1
        </div>

      </div>
    </div>
  );
};

export default PrintExam;