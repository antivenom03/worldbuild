function submitInput() {
  const userInput = document.getElementById("user-input").value;
  const currentPassage = State.passage;

  const inputEvent = new CustomEvent("input", {
    detail: {
      user_input: userInput,
      current_passage: currentPassage
    },
  });

  document.dispatchEvent(inputEvent);

  fetch('https://api.github.com/repos/Antivenom03/worldbuild/actions/workflows/main.yml/dispatches', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${ACCESS_TOKEN}`,
      'Accept': 'application/vnd.github.v3+json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      ref: 'main'
    })
  });
}
