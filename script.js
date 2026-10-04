// ===============================
// STUDENT PLACEMENT PORTAL
// ===============================

// Demo student
const student = {
    name: "Mahima Sai Bellamkonda",
    cgpa: 8.4,
    department: "Computer Science & Engineering"
};


// ===============================
// INITIAL JOB DATA
// ===============================

let jobs = JSON.parse(localStorage.getItem("placementJobs")) || [

    {
        id: 1,
        company: "TCS",
        role: "Software Engineer",
        location: "Chennai",
        package: "7.2 LPA",
        cgpa: 7.0,
        skills: ["Java", "SQL", "DSA"],
        description:
            "Software engineering opportunity involving application development, testing and database technologies."
    },

    {
        id: 2,
        company: "Infosys",
        role: "Frontend Developer",
        location: "Bangalore",
        package: "6.5 LPA",
        cgpa: 6.5,
        skills: ["HTML", "CSS", "JavaScript"],
        description:
            "Frontend development role focused on responsive interfaces and modern web technologies."
    },

    {
        id: 3,
        company: "Zoho",
        role: "Software Engineer",
        location: "Chennai",
        package: "8.0 LPA",
        cgpa: 7.5,
        skills: ["Java", "Python", "SQL"],
        description:
            "Software engineering position involving product development and problem solving."
    },

    {
        id: 4,
        company: "Accenture",
        role: "Cloud Engineer",
        location: "Hyderabad",
        package: "7.8 LPA",
        cgpa: 7.0,
        skills: ["Cloud", "Linux", "Python"],
        description:
            "Cloud engineering role involving infrastructure, automation and cloud services."
    },

    {
        id: 5,
        company: "Deloitte",
        role: "Data Analyst",
        location: "Pune",
        package: "7.0 LPA",
        cgpa: 7.2,
        skills: ["Python", "SQL", "Excel"],
        description:
            "Data analytics opportunity involving data processing, reporting and business insights."
    },

    {
        id: 6,
        company: "Wipro",
        role: "Software Engineer",
        location: "Bangalore",
        package: "6.8 LPA",
        cgpa: 6.5,
        skills: ["Java", "SQL", "Python"],
        description:
            "Entry-level software engineering role for developing and maintaining enterprise applications."
    }

];


// ===============================
// APPLICATION DATA
// ===============================

let applications =
    JSON.parse(localStorage.getItem("placementApplications")) || [

        {
            jobId: 1,
            appliedOn: "2026-09-20",
            status: "Shortlisted"
        },

        {
            jobId: 4,
            appliedOn: "2026-09-25",
            status: "Interview"
        }

    ];


// ===============================
// SAVE DATA
// ===============================

function saveData() {

    localStorage.setItem(
        "placementJobs",
        JSON.stringify(jobs)
    );

    localStorage.setItem(
        "placementApplications",
        JSON.stringify(applications)
    );
}


// ===============================
// NAVIGATION
// ===============================

document.querySelectorAll(".nav-btn").forEach(button => {

    button.addEventListener("click", () => {

        showSection(button.dataset.section);

    });

});


function showSection(sectionId) {

    document.querySelectorAll(".section").forEach(section => {
        section.classList.remove("active");
    });

    document.getElementById(sectionId).classList.add("active");


    document.querySelectorAll(".nav-btn").forEach(button => {

        button.classList.remove("active");

        if (button.dataset.section === sectionId) {
            button.classList.add("active");
        }

    });


    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}


// ===============================
// DASHBOARD
// ===============================

function renderDashboard() {

    const companies = new Set(
        jobs.map(job => job.company)
    );

    document.getElementById("totalCompanies").textContent =
        companies.size;

    document.getElementById("openPositions").textContent =
        jobs.length;

    document.getElementById("totalApplications").textContent =
        applications.length;

    document.getElementById("shortlistedCount").textContent =
        applications.filter(
            app => app.status === "Shortlisted"
        ).length;


    renderLatestJobs();
    renderTimeline();

}


