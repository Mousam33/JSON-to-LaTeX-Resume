package dev.mousam.resumeservice.DTO;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class Professional {
    private String company;
    private String client;
    private String role;
    private String location;
    private LocalDate startDate;
    private LocalDate endDate;
    private List<String> responsibilities;
}
