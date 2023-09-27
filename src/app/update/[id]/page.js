//다이나믹폴더(프롭스로 {params} 를 받을수있음)
//클라이언트 컴포넌트
"use client"

import { useRouter } from "next/navigation"; //next/routerm는 넥스트12버전(페이지라우터)에서 사용되기때문에 13에서는 에러가 남
import { useEffect, useState } from "react";

//유저과 상호작용하는 컴포넌트이기때문에 클라이언트컴포넌트로 작성
//업데이트기능은 작성기능과 읽기기능 두 기능이 필요함
export default function Update({params}) {
  const [title, setTitle ] = useState('');
  const [body, setBody ] = useState('');
  const router = useRouter();
  const { id } = params;
  console.log("id : ",id) 
  //읽기기능
  //파라미터아이디로 데이터안에서 일치하는 데이터 가져오기
  useEffect(() => {
    fetch(process.env.NEXT_PUBLIC_API_URL + `topics/${id}`).then((resp)=>{return resp.json();}).then((result)=>{setBody(result.body); setTitle(result.title);});
  },[]);

  return (
    //작성기능
    <form onSubmit={(e)=>{
      e.preventDefault(); // 함수가 불렸을때 기본적인 움직임을 방해, 안하기함
      const title = e.target.title.value;
      const body = e.target.body.value;
      const option = {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({title, body})
      }
      fetch(process.env.NEXT_PUBLIC_API_URL + `/topics/${id}`, option)
      .then((resp)=>{return resp.json();})
      .then((result)=>{
        const lastId = result.id;
        router.refresh();
        router.push(`/read/${lastId}`)//등록이 되면 read/생성된아이디 로 리다이렉팅
      });
    }}>
      <p>
        <input type="text" name="title" placeholder="title" value={title} onChange={(e)=>{setTitle(e.target.value)}}/>
      </p>
      <p>
        <textarea name="body" placeholder="body" value={body} onChange={(e)=>{setBody(e.target.value)}}></textarea>
      </p>
      <p>
        <input type="submit" value="update" />
      </p>
    </form>
  )
}