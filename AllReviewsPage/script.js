async function getAllNews() {
    const URL = `http://localhost:4000/videos`;
    const response = await axios.get(URL);
    console.log(response);
    return (response.data);
}


async function filter(filterName) {
    if (filterName.innerHTML == 'Все новости') {
        addNewsItem();
        return;
    }
    const URL = `http://localhost:4000/news?filter=${filterName.innerHTML}`;
    const response = await axios.get(URL);
    addNewsItem(response.data);
}

async function addNewsItem(filter) {
    let section = document.querySelector('.news-item-section');
    let commentsBlock = document.querySelector('.rating-block')
    section.innerHTML = '';
    if (commentsBlock) {
        commentsBlock.innerHTML = '';
    }
    let data = await getAllNews();
    for (const el of filter || data) {
        let newsBlock = document.createElement('div');
        let mainNewsBlockImg = document.createElement('div');
        let mainNewsImg = document.createElement('iframe');
        let mainNewsDescription = document.createElement('p');
        let additionalNewsDescription = document.createElement('div');
        let newsDate = document.createElement('p');
        let newsBtn = document.createElement('div');
        newsBlock.classList.add('news-block');
        mainNewsBlockImg.classList.add('main-news-block-img');
        mainNewsImg.classList.add('main-news-img');
        mainNewsDescription.classList.add('main-news-description');
        additionalNewsDescription.classList.add('additional-news-description');
        newsDate.classList.add('news-date');
        newsBtn.classList.add('news-btn');

        section.append(newsBlock);
        newsBlock.append(mainNewsBlockImg);
        mainNewsBlockImg.append(mainNewsImg);
        newsBlock.append(mainNewsDescription);
        newsBlock.append(additionalNewsDescription);
        additionalNewsDescription.append(newsDate);
        additionalNewsDescription.append(newsBtn);

        newsBlock.setAttribute('id', `${el._id}`)
        newsBlock.setAttribute('filter', `${el.filter}`)
        mainNewsImg.setAttribute('src', `${el.url}`);
        mainNewsDescription.innerHTML = `${el.caption}`;
        let d = el.date;
        d = new Date;
        d.toDateString();
        newsDate.innerHTML = `${d.toDateString()}`
        newsBtn.innerHTML = `<div class="news-share-btn">
      <button class="share-btn"><img class="share-btn-img" src="../basic-img/share.svg"
              alt="share"></button>
  </div>
  <div class="news-detail-btn">
      <button class="trail-btn detail-btn" onclick="transition(this)"><img class="detail-btn-img"
              src="../basic-img/right-arrow.svg" alt="detail"></button>
  </div>`
    }
}



async function transition(ev) {
    document.documentElement.scrollTop = 0;
    let thisId = ev.parentNode.parentNode.parentNode.parentNode.id;
    let data = await getAllNews();
    let section = document.querySelector('.news-item-section');
    section.innerHTML = '';
    let newsBlock = document.createElement('div');
    let mainNewsBlockImg = document.createElement('div');
    let mainNewsImg = document.createElement('iframe');
    let mainNewsDescription = document.createElement('p');
    let changeBtn = document.createElement('section');

    newsBlock.classList.add('news-block');
    mainNewsBlockImg.classList.add('main-news-block-img');
    mainNewsImg.classList.add('main-news-img');
    mainNewsDescription.classList.add('main-news-description');
    changeBtn.classList.add('change-news-section');

    section.append(newsBlock);
    newsBlock.append(mainNewsBlockImg);
    mainNewsBlockImg.append(mainNewsImg);
    newsBlock.append(mainNewsDescription);
    section.prepend(changeBtn);

    for (const el of data) {
        if (thisId == el._id) {
            newsBlock.setAttribute('id', `${el._id}`)
            mainNewsImg.setAttribute('src', `${el.url}`);
            mainNewsDescription.innerHTML = `${el.caption}`;
            changeBtn.innerHTML = `
        <div class="change-news-block">
            <button class="change-news-block-btn trail-btn" onClick="back()">
                <img src="../basic-img/left-arrow.svg" alt="previous" class="change-news-block-btn-img">
            </button>
        </div>
  `
            addCommentItem()
        }
    }

}

async function getAllComments() {
    const URL = `http://localhost:4000/comments?id=603d3d5a1bfd7d916d852e76`;
    const response = await axios.get(URL);
    return (response.data);
}

async function addCommentItem() {
    let mainBlock = document.querySelector('.popular-section');
    let ratingWrapper = document.createElement('div');
    ratingWrapper.classList.add('rating-block');
    mainBlock.after(ratingWrapper);
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

        ratingWrapper.append(ratingBlock);
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
    }
    let addComment = document.createElement('div');
    addComment.classList.add('rating-block-item')
    addComment.classList.add('add-comment-btn-block')
    ratingWrapper.append(addComment)
    addComment.innerHTML = `
    <a href="../AddCommentPage/AddCommentPage.html"><button
            class="add-comment-btn trail-btn">Добавить комментарий</button></a>
`
}

async function back() {
    addNewsItem()
    document.documentElement.scrollTop = 0;
}

addNewsItem()