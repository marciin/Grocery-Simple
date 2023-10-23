// function with edit and remove buttons
function itemOptions(e) {
  if (e.target.classList.contains('remove')) {
    let item = e.target.parentElement.parentElement;
    item.remove();
    saveItemsToLocalStorage();
  } else if (e.target.classList.contains('edit')) {
    let text =
      e.target.parentElement.parentElement.querySelector(
        '.item-text'
      ).textContent;
    // change submit button into an edit button
    let write = document.getElementById('add');
    write.innerHTML = `
    <input
      type="text"
      class="text-input"
      id="text-edit"
      value="${text}"
    />
    <button class="submit-button edit-button" id="edit-button" style="background-color: greenyellow">Edit</button>
    `;

    // what happens after clicking on edit button
    document.getElementById('edit-button').addEventListener('click', () => {
      // changes old value to the new one
      let newText = document.getElementById('text-edit').value;
      e.target.parentElement.parentElement.querySelector(
        '.item-text'
      ).textContent = newText;

      // gets back to the submit button in the place of edit button
      write.innerHTML = `
      <input
        type="text"
        class="text-input"
        id="text-input"
        placeholder="e.g Eggs"
      />
      <button class="submit-button" id="submit-button">Submit</button>`;

      saveItemsToLocalStorage();
    });
  }
}
// what happens after submiting a new item to the grocery list
function submit() {
  let text = document.getElementById('text-input').value;
  if (text.length < 1) {
    return;
  } else {
    let item = document.createElement('div');
    item.classList.add('item');
    item.innerHTML = `
            <p class="item-text">${text}</p>
            <div class="buttons">
                <button class="edit">EDIT</button>
                <button class="remove">REMOVE</button>
            </div>`;

    let items = document.querySelector('.items');
    items.appendChild(item);
    document.getElementById('text-input').value = '';

    saveItemsToLocalStorage();
  }
}

document.addEventListener('click', (e) => {
  if (e.target.id === 'submit-button') {
    submit();
  } else if (
    e.target.classList.contains('remove') ||
    e.target.classList.contains('edit')
  ) {
    itemOptions(e);
  }
});

window.addEventListener('load', (e) => {
  loadItemsFromLocalStorage();
});

function saveItemsToLocalStorage() {
  let items = Array.from(document.querySelectorAll('.item-text')).map(
    (item) => item.textContent
  );
  localStorage.setItem('groceryItems', JSON.stringify(items));
}

function loadItemsFromLocalStorage() {
  let items = JSON.parse(localStorage.getItem('groceryItems')) || [];
  let itemsContainer = document.querySelector('.items');
  items.forEach((text) => {
    let item = document.createElement('div');
    item.classList.add('item');
    item.innerHTML = `
        <p class="item-text">${text}</p>
        <div class="buttons">
          <button class="edit">EDIT</button>
          <button class="remove">REMOVE</button>
        </div>`;
    itemsContainer.appendChild(item);
  });
}
