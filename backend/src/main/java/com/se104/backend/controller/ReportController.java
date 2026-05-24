package com.se104.backend.controller;

import com.se104.backend.dto.response.ApiResponse;
import com.se104.backend.dto.response.DashboardReportResponse;
import com.se104.backend.service.ReportService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/report")
@RequiredArgsConstructor
public class ReportController {
    private final ReportService reportService;

    @GetMapping("/dashboard")
    public ResponseEntity<ApiResponse<DashboardReportResponse>> getDashboardReport(@RequestParam Integer year) {
        DashboardReportResponse report =
                reportService.getDashboardReport(year);
        ApiResponse<DashboardReportResponse> response =
                ApiResponse.<DashboardReportResponse>builder()
                        .success(true)
                        .data(report)
                        .build();
        return ResponseEntity.ok(response);
    }
}
