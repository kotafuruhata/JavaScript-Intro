// query Selector for Editing
const titleElement = document.querySelector('#note-title')
const bodyElement = document.querySelector('#note-body')
const removeElement = document.querySelector('#remove-note')
const timeElement = document.querySelector('#edit-time')

// Check to see user is editing a valid note
const noteId = location.hash.substring(1)
let notes = getSavedNotes()
let note = notes.find((note) => note.id === noteId)

// If url is valid, return to main site
if (!note){
    location.assign('/index.html')
}
// Fill in existing inputs onto page
titleElement.value = note.title
bodyElement.value = note.body
timeElement.textContent = updateTime(note.updatedAt)

// Title Event Listener - Input
titleElement.addEventListener('input',(e) => {
    note.title = e.target.value
    note.updatedAt = moment().valueOf()
    timeElement.textContent = updateTime(note.updatedAt)
    saveNotes(notes)
})

// Body Event Listener - Input
bodyElement.addEventListener('input',(e) => {
    note.body = e.target.value
    note.updatedAt = moment().valueOf()
    timeElement.textContent = updateTime(note.updatedAt)
    saveNotes(notes)
})

// Remove Event Listener - Click
removeElement.addEventListener('click',(e) => {
    removeNote(note.id)
    saveNotes(notes)
    location.assign('/index.html')
})

// Window Storage Event Listener - Multiple Tabs + Windows Open
window.addEventListener('storage',(e) => {
    if (e.key = 'notes'){
        notes = JSON.parse(e.newValue)
        note = notes.find((note) => note.id === noteId)
        if (!note){
            location.assign('/index.html')
        }
        timeElement.textContent = updateTime(note.updatedAt)
        titleElement.value = note.title
        bodyElement.value = note.body
    }
})