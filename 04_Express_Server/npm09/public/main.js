getBoard_list();   // 현재 파일 위치에서 getBoard_list 함수 실행

function getBoard(id){  // 게시글 내용을 보기 위한 함수
    location.href="/boards/boardView/" + id;
}  

async function getBoard_list(){
    try{
        // 게시물 조회해서 리턴 받습니다
        const res = await axios.get('/boards');
        // 데이터만 추출
        const boards = res.data;
        // 테이블의 tbody 에 포커스를 맞춰서
        const tbody = document.querySelector('#board-list tbody');
        tbody.innerHTML = '';
        // 게시물 하나하나를 tbody 안에 추가합니다
        boards.map( function(board) {
            const row = document.createElement('tr');
            // 게시물이 클릭되면 getBoard 호출해서 게시상세보기로 이동합니다
            row.addEventListener('click', () => {
                getBoard(board.id); 
            });
            let td = document.createElement('td');
            let span = document.createElement('span');
            
            td.textContent = board.id; 
            td.id = "subject";
            row.appendChild(td);

            td = document.createElement('td');  
            td.textContent = board.subject;

            getReply_count(board, td, span); // 아래 학원 코드와 동일한 기능 수행

            // 학원 코드
            // let tContent = board.subject;
            // try{
            //      const result = await axios.get(`/boards/replycnt/${bid}`);
            //      const data = result.data;
            //      const cnt = data.lenght;
            //      if( cnt != 0 ){
            //          tContent = tContent
            //          + '<span style="color:red; font-weiht:bold">[' + cnt + ']</span>';
            // }catch(err) {
            //      console.error(err);   
            // }
            // td.innerHTML = tContent;
            // row.appendChild(td);
            // 여기까지


            row.appendChild(td);

            td = document.createElement('td');  
            td.id = "writer";
            td.textContent = board.writer; 
            row.appendChild(td);

            td = document.createElement('td');  
            td.id = "readCount";
            td.textContent = board.readCount; 
            row.appendChild(td);
            
            row.appendChild(td);
            tbody.appendChild(row);
        });
    }catch(err){
        console.log(err);
    }
}

async function getReply_count(board ,td, span){
    try{
        // console.log("보드 아이디", board.id)
        const result = await axios.get(`/boards/countReply/${board.id}`);
        const cnt =  result.data.count;
        // console.log("result : "+cnt);
        if (cnt != 0){
            span.textContent = " ["+cnt+"]";
            span.id = "replyCount";
            td.appendChild(span);
        }
    }catch{
        console.error(err);
    }
}