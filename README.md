# DEIMOS

The Local Student Scheduling Engine

DEIMOS is a client-side, browser-isolated scheduling engine designed to solve complex student-to-course constraint problems without relying on remote server backends or storing persistent student data on external databases.


# Security & Privacy Architecture

- Client-Side RAM Sandbox: All computations, multi-pass algorithms, and data parsing happen inside the browser's execution memory context.
- Zero-Storage: No data is stored or logged to external databases, tracking systems, or persistent remote storage.


# Key Features

- Automated Scheduling Engine: Constraint satisfaction algorithm supporting multi-pass heuristics for:
  - SPED / IEP priority clustering
  - Grade-level isolation rules
  - Classroom maximum capacity enforcement

- Dynamic Structural Day Configurations:
  - Standard repeating daily schedule or A / B Alternating Day support
  - Term duration flexibility (Full Academic Year vs. Semester Split)

- Data Ingestion Terminal:
  - Drag-and-drop CSV batch upload
  - Built-in downloadable CSV starter templates for Students & Teacher schedules

- Multi-View Analytics & Export:
  - Real-time tabular previews for Student Schedules and Course Enrollment Rosters
  - One-click CSV exports for Master Schedules, Individual Student Schedules, and Teacher Rosters

- Earthy Warm & Dark UI:
  - Built using CSS variables featuring automatic browser dark/light mode switching (prefers-color-scheme)
  - Serif typography powered by Newsreader paired with Inter


# Quick Start & Usage

1. Running Locally
Since DEIMOS requires zero backend dependencies, you can launch it instantly:

- Clone or download this repository:
-     git clone https://github.com/your-username/deimos-scheduler.git
- Open index.html directly in any modern web browser

2. Workflow Guide

- Configuration
  - Select your Day Cycle Template (Standard vs. A/B)
  - Set Period/Block counts and capacity limits

- Data Ingestion
  - Download the provided template CSVs for formatting guidance
  - Drag & drop your students.csv and courses.csv files into the designated dropzones

- Engine Execution
  - Click Compute & Generate Schedules to trigger the mathematical multi-pass compiler

- Export Center
  - Review live tabbed preview tables
  - Download generated CSV reports (Master Schedule, Student Schedules, Teacher Rosters)


# Built With

HTML5 & CSS3 (Flexbox/Grid, Custom Properties, Dark Mode media queries)
Vanilla JavaScript ES6+ (FileReader API, Blob Download API, Multi-pass scheduling logic)
Google Fonts (Newsreader & Inter)
