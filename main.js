function Book(givenName, givenAuthor, givenType) {
    this.name = givenName;
    this.author = givenAuthor;
    this.type = givenType
};

// function to VAlidate Form DAta
function validateform(name, author, type) {
    if (name.length >= 10 && author.length >= 5 && type != undefined) {
        return true
    }
    else {
        return false
    }
};

// Function to show table data as list in table
function addtoTable() {
    let bookInfo = localStorage.getItem('bookInfo');
    if (bookInfo === null) {
        bookInfoArray = []
    }
    else {
        bookInfoArray = JSON.parse(bookInfo)
    };

    let html = "";
    bookInfoArray.forEach(function (element, index) {
        html += `<tr id="booktableRow${index}">
<td>${element.name}</td>
<td>${element.author}</td>
<td>${element.type}</td>
<td style="text-align: center; width: 190px;"><button class="btn" onclick="deletefromTable(${index})">Delete<button></td>
</tr>`;
    });

    if (bookInfo != null && bookInfoArray.length != 0 && html != undefined || "") {
        let tableMain = document.querySelector('.tableMain');
        let tableMainContent = `<table id="booktable">
        <thead>
        <tr>
        <th>Name</th>
        <th>Author</th>
        <th>Type</th>
        <th>Delete</th>
        </tr>
        </thead>
        <tbody class="booktableBody">
        </tbody>
        </table>`;
        tableMain.innerHTML = tableMainContent;
        let tablebody = document.querySelector('.booktableBody');
        tablebody.innerHTML = html;
    }
    else {
        document.getElementById('booktable').innerHTML = `<h2>Nothing to Show</h2>`
    }
}

// Function to delete Data Form TAble
function deletefromTable(index) {
    let bookInfo = localStorage.getItem('bookInfo');
    if (bookInfo === null) {
        bookInfoArray = []
    }
    else {
        bookInfoArray = JSON.parse(bookInfo)
    };
    bookInfoArray.splice(index, 1);
    localStorage.setItem('bookInfo', JSON.stringify(bookInfoArray));
    addtoTable();
}

//  Form Submit Function
let bookForm = document.getElementById('bookForm');
bookForm.addEventListener('submit', formSubmit);

function formSubmit(e) {
    e.preventDefault()
    let bookInfo = localStorage.getItem('bookInfo');
    if (bookInfo === null) {
        bookInfoArray = []
    }
    else {
        bookInfoArray = JSON.parse(bookInfo)
    }

    let bookName = document.getElementById('bookTitle').value;
    let bookAuthor = document.getElementById('bookAuthor').value;

    let fiction = document.getElementById('Fiction');
    let computer = document.getElementById('Computer');
    let cooking = document.getElementById('Cooking');

    let bookType;
    if (fiction.checked) {
        bookType = fiction.value;
    }
    else if (computer.checked) {
        bookType = computer.value;
    }
    else if (cooking.checked) {
        bookType = cooking.value;
    };

    validateform(bookName, bookAuthor, bookType);
    if (validateform(bookName, bookAuthor, bookType)) {
        let book = new Book(bookName, bookAuthor, bookType);
        bookInfoArray.push(book);
        localStorage.setItem('bookInfo', JSON.stringify(bookInfoArray));
        bookForm.reset();
        addtoTable();
        document.querySelector('.messages').innerHTML = `<div class="message-Success message"> <p> <b>Message: </b> Your Book has Been Added Successfully</p></div>`;
        setTimeout(() => {
            document.querySelector('.messages').innerHTML = ""
        }, 1400);
    }
    else {
        document.querySelector('.messages').innerHTML = `<div class="message-Danger message"> <p> <b>Message: </b> Please fill all the fields</p></div>`
        setTimeout(() => {
            document.querySelector('.messages').innerHTML = ""
        }, 1400);
    }
}

window.onload = addtoTable()