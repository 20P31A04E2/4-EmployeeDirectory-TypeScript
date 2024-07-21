//dynamic profile starts here
document.getElementById('uploadButton').addEventListener('click', function () {
    document.getElementById('uploadInput').click();
});
document.getElementById('uploadInput').addEventListener('change', function () {
    var file = this.files[0];
    if (file) {
        var reader = new FileReader();
        reader.onload = function (event) {
            var imgData = event.target.result;
            var imgElement = document.getElementById('profileImage');
            if (imgElement) {
                imgElement.src = imgData;
            }
        };
        reader.readAsDataURL(file);
    }
});
//ends here
// Form validation starts here
var requiredFields = ['empno', 'fname', 'lname', 'email', 'joindt'];
requiredFields.forEach(function (fieldId) {
    var fieldElement = document.getElementById(fieldId);
    if (fieldElement) {
        fieldElement.addEventListener('input', function () {
            clearErrorMessage(fieldId);
        });
    }
});
function clearErrorMessage(fieldId) {
    var errorElement = document.getElementById(fieldId + '-error');
    if (errorElement) {
        errorElement.innerText = '';
    }
}
function validateForm() {
    var empno = document.getElementById('empno').value;
    var firstName = document.getElementById('fname').value;
    var lastName = document.getElementById('lname').value;
    var email = document.getElementById('email').value;
    var joinDate = document.getElementById('joindt').value;
    var dateOfBirth = document.getElementById('dob').value;
    var phone = document.getElementById('phone').value;
    var hasError = false; // Variable to track if any error occurred
    var empnoPattern = /^[a-zA-Z0-9]+$/;
    var namePattern = /^[a-zA-Z ]+$/;
    var emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(?:\.[a-zA-Z]{2})?$/;
    var phonePattern = /^\d{10}$/;
    // Clear previous error messages
    document.querySelectorAll('.error-message').forEach(function (element) {
        if (element instanceof HTMLElement) {
            element.innerText = '';
        }
    });
    // Validate each field
    if (empno === '') {
        var empnoError = document.getElementById('empno-error');
        if (empnoError) {
            empnoError.innerText = 'Please enter Employee Number';
        }
        hasError = true;
    }
    else {
        if (!empnoPattern.test(empno)) {
            var empnoError = document.getElementById('empno-error');
            if (empnoError) {
                empnoError.innerText = 'Employee Number must contain only letters and numbers';
            }
            hasError = true;
        }
    }
    if (firstName === '') {
        var fnameError = document.getElementById('fname-error');
        if (fnameError) {
            fnameError.innerText = 'Please enter First Name';
        }
        hasError = true;
    }
    else {
        if (!namePattern.test(firstName)) {
            var fnameError = document.getElementById('fname-error');
            if (fnameError) {
                fnameError.innerText = 'First Name must contain only letters and spaces';
            }
            hasError = true;
        }
    }
    if (lastName === '') {
        var lnameError = document.getElementById('lname-error');
        if (lnameError) {
            lnameError.innerText = 'Please enter Last Name';
        }
        hasError = true;
    }
    else {
        if (!namePattern.test(lastName)) {
            var lnameError = document.getElementById('lname-error');
            if (lnameError) {
                lnameError.innerText = 'Last Name must contain only letters and spaces';
            }
            hasError = true;
        }
    }
    if (email === '') {
        var emailError = document.getElementById('email-error');
        if (emailError) {
            emailError.innerText = 'Please enter Email';
        }
        hasError = true;
    }
    else {
        if (!emailPattern.test(email)) {
            var emailError = document.getElementById('email-error');
            if (emailError) {
                emailError.innerText = 'Email must contain only letters, numbers, @, .com';
            }
            hasError = true;
        }
    }
    if (joinDate === '') {
        var joindtError = document.getElementById('joindt-error');
        if (joindtError) {
            joindtError.innerText = 'Please enter Joining Date';
        }
        hasError = true;
    }
    if (phone && !phonePattern.test(phone)) {
        var phoneError = document.getElementById('phone-error');
        if (phoneError) {
            phoneError.innerText = 'Phone Number must contain only digits of length 10';
        }
        hasError = true;
    }
    console.log(joinDate);
    // If any error occurred, return without adding the employee
    if (hasError) {
        window.scrollTo(0, 0);
        return;
    }
    addEmployee();
}
// Ends here
// Getting data from form and adding it into localStorage
function addEmployee() {
    var firstName = document.getElementById('fname').value;
    var lastName = document.getElementById('lname').value;
    var email = document.getElementById('email').value;
    var location = document.getElementById('location').value;
    var department = document.getElementById('department').value;
    var role = document.getElementById('role').value;
    var empno = document.getElementById('empno').value;
    var status = "Active";
    var joinDate = document.getElementById('joindt').value;
    var dateOfBirth = document.getElementById("dob").value;
    var phone = document.getElementById("phone").value;
    var image = document.getElementById("profileImage").src;
    var manager = document.querySelector(".managerName").value;
    var project = document.querySelector(".projectName").value;
    // Get existing employee data from local storage
    var employees = JSON.parse(localStorage.getItem('employees') || '[]');
    var editEmployeeData = JSON.parse(localStorage.getItem('editEmployeeData') || '{}');
    console.log(editEmployeeData);
    if (Object.keys(editEmployeeData).length !== 0) {
        var emp_1 = editEmployeeData.index;
        var index = employees.findIndex(function (employee) {
            return employee.empno === emp_1;
        });
        employees.splice(index, 1);
        employees.push({ firstName: firstName, lastName: lastName, email: email, location: location, department: department, role: role, empno: empno, status: status, joinDate: joinDate, dateOfBirth: dateOfBirth, phone: phone, image: image, manager: manager, project: project });
        localStorage.setItem('employees', JSON.stringify(employees));
        refresh();
    }
    else {
        employees.push({ firstName: firstName, lastName: lastName, email: email, location: location, department: department, role: role, empno: empno, status: status, joinDate: joinDate, dateOfBirth: dateOfBirth, phone: phone, image: image, manager: manager, project: project });
        localStorage.setItem('employees', JSON.stringify(employees));
    }
    var confirmation = document.getElementById('alertBox');
    if (confirmation) {
        confirmation.style.display = 'block';
    }
    setTimeout(function () {
        window.location.href = 'employees.html';
    }, 1000);
}
// Ends here
//Edit employeee details starts here
document.addEventListener('DOMContentLoaded', function () {
    var editEmployeeDataString = localStorage.getItem('editEmployeeData');
    var editEmployeeData = editEmployeeDataString !== null ? JSON.parse(editEmployeeDataString) : null;
    if (editEmployeeData) {
        var updateBtn = document.getElementById('update-btn');
        if (updateBtn) {
            updateBtn.innerHTML = "Update Employee";
        }
        document.getElementById('empno').value = editEmployeeData.empno;
        document.getElementById('fname').value = editEmployeeData.firstName;
        document.getElementById('lname').value = editEmployeeData.lastName;
        document.getElementById('email').value = editEmployeeData.email;
        document.getElementById('joindt').value = editEmployeeData.joinDate;
        document.getElementById('department').value = editEmployeeData.department;
        document.getElementById('location').value = editEmployeeData.location;
        document.getElementById('role').value = editEmployeeData.role;
        document.getElementById('dob').value = editEmployeeData.dateOfBirth;
        document.getElementById('phone').value = editEmployeeData.phone;
        document.getElementById('profileImage').src = editEmployeeData.profile;
        document.querySelector(".managerName").value = editEmployeeData.managerName;
        document.querySelector(".projectName").value = editEmployeeData.projectName;
    }
});
//Ends here
// Clears edit details from page when navigated to another page
function refresh() {
    localStorage.removeItem('editEmployeeData');
}
// Ends here
window.addEventListener("unload", function (event) {
    refresh();
});
