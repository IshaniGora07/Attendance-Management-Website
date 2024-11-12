const API_URL = "https://b7s4vq6t-3000.inc1.devtunnels.ms/api/v1/course/scheduledClasses?courseId=2"; 
const QR_API = "https://b7s4vq6t-3000.inc1.devtunnels.ms/api/v1/generateQRCode";
let qrCodeInterval; // Variable to hold the interval ID

async function fetchTimetable() {
    try {
        const response = await fetch(API_URL);
        
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        const data = await response.json();
        
        if (!data.classes || !Array.isArray(data.classes)) {
            throw new Error("Unexpected data format");
        }

        const timetableBody = document.getElementById("timetable-body");
        timetableBody.innerHTML = ""; 

        data.classes.forEach((classData) => {
            const row = document.createElement("tr");
            const date = new Date(classData.scheduledDate);
            row.innerHTML = `
                <td>${date.toDateString()}</td>
                <td>${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</td>
                <td>${classData.duration}</td>
                <td>${classData.classTopic}</td>
                <td>
                    <button id="generateButton-${classData._id}" class="button-class" onclick="startGeneratingQRCode('${classData._id}', '${QR_API}', '${classData.classTopic}', '${classData.duration}', '${classData.scheduledDate}')">Start Generating QR Code</button>
                </td>
            `;
            timetableBody.appendChild(row);
        });
    } catch (error) {
        displayError("Failed to fetch or display timetable data: " + error.message);
    }
}

function startGeneratingQRCode(sessionID, API, className, duration, scheduledDate) {
    // Clear any existing interval to prevent multiple intervals running
    clearInterval(qrCodeInterval);

    // Generate QR code immediately once
    generateQRCode(sessionID, API, className, duration, scheduledDate);

    // Set an interval to generate QR codes every 30 seconds (30000 milliseconds)
    qrCodeInterval = setInterval(() => {
        generateQRCode(sessionID, API, className, duration, scheduledDate);
    }, 15000);

    // Show the stop button
    document.getElementById("stopButton").style.display = "inline-block";
}

function stopGeneratingQRCode() {
    // Clear the interval for generating QR codes
    clearInterval(qrCodeInterval);
    qrCodeInterval = null; // Reset the interval ID

    // Hide the stop button
    document.getElementById("stopButton").style.display = "none";
}

async function generateQRCode(sessionID, API, className, duration, scheduledDate) {
    const requestData = {
        "sessionId": sessionID,
        "classData": {
        "className": "Mathematics 02",
        "courseId": 2,
        "duration": "60",
        "startTime": "2024-11-04T16:30:00.000Z"
    }

    };

    try {
        const response = await fetch(API, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(requestData)
        });

        if (!response.ok) {
            throw new Error("Failed to generate QR code");
        }

        const imageBlob = await response.blob();
        const qrImageUrl = URL.createObjectURL(imageBlob);

        // Open a new window and pass the initial data through the URL
        const newWindow = window.open(`qr-display.html?className=${encodeURIComponent(className)}&duration=${encodeURIComponent(duration)}&scheduledDate=${encodeURIComponent(scheduledDate)}`);

        newWindow.onload = () => {
            // Send the initial QR code
            newWindow.postMessage({ qrImageUrl }, "*");

            // Set up an interval to update the QR code in the new window
            setInterval(async () => {
                try {
                    const response = await fetch(API, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify(requestData)
                    });

                    if (!response.ok) {
                        throw new Error("Failed to generate QR code");
                    }

                    const imageBlob = await response.blob();
                    const qrImageUrl = URL.createObjectURL(imageBlob);

                    // Send the updated QR code to the new window
                    newWindow.postMessage({ qrImageUrl }, "*");
                } catch (error) {
                    console.error("Error generating QR code: " + error.message);
                }
            }, 15000); // Adjust interval time as needed
        };
    } catch (error) {
        displayError("Error generating QR code: " + error.message);
    }
}


fetchTimetable();
