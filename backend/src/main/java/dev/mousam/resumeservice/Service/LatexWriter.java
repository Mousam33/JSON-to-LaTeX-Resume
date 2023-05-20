package dev.mousam.resumeservice.Service;

import dev.mousam.resumeservice.DTO.*;

import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Objects;


public interface LatexWriter {
    StringBuilder RESUME_TEX_INIT_TEMPLATE = new StringBuilder(
            """
            %-------------------------------------------
            % Resume in Latex
            % Author: Mousam Saikia
            % (Works with Overleaf)
            %-------------------------------------------
            \\documentclass[letterpaper,11pt]{article}
            \\usepackage{latexsym}
            \\usepackage[empty]{fullpage}
            \\usepackage{titlesec}
            \\usepackage{marvosym}
            \\usepackage[usenames,dvipsnames]{color}
            \\usepackage{verbatim}
            \\usepackage{enumitem}
            \\usepackage{ragged2e}
            % Adjust margins
            %-------------------------------------------
            \\addtolength{\\oddsidemargin}{-0.475in}
            \\addtolength{\\evensidemargin}{-0.375in}
            \\addtolength{\\textwidth}{1in}
            \\addtolength{\\topmargin}{-.5in}
            \\addtolength{\\textheight}{1.0in}
            \\raggedright
            \\setlength{\\tabcolsep}{0in}
            % Sections formatting
            %-------------------------------------------
            \\titleformat{\\section}{
              \\vspace{-4pt}\\scshape\\raggedright\\large
            }{}{0em}{}[\\color{black}\\titlerule \\vspace{-5pt}]
            % Custom commands
            %-------------------------------------------
            \\newcommand{\\resumeItem}[2]{
              \\item{
                \\textbf{#1}{: \\small #2 \\vspace{-2pt}}
              }
            }
            \\newcommand{\\resumeEduEntry}[5]{%
              \\vspace{8pt} % Add extra space before each entry
              \\par\\noindent
              \\begin{tabular*}{0.97\\textwidth}{l@{\\extracolsep{\\fill}}r}
                \\textbf{#1} & #2 \\\\
                \\ifx&#5&\\else#5\\\\\\fi
                \\textit{#3} & \\textit{#4} \\\\
              \\end{tabular*}\\vspace{-5pt}
            }
            \\newcommand{\\resumeExpEntry}[4]{
              \\vspace{8pt}
              \\par\\noindent
                \\begin{tabular*}{0.97\\textwidth}{l@{\\extracolsep{\\fill}}r}
                  \\textbf{#1} & #2 \\\\
                  \\textit{#3} & \\textit{#4} \\\\
                \\end{tabular*}\\vspace{-5pt}
            }
            \\newcommand{\\resumeSubItem}[2]{\\resumeItem{#1}{#2}\\vspace{-4pt}}
            \\renewcommand{\\labelitemii}{$\\circ$}
            \\newcommand{\\resumeSubHeadingListStart}{\\begin{itemize}[leftmargin=*,label={}]}
            \\newcommand{\\resumeSubHeadingListEnd}{\\end{itemize}}
            \\newcommand{\\resumeItemListStart}{\\setlist{rightmargin=10pt}\\begin{itemize}}
            \\newcommand{\\resumeItemListEnd}{\\end{itemize}\\vspace{-5pt}}
            \\newcommand{\\XXresumeItem}[1]{%
              \\item\\setlength{\\itemsep}{0em}\\setlength{\\rightskip}{5pt} #1
            }
            \\newcommand{\\XresumeItemListStart}{\\setlist{rightmargin=10pt}\\begin{itemize}}
            \\newcommand{\\XresumeItemListEnd}{\\end{itemize}\\vspace{-5pt}}
            """);

    String BEGIN_TEX = "\\begin{document}";
    String END_TEX   = "\\end{document}";

    static void printSection(String section, StringBuilder stringBuilder) {
        stringBuilder.append("\\section{").append(section).append("}");
    }

    static void printList(List<String> list, StringBuilder stringBuilder) {
        stringBuilder.append("\\XresumeItemListStart");
        stringBuilder.append("\n");
        list.stream().filter(Objects::nonNull).forEach(item -> stringBuilder.append("\\XXresumeItem{").append(item).append("}").append("\n"));
        stringBuilder.append("\n");
        stringBuilder.append("\\XresumeItemListEnd");
    }

    static void printPersonalDetails(Personal personal, StringBuilder stringBuilder) throws NullPointerException {
        if(personal.getName() == null) throw new NullPointerException("name cannot be null");
        stringBuilder.append("\\begin{center}");
        stringBuilder.append("\\textbf{\\Large{").append(personal.getName()).append("}}\n");
        stringBuilder.append("\\\\\n");
        if(personal.getDetails() != null && personal.getDetails().size() > 0) {
            String communicationDetails = String.join(" | ", personal.getDetails());
            stringBuilder.append("\\texttt{").append(communicationDetails).append("}");
            stringBuilder.append("\n");
        }
        stringBuilder.append("\\end{center}");
    }

