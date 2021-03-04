let video = document.querySelector('.video-review-img');

let data = {
    0: "https://www.youtube.com/embed/uwK6Os3UtF8",
    1: "https://www.youtube.com/embed/6F9nnhA7Q2A",
    2: "https://www.youtube.com/embed/rr_76nSa9Kw",
    3: "https://www.youtube.com/embed/HjbolZj1V8k",
    4: "https://www.youtube.com/embed/Hf_jBVNYY6A",
    5: "https://www.youtube.com/embed/QX9hALJEN6Y",
    6: "https://www.youtube.com/embed/PiaxdSTGl5c",
    7: "https://www.youtube.com/embed/fEErySYqItI",
    8: "https://www.youtube.com/embed/FsicST8l3vM",
    9: "https://www.youtube.com/embed/NUp2t2cja_E",
    10: "https://www.youtube.com/embed/hbldqGLEKZg",
    11: "https://www.youtube.com/embed/QNdYybI3Pgs",
    12: "https://www.youtube.com/embed/2XxE8BvTyFs",
    13: "https://www.youtube.com/embed/FKCJVP9OVv8",
}
video.setAttribute('src', `${data[Math.round(Math.random()*13)]}`)



async function getAllComments() {
    const URL = `http://localhost:4000/comments?`;
    const response = await axios.get(URL);
    return (response.data);
}

async function addNewsItem() {
    let mainBlock = document.querySelector('.rating-block');
    mainBlock.innerHTML = '';

    let data = await getAllComments();
    for (const el of data) {
        let ratingBlock = document.createElement('div');
        let userHeadlineBlock = document.createElement('div');
        let userNameBlock = document.createElement('div');
        let userName = document.createElement('p');
        let userCommentDate = document.createElement('p');
        let userRatingBlock = document.createElement('div');

        let userCommentBlock = document.createElement('div');
        let userComment = document.createElement('p');



        ratingBlock.classList.add('rating-block-item');
        userHeadlineBlock.classList.add('user-headline-block');
        userNameBlock.classList.add('user-name-block');
        userName.classList.add('user-name');
        userCommentDate.classList.add('user-comment-date');
        userRatingBlock.classList.add('user-rating-block');

        userCommentBlock.classList.add('user-comment-block');
        userComment.classList.add('user-comment');

        mainBlock.append(ratingBlock);
        ratingBlock.append(userHeadlineBlock);
        userHeadlineBlock.append(userNameBlock);
        userNameBlock.append(userName);
        userNameBlock.append(userCommentDate);
        userHeadlineBlock.append(userRatingBlock);

        for (let i = 0; i < el.raiting; i++) {
            let userRatingItem = document.createElement('img');
            userRatingBlock.append(userRatingItem);
            userRatingItem.classList.add('user-rating-item');
            userRatingItem.setAttribute('src', '../basic-img/star.svg')
        }
        ratingBlock.append(userCommentBlock);
        userCommentBlock.append(userComment);


        userName.innerHTML = `${el.name}`
        userComment.innerHTML = `${el.text}`

        console.log(mainBlock);
        console.log(data);

    }
    let addComment = document.createElement('div');
    addComment.classList.add('rating-block-item')
    addComment.classList.add('add-comment-btn-block')
    mainBlock.append(addComment)
    addComment.innerHTML = `
    <a href="../AddCommentPage/AddCommentPage.html"><button
            class="add-comment-btn trail-btn">Добавить комментарий</button></a>
`
}



addNewsItem()