async function getAllNews() {
  const URL = `http://localhost:4000/news`;
  const response = await axios.get(URL);
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
  section.innerHTML = '';
  let data = await getAllNews();
  for (const el of filter || data) {
    let newsBlock = document.createElement('div');
    let mainNewsBlockImg = document.createElement('div');
    let mainNewsImg = document.createElement('img');
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
    mainNewsImg.setAttribute('src', `${el.picture}`);
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
  let mainNewsImg = document.createElement('img');
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
      mainNewsImg.setAttribute('src', `${el.picture}`);
      mainNewsDescription.innerHTML = `${el.text}`;
      changeBtn.innerHTML = `
      <div class="change-news-block">
          <button class="change-news-block-btn trail-btn" onClick="back()">
              <img src="../basic-img/left-arrow.svg" alt="previous" class="change-news-block-btn-img">
          </button>
      </div>
`
      return
    }
  }

}

async function back() {
  addNewsItem()
  document.documentElement.scrollTop = 0;
}

addNewsItem()