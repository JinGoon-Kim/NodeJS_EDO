document.getElementById('login-form').addEventListener('submit', async(e) => {
    e.preventDefault();
    const id = e.target.id.value;
    const pwd = e.target.pwd.value;
    if ( !id ){
        return alert('아이디를 입력하세요');
    }
    if ( !pwd ){
        return alert('비밀번호를 입력하세요');
    }
    e.target.id.value = '';
    e.target.pwd.value = '';
});