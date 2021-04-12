// 댓글 로딩
async function getComment(id) {
    try{
        // 아이디로 댓글 요청 후 리턴받은 데이터를 res 에 저장
        const res = await axios.get(`/users/${id}/comments`);
        // comments 변수로 다시 저장
        const comments = res.data;
        // '#comment-List tbody' 태그 포커스를 맞춰서 내용 비움
        const tbody = document.querySelector('#comment-list tbody');
        tbody.innerHTML = '';
        // comments 변수에 들어 있는 댓글 갯수 만큼 function(comment){} 함수 실행
        // 함수 실행시 comments 에 있던 댓글들이 하나씩 comment 변수에 전달됩니다.
        comments.map(function (comment){
            const row = document.createElement('tr');
            let td = document.createElement('td');
            td.textContent = comment.id;
            row.appendChild(td);
            td = document.createElement('td');
            td.textContent = comment.User.name;
            row.appendChild(td);
            td = document.createElement('td');
            td.textContent = comment.comment;
            row.appendChild(td);

            tbody.appendChild(row);
        });
    }catch(err) {
        console.error(err);
    }
}


// 모든 사용자 조회후 화면에 표시
// await 함수 실행이 있으므로 async 로 만듭니다.
async function getUser() {
    try{
        // /users 의 get 방식으로 모든 사용자 정보를 조회하고 리턴된 데이터를
        // res에 저장합니다.
        const res = await axios.get('users');
        // 이름을 user 로 바꿔쓰기 위해 변수만들고 대입합니다.
        const users = res.data;
        // querySelector : () 의 선택자로 표시된 태그유형중 첫번째 태그를 선택.
        const tbody = document.querySelector('#user-list tbody');
        tbody.innerHTML = '';
        // users 에 담긴 user 데이터 갯수만큼 데이터를 추가합니다.
        // users 변수에 담긴 한 사람의 데이터가 user 변수에 인원수 만큼 당기면서
        // function 이 실행됩니다.
        users.map( function(user) {
            // try 태그 추가
            const row = document.createElement('tr');
            // 현재 행을 클릭하면 현재 사용자의 댓글들을 로딩하고 하단에 표시하는
            // 이벤트 리스터 설정
            row.addEventListener('click', () => {
                getComment(user.id); // 현재 아이디로 댓글 조회하는 함수추가 예정
            });
            // 현재 행에 대한 사용자 정보를 td에 나눠 표시
            let td = document.createElement('td'); // td 생성
            td.textContent = user.id; // 생성된 td 안에 내용삽입.
            row.appendChild(td); // tr안에 td 삽입
            td = document.createElement('td');
            td.textContent = user.name;
            row.appendChild(td);
            td = document.createElement('td');
            td.textContent = user.age;
            row.appendChild(td);
            td = document.createElement('td');
            // married 가 true 이면 첫번째 '기혼' 아니면 '미혼' 선택
            td.textContent = user.married ? '기혼' : '미혼';
            row.appendChild(td);
            tbody.appendChild(row); // 완성된 tr을 tbody에 추가
        });
    }catch(err) {

    }

}


// 사용자 등록을 하려고 할때
// id가 user-form 인 폼의 submit 이 실행될때 async(e) => {} 함수 실행 
document.getElementById('user-form').addEventListener('submit', async(e) => {
    e.preventDefault(); // submit 일시 정지
    const name = e.target.username.value;
    const age = e.target.age.value;
    const married = e.target.married.checked;
    if( !name ) { return alert('이름을 입력하세요'); }
    if( !age ) { return alert('나이를 입력하세요'); }

    try{
        // post로 전송하고 함수가 리턴되면 현재 자리에서 다음이 실행됩니다.
        // 사용자 추가의 기능만 실행. 되돌아 오는 값은 없습니다.
        await axios.post('/users', {name, age, married});
        // 추가된 사용자정보를 포함하여 모든 사용자의 데이터를 받아 화면에 표시하려면
        // 별도의 실행이 필요합니다. 여기서는 별도의 함수를 만들고 호출하는 방식으로
        // 진행합니다.
        getUser();
    }catch(err) {
        console.error(err);
    }
    // 사용자 추가-사용자정보 표시 등의 동작을 마치고, 사용자 추가폼의 입력란들은
    // 다음 추가위해 다 비워줍니다.
    e.target.username.value = '';
    e.target.age.value = '';
    e.target.married.checked = false;
    
});


// 댓글을 등록하려고 할때
document.getElementById('comment-form').addEventListener('submit', async(e) => {
    e.preventDefault();
    const id = e.target.userid.value;
    const comment = e.target.comment.value;
    if ( !id ){
        return alert('아이디를 입력하세요');
    }
    if ( !comment ){
        return alert('댓글을 입력하세요');
    }
    try {
        await axios.post('/comments', {id, comment});
        getComment(id);
    }catch(err) {
        console.error(err);
    }
    e.target.username.value = '';
    e.target.comment.value = '';
});