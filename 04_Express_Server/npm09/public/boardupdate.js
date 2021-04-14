document.getElementById('update-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const id = e.target.id.value;
    const subject = e.target.subject.value;
    const writer = e.target.id.value;
    const text = e.target.text.value;

    if (!subject) { return alert('제목을 써주세요');
    }else if (!text) { return alert('내용을 입력해주세요');
    }
    try {
        const res = await axios.post('/boards/update', {id, subject, writer, text});
        if (res.data.isUpdate) {
            location.href="/boards/boardView/" + id;
        } else {
            alert('오류');
        }
    }catch(err) {
        console.error(err);
    }
});