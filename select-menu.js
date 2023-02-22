//Functionality for custom select


const form = document.querySelector('#color-options')

const customSelect = form.querySelector('.custom')

const originalSelect = form.querySelector('select')
const options = originalSelect.options

const header = document.createElement('div')
header.className = 'header'
const label = document.createElement('span')
label.className = 'label'
label.innerText = options[options.selectedIndex].label

const listWrapper = document.createElement('div')
listWrapper.className = 'list-wrapper'

Array.from(originalSelect.attributes).forEach((attribute) => {
    customSelect.dataset[attribute.name] = attribute.value
})

const optionElementString = Array.from(options).map((option) => {
    return `
        <div class="option" data-label="${option.label}" data-value="${option.value}">${option.label}</div>
    `
}).join('')

const custOptionElem = document.createRange().createContextualFragment(optionElementString)

listWrapper.append(custOptionElem)

listWrapper.querySelectorAll('.option').forEach((customOption) => {

    const matchingOption = Array.from(options).find((existingOption) => {
        return existingOption.label === customOption.dataset.label
    })

    for (let attributes of matchingOption.attributes) {
        customOption.dataset[attributes.name] = attributes.value
    }

})

listWrapper.querySelectorAll('.option').forEach((customOption) => {
    customOption.addEventListener('click', (e) => {
        originalSelect.value = customOption.dataset.value
        label.innerText = customOption.dataset.label

        for (let option of Array.from(listWrapper.querySelectorAll('.option'))) {
            option.removeAttribute('data-selected')
        }

        customOption.setAttribute('data-selected', '')
    })
})

customSelect.addEventListener('click', (e) => {
    e.stopPropagation()
    if (customSelect.hasAttribute('data-open')) {
        customSelect.removeAttribute('data-open')
    } else {
        customSelect.setAttribute('data-open', '')
    }
})

document.addEventListener('click', (e) => {
    if (customSelect.hasAttribute('data-open')) {
        customSelect.removeAttribute('data-open')
    }
})

header.append(label, originalSelect)
customSelect.append(header, listWrapper)
