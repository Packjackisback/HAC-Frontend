const loginForm = document.getElementById('login-form');
const resultDiv = document.getElementById('result');

loginForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  try {
    const response = await fetch(`https://homeaccess.katyisd.org/HomeAccess/Content/Student/Assignments.aspx?user=${username}&pass=${password}`);
    const html = await response.text();

    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');

    // Extract the desired information from the HTML
    const classes = Array.from(doc.querySelectorAll('div.AssignmentClass')).map((classDiv) => {
      const classNameArr = classDiv.querySelector('div.sg-header').textContent.trim().split(' ');
      return classNameArr.slice(3, classNameArr.length - 3).join(' ');
    });

    const result = {
      classes: classes,
    };

    resultDiv.textContent = JSON.stringify(result, null, 2);
  } catch (error) {
    resultDiv.textContent = `Error: ${error.message}`;
  }
});
