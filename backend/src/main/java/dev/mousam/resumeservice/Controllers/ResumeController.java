package dev.mousam.resumeservice.Controllers;

import dev.mousam.resumeservice.Service.ResumeService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/")
@CrossOrigin
public class ResumeController {
    private final ResumeService resumeService;
    @PostMapping
    public ResponseEntity<?> getLatexResume(@RequestBody List<Map<String, Object>> request) {
        return ResponseEntity.ok(resumeService.getCustomLatexResume(request));
    }
}
