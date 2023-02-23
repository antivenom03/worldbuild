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
  .then(userdata=> {
    const currentContent = atob(userdata.content);

    // Step 2: Modify the current content with the new user input
    const newContent = `${currentContent}\n${currentPassage}: ${userInput}`;

    // Step 3: Write the modified content back to the file
    const userdata = {
      message: `Add user input from ${currentPassage}`,
      content: btoa(newContent),
      sha: userdata.sha,
      branch: 'main'
    };

    return fetch(url, {
      method: 'PUT',
      headers: headers,
      body: JSON.stringify(userdata)
    });
  })
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error(error));
}
