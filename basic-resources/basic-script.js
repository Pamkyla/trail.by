async function getAllNews() {
    const URL = `http://localhost:4000/news`;
    const response = await axios.get(URL);
    return (response.data);
  }
  
  async function addNewsItem() {
    let section = document.querySelector('.news-block');
    section.innerHTML = '';
    let data = await getAllNews();
    for (let i = 0; i < data.length - 8; i++) {
      let newsBlock = document.createElement('div');
      let mainNewsBlockImg = document.createElement('div');
      let mainNewsImg = document.createElement('img');
      let mainNewsDescription = document.createElement('p');

      newsBlock.classList.add('news-block-item');
      mainNewsBlockImg.classList.add('news-block-item-headline');
      mainNewsImg.classList.add('main-news-img');
      mainNewsDescription.classList.add('news-block-item-description');

      section.append(newsBlock);
      newsBlock.append(mainNewsBlockImg);
      mainNewsBlockImg.append(mainNewsImg);
      newsBlock.append(mainNewsDescription);

  
      newsBlock.setAttribute('id', `${data[i]._id}`)
      newsBlock.setAttribute('filter', `${data[i].filter}`)
      mainNewsImg.setAttribute('src', `${data[i].picture}`);
      mainNewsDescription.innerHTML = `${data[i].caption}`;
    }
  }
  
  addNewsItem()