const mongoose = require('mongoose')

if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]
const phonebookName = process.argv[3]
const phonebookNumber = process.argv[4]


const url =
  `mongodb+srv://teperyazadrot:${password}@klaus.iyb2jtr.mongodb.net/NoteApp?retryWrites=true&w=majority`

mongoose.set('strictQuery',false)
mongoose.connect(url)

const noteSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Note = mongoose.model('Note', noteSchema)

const note = new Note({
  name: phonebookName,
  number: phonebookNumber
})

if (process.argv.length<4) {
  console.log('phonebook:')
  Note.find({}).then(result => {
  result.forEach(note => {
    console.log(note.name, note.number)
  })
  mongoose.connection.close()
})  

} else {
note.save().then(result => {
  console.log(`added ${phonebookName} number ${phonebookNumber} to phonebook!`)
  mongoose.connection.close()
})
}