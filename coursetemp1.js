// const URL = "https://qrattendance-ucs0.onrender.com/api/v1/professors/getMyInstructedCourses?email=alka@iiitr.ac.in";
// const searchInput = document.querySelector(".search-input");
// const btn = document.querySelector("#submit");
// const select = document.querySelector(".search-select");

// // Initialize the page with data from API
// async function initializePage() {
//     try {
//         // Fetch course data
//         const response = await fetch(URL);
//         const data = await response.json();
        
//         // Clear existing options except 'All'
//         select.innerHTML = '<option value="All">All</option>';

//         // Create an object to store unique subjects
//         const teacherSubjects = {};
        
//         // Populate subjects from API response
//         data.courses.forEach(course => {
//             teacherSubjects[course.subject] = course.subject;
//         });

//         // Add options to dropdown
//         Object.keys(teacherSubjects).forEach(subject => {
//             const newOption = document.createElement("option");
//             newOption.textContent = subject;
//             newOption.value = subject;
//             select.appendChild(newOption);
//         });

//         // Update course boxes
//         const allCourseBoxes = document.querySelectorAll('.box');
        
//         // First hide all boxes
//         allCourseBoxes.forEach(box => {
//             box.style.display = 'none';
//         });

//         // Show and update only the boxes that match courses from API
//         data.courses.forEach(course => {
//             const courseBox = document.querySelector(`.${course.subject}.box`);
            
//             if (courseBox) {
//                 // Make the course box visible
//                 courseBox.style.display = 'block';
                
//                 // Update course code
//                 const codeDiv = courseBox.querySelector('.course-code.option');
//                 if (codeDiv) {
//                     codeDiv.innerHTML = `
//                         <ul>
//                             <li id="title"><p>Code</p></li>
//                             <li id="data"><p>${course.courseCode}</p></li>
//                         </ul>
//                     `;
//                 }

//                 // Update batch
//                 const batchDiv = courseBox.querySelector('.batch.option');
//                 if (batchDiv) {
//                     batchDiv.innerHTML = `
//                         <ul>
//                             <li id="title"><p>Batch</p></li>
//                             <li id="data"><p>${course.batch}</p></li>
//                         </ul>
//                     `;
//                 }

//                 // Update credits
//                 const creditsDiv = courseBox.querySelector('.credits.option');
//                 if (creditsDiv) {
//                     creditsDiv.innerHTML = `
//                         <ul>
//                             <li id="title"><p>Credit</p></li>
//                             <li id="data"><p>${course.credits}</p></li>
//                         </ul>
//                     `;
//                 }
//             }
//         });

//     } catch (error) {
//         console.error("Error fetching course data:", error);
//         const container = document.querySelector('.options');
//         container.innerHTML = '<p>Error loading course data. Please try again later.</p>';
//     }
// }

// // Set initial placeholder
// searchInput.placeholder = "All";

// // Update input placeholder when dropdown changes
// select.addEventListener("change", function() {
//     const selectedValue = this.value;
//     searchInput.placeholder = selectedValue;
    
//     // Show/hide course boxes based on selection
//     const allCourseBoxes = document.querySelectorAll('.box');
//     allCourseBoxes.forEach(box => {
//         const subject = box.querySelector('h2').textContent.trim();
//         if (selectedValue === 'All') {
//             // Only show boxes that were populated with API data
//             box.style.display = box.querySelector('.course-code.option').innerHTML ? 'block' : 'none';
//         } else {
//             box.style.display = subject === selectedValue ? 'block' : 'none';
//         }
//     });
// });

// // Handle search button click
// btn.addEventListener("click", (evt) => {
//     evt.preventDefault();
//     const searchTerm = searchInput.value.trim().toUpperCase();
//     const selectedSubject = select.value;
    
//     const allCourseBoxes = document.querySelectorAll('.box');
//     allCourseBoxes.forEach(box => {
//         const subject = box.querySelector('h2').textContent.trim();
//         const courseCode = box.querySelector('.course-code.option #data p')?.textContent || '';
        
//         if (selectedSubject === 'All') {
//             box.style.display = 
//                 (courseCode.toUpperCase().includes(searchTerm) || 
//                 subject.toUpperCase().includes(searchTerm)) ? 'block' : 'none';
//         } else {
//             box.style.display = 
//                 subject === selectedSubject && 
//                 (courseCode.toUpperCase().includes(searchTerm) || 
//                 subject.toUpperCase().includes(searchTerm)) ? 'block' : 'none';
//         }
//     });
// });

// // Initialize the page when DOM is loaded
// document.addEventListener('DOMContentLoaded', initializePage);












