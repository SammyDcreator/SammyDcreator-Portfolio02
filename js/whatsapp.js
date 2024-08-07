function sendToWhatsApp(event) {
    event.preventDefault();

    const fullname = document.getElementById('fullname').value;
    const email = document.getElementById('email').value;
    const number = document.getElementById('number').value;
    const emailSubject = document.getElementById('email-subject').value;
    const message = document.getElementById('message').value;

    const whatsappMessage =
        `*Full Name:* ${fullname}\n` +
        `*Email:* ${email}\n` +
        `*Number:* ${number}\n` +
        `*Email Subject:* ${emailSubject}\n` +
        `*Message:* ${message}`;

    const encodedMessage = encodeURIComponent(whatsappMessage);

    const whatsappURL = `https://wa.me/+2348155872239?text=${encodedMessage}`;

    window.open(whatsappURL, '_blank');
}
