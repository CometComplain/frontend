
export const loadMore = (complaintsQuery) => {
    if (complaintsQuery.hasNextPage) {
        complaintsQuery.fetchNextPage()
    }
}
export const handleScroll = (event, querysArray) => {
    event.preventDefault();
    event.stopPropagation();
    const {scrollTop, clientHeight, scrollHeight} = event.target;
    if (scrollTop + clientHeight >= scrollHeight - 5) {
        querysArray.forEach((queryInstance) => loadMore(queryInstance));
    }
}