// ===============================
// LATEST JOBS
// ===============================

function renderLatestJobs() {

    const container =
        document.getElementById("latestJobs");

    container.innerHTML = "";

    jobs.slice(0, 4).forEach(job => {

        const div = document.createElement("div");

        div.className = "latest-job";

        div.innerHTML = `

            <div class="latest-left">

                <div class="company-logo">
                    ${job.company.substring(0, 2).toUpperCase()}
                </div>

                <div>
                    <strong>${job.role}</strong>
                    <small>
                        ${job.company} • ${job.location}
                    </small>
                </div>

            </div>

            <strong>${job.package}</strong>

        `;

        container.appendChild(div);

    });

}


// ===============================
// TIMELINE
// ===============================

function renderTimeline() {

    const container =
        document.getElementById("timeline");

    container.innerHTML = "";

    if (applications.length === 0) {

        container.innerHTML =
            "<p>No application activity yet.</p>";

        return;
    }


    applications.slice(-4).reverse().forEach(app => {

        const job = jobs.find(
            job => job.id === app.jobId
        );

        if (!job) return;

        const div = document.createElement("div");

        div.className = "timeline-item";

        div.innerHTML = `

            <div class="timeline-dot"></div>

            <div>
                <strong>
                    ${job.company} — ${app.status}
                </strong>

                <p>
                    ${job.role} · ${app.appliedOn}
                </p>
            </div>

        `;

        container.appendChild(div);

    });

}


// ===============================
// JOB LIST
// ===============================

function renderJobs() {

    const container =
        document.getElementById("jobsContainer");

    const search =
        document.getElementById("searchJob")
        .value
        .toLowerCase();

    const location =
        document.getElementById("locationFilter")
        .value;

    const role =
        document.getElementById("roleFilter")
        .value;


    container.innerHTML = "";


    const filteredJobs = jobs.filter(job => {

        const matchesSearch =
            job.company.toLowerCase().includes(search) ||
            job.role.toLowerCase().includes(search) ||
            job.skills.join(" ").toLowerCase().includes(search);

        const matchesLocation =
            location === "all" ||
            job.location === location;

        const matchesRole =
            role === "all" ||
            job.role === role;

        return (
            matchesSearch &&
            matchesLocation &&
            matchesRole
        );

    });


    if (filteredJobs.length === 0) {

        container.innerHTML = `
            <div class="panel">
                <h3>No opportunities found</h3>
                <p>Try changing your search or filters.</p>
            </div>
        `;

        return;
    }


    filteredJobs.forEach(job => {

        const applied =
            applications.some(
                app => app.jobId === job.id
            );


        const card =
            document.createElement("div");

        card.className = "job-card";

        card.innerHTML = `

            <div class="company-row">

                <div class="company-logo">
                    ${job.company.substring(0, 2).toUpperCase()}
                </div>

                <span class="status-open">
                    OPEN
                </span>

            </div>

            <h3>${job.role}</h3>

            <div class="company-name">
                ${job.company}
            </div>

            <div class="job-meta">

                <span>📍 ${job.location}</span>

                <span>
                    CGPA ≥ ${job.cgpa}
                </span>

                ${job.skills.map(
                    skill => `<span>${skill}</span>`
                ).join("")}

            </div>

            <div class="job-bottom">

                <span class="salary">
                    ${job.package}
                </span>

                <button
                    class="details-btn"
                    onclick="openJobDetails(${job.id})"
                >
                    ${applied ? "View Status" : "View Details"}
                </button>

            </div>

        `;

        container.appendChild(card);

    });

}


// ===============================
// FILTER EVENTS
// ===============================

document
    .getElementById("searchJob")
    .addEventListener("input", renderJobs);

document
    .getElementById("locationFilter")
    .addEventListener("change", renderJobs);

