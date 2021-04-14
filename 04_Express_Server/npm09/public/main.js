getBoard_list();   // 현재 파일 위치에서 getBoard_list 함수 실행

function getBoard(id){}  // 게시글 내용을 보기 위한 함수

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
            td.textContent = board.id; 
            td.id = "subject";
            row.appendChild(td);  
            td = document.createElement('td');  
            td.textContent = board.subject; 
            row.appendChild(td);
            td = document.createElement('td');  
            td.id = "writer";
            td.textContent = board.writer; 
            row.appendChild(td);
            row.appendChild(td);
            tbody.appendChild(row); 
        });
    }catch(err){
        console.log(err);
    }
}