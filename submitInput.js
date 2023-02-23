// Define the State object
const State = {
  passage: 'Start', // Set the initial passage
  userData: {} // Store user data here
};

function submitInput() {
  const userInput = document.getElementById("user-input").value;
  const currentPassage = State.passage;

  const url = 'https://api.github.com/repos/Antivenom03/wordbuild/contents/input.txt';
  const token = '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';

  const headers = new Headers();
  headers.append('Authorization', `Bearer ${token}`);

  // Step 1: Retrieve the current content of the file
  fetch(url, {
    headers: headers
  })
  .then(response => response.json())
  .then(data => {
    const currentContent = atob(data.content);

    // Step 2: Modify the current content with the new user input
    const newContent = `${currentContent}\n${currentPassage}: ${userInput}`;

    // Step 3: Write the modified content back to the file
    const updatedData = {
      message: `Add user input from ${currentPassage}`,
      content: btoa(newContent),
      sha: data.sha,
      branch: 'main'
    };

    return fetch(url, {
      method: 'PUT',
      headers: headers,
      body: JSON.stringify(updatedData)
    });
  })
  .then(response => response.json())
  .then(data => {
    console.log(data);
    alert('Your input has been submitted!');
  })
  .catch(error => {
    console.error(error);
    alert('There was an error submitting your input.');
  });
}