document
    .getElementById("roleFilter")
    .addEventListener("change", renderJobs);


// ===============================
// JOB DETAILS
// ===============================

function openJobDetails(jobId) {

    const job =
        jobs.find(job => job.id === jobId);

    if (!job) return;


    const existingApplication =
        applications.find(
            app => app.jobId === jobId
        );


    const eligible =
        student.cgpa >= job.cgpa;


    let actionButton = "";


    if (existingApplication) {

        actionButton = `
            <div class="application-status">
                <strong>Application Status</strong>
                <p>
                    ${existingApplication.status}
                </p>
            </div>
        `;

    }

    else if (!eligible) {

        actionButton = `
            <div class="application-status rejected-box">
                <strong>Not Eligible</strong>
                <p>
                    Minimum CGPA required: ${job.cgpa}
                </p>
            </div>
        `;

    }

    else {

        actionButton = `
            <button
                class="primary-btn"
                onclick="applyForJob(${job.id})"
            >
                Apply for this position
            </button>
        `;

    }


    document.getElementById("modalContent").innerHTML = `

        <div class="company-logo">
            ${job.company.substring(0, 2).toUpperCase()}
        </div>

        <span class="eyebrow">
            ${job.company}
        </span>

        <h2>${job.role}</h2>

        <p class="modal-description">
            ${job.description}
        </p>

        <div class="details-grid">

            <div>
                <span>Location</span>
                <strong>${job.location}</strong>
            </div>

            <div>
                <span>Package</span>
                <strong>${job.package}</strong>
            </div>

            <div>
                <span>Minimum CGPA</span>
                <strong>${job.cgpa}</strong>
            </div>

            <div>
                <span>Your CGPA</span>
                <strong>${student.cgpa}</strong>
            </div>

        </div>

        <br>

        <strong>Required Skills</strong>

        <div class="skills" style="margin:15px 0 25px;">
            ${job.skills.map(
                skill => `<span>${skill}</span>`
            ).join("")}
        </div>

        ${actionButton}

    `;


    document
        .getElementById("jobModal")
        .classList.add("show");

}


// ===============================
// APPLY
// ===============================

function applyForJob(jobId) {

    const job =
        jobs.find(job => job.id === jobId);

    if (!job) return;


    if (student.cgpa < job.cgpa) {

        alert(
            `You are not eligible. Minimum CGPA required is ${job.cgpa}.`
        );

        return;
    }


    const alreadyApplied =
        applications.some(
            app => app.jobId === jobId
        );


    if (alreadyApplied) {

        alert("You have already applied for this position.");

        return;
    }


    const today =
        new Date()
            .toISOString()
            .split("T")[0];


    applications.push({

        jobId: jobId,

        appliedOn: today,

        status: "Applied"

    });


    saveData();

    closeModal();

    renderAll();

    alert(
        `Application submitted successfully for ${job.company}.`
    );

}


// ===============================
// APPLICATION TABLE
// ===============================

function renderApplications() {

    const table =
        document.getElementById("applicationsTable");

    table.innerHTML = "";


    applications.forEach(app => {

        const job =
            jobs.find(job => job.id === app.jobId);

        if (!job) return;


        const row =
            document.createElement("tr");


        row.innerHTML = `

            <td>
                <strong>${job.company}</strong>
            </td>

            <td>${job.role}</td>

            <td>${app.appliedOn}</td>

            <td>${job.package}</td>

            <td>
                <span class="status ${getStatusClass(app.status)}">
                    ${app.status}
                </span>
            </td>

            <td>
                <button
                    class="details-btn"
                    onclick="openJobDetails(${job.id})"
                >
                    View
                </button>
            </td>

        `;


        table.appendChild(row);

    });


    updateApplicationSummary();

}


// ===============================
// STATUS CLASS
// ===============================

