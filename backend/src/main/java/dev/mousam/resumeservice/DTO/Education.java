package dev.mousam.resumeservice.DTO;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class Education {
    private String institute;
    private String location;
    private String degreeType;
    private Float cgpa;
    private LocalDate startDate;
    private LocalDate endDate;
}
