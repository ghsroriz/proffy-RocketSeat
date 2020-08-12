function removeField(element){

    const scheduleList = document.querySelector("#schedule-items")
    const itemToRemove = element.parentElement.parentElement

    scheduleList.removeChild(itemToRemove)

}