function getStatusClass(status) {

    switch (status) {

        case "Applied":
            return "status-applied";

        case "Shortlisted":
            return "status-shortlisted";

        case "Interview":
            return "status-interview";

        case "Selected":
            return "status-selected";

        case "Rejected":
            return "status-rejected";

        default:
            return "status-applied";

    }

}


// ===============================
// APPLICATION SUMMARY
// ===============================

function updateApplicationSummary() {

    document.getElementById("appliedSummary")
        .textContent =
        applications.length;


    document.getElementById("shortlistedSummary")
        .textContent =
        applications.filter(
            app => app.status === "Shortlisted"
        ).length;


    document.getElementById("interviewSummary")
        .textContent =
        applications.filter(
            app => app.status === "Interview"
        ).length;


    document.getElementById("selectedSummary")
        .textContent =
        applications.filter(
            app => app.status === "Selected"
        ).length;

}


// ===============================
// ADMIN TABLE
// ===============================

function renderAdmin() {

    const table =
        document.getElementById("adminTable");

    table.innerHTML = "";


    jobs.forEach(job => {

        const row =
            document.createElement("tr");

        row.innerHTML = `

            <td>
                <strong>${job.company}</strong>
            </td>

            <td>${job.role}</td>

            <td>${job.location}</td>

            <td>${job.package}</td>

            <td>${job.cgpa}</td>

            <td>
                <button
                    class="details-btn"
                    onclick="deleteJob(${job.id})"
                >
                    Remove
                </button>
            </td>

        `;

        table.appendChild(row);

    });


    const companies =
        new Set(
            jobs.map(job => job.company)
        );


    document.getElementById("adminCompanies")
        .textContent =
        companies.size;


    document.getElementById("adminJobs")
        .textContent =
        jobs.length;


    document.getElementById("adminApplications")
        .textContent =
        applications.length;

}


// ===============================
// ADD JOB
// ===============================

function openJobModal() {

    document
        .getElementById("addJobModal")
        .classList.add("show");

}


function closeAddJobModal() {

    document
        .getElementById("addJobModal")
        .classList.remove("show");

}


document
    .getElementById("jobForm")
    .addEventListener("submit", function(event) {

        event.preventDefault();


        const newJob = {

            id: Date.now(),

            company:
                document.getElementById("companyInput").value,

            role:
                document.getElementById("roleInput").value,

            location:
                document.getElementById("locationInput").value,

            package:
                document.getElementById("packageInput").value,

            cgpa:
                Number(
                    document.getElementById("cgpaInput").value
                ),

            skills:
                document.getElementById("skillsInput")
                    .value
                    .split(",")
                    .map(skill => skill.trim()),

            description:
                "New placement opportunity added by the Placement Cell."

        };


        jobs.unshift(newJob);

        saveData();

        this.reset();

        closeAddJobModal();

        renderAll();

        alert(
            "New placement opportunity added successfully."
        );

    });


// ===============================
// DELETE JOB
// ===============================

function deleteJob(jobId) {

    const confirmDelete =
        confirm(
            "Are you sure you want to remove this opportunity?"
        );

    if (!confirmDelete) return;


    jobs =
        jobs.filter(
            job => job.id !== jobId
        );


    applications =
        applications.filter(
            app => app.jobId !== jobId
        );


    saveData();

    renderAll();

}


// ===============================
// PROFILE
// ===============================

function editProfile() {

    const newName =
        prompt(
            "Enter your name:",
            student.name
        );


    if (!newName) return;


    document.getElementById("profileName")
        .textContent =
        newName;

}


// ===============================
// MODAL CLOSE
// ===============================

function closeModal() {

    document
        .getElementById("jobModal")
        .classList.remove("show");

}


// ===============================
// RENDER EVERYTHING
// ===============================

function renderAll() {

    renderDashboard();

    renderJobs();

    renderApplications();

    renderAdmin();

}


// ===============================
// INITIAL LOAD
// ===============================

renderAll();