    static void printEducation(Education education, StringBuilder stringBuilder) {
        stringBuilder.append("\\resumeEduEntry");
        stringBuilder.append("\n");
        stringBuilder.append("{");
        if(education.getInstitute() != null)
            stringBuilder.append(education.getInstitute());
        stringBuilder.append("}");
        stringBuilder.append("\n");
        stringBuilder.append("{");
        if(education.getLocation() != null)
            stringBuilder.append(education.getLocation());
        stringBuilder.append("}");
        stringBuilder.append("\n");
        stringBuilder.append("{");
        if(education.getDegreeType() != null)
            stringBuilder.append(education.getDegreeType());
        stringBuilder.append("}");
        stringBuilder.append("\n");
        stringBuilder.append("{");
        if(education.getStartDate() != null)
            stringBuilder.append(DateTimeFormatter.ofPattern("MMM yyyy").format(education.getStartDate()));
        if(education.getEndDate() != null)
            stringBuilder.append(" - ").append(DateTimeFormatter.ofPattern("MMM yyyy").format(education.getEndDate()));
        stringBuilder.append("}");
        stringBuilder.append("\n");
        stringBuilder.append("{");
        if(education.getCgpa() != null)
            stringBuilder.append("{\\textbf{CGPA}{: ").append(education.getCgpa()).append("}}");
        stringBuilder.append("}");
        stringBuilder.append("\n");
    }

    static void printAllEducation(List<Education> educationList, StringBuilder stringBuilder) {
        educationList.stream().filter(Objects::nonNull).forEach(education -> printEducation(education, stringBuilder));
    }

    static void printProfessionalExperience(Professional professional, StringBuilder stringBuilder) {
        stringBuilder.append("\\resumeExpEntry");
        stringBuilder.append("\n");
        stringBuilder.append("{");
        if(professional.getCompany() != null)
            stringBuilder.append(professional.getCompany());
        stringBuilder.append("}");
        stringBuilder.append("\n");
        stringBuilder.append("{");
        if(professional.getLocation() != null)
            stringBuilder.append(professional.getLocation());
        stringBuilder.append("}");
        stringBuilder.append("\n");
        stringBuilder.append("{");
        if(professional.getRole() != null)
            stringBuilder.append(professional.getRole());
        stringBuilder.append("}");
        stringBuilder.append("\n");
        stringBuilder.append("{");
        if(professional.getStartDate() != null)
            stringBuilder.append(DateTimeFormatter.ofPattern("MMM yyyy").format(professional.getStartDate()));
        if(professional.getEndDate() != null)
            stringBuilder.append(" - ").append(DateTimeFormatter.ofPattern("MMM yyyy").format(professional.getEndDate()));
        stringBuilder.append("}");
        stringBuilder.append("\n");
        stringBuilder.append("\\XresumeItemListStart");
        stringBuilder.append("\n");
        professional.getResponsibilities().stream().filter(Objects::nonNull).forEach(responsibility -> stringBuilder.append("\\XXresumeItem{").append(responsibility).append("}").append("\n"));
        stringBuilder.append("\n");
        stringBuilder.append("\\XresumeItemListEnd");
        stringBuilder.append("\n");
    }

    static void printAllProfessionalExperience(List<Professional> professionalList, StringBuilder stringBuilder) {
        stringBuilder.append("\\justifying");
        stringBuilder.append("\n");
        professionalList.stream().filter(Objects::nonNull).forEach(professional -> printProfessionalExperience(professional, stringBuilder));
        stringBuilder.append("\n").append("\\vspace{-5pt}").append("\n");
    }

    static void printProject(Project project, StringBuilder stringBuilder) {
        stringBuilder.append("\\resumeSubItem");
        stringBuilder.append("\n");
        stringBuilder.append("{");
        if(project.getName() != null)
            stringBuilder.append(project.getName());
        stringBuilder.append("}");
        stringBuilder.append("\n");
        stringBuilder.append("{");
        if(project.getDescription() != null)
            stringBuilder.append(project.getDescription());
        stringBuilder.append("}");
        stringBuilder.append("\n");
    }

    static void printAllProject(List<Project> projectList, StringBuilder stringBuilder) {
        stringBuilder.append("\\justifying");
        stringBuilder.append("\n");
        stringBuilder.append("\\begin{itemize}");
        stringBuilder.append("\n");
        projectList.stream().filter(Objects::nonNull).forEach(project -> printProject(project, stringBuilder));
        stringBuilder.append("\n");
        stringBuilder.append("\\end{itemize}");
        stringBuilder.append("\n");
    }

    static void printTechnicalSkills(Skills skills, StringBuilder stringBuilder) {
        stringBuilder.append("\\textbf");
        stringBuilder.append("{");
        if(skills.getSkillType() != null)
            stringBuilder.append(skills.getSkillType());
        stringBuilder.append("}");
        stringBuilder.append("{: ");
        if(skills.getSkillNames() != null && skills.getSkillNames().size() > 0)
            stringBuilder.append(String.join(", ",skills.getSkillNames()));
        stringBuilder.append("}\\\\\n");
    }

    static void printAllSkills(List<Skills> skillsList, StringBuilder stringBuilder) {
        skillsList.stream().filter(Objects::nonNull).forEach(skill -> printTechnicalSkills(skill, stringBuilder));
    }
}
