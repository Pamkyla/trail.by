function getYourComment() {
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
    let newsId = '603d3d5a1bfd7d916d852e76';


    async function addYourComment() {
        const URL = `http://localhost:4000/comment?name=${nickname}&email=${userMail}&text=${commentariyText}&rating=${starCounting()}&id=${newsId}`;
        const response = await axios.get(URL);
        console.log(response.data);
    }
    addYourComment();
}