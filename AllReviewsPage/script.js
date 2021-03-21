async function getAllNews() {
    const URL = `http://localhost:4000/videos`;
    const response = await axios.get(URL);
    console.log(response);
    return (response.data);
}

let id = 0
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
    id = ev.parentNode.parentNode.parentNode.parentNode.id;
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
    const URL = `http://localhost:4000/comments?id=${id}`;
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
    addComment.addEventListener('click', addCommentPage);
    addComment.innerHTML = `<button
            class="add-comment-btn trail-btn">Добавить комментарий</button>
`

    function addCommentPage() {
        document.documentElement.scrollTop = 0;
        id = document.querySelector('.news-block').id;
        const mainBlock = document.querySelector('.wrapper-section');
        mainBlock.innerHTML = '';
        let form = document.createElement('form');
        form.setAttribute('id', 'commentForm');
        mainBlock.append(form);
        form.innerHTML = `            
    <section class="section rating-routes-section">
        <div class="routes-block">
            <p class="routes-headline">
                Как вы оцените этот обзор?
            </p>
            <div class="rating-area">
                <input type="radio" id="star-5" name="rating" value="5">
                <label for="star-5" title="Оценка «5»"></label>
                <input type="radio" id="star-4" name="rating" value="4">
                <label for="star-4" title="Оценка «4»"></label>
                <input type="radio" id="star-3" name="rating" value="3">
                <label for="star-3" title="Оценка «3»"></label>
                <input type="radio" id="star-2" name="rating" value="2">
                <label for="star-2" title="Оценка «2»"></label>
                <input type="radio" id="star-1" name="rating" value="1">
                <label for="star-1" title="Оценка «1»"></label>
            </div>
        </div>
    </section>

    <section class="section add-your-comment-section">
        <div class="add-your-comment-block">
            <div class="your-comment">
                <div class="your-comment-block">
                    <input type="text" class="your-comment-name" min="3" max="10" name="name" placeholder="Ваш никнейм">
                    <input type="email" class="your-comment-email" name="email" placeholder="Ваша почта">
                    <textarea class="your-comment-text" name="text" placeholder="Ваш комментарий..." maxlength="500"
                        rows="25"></textarea>
                </div>

            </div>
        </div>
    </section>`

        let addCommentBtn = document.createElement('div');
        addCommentBtn.addEventListener('click', getYourComment);
        addCommentBtn.innerHTML = `                <div class="add-your-comment-btn-block"><button
    class="trail-btn add-your-comment">Добавить
    комментарий</button></div>`
        mainBlock.append(addCommentBtn);
    }
}

async function back() {
    addNewsItem()
    document.documentElement.scrollTop = 0;
}



function getYourComment() {
    console.log(id);
    let nickname = document.querySelector('.your-comment-name').value;
    let userMail = document.querySelector('.your-comment-email').value;
    let commentariyText = document.querySelector('.your-comment-text').value;
    let allCountStars = document.querySelector('.rating-area');

    function starCounting() {
        for (let i = 0; i < allCountStars.childNodes.length; i++) {
            if (allCountStars.childNodes[i].nodeName == '#text') {} else {
                if (allCountStars.childNodes[i].checked == true) {
                    const countStars = allCountStars.childNodes[i].defaultValue;
                    return countStars;
                }
            }
        }
    }

    async function addYourComment() {
        const URL = `http://localhost:4000/comment?name=${nickname}&email=${userMail}&text=${commentariyText}&rating=${starCounting()}&id=${id}`;
        const response = await axios.get(URL);
    }
    addYourComment();
    location.reload();
}


addNewsItem()