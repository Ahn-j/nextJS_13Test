"use client"

import { useRouter } from "next/navigation"; //next/routerm는 넥스트12버전(페이지라우터)에서 사용되기때문에 13에서는 에러가 남

//유저과 상호작용하는 컴포넌트이기때문에 클라이언트컴포넌트로 작성

export default function Create() {
  const router = useRouter();
  return (
    <form onSubmit={(e)=>{
      e.preventDefault(); // 함수가 불렸을때 기본적인 움직임을 방해, 안하기함
      const title = e.target.title.value;
      const body = e.target.body.value;
      const option = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({title, body})
      }
      fetch(process.env.NEXT_PUBLIC_API_URL + "topics", option)
      .then((resp)=>{return resp.json();})
      .then((result)=>{
        const lastId = result.id;
        router.refresh();
        router.push(`/read/${lastId}`)//등록이 되면 read/생성된아이디 로 리다이렉팅
      });
    }}>
      <p>
        <input type="text" name="title" placeholder="title" />
      </p>
      <p>
        <textarea name="body" placeholder="body" ></textarea>
      </p>
      <p>
        <input type="submit" value="create" />
      </p>
    </form>
  )
}