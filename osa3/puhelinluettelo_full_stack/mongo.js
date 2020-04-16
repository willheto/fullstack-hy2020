const mongoose = require('mongoose')

const loading = ['/', '-', '\\', '|', '/', '-', '\\', '|']
let index = 0;

if (process.argv.length < 3) {
    console.log('Enter a valid password!')
    process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://fullstack:${password}@fullstack-hy2020-dwifs.mongodb.net/number?retryWrites=true&w=majority`

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })

const numberSchema = new mongoose.Schema({
    name: String,
    number: String
})

const Number = mongoose.model('Number', numberSchema)

if (process.argv.length > 3) {

    const loadingInterval = setInterval(function () {
        process.stdout.clearLine(1)
        process.stdout.cursorTo(0)
        process.stdout.write(' ' + loading[index] + ' saving...')

        index++;
        if (index === 7) {
            index = 0
        }
    }, 250)


    const number = new Number({
        name: process.argv[3],
        number: process.argv[4]
    })

    number.save()
        .then(result => {
            clearInterval(loadingInterval)
            console.log('')
            console.log(`added ${number.name} ${number.number} to phonebook`)
            mongoose.connection.close()
        })
} else {
    console.log('phonebook:')
    Number.find({}).then(result => {
        result.forEach(number => {
            console.log(number.name, number.number)
        });
        mongoose.connection.close()
    })
}
