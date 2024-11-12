const STUDENT_DATA_API = "https://qrattendance-ucs0.onrender.com/api/v1/professors/getAllStudentsWithCourse?courseId=2";

async function fetchAndDisplayStudentData() {
    try {
        // Fetch stuff from the API
        const response = await fetch(STUDENT_DATA_API);
        
        // Error handling for invalid status codes
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        
        const apiData = await response.json();

        //  students array 
        const students = apiData.students;

        //  table body 
        const tableBody = document.getElementById('attendance-data');

        // Clear any existing data in the table
        tableBody.innerHTML = '';

        
        students.forEach((studentObj, index) => {
            const student = studentObj.studentData;  

           
            const row = document.createElement('tr');

            
            const nameCell = document.createElement('td');
            nameCell.textContent = student.fullName;

           
            const idCell = document.createElement('td');
            idCell.textContent = student.studentId;

            
            const emailCell = document.createElement('td');
            emailCell.textContent = student.email;

            
            const mobileCell = document.createElement('td');
            mobileCell.textContent = student.mobileNo;

            
            const actionCell = document.createElement('td');
            const button = document.createElement('button');
            button.textContent = "Attendance Details";
            button.setAttribute('data-index', index);  

            
            const attendanceDetails = document.createElement('div');
            attendanceDetails.className = 'attendance-details';
            attendanceDetails.setAttribute('id', `attendance-${index}`); 

            
           // Replace the button click event listener in your fetchAndDisplayStudentData function
button.addEventListener('click', function () {
    const studentIndex = this.getAttribute('data-index');
    const currentRow = this.closest('tr');
    const allDetailRows = document.querySelectorAll('.details-row');
    
    // Hide all other detail rows first
    allDetailRows.forEach(row => {
        if (row !== currentRow.nextElementSibling) {
            row.style.display = 'none';
        }
    });

    // Get or create details row
    let detailsRow = currentRow.nextElementSibling;
    if (!detailsRow || !detailsRow.classList.contains('details-row')) {
        detailsRow = document.createElement('tr');
        detailsRow.className = 'details-row';
        currentRow.parentNode.insertBefore(detailsRow, currentRow.nextSibling);
    }

    // Toggle current details row
    if (detailsRow.style.display === 'none' || detailsRow.style.display === '') {
        detailsRow.style.display = 'table-row';
        
        // Calculate total and present classes
        const totalClasses = studentObj.attendance.length;
        const presentClasses = studentObj.attendance.filter(att => att.status.toLowerCase() === 'present').length;
        const attendancePercentage = ((presentClasses / totalClasses) * 100).toFixed(1);

        detailsRow.innerHTML = `
            <td colspan="5">
                <div class="attendance-details-container">
                    <div class="attendance-summary">
                        <div class="summary-item">
                            <span class="summary-value">${totalClasses}</span>
                            <span class="summary-label">Total Classes</span>
                        </div>
                        <div class="summary-item">
                            <span class="summary-value">${presentClasses}</span>
                            <span class="summary-label">Present</span>
                        </div>
                        <div class="summary-item">
                            <span class="summary-value">${attendancePercentage}%</span>
                            <span class="summary-label">Attendance Rate</span>
                        </div>
                    </div>
                    <div class="attendance-records">
                        ${studentObj.attendance.map(att => `
                            <div class="record-item ${att.status.toLowerCase()}">
                                <span class="record-date">
                                    ${new Date(att.classSchedule.scheduledDate).toLocaleDateString('en-US', {
                                        month: 'short',
                                        day: 'numeric'
                                    })}
                                </span>
                                <span class="record-topic">${att.classSchedule.classTopic}</span>
                                <span class="record-duration">${att.classSchedule.duration} mins</span>
                                <span class="record-status ${att.status.toLowerCase()}">
                                    ${att.status}
                                </span>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </td>
        `;
    } else {
        detailsRow.style.display = 'none';
    }
});
           
            actionCell.appendChild(button);

            
            row.appendChild(nameCell);
            row.appendChild(idCell);
            row.appendChild(emailCell);
            row.appendChild(mobileCell);
            row.appendChild(actionCell);

           
            tableBody.appendChild(row);

            
            tableBody.appendChild(attendanceDetails);
        });

    } catch (error) {
        console.error("Error fetching or displaying the data: ", error);
    }
}

fetchAndDisplayStudentData();