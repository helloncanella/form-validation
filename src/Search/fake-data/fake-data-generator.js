const faker = require('faker')
const jsonfile = require('jsonfile')

const categories = generateCategories()
const subcategories = generateSubCategories(categories)
const resources = generateResources(subcategories, 200)

const dataToPrint = [
    [categories, './data/categories.json'],
    [subcategories, './data/subcategories.json'],
    [resources, './data/resources.json']
]

printFile(dataToPrint)


function generateCategories(quantity = 20) {
    let categories = []

    for (var i = 1; i <= quantity; i++) {
        categories.push(faker.company.catchPhraseNoun())
    }

    return categories
}

function generateSubCategories(categories, quantity = 50) {
    let subcategories = []

    for (var i = 1; i <= quantity; i++) {
        const category = randomArrayItem(categories)

        const subcategory = {
            name: faker.company.catchPhraseNoun(),
            category
        }

        subcategories.push(subcategory)
    }

    return subcategories
}


function generateResources(subcategories, quantity = 50) {
    let resources = []

    for (var i = 1; i <= quantity; i++) {
        const subcategory = randomArrayItem(subcategories)

        const resource = {
            name: faker.company.catchPhrase(),
            subcategory: subcategory.name,
            category: subcategory.category
        }

        resources.push(resource)
    }

    return resources
}


function randomArrayItem(array) {
    const length = array.length
        , randomIndex = Math.floor(Math.random() * length)

    return array[randomIndex]
}


function printFile(data) {
    data.forEach(item => {
        const [object, fileName] = item

        jsonfile.writeFile(fileName, object, {spaces: 4}, (error) => {
            if (error) console.log(error)
        })
    })
}

