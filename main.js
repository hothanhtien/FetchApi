
var data
const excuteAsync = async () => {
    const res = await fetch('https://jsonplaceholder.org/posts')
    data = await res.json();

}
(async () => {
    await excuteAsync();
    console.log('ne', data)
    display(data)
})();

function display(data) {
    let store = {

    }
    data.forEach(function (item, index) {
        store[index] = {
            image: item.image,
            title: item.title,
            content: item.content,
            category: item.category,
            publishedAt: item.publishedAt,
            updatedAt: item.updatedAt,
            dataid: index,
        }
    });
    localStorage.setItem('storedData', JSON.stringify(store))
    var storeLocal = JSON.parse(localStorage.getItem('storedData'))
    console.log(storeLocal)
    var storeArray = Object.values(storeLocal);
    console.log(storeArray)
    let containerItem = document.querySelector('.containerItem');
    console.log(containerItem)
    const child = storeArray.map(function (item) {
        let des = maxlength(item.content)
        return `
            <div class="item" data-id="${item.dataid}">
            <div class="image">
                <img src="${item.image}" alt="">
                <div class="public">
                    public
                </div>
            </div>
            <div class="about">
                <div class="containerAbout">
                    <div class="title">
                    <p>${item.title}</p>
                </div>
                <div class="des">
                    <p>${des}</p>
                </div>
                </div>
            </div>
            <div class="time">
                <div class="containerTime">
                    <div class="tag">
                        ${item.category}
                    </div>
                    <div class="publicAt">
                        <div class="publicTitle">Published At:</div>
                        <div class="publicContent">${item.publishedAt}</div>
                    </div>
                    <div class="publicAt">
                        <div class="publicTitle">Update AT:</div>
                        <div class="publicContent">${item.updatedAt}</div>
                    </div>
                </div>
            </div>
            <div class="btnn">
                        <div class="update">Update</div>
                        <div class="delete">Delete</div>
            </div>
        </div>
            `
    })
    containerItem.innerHTML = child.join("");
}
function maxlength(text) {
    if (text.length > 430) {
        return text.substring(0, 430) + ' ...';
    }
    else {

        return text;
    }
}
// excuteAsync();

var containerTotal = document.querySelector('.containerItem')
console.log(containerTotal)
document.addEventListener('click', function (event) {
    if (event.target.classList.contains('update')) {
        console.log('1')
        const itemId = event.target.closest('.item').getAttribute('data-id');
        const form = document.createElement('div');
        form.classList.add('formUpdate');
        form.innerHTML = `
        <input type="text" id="newImage" placeholder="New image">
        <input type="text" id="newTitle" placeholder="New title">
        <input type="text" id="newContent" placeholder="New Content">
        <input type="text" id="newCategory" placeholder="New Category">
        <input type="text" id="newPublic" placeholder="New Public">
        <input type="text" id="newUpdate" placeholder="New Update">
        <button onclick="updateItem(${itemId})">Lưu</button>
        `
        console.log(form)
        containerTotal.insertBefore(form, containerTotal.firstChild)

    }
    else if (event.target.classList.contains('delete')) {

        const itemId1 = event.target.closest('.item').getAttribute('data-id');
        console.log(itemId1)
        deletee(itemId1)
    }
})
function updateItem(itemID) {
    const imageNew = document.getElementById('newImage').value;
    const titleNew = document.getElementById('newTitle').value;
    const contentNew = document.getElementById('newContent').value;
    const categoryNew = document.getElementById('newCategory').value;
    const publicNew = document.getElementById('newPublic').value;
    const updateNew = document.getElementById('newUpdate').value;
    console.log(imageNew)
    var storeLocal = JSON.parse(localStorage.getItem('storedData'))
    storeLocal[itemID].image = imageNew;
    storeLocal[itemID].title = titleNew;
    storeLocal[itemID].content = contentNew;
    storeLocal[itemID].category = categoryNew;
    storeLocal[itemID].updatedAt = publicNew;
    storeLocal[itemID].publishedAt = updateNew;
    console.log('local sau khi đổi', storeLocal)


    localStorage.setItem('storedData', JSON.stringify(storeLocal));
    const arr = [];
    for (let key in storeLocal) {
        arr.push(storeLocal[key]);
    }
    display(arr)
}

function deletee(itemID) {

    var storeLocal = JSON.parse(localStorage.getItem('storedData'))

    delete storeLocal[itemID];
    console.log('xoa ne', storeLocal)
    localStorage.setItem('storedData', JSON.stringify(storeLocal));
    const arr = [];
    for (let key in storeLocal) {
        arr.push(storeLocal[key]);
    }
    display(arr)
}

