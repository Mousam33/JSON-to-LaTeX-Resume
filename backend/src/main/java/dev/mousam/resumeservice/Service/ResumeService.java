package dev.mousam.resumeservice.Service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@RequiredArgsConstructor
@Service
public class ResumeService {
    private final LatexFactory latexFactory;
    public String getCustomLatexResume(List<Map<String, Object>> details) {
        try {
            return latexFactory.writeLatexResume(details);
        } catch (Exception e) {
            return e.getMessage();
        }
    }
}
