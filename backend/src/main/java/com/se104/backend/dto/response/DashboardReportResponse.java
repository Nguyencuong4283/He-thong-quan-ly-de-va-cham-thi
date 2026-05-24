package com.se104.backend.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Getter
@Builder
@AllArgsConstructor
public class DashboardReportResponse {

    private Integer totalClasses;
    private Integer totalExams;

    private List<ClassReportItem> submissionRates;
    private List<ClassReportItem> averageScores;
}