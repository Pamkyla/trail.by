let btns = document.querySelectorAll('.variant-block-filter-item-btn');
for (const el of btns) {
    el.setAttribute('onClick', 'addNewsItem(this)')
}

async function getFilterData(filterName) {
    const URL = ` http://localhost:4000/filter?filter=${filterName}`;
    const response = await axios.get(URL);
    return (response.data);
}

async function addNewsItem(filter) {
    let section = document.querySelector('.item-routes-section');
    section.innerHTML = '';
    let filterName = filter.innerHTML;
    let data = await getFilterData(filterName);
    for (const el of data) {
        let newsBlock = document.createElement('div');
        let mainNewsBlockImg = document.createElement('div');
        let newsLinkBlock = document.createElement('a');
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
        newsBlock.append(newsLinkBlock);
        newsLinkBlock.append(mainNewsBlockImg);
        mainNewsBlockImg.append(mainNewsImg);
        newsLinkBlock.append(mainNewsDescription);
        newsBlock.append(additionalNewsDescription);
        additionalNewsDescription.append(newsDate);
        additionalNewsDescription.append(newsBtn);
        console.log(el);
        newsBlock.setAttribute('id', `${el._id}`)
        newsLinkBlock.setAttribute('href', `${el.link}`)
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
  <a href=${el.link}
      <button class="trail-btn detail-btn"><img class="detail-btn-img"
              src="../basic-img/right-arrow.svg" alt="detail"></button></a>
  </div>`
    }
}