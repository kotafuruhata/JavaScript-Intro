
// Read existing data
const getSavedNotes = () => {
    const notesJSON = localStorage.getItem('notes')
    try {
        return notesJSON ? JSON.parse(notesJSON) : []
    } catch (e) {
        return []
    }
    
}
// Remove Note from file
const removeNote = (id) => {
    const notesIndex = notes.findIndex((note) => note.id === id)

    if (notesIndex > -1){
        notes.splice(notesIndex,1)
    }
}
// Save Notes onto local Storage
const saveNotes = (notes) => {
    localStorage.setItem('notes', JSON.stringify(notes))
}
// Generate Notes on Index Page
const generateNoteDOM = (note) => {
    // Set up structure
    const noteEL = document.createElement('div')
    const textEl = document.createElement('a')
    const button = document.createElement('button')

    // Set up remove button
    button.textContent = 'x'
    noteEL.appendChild(button)
    // Set up remove functionality
    button.addEventListener('click', () => {
        removeNote(note.id)
        saveNotes(notes)
        renderSearch(notes, filterSearch)
    })

    // Set up text
    if (note.title.length > 0) {
        textEl.textContent = note.title
    } else {
        textEl.textContent = 'Unnamed Note'
    }
    textEl.href = `/edit.html#${note.id}`
    noteEL.appendChild(textEl)
    
    return noteEL
}
// Sort Notes by one of three ways
const sortNotes = (notes, sortBy) => {
    if (sortBy === 'byEdited'){
        return notes.sort((a,b) => {
            if (a.updatedAt > b.updatedAt){
                return -1
            } else if (a.updatedAt < b.updatedAt){
                return 1
            } else {
                return 0
            }
        })
    } else if (sortBy === 'byCreated'){
        return notes.sort((a,b) => {
            if (a.createdAt > b.createdAt){
                return -1
            } else if (a.createdAt < b.createdAt){
                return 1
            } else {
                return 0
            }
        })
    } else if (sortBy === 'alphabetically'){
        return notes.sort((a,b) => {
            if (a.title.toLowerCase() > b.title.toLowerCase()) {
                return 1
            } else if (a.title.toLowerCase() < b.title.toLowerCase()) {
                return -1
            } else {
                return 0
            }
        })
    } else {
        return notes
    }
}
// Render Application Notes
const renderSearch = (notes, filters) => {
    notes = sortNotes(notes,filters.sortBy)
    
    const filterNotes = notes.filter((note) => note.title.toLowerCase().includes(filters.title.toLowerCase()))
    
    document.querySelector('#new').innerHTML = ''

    filterNotes.forEach((note) => {
        const noteEl = generateNoteDOM(note)
        document.querySelector('#new').appendChild(noteEl)
    })
}
// Generate the last edited message
const updateTime = (timeStamp) => `Last edited ${moment(timeStamp).fromNow()}`
