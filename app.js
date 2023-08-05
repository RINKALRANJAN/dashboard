const emailDataElement = document.getElementById('emailData');

fetch('/api/email-info')
    .then(response => response.json())
    .then(data => {
        let html = '<h2>Email Information</h2><ul>';
        data.forEach(email => {
            html += `<li>Model: ${email.model}, SDK: ${email.sdk}, OS Version: ${email.os_version}, Error: ${email.error}, App Version: ${email.app_v}</li>`;
        });
        html += '</ul>';
        emailDataElement.innerHTML = html;
    })
    .catch(error => {
        console.error(error);
        emailDataElement.innerHTML = '<p>Error fetching data from the server</p>';
    });
 
    