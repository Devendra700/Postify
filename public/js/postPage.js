$(document).ready(() => {
    $.get('/api/posts/' + postId, results => {
        outputPostsWithReplies(results, $('.postsContainer'))
    })
})
console.log('we are in post Page js')