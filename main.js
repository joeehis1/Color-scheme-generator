
form.addEventListener('submit', async (e) => {
    e.preventDefault()
    const formObj = new FormData(form)
    let colorOptions = {}
    for (let [k, v] of formObj) {
        colorOptions[k] = v
    }

    const json = await getColorScheme(colorOptions)
    const display = document.querySelector('.scheme-output')
    display.innerHTML = renderColors(json.colors)

    display.querySelectorAll('.title').forEach((title) => {
        title.addEventListener('click', copy)
    })

})



async function getColorScheme({ color, mode }) {

    const formattedColor = color.slice(1)
    const url = `https://www.thecolorapi.com/scheme?hex=${formattedColor}&format=json&mode=${mode}&count=6`
    const response = await fetch(url)
    return response.json()
}


function renderColors(data) {
    const colorObj = data.map((colorObj) => {
        return `
            <div class="output">
                <div class="display" style="background-color:${colorObj.hex.value}"></div>
                <p class="title">${colorObj.hex.value}</p>
            </div>
        `
    }).join('')
    return colorObj
}


function copy() {
    navigator.clipboard.writeText(this.innerText)
        .then(() => {
            alert(`Copied: ${this.innerText}`)
        })
        .catch((err) => {
            console.log(err)
        })
}