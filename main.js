const data = fetch('https://jsonplaceholder.org/posts')
data.then(function(res) {
    console.log(res)
    return res.json();
})
.then(function(res) {
    console.log(res);
    let container = document.querySelector('.containerItem');
    console.log(container)
    const child = res.map(function(item) {
        let des = maxlength(item.content)
        return `
        <div class="item">
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
    </div>
        `
    })
    container.innerHTML = child.join("");

})

function maxlength(text) {
    // console.log(text.length)
    // console.log(text.substring(0,10))
    if (text.length>500)
    {   console.log(1);
            return text.substring(0,500)+ '...';
    }
    else {
        console.log(2)
    return text;
    }
}