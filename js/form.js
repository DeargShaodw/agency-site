const form = document.querySelector('#contact-form');
const nameInput = document.querySelector('#name');
const emailInput = document.querySelector('#email');
const messageInput = document.querySelector('#message');

form.addEventListener('submit', function(e) {
    e.preventDefault();
    
    let valid = true;

    if (nameInput.value.trim()=== '') {
        document.querySelector('#name-error').textContent = 'Name is required';
        valid = false;
    } else {
        document.querySelector('#name-error').textContent = '';
    }
    if (!emailInput.value.includes('@')) {
        document.querySelector('#email-error').textContent = 'Enter a valid email';
        valid = false;
    } else {
        document.querySelector('#email-error').textContent ='';
    }
    
    if (messageInput.value.trim().length <10) {
        document.querySelector('#message-error').textContent = 'Message must be at least 10 characters.';
        valid = false;
    } else {
        document.querySelector('#message-error').textContent = '';
    }
    if (valid) {
        console.log('form is valid - ready to send');
    }
});