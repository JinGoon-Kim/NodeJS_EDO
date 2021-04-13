document.getElementById('login-form').addEventListener('submit', async(e) => {
    e.preventDefault();
    const userid = e.target.userid.value;
    const pwd = e.target.pwd.value;
    if ( !userid ){
        return alert('아이디를 입력하세요');
    }
    if ( !pwd ){
        return alert('비밀번호를 입력하세요');
    }
    try{
        const res = await axios.post('/members/login', {userid, pwd});
        const mem = res.data;
        let m = document.getElementById("messageBox");
        if (mem.userid == userid && mem.pwd == pwd){
            location.href = '/main'; // 정상 로그인
        }else if (mem.userid == userid && mem.pwd != pwd){
            // passwordfail(); // 비번 오류
            m.innerHTML = '비밀번호를 확인하세요';
        }else {
            // passwordfail(); // 아이디 오류
            m.innerHTML = '아이디를 확인해세요';
        }
    }catch (err){
        console.error(err);
    }
    e.target.pwd.value = '';
});