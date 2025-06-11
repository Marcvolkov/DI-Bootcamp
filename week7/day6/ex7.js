document.addEventListener('DOMContentLoaded', () => {
    // 1. Create the books array
    const allBooks = [
      {
        title: "The Hobbit",
        author: "J.R.R. Tolkien",
        image: "https://covers.openlibrary.org/b/id/8108691-L.jpg",
        alreadyRead: true
      },
      {
        title: "1984",
        author: "George Orwell",
        image: "https://covers.openlibrary.org/b/id/7222246-L.jpg",
        alreadyRead: false
      }
    ];
  
    // 2. Grab the <section> to render into
    const section = document.querySelector('.listBooks');
  
    // 3. For each book, build a <div> with the info
    allBooks.forEach(book => {
      // container div
      const bookDiv = document.createElement('div');
  
      // title & author
      const info = document.createElement('p');
      info.textContent = `${book.title} written by ${book.author}`;
      // if already read, make text red
      if (book.alreadyRead) {
        info.style.color = 'red';
      }
  
      // cover image
      const img = document.createElement('img');
      img.src = book.image;
      img.width = 100;
  
      // append into the div, then into the section
      bookDiv.appendChild(info);
      bookDiv.appendChild(img);
      section.appendChild(bookDiv);
    });
  });
  