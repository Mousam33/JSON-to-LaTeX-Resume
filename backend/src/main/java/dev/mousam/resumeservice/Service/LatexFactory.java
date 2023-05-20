package dev.mousam.resumeservice.Service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.Objects;

@RequiredArgsConstructor
@Service
public class LatexFactory implements LatexWriter {
    private final ObjectMapper objectMapper;
    public String writeLatexResume(List<Map<String, Object>> resume) {
        StringBuilder stringBuilder = new StringBuilder();
        stringBuilder.append(RESUME_TEX_INIT_TEMPLATE);
        stringBuilder.append("\n");
        stringBuilder.append(BEGIN_TEX);
        resume.stream().filter(Objects::nonNull).forEach(map ->
        {
            stringBuilder.append("\n");
            if ("personal".equals(map.get("type")) && map.containsKey("personal")) {
                try {
                    LatexWriter.printPersonalDetails(objectMapper.readValue(String.valueOf(map.get("personal")), new TypeReference<>() {
                    }), stringBuilder);
                } catch (JsonProcessingException e) {
                    System.out.println(e.getMessage());
                }
            } else if ("skills".equals(map.get("type")) && map.containsKey("skills")) {
                stringBuilder.append("\n");
                if(map.containsKey("section")) LatexWriter.printSection(String.valueOf(map.get("section")), stringBuilder);
                else LatexWriter.printSection("Technical Skills", stringBuilder);
                stringBuilder.append("\n");
                try {
                    LatexWriter.printAllSkills(objectMapper.readValue(String.valueOf(map.get("skills")), new TypeReference<>() {
                    }), stringBuilder);
                } catch (JsonProcessingException e) {
                    System.out.println(e.getMessage());
                }
            } else if ("projects".equals(map.get("type")) && map.containsKey("projects")) {
                stringBuilder.append("\n");
                if(map.containsKey("section")) LatexWriter.printSection(String.valueOf(map.get("section")), stringBuilder);
                else LatexWriter.printSection("Projects", stringBuilder);
                stringBuilder.append("\n");
                try {
                    LatexWriter.printAllProject(objectMapper.readValue(String.valueOf(map.get("projects")), new TypeReference<>() {
                    }), stringBuilder);
                } catch (JsonProcessingException e) {
                    System.out.println(e.getMessage());
                }
            } else if ("professional".equals(map.get("type")) && map.containsKey("professional")) {
                stringBuilder.append("\n");
                if(map.containsKey("section")) LatexWriter.printSection(String.valueOf(map.get("section")), stringBuilder);
                else LatexWriter.printSection("Professional Experience", stringBuilder);
                stringBuilder.append("\\vspace{-8pt}");
                stringBuilder.append("\n");
                try {
                    LatexWriter.printAllProfessionalExperience(objectMapper.readValue(String.valueOf(map.get("professional")), new TypeReference<>() {
                    }), stringBuilder);
                } catch (JsonProcessingException e) {
                    System.out.println(e.getMessage());
                }
            } else if ("education".equals(map.get("type")) && map.containsKey("education")) {
                stringBuilder.append("\n");
                if(map.containsKey("section")) LatexWriter.printSection(String.valueOf(map.get("section")), stringBuilder);
                else LatexWriter.printSection("Education", stringBuilder);
                stringBuilder.append("\\vspace{-8pt}");
                stringBuilder.append("\n");
                try {
                    LatexWriter.printAllEducation(objectMapper.readValue(String.valueOf(map.get("education")), new TypeReference<>() {
                    }), stringBuilder);
                } catch (JsonProcessingException e) {
                    System.out.println(e.getMessage());
                }
            } else if("list".equals(map.get("type")) && map.containsKey("list")) {
                stringBuilder.append("\n");
                if(map.containsKey("section")) LatexWriter.printSection(String.valueOf(map.get("section")), stringBuilder);
                else LatexWriter.printSection("Additional Details", stringBuilder);
                stringBuilder.append("\n");
                try {
                    LatexWriter.printList(objectMapper.readValue(String.valueOf(map.get("list")), new TypeReference<>() {
                    }), stringBuilder);
                } catch (JsonProcessingException e) {
                    System.out.println(e.getMessage());
                }
            }
            stringBuilder.append("\n");
        });
        stringBuilder.append("\n");
        stringBuilder.append(END_TEX);
        return stringBuilder.toString();
    }
}
