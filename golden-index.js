
document.addEventListener("DOMContentLoaded", () => {
    const talkBtn = document.querySelector('.nav-btn-outline');

    talkBtn.addEventListener('click', (e) => {
        e.preventDefault();

        if (document.querySelector('.talk-popup-overlay')) return;

        const overlay = document.createElement('div');
        overlay.className = 'talk-popup-overlay';

        const popup = document.createElement('div');
        popup.className = 'talk-popup-box';

        popup.innerHTML = `
            <button class="talk-popup-close" aria-label="Close popup">✕</button>
            <h2>Let’s Connect</h2>
            <p>Tell me about your project and let's create something extraordinary together.</p>

            <form class = "talk-popup-form"> 

            <div class = "form-row">
                <div class = "form-group">
                    <label for = "name"> Name </label> 
                    <input type = "text" id = "name" name = "name" required> 
                </div>

                <div class = "form-group">
                    <label for = "email"> Email </label> 
                    <input type = "email" id = "email" name = "email" required> 
                </div> 

            </div> 

                <div class = "form-group">
                    <label for = "subject"> Subject </label> 
                    <input type = "text" name = "subject" required>
                </div>

                <div class = "form-group">
                <label for = "message"> Message </label> 
                    <textarea id = "message" name = "message" rows = "4" required> </textarea> 
                </div> 

                <button type = "submit" class = "form-submit-btn"> Send Message </button> 
            </form> 
        `;

        overlay.appendChild(popup);
        document.body.appendChild(overlay);

        let isClosing = false;

        window.__closeTalkPopup = function () {
            if (isClosing) return;
            isClosing = true;

            overlay.remove();
            delete window.__closeTalkPopup;
        };

      popup.querySelector('.talk-popup-close').addEventListener('click', (e) => {
    e.preventDefault();
    window.__closeTalkPopup();
});



popup.addEventListener('click', (e) => {
    e.stopPropagation();
});

        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) {
                window.__closeTalkPopup();
            }
        });
    });
});

const form = popup.querySelector('.talk-popup-form');

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const submitBtn = form.querySelector('.form-submit-btn');
    submitBtn.disabled = true;
    submitBtn.textContent = "Sending...";

    const formData = new FormData(form);

    try {
        const response = await fetch('send-message.php', {
            method: 'POST',
            body: formData
        });

        const result = await response.text();

        if (result === "success") {
            form.innerHTML = `
                <p style="color:#ffd27a; font-size:1.05rem;">
                    Thank you! Your message has been sent successfully.
                </p>
            `;
        } else {
            throw new Error(result);
        }

    } catch (err) {
        submitBtn.disabled = false;
        submitBtn.textContent = "Send Message";
        alert("Something went wrong. Please try again.");
    }
});


