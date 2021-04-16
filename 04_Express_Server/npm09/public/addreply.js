getReply();

async function getReply(){
    const boardnum = document.getElementById("id").value;
    try{
        // 해당 게시물의 댓글을 얻어옵니다.
        const res = await axios.post('/boards/getReply', {boardnum});
        const reply = res.data;
        let tbody = document.querySelector('#reply-list tbody');
        tbody.innerHTML ='';
        // 댓글의 갯수만큼 작업할 함수를 실행합니다.
        reply.map( function(rep) {
            let row = document.createElement('tr'); // tr 생성
            let td = document.createElement('td'); // td 생성
            
            td = document.createElement('td');
            td.textContent = rep.id;
            row.appendChild(td);

            td = document.createElement('td');
            td.textContent = rep.content;
            row.appendChild(td);

            td = document.createElement('td');
            td.textContent
            // String(rep.created_at).substr(2, 2)+"/"
            = String(rep.created_at).substr(5, 2)+"/"
            + String(rep.created_at).substr(8, 2)+ " "
            + String(rep.created_at).substr(11, 5);
            td.id = "subject";
            row.appendChild(td);

            td = document.createElement('td');
            td.id = "subject";
            td.textContent =rep.writer;
            row.appendChild(td);

            td = document.createElement('td');
            const edit = document.createElement('button');

            edit.value = rep.id;

            edit.textContent = '삭제';
            edit.addEventListener('click', async (e) => {
                // console.log(e.target.value);
                const id = e.target.value;
                try {
                    const result = await axios.post('/boards/deletereply', { id });
                    if (result.data.isUpdate){
                        getReply();
                    }
                } catch (err) {
                    console.error(err);
                }
            });
            td.id = "subject";
            td.appendChild(edit);
            row.appendChild(td);

            tbody.appendChild(row);
        });
    }catch (err){
        console.log(err);
    }
}

document.getElementById('reply-add').addEventListener('submit', async (e) => {
    e.preventDefault();
    const id = e.target.id.value;
    const text = e.target.text.value;
    // console.log(id, text);
    if (!text) {  return alert('댓글 내용을 입력하세요');    }
    try {
        const result = await axios.post('/boards/replyinsert', { id, text });
        if (result.data.addReply){
            document.getElementById("text").value = '';
            getReply();
        }
    } catch (err) {
        console.error(err);
    }
});