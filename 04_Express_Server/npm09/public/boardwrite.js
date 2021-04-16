// 게시글 내용을 받아서 라우터에 보내고, 레코드 추가 후 돌아오면 main 으로 이동

document.getElementById('write-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    let formData = new FormData();

    formData.append('image', e.target.image.files[0]);
    formData.append('subject', e.target.subject.value);
    formData.append('userid', e.target.userid.value);
    formData.append('text', e.target.text.value);
    
    if (!e.target.subject.value) { return alert('제목을 써주세요');
    }else if (!e.target.text.value) { return alert('내용을 입력해주세요');
    }
    try {
        axios.post('/boards/writeBoard', formData);
        location.href = '/main';
    }catch(err) {
        console.error(err);
    }
});