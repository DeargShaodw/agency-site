Formspree

fetch('https://formspree.io/f/YOUR_ENDPOINT', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
        name: nameInput.value,
        email: emailInput.value,
        message: messageInput.value
    })
});

Netlify

fetch('/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
        'form-name': 'contact-form',
        name: nameInput.value,
        email: emailInput.value,
        message: messageInput.value
    })
});


EmailJS

emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', {
    name: nameInput.value,
    email: emailInput.value,
    message: messageInput.value
}, 'YOUR_PUBLIC_KEY');
