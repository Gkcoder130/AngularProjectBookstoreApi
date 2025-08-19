const api = "http://localhost:8090/books"

function loadbooks() {
    fetch(api)
        .then(r => r.json())
        .then(data => renderbooks(data))
}

function renderbooks(data) {
    let rows = ""
    data.forEach(b => {
        rows += `<tr>
            <td>${b.id}</td>
            <td><input value="${b.title}" onchange="editbook(${b.id},'title',this.value)"></td>
            <td><input value="${b.author}" onchange="editbook(${b.id},'author',this.value)"></td>
            <td><input type="number" value="${b.price}" onchange="editbook(${b.id},'price',this.value)"></td>
            <td><input type="number" value="${b.stock}" onchange="editbook(${b.id},'stock',this.value)"></td>
            <td>
                <button onclick="deletebook(${b.id})">delete</button>
            </td>
        </tr>`
    })
    document.getElementById("booklist").innerHTML = rows
}

function addbook() {
    const b = {
        title: document.getElementById("title").value,
        author: document.getElementById("author").value,
        price: parseFloat(document.getElementById("price").value),
        stock: parseInt(document.getElementById("stock").value)
    }
    fetch(api, {
        method: "POST",
        headers: {"content-type": "application/json"},
        body: JSON.stringify(b)
    }).then(() => {
        loadbooks()
        document.getElementById("title").value = ""
        document.getElementById("author").value = ""
        document.getElementById("price").value = ""
        document.getElementById("stock").value = ""
    })
}

function deletebook(id) {
    fetch(api + "/" + id, {method: "DELETE"})
        .then(() => loadbooks())
}

function editbook(id, field, value) {
    fetch(api + "/" + id)
        .then(r => r.json())
        .then(b => {
            b[field] = field === "price" ? parseFloat(value) : field === "stock" ? parseInt(value) : value
            fetch(api + "/" + id, {
                method: "PUT",
                headers: {"content-type": "application/json"},
                body: JSON.stringify(b)
            }).then(() => loadbooks())
        })
}

function searchtitle() {
    const title = document.getElementById("searchtitle").value
    fetch(api + "/search/title/" + encodeURIComponent(title))
        .then(r => r.json())
        .then(data => renderbooks(data))
}

function searchauthor() {
    const author = document.getElementById("searchauthor").value
    fetch(api + "/search/author/" + encodeURIComponent(author))
        .then(r => r.json())
        .then(data => renderbooks(data))
}

window.onload = loadbooks 