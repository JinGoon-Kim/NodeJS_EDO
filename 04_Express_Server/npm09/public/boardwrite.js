// 게시글 내용을 받아서 라우터에 보내고, 레코드 추가 후 돌아오면 main 으로 이동

document.getElementById('write-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const imgsrc = e.target.imgsrc.value;
    const subject = e.target.subject.value;
    const writer = e.target.userid.value;
    const text = e.target.text.value;

    console.log("file[0] : ",e.target.imgsrc.file[0]);
    console.log("value : ",e.target.imgsrc.value);

    //filenameTransform(imgsrc);

    if (!subject) { return alert('제목을 써주세요');
    }else if (!text) { return alert('내용을 입력해주세요');
    }
    try {
        await axios.post('/boards/writeBoard', {subject, writer, text, imgsrc});
        location.href = '/main';
    }catch(err) {
        console.error(err);
    }
});

async function filenameTransform(imgsrc) {
    const formData = new FormData();
    formData.append('image', e.target.image.file[0])
    formData.append('title', e.target.title.value)
}