'use strict'

function onInit() {
    renderBooks()
}

function renderBooks() {
    var books = getBooks();
    var strHtmls = `<table class=" table bg-danger table-hover text-light "> 
    <thead>
        <tr>
            <th data-trans="id-title" class="pointer" onclick="onSetSortBy('ID')">ID</th>
            <th data-trans="title-title" class="pointer" onclick="onSetSortBy('TITLE')">TITLE</th>
            <th data-trans="price-title" class="pointer" onclick="onSetSortBy('PRICE')">PRICE</th>
            <th data-trans="rate-title" class="pointer" onclick="onSetSortBy('RATE')">RATE</th>
            <th data-trans="actions-title">ACTIONS</th>
        </tr>
    </thead>
    <tbody>`;
    var htmlsArr = books.map((book) => {
        var id = book.id
        return `<tr>
                    <td>${id}</td>
                    <td>${book.name}</td>
                    <td>${formatCurrency(book.price)}</td>
                    <td>${book.rate}</td>
                    <td>
                    <button type="button" class="btn btn-outline-primary m-1" data-toggle="modal" data-trans="read-btn" onclick="onReadBook(${id})" data-target=".bd-example-modal-lg">Read/button>
                    <button class="btn btn-outline-success m-1" data-trans="update-btn" onclick="onUpdateBook (${id})">Update</button> 
                    <button class="btn btn-outline-light m-1" data-trans="delete-btn" onclick="onRemoveBook(${id})">Delete</button>
                    </td>
                </tr>
        `
    })
    strHtmls += htmlsArr.join('');
    strHtmls += `</tbody></table>`


    document.querySelector('.books-container').innerHTML = strHtmls;
    doTrans();

}

function onSetPage(caseNum) {
    setPage(caseNum);
    renderBooks();
}

function onSetSortBy(sortBy) {

    setBookSort(sortBy);
    renderBooks();
}

function onUpdateBook(bookId) {
    const price = prompt('New price please?')
    if (!price) return;
    updateBook(bookId, price);
    renderBooks();
}

function onRemoveBook(bookId) {
    if (!confirm('Are you sure?')) return;
    removeBook(bookId);
    renderBooks();
}

function onReadBook(bookId) {
    const book = getBookById(bookId);
    document.querySelector('.book-name-modal').innerText = book.name;
    document.querySelector('.span-rate').innerHTML = `
    <button class="btn" onclick="onRateClick(-1, ${bookId})">-</button>
    <input type="number" value="${book.rate}" class="rate-input"/>
    <button class="btn" onclick="onRateClick(+1, ${bookId})">+</button>
    `
    document.querySelector('.span-price').innerText = formatCurrency(book.price);
    document.querySelector('p').innerText = makeLorem();
}

function onCloseModal() {
    document.querySelector('.modall').classList.remove('open');
}

function onRateClick(num, bookId) {
    var book = getBookById(bookId)
    rateBook(num, bookId);
    renderBooks();
}


function onAddBook() {
    const elName = document.querySelector('input[name=add-name]')
    const name = elName.value.trim()
    if (!name) return;
    const elPrice = document.querySelector('input[name=add-price]')
    const price = elPrice.value.trim()
    if (!price) return;
    addBook(name, price);
    renderBooks();
    elName.value = '';
    elPrice.value = '';
}

function onSetLang(lang) {
    setLang(lang);
    if (lang === 'he') document.body.classList.add('rtl');
    else document.body.classList.remove('rtl');
    doTrans();
}