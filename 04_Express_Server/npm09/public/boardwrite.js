// 게시글 내용을 받아서 라우터에 보내고, 레코드 추가 후 돌아오면 main 으로 이동

document.getElementById('write-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const subject = e.target.subject.value;
    const writer = e.target.userid.value;
    const text = e.target.text.value;

    if (!subject) { return alert('제목을 써주세요');
    }else if (!text) { return alert('내용을 입력해주세요');
    }
    try {
        await axios.post('/boards/writeBoard', {subject, writer, text});
        location.href = '/main';
    }catch(err) {
        console.error(err);
    }
});