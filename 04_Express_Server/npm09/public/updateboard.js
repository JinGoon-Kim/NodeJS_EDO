document.getElementById('update-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    let formData = new FormData();

    formData.append('image', e.target.image.files[0]);
    formData.append('subject', e.target.subject.value);
    formData.append('id', e.target.id.value);
    formData.append('text', e.target.text.value);
    
    if (!e.target.subject.value) { return alert('제목을 써주세요');
    }else if (!e.target.text.value) { return alert('내용을 입력해주세요');
    }
    try {
        axios.post('/boards/update', formData);
    }catch(err) {
        console.error(err);
    }
});