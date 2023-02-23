function submitInput() {
  const userInput = document.getElementById("user-input").value;
  const currentPassage = State.passage;

  const url = 'https://api.github.com/repos/Antivenom03/worldbuild/contents/input.html';
  const headers = new Headers();
  headers.append('Authorization', `Bearer ${{ secrets.ACCESS_TOKEN }}`);

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
  .then(data => console.log(data))
  .catch(error => console.error(error));
}
