"use client"

import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';

export function Control() {
  const params = useParams();
  const router = useRouter();
  const id = params.id;
  return (
    <ul>
      <li><Link href='/create'>Create</Link></li>
      {/*  목록을 선택할때, 파람으로 아이디를 갖고있기때문에 그 아이디의 유무에따라 다음의 로직을 실행*/}
      {id ? 
      (
      <>
        <li><Link href={'/update/'+id}>Update</Link></li>
        <li>
          <input type='button' value='delete' onClick={(event) => {
            const option = {
              method: 'DELETE'
            }
            fetch(process.env.NEXT_PUBLIC_API_URL + `topics/${id}`, option).then((resp)=>{return resp.json();}).then((result)=>{
              router.push('/')});
              router.refresh();
          }}/>
        </li>
      </>
      )
      :
      null
      }
    </ul>
  );
}
