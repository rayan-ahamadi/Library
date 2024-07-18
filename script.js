const myLibrary = [new Book('Boruto','Masashi Kishimoto', 50), new Book('Tokyo Ghoul', 'Sui Ishida', '30')];

function Book(title, author, pages, id) {
  this.title = title;
  this.author = author;
  this.pages = pages;
}

Book.prototype.read = function(){
  let message = '';
  let alertType = '';
  if(this.read){
    this.read = false;
    message = 'You have not read this book yet';
    alertType = 'alert-warning';
  }else{
    this.read = true;
    message = 'You have read this book';
    alertType = 'alert-success';
  }

  var alertDiv = document.createElement('div');
  alertDiv.className = `alert ${alertType} alert-dismissible fade show`;
  alertDiv.role = 'alert';
  alertDiv.innerHTML = `
      ${message}
      <button type="button" class="btn-close" data-dismiss="alert" aria-label="Close">
          <span aria-hidden="true"></span>
      </button>
  `;


  document.getElementById('alertPlaceholder').appendChild(alertDiv);

  setTimeout(function() {
      alertDiv.classList.remove('show');
      alertDiv.classList.add('fade');
      setTimeout(function() {
          alertDiv.remove();
      }, 150); 
  }, 5000);

}

function addBookToLibrary(event) {
  event.preventDefault; 
  const formData = new FormData(event.target)
  
  const title = formData.get('book-title')
  const author = formData.get('book-author')
  const pages = formData.get('book-pages')

  myLibrary.push(new Book(title, author, pages))
  reloadBook()
}

function deleteBookFromLibrary(event){

  if(confirm("Are you sure you want to delete this book?")){
    const cardBody = event.target.parentElement;
    const card = cardBody.parentElement;

    const index = card.dataset.id;
    myLibrary.splice(index, 1);
    reloadBook();
  }
}

function displayBooks(booksArray){
    booksArray.forEach(element => {
      const newCard = document.createElement('div')
      newCard.dataset.id = myLibrary.indexOf(element)
      newCard.classList.add('card')
      const newCardBody = document.createElement('div')
      newCardBody.classList.add('card-body')
      newCard.appendChild(newCardBody)
      document.querySelector('.book-list').appendChild(newCard)

      const title = document.createElement('h3')
      const author = document.createElement('p')
      const pages = document.createElement('p')
      title.textContent = element.title
      author.textContent = `Author: ${element.author}`
      pages.textContent = `Pages: ${element.pages}`

      const switchButtons = document.createElement('input')
      switchButtons.type = "checkbox"
      switchButtons.dataset.toggle = "switchbutton"
      switchButtons.dataset.onlabel = "Read"
      switchButtons.dataset.offlabel = "Not Read"
      switchButtons.addEventListener('change', element.read)

      const deleteButtons = document.createElement('a')
      
      deleteButtons.href = "#"
      deleteButtons.textContent = "Delete"
      deleteButtons.classList.add('btn')
      deleteButtons.classList.add('btn-danger')
      deleteButtons.classList.add('delete-button')
      deleteButtons.addEventListener('click', deleteBookFromLibrary)

      newCardBody.appendChild(title)
      newCardBody.appendChild(author)
      newCardBody.appendChild(pages)
      newCardBody.appendChild(switchButtons)
    
      newCardBody.appendChild(deleteButtons)
    }); 
    
}


function reloadBook(){
  let bookContainer = document.querySelector(".book-list")
  while(bookContainer.firstChild){
    bookContainer.removeChild(bookContainer.firstChild)
  }
  displayBooks(myLibrary)

}

displayBooks(myLibrary)

document.querySelector('#form-book').addEventListener('submit', addBookToLibrary)
