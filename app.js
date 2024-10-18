const name = document.getElementById('name');
const alphanumeric = "!@#$%^&*()<>,.:;|{}[]\"'/?0123456789";
const btn = document.getElementById('submit-btn');
const error_msg = document.getElementsByClassName('input-error')[0];
const special_character = "!@#$%^&*()<>,.:;|{}[]\"'/?";
const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

// Email-validation
const email = document.getElementById('email');
const error_msg1 = document.getElementsByClassName('input-error')[1];
const emailValidation = () => {
    const emailvalue = email.value;

    // Check for @ symbol in between the email
    const atSymbol = emailvalue.indexOf("@");
    if(atSymbol < 1 || atSymbol === emailvalue.length - 1){
        return false; 
    }
    // Check for . after @
    const dotIndex = emailvalue.indexOf(".");
    if (dotIndex < atSymbol + 4 || dotIndex === emailvalue.length - 1) {
        return false;
    }
    return true;
}

// Password validation
const password = document.getElementById('password');
const confirm_password = document.getElementById('confirm-password');
const error_msg2 = document.getElementsByClassName('input-error')[2];
const error_msg3 = document.getElementsByClassName('input-error')[3];

//password error reasons
const validatePassword = (passwordValue) => {
    const errors = [];
    
    if (passwordValue.length < 8) {
        errors.push("Password must be at least 8 characters long");
    }
    if (!/[A-Z]/.test(passwordValue)) {
        errors.push("Password must contain at least one uppercase letter");
    }
    if (!/[a-z]/.test(passwordValue)) {
        errors.push("Password must contain at least one lowercase letter");
    }
    if (!/\d/.test(passwordValue)) {
        errors.push("Password must contain at least one numeral");
    }
    if (!/[!@#$%^&*()<>,.:;|{}[\]"'/?]/.test(passwordValue)) {
        errors.push("Password must contain at least one special character");
    }

    return errors; 
};

// Password confirmation
const isPasswordConfirmed = (password, confirmpassword) => {
    return password === confirmpassword;
};

// Show password 
const show_password = document.getElementById('show');
show_password.addEventListener('click', () => {
    if (password.type === 'password') {
        password.type = 'text';
        show_password.innerText = 'Hide Password🫣'; 
    } else {
        password.type = 'password';
        show_password.innerText = 'Show Password👁️'; 
    }
});

btn.addEventListener('click', (e) => {
    e.preventDefault();

    document.querySelectorAll('.input-error').forEach(elem => {
        elem.textContent = '';
    });

    let isValid = true; // to  check all validation are  done

    // Length
    if (name.value.length === 0) {
        error_msg.textContent = "Username is empty";
        isValid = false;
    } else if (name.value.length < 4) {
        error_msg.textContent = "Username should be greater than 4 characters";
        isValid = false;
    } else if (name.value.length > 20) {
        error_msg.textContent = "Username should be less than 20 characters";
        isValid = false;
    }

    // Alphanumeric
    for (let i = 0; i < alphanumeric.length; i++) {
        if (name.value.includes(alphanumeric[i])) {
            error_msg.textContent = "Username should not contain alphanumeric characters";
            isValid = false;
            break;
        }
    }

    // Uppercase
    for (let i = 0; i < uppercase.length; i++) {
        if (name.value.includes(uppercase[i])) {
            document.getElementById('name-error').textContent = "Username should contain only lowercase letters";
            isValid = false;
            break;
        }
    }

    // Password
    error_msg2.textContent = '';
    // const user_password = validatePassword(password.value);
    const passwordErrors = validatePassword(password.value);
    if(passwordErrors.length > 0){
        error_msg2.textContent = passwordErrors.join(' ' + "&" + ' ');
        isValid = false;
    } else {
        console.log('Password is valid');
    }

    // Confirmatin of password
    const user_confirm_password = isPasswordConfirmed(password.value, confirm_password.value);
    if (!user_confirm_password) {
        error_msg3.textContent = "Passwords do not match"; // Show error message for confirmation
        isValid = false;
    }


    // Email
    const user_email = emailValidation(email.value);
    if (!user_email) {
        error_msg1.textContent = "Please enter a valid email address";
        isValid = false;
    }

    // registration confirmation
    if (isValid) {
        document.querySelector('h1').textContent = 'Successfully registered✅';
        //to reset form
        document.getElementById('sign-up-form').reset();
    }
});
