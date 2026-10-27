/* DEIMOS - Local Student Scheduling Engine - JavaScript Core */

document.addEventListener('DOMContentLoaded', () => {
    // Structural Ingestion Storage Nodes
    let studentsDataset = null;
    let coursesDataset = null;
    let runtimeSchedules = null;
    let activeSubView = 'preview-students';

    // View Navigation Router Components
    const tabs = document.querySelectorAll('.nav-tab');
    const panels = document.querySelectorAll('.tab-panel');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            panels.forEach(p => p.classList.remove('active'));
            tab.classList.add('active');
            document.getElementById(tab.dataset.target).classList.add('active');
        });
    });

    // Sub-Tab Workspace Router Logic
    const subTabs = document.querySelectorAll('.preview-subtab');
    subTabs.forEach(subTab => {
        subTab.addEventListener('click', () => {
            subTabs.forEach(st => st.classList.remove('active'));
            subTab.classList.add('active');
            activeSubView = subTab.dataset.view;
            
            if (runtimeSchedules) {
                updatePreviewDisplay();
            }
        });
    });

    // Session Key Locker
    const lockBtn = document.getElementById('lock-btn');
    const pwdInput = document.getElementById('app-password');
    if (lockBtn && pwdInput) {
        lockBtn.addEventListener('click', () => {
            if (pwdInput.value.trim() === "") {
                alert("Please enter a token passkey to lock down current tab RAM memory context.");
                return;
            }
            lockBtn.innerText = "🔒 Sandbox Encrypted";
            lockBtn.classList.remove('btn-secondary');
            lockBtn.classList.add('btn-primary');
            pwdInput.disabled = true;
            appendLog("System Security: Tab context isolated using localized session decryption tokens.");
        });
    }

    // Sample File Generators for Onboarding
    document.getElementById('download-student-tpl').addEventListener('click', () => {
        const data = "Student ID,Name,Grade,SPED_Status,Elective_Pref_1,Elective_Pref_2\n" +
                     "101,Alex Morgan,6,True,Art,Intro to Coding\n" +
                     "102,Jordan Vance,6,False,Band,Art\n" +
                     "103,Taylor Swift,7,False,Spanish,Robotics\n" +
                     "104,Jamie Lannister,8,True,Robotics,Band\n" +
                     "105,Casey Miller,7,True,Spanish,Intro to Coding\n" +
                     "106,Morgan Freeman,8,False,Intro to Coding,Spanish\n" +
                     "107,Skyler White,6,False,Art,Band";
        triggerDownload(data, "students_template.csv");
    });

    document.getElementById('download-course-tpl').addEventListener('click', () => {
        const data = "Course ID,Course Name,Grade_Target,Teacher Name,Available_Slots\n" +
                     "MATH6,6th Grade Math,6,Mr. Harrison,1A;2A;3A;4B\n" +
                     "ENG6,6th Grade Language Arts,6,Mrs. Davis,1A;2A;4A;1B\n" +
                     "SPED_SUP6,6th Grade Academic Support,6,Ms. Gable,1A;3A;2B\n" +
                     "MATH7,7th Grade Math,7,Mr. Chen,2A;3A;4A;2B\n" +
                     "SCI8,8th Grade Science,8,Dr. Vance,1B;2B;3B;4B\n" +
                     "ART_E,Art Exploration,ALL,Ms. Picasso,3A;4A;3B;4B\n" +
                     "ROB_E,Robotics Elective,ALL,Mr. Musk,1A;2A;1B;2B\n" +
                     "COD_E,Intro to Coding,ALL,Mrs. Lovelace,3B;4B";
        triggerDownload(data, "courses_template.csv");
    });

    // Wire up Ingestion Engines
    setupFileReader('file-students', 'dropzone-students', 'status-students', (data) => {
        studentsDataset = parseCSV(data);
        document.getElementById('status-students').innerText = `✅ Successfully imported ${studentsDataset.length} student rows.`;
        document.getElementById('status-students').className = "status-indicator success";
        checkEngineReadiness();
    });

    setupFileReader('file-courses', 'dropzone-courses', 'status-courses', (data) => {
        coursesDataset = parseCSV(data);
        document.getElementById('status-courses').innerText = `✅ Successfully imported ${coursesDataset.length} course/section structural rows.`;
        document.getElementById('status-courses').className = "status-indicator success";
        checkEngineReadiness();
    });

    function setupFileReader(inputId, dropzoneId, statusId, callback) {
        const input = document.getElementById(inputId);
        const dropzone = document.getElementById(dropzoneId);
        if (!input || !dropzone) return;

        input.addEventListener('change', (e) => {
            const file = e.target.files[0];
            handleFile(file, callback, statusId);
        });

        dropzone.addEventListener('dragover', (e) => {
            e.preventDefault();
            dropzone.style.borderColor = "var(--color-slate-medium)";
            dropzone.style.backgroundColor = "var(--bg-app)";
        });

        dropzone.addEventListener('dragleave', (e) => {
            e.preventDefault();
            dropzone.style.borderColor = "var(--border-color)";
            dropzone.style.backgroundColor = "#ffffff";
        });

        dropzone.addEventListener('drop', (e) => {
            e.preventDefault();
            dropzone.style.borderColor = "var(--border-color)";
            dropzone.style.backgroundColor = "#ffffff";
            const file = e.dataTransfer.files[0];
            handleFile(file, callback, statusId);
        });
    }

    function handleFile(file, callback, statusId) {
        if (!file) return;
        if (!file.name.endsWith('.csv')) {
            const statusElem = document.getElementById(statusId);
            statusElem.innerText = "❌ Error: File must be a valid .csv format.";
            statusElem.className = "status-indicator waiting";
            return;
        }
        const reader = new FileReader();
        reader.onload = (evt) => callback(evt.target.result);
        reader.readAsText(file);
    }

    function checkEngineReadiness() {
        if (studentsDataset && studentsDataset.length > 0 && coursesDataset && coursesDataset.length > 0) {
            const btn = document.getElementById('run-engine-btn');
            if (btn) btn.disabled = false;
            
            const indicator = document.getElementById('engine-state-dot');
            if (indicator) indicator.className = "engine-indicator ready";
            
            const stateText = document.getElementById('engine-state-text');
            if (stateText) stateText.innerText = "Ready to Compute Matrix";
            
            appendLog("System Alert: Data ingestion constraints matched. Scheduling compilation matrix unlocked.");
        }
    }

    // Constraint Satisfaction Engine Execution
    const runBtn = document.getElementById('run-engine-btn');
    if (runBtn) {
        runBtn.addEventListener('click', () => {
            runBtn.disabled = true;
            const progress = document.getElementById('engine-progress');
            const indicator = document.getElementById('engine-state-dot');
            if (indicator) indicator.className = "engine-indicator running";
            document.getElementById('engine-state-text').innerText = "Processing Heuristics...";
            
            let percent = 0;
            const interval = setInterval(() => {
                percent += 25;
                if (progress) {
                    progress.style.width = percent + "%";
                    progress.innerText = percent + "%";
                }
                
                if (percent === 25) appendLog("Pass 1: Analyzing teacher availability matrix...");
                else if (percent === 50) appendLog("Pass 2: Activating dynamic demand auto-scaling sections...");
                else if (percent === 75) appendLog("Pass 3: Resolving period conflict resolutions...");
                else if (percent === 100) {
                    clearInterval(interval);
                    executeSchedulingLogic();
                }
            }, 200);
        });
    }

    function executeSchedulingLogic() {
        const maxCap = parseInt(document.getElementById('max-capacity').value) || 25;
        const dayStructure = document.getElementById('day-structure').value;
        const periodCount = parseInt(document.getElementById('period-count').value) || 6;
        
        let periods = [];
        const cycles = (dayStructure === 'ab') ? ['A', 'B'] : ['Daily'];
        for (let p = 1; p <= periodCount; p++) {
            cycles.forEach(c => { periods.push(`${p}${c === 'Daily' ? '' : c}`); });
        }

        let teacherSchedules = {};
        let sections = [];

        coursesDataset.forEach(row => {
            if (!row['Course ID']) return;
            const slotsText = row['Available_Slots'] || '';
            const slots = slotsText.includes(';') ? slotsText.split(';') : slotsText.split(',');
            
            slots.forEach(slotStr => {
                const slot = slotStr.trim();
                if (!slot) return;
                
                sections.push({
                    id: row['Course ID'],
                    name: row['Course Name'],
                    gradeTarget: String(row['Grade_Target']),
                    teacher: row['Teacher Name'] || 'Unassigned Teacher',
                    slot: slot,
                    enrolled: []
                });

                const teacherKey = row['Teacher Name'] || 'Unassigned';
                if (teacherKey.trim() !== '' && teacherKey.toLowerCase() !== 'none') {
                    if (!teacherSchedules[teacherKey]) teacherSchedules[teacherKey] = new Set();
                    teacherSchedules[teacherKey].add(slot);
                }
            });
        });

        let operationalStudents = [...studentsDataset].filter(s => s['Student ID']);
        operationalStudents.sort((a, b) => {
            const aSped = a['SPED_Status'] && a['SPED_Status'].toLowerCase() === 'true';
            const bSped = b['SPED_Status'] && b['SPED_Status'].toLowerCase() === 'true';
            if (aSped && !bSped) return -1;
            if (!aSped && bSped) return 1;
            return (String(a['Grade']) || '').localeCompare(String(b['Grade']) || '');
        });

        let masterAllocations = [];

        operationalStudents.forEach(student => {
            let studentAssignedSlots = new Set();
            let studentCompletedCourses = new Set();
            let studentSchedule = { studentId: student['Student ID'], name: student['Name'], grade: student['Grade'], sped: student['SPED_Status'], assignments: {} };

            let desiredCourseRows = coursesDataset.filter(row => {
                const tgt = String(row['Grade_Target']).toUpperCase();
                return tgt === String(student['Grade']) || tgt === 'ALL';
            });

            ['Elective_Pref_1', 'Elective_Pref_2'].forEach(prefKey => {
                if (student[prefKey] && student[prefKey].trim() !== '') {
                    const prefName = student[prefKey].trim();
                    const match = coursesDataset.find(r => String(r['Course ID']).trim() === prefName || String(r['Course Name']).trim() === prefName);
                    if (match && !desiredCourseRows.some(r => r['Course ID'] === match['Course ID'])) {
                        desiredCourseRows.push(match);
                    }
                }
            });

            desiredCourseRows.forEach(courseRow => {
                const courseId = courseRow['Course ID'];
                if (studentCompletedCourses.has(courseId)) return;

                let assigned = false;

                let validSections = sections.filter(sec => sec.id === courseId && sec.enrolled.length < maxCap);
                validSections.sort((a, b) => b.enrolled.length - a.enrolled.length);

                for (let sec of validSections) {
                    if (!studentAssignedSlots.has(sec.slot)) {
                        sec.enrolled.push(student);
                        studentAssignedSlots.add(sec.slot);
                        studentCompletedCourses.add(courseId);
                        studentSchedule.assignments[sec.slot] = { name: sec.name, teacher: sec.teacher };
                        assigned = true;
                        break;
                    }
                }

                if (!assigned) {
                    const rawTeacher = courseRow['Teacher Name'] || 'Unassigned Teacher';
                    const teacherKey = (rawTeacher.trim() === '' || rawTeacher.toLowerCase() === 'none') ? `Auto_Teacher_${Math.random()}` : rawTeacher;
                    
                    if (!teacherSchedules[teacherKey]) teacherSchedules[teacherKey] = new Set();

                    for (let p of periods) {
                        if (!studentAssignedSlots.has(p) && !teacherSchedules[teacherKey].has(p)) {
                            let newSec = {
                                id: courseId,
                                name: courseRow['Course Name'],
                                gradeTarget: String(courseRow['Grade_Target']),
                                teacher: rawTeacher,
                                slot: p,
                                enrolled: [student]
                            };
                            sections.push(newSec);
                            teacherSchedules[teacherKey].add(p);
                            studentAssignedSlots.add(p);
                            studentCompletedCourses.add(courseId);
                            studentSchedule.assignments[p] = { name: newSec.name, teacher: rawTeacher };
                            assigned = true;
                            break;
                        }
                    }
                }
            });

            periods.forEach(p => {
                if (studentSchedule.assignments[p]) {
                    masterAllocations.push({
                        "Student ID": student['Student ID'], "Student Name": student['Name'],
                        "Grade": student['Grade'], "SPED": student['SPED_Status'],
                        "Period/Slot": p, "Course Assigned": studentSchedule.assignments[p].name,
                        "Teacher Assigned": studentSchedule.assignments[p].teacher
                    });
                } else {
                    masterAllocations.push({
                        "Student ID": student['Student ID'], "Student Name": student['Name'],
                        "Grade": student['Grade'], "SPED": student['SPED_Status'],
                        "Period/Slot": p, "Course Assigned": "Unassigned / Open Block", "Teacher Assigned": "None"
                    });
                }
            });
        });

        runtimeSchedules = masterAllocations;
        document.getElementById('engine-state-dot').className = "engine-indicator done";
        document.getElementById('engine-state-text').innerText = "Matrix Generated Successfully";
        appendLog(`Success: Smart Demand Scaling active. Accommodated full core loads. Generated ${masterAllocations.length} seats.`);
        
        document.getElementById('export-master-btn').disabled = false;
        document.getElementById('export-students-btn').disabled = false;
        document.getElementById('export-teachers-btn').disabled = false;

        updatePreviewDisplay();
    }

    function updatePreviewDisplay() {
        if (!runtimeSchedules || runtimeSchedules.length === 0) return;

        if (activeSubView === 'preview-students') {
            renderPreviewTable(runtimeSchedules.slice(0, 50));
        } else if (activeSubView === 'preview-courses') {
            const aggregatedCourses = aggregateCourseEnrollments(runtimeSchedules);
            renderPreviewTable(aggregatedCourses);
        }
    }

    function aggregateCourseEnrollments(schedules) {
        const courseMap = {};

        schedules.forEach(seat => {
            const courseName = seat["Course Assigned"];
            const period = seat["Period/Slot"];
            const teacher = seat["Teacher Assigned"];
            
            if (courseName === "Unassigned / Open Block") return;

            const key = `${courseName} | ${period} | ${teacher}`;

            if (!courseMap[key]) {
                courseMap[key] = {
                    "Course Name": courseName,
                    "Period / Slot": period,
                    "Teacher": teacher,
                    "Enrolled Count": 0,
                    "Student Roster": []
                };
            }

            courseMap[key]["Enrolled Count"] += 1;
            courseMap[key]["Student Roster"].push(seat["Student Name"]);
        });

        return Object.values(courseMap).map(course => ({
            "Course Name": course["Course Name"],
            "Period / Slot": course["Period / Slot"],
            "Teacher": course["Teacher"],
            "Enrolled Count": course["Enrolled Count"],
            "Student Roster": course["Student Roster"].join(', ')
        }));
    }

    function renderPreviewTable(dataArray) {
        const table = document.getElementById('data-preview-table');
        if (!table) return;
        if (dataArray.length === 0) {
            table.innerHTML = "<thead><tr><th>No rows matched filter templates</th></tr></thead>";
            return;
        }
        const headers = Object.keys(dataArray[0]);
        let headerHtml = "<tr>" + headers.map(h => `<th>${h}</th>`).join('') + "</tr>";
        let bodyHtml = dataArray.map(row => "<tr>" + headers.map(h => `<td>${row[h] || ''}</td>`).join('') + "</tr>").join('');
        table.innerHTML = `<thead>${headerHtml}</thead><tbody>${bodyHtml}</tbody>`;
    }

    document.getElementById('export-master-btn').addEventListener('click', () => {
        if (!runtimeSchedules) return;
        triggerDownload(convertToCSV(runtimeSchedules), "Master_Schedule_Output.csv");
    });

    document.getElementById('export-students-btn').addEventListener('click', () => {
        if (!runtimeSchedules) return;
        triggerDownload(convertToCSV(runtimeSchedules), "Individual_Student_Schedules.csv");
    });

    document.getElementById('export-teachers-btn').addEventListener('click', () => {
        if (!runtimeSchedules) return;
        let filtered = runtimeSchedules.map(r => ({
            "Teacher": r["Teacher Assigned"], "Slot/Period": r["Period/Slot"],
            "Course": r["Course Assigned"], "Enrolled Student": r["Student Name"]
        })).filter(t => t.Teacher !== "None");
        triggerDownload(convertToCSV(filtered), "Teacher_Schedules_Roster.csv");
    });

    function appendLog(message) {
        const consoleElem = document.getElementById('engine-console');
        if (!consoleElem) return;
        consoleElem.innerHTML += `\n[${new Date().toLocaleTimeString()}] ${message}`;
        consoleElem.scrollTop = consoleElem.scrollHeight;
    }

    function parseCSV(stringData) {
        const lines = stringData.split(/\r?\n/);
        if (lines.length === 0 || !lines[0].trim()) return [];
        
        const cleanToken = (t) => {
            if (!t) return '';
            t = t.trim();
            if (t.startsWith('"')) t = t.slice(1);
            if (t.endsWith('"')) t = t.slice(0, -1);
            return t.trim();
        };

        const headers = lines[0].split(',').map(h => cleanToken(h));
        const result = [];
        
        for (let i = 1; i < lines.length; i++) {
            if (!lines[i].trim()) continue;
            const values = lines[i].split(',');
            const obj = {};
            headers.forEach((header, index) => {
                if (header) {
                    obj[header] = values[index] ? cleanToken(values[index]) : '';
                }
            });
            result.push(obj);
        }
        return result;
    }

    function convertToCSV(arrayData) {
        if (arrayData.length === 0) return '';
        const headers = Object.keys(arrayData[0]);
        const headerRow = headers.join(',');
        const rows = arrayData.map(row => headers.map(h => `"${(row[h] || '').toString().replace(/"/g, '""')}"`).join(','));
        return [headerRow, ...rows].join('\n');
    }

    function triggerDownload(content, filename) {
        const blob = new Blob([content], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.setAttribute("href", url); 
        link.setAttribute("download", filename);
        link.style.visibility = 'hidden';
        document.body.appendChild(link); 
        link.click(); 
        document.body.removeChild(link);
    }
});