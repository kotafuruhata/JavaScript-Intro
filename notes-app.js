const filterSearch = {
    title: '',
    sortBy: ''
}

let notes = getSavedNotes()

// Check for exisitng saved data

renderSearch(notes,filterSearch)

document.querySelector('#create-note').addEventListener('click', function(e){
    const id = uuidv4()
    const createdAt = moment().valueOf()
    notes.push({
        // uuidv4() is referenced in html and uniquely identifies a tag
        id: id,
        title: '',
        body: '',
        createdAt: createdAt,
        updatedAt: createdAt
    })
    saveNotes(notes)
    location.assign(`/edit.html#${id}`)
})

document.querySelector('#identify').addEventListener('input', function(e) {
    filterSearch.title = e.target.value
    renderSearch(notes,filterSearch)
})

document.querySelector('#filter-by').addEventListener('change', function(e){
    filterSearch.sortBy = e.target.value
    renderSearch(notes,filterSearch)
})

window.addEventListener('storage', function(e){
    if (e.key === 'notes'){
        notes = JSON.parse(e.newValue)
        renderSearch(notes,filterSearch)
    }
})



// const birthday = moment()
// birthday.date(16).month(0).year(1998)

// console.log(birthday.format("MMM D, YYYY"))

// const now = moment()
// now.add(1, 'year').subtract(1, 'week')
// console.log(now.format("MMMM Do, YYYY"))
// console.log(now.fromNow())

// const nowTimestamp = now.valueOf()
// console.log(nowTimestamp)
// console.log(moment(nowTimestamp).toString())

// const first = new Date('September 26, 1995')
// const second = new Date('January 16, 1998')

// const firstTimestamp = first.getTime()
// const secondTimestamp = second.getTime()

// const times = [firstTimestamp, secondTimestamp]
// const sortDates = function(times) {
//     times.sort(function(a,b){
//         if (a > b) {
//             return 1
//         } else if (b > a){
//             return -1
//         } else {
//             return 0
//         }
//     })
// }
// sortDates(times)
// console.log(new Date(times[0]))

// // let Random = Math.floor(Math.random()*10)*1000
// // const myDate = new Date(timestamp)
// // console.log(myDate.getFullYear())