package com.se104.backend.service;

import com.se104.backend.dto.response.ClassReportItem;
import com.se104.backend.dto.response.DashboardReportResponse;
import com.se104.backend.entity.Submission;
import com.se104.backend.repository.ClazzRepository;
import com.se104.backend.repository.ExamRepository;
import com.se104.backend.repository.SubmissionRepository;
import com.se104.backend.util.SecurityUtil;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ReportService {
    private final ClazzRepository clazzRepository;
    private final ExamRepository examRepository;
    private final SubmissionRepository submissionRepository;
    private static final Logger log = LoggerFactory.getLogger(ReportService.class);
    public DashboardReportResponse getDashboardReport(Integer year) {
        String teacherId= SecurityUtil.getCurrentTeacherId();
        Integer totalClasses = clazzRepository.countByYearAndTeacher_TeacherId(year,teacherId);
        Integer totalExams = examRepository.countByYearAndTeacher_TeacherId(year,teacherId);
        List<Submission> submissions=submissionRepository.findByClazz_YearAndClazz_Teacher_TeacherId(year,teacherId);
        List<ClassReportItem> submissionRates=null;
        List<ClassReportItem> averageScores=null;
        if (!submissions.isEmpty())
        {
            submissionRates=buildSubmissionRate(submissions);
            log.info("Submission rates:");
            averageScores=buildAverageScore(submissions);
            log.info("Average scores:");
        }
        return DashboardReportResponse.builder()
                .totalClasses(totalClasses)
                .totalExams(totalExams)
                .submissionRates(submissionRates)
                .averageScores(averageScores)
                .build();
    }
    private List<ClassReportItem> buildSubmissionRate(List<Submission> submissions)
    {
        //Cho nay neu muon co the sua thanh query add vao repo cung duoc
        return submissions.stream()
                .filter(Submission::isStatus)
                .collect(Collectors.groupingBy(s -> s.getClazz().getClassId()))
                .entrySet()
                .stream()
                .map(entry -> {
                    int amountSubmitted=entry.getValue().size();
                    int totalStudent = entry.getValue().get(0).getClazz().getStudentClasses() != null ? entry.getValue().get(0).getClazz().getStudentClasses().size() : 0;
                    double submissionRate=totalStudent==0?0:(((double)amountSubmitted / totalStudent) * 100);
                    return ClassReportItem.builder()
                            .classId(entry.getKey())
                            .value(submissionRate)
                            .build();
                })
                .collect(Collectors.toList());
    }
    private List<ClassReportItem> buildAverageScore(List<Submission> submissions)
    {
        //Cho nay neu muon co the sua thanh query add vao repo cung duoc
        return submissions.stream()
                .collect(Collectors.groupingBy(s -> s.getClazz().getClassId()))
                .entrySet()
                .stream()
                .map(entry -> {
                    double averageScore=entry.getValue().stream()
                            .filter(Submission::isStatus) //bang voi cong thuc s->s.isStatus==true
                            .mapToDouble(Submission::getScore) //nhu tren
                            .average()
                            .orElse(0);
                    return ClassReportItem.builder()
                            .classId(entry.getKey())
                            .value(averageScore)
                            .build();
                })
                .collect(Collectors.toList());
    }

}
