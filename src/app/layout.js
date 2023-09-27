import Link from 'next/link'
import './globals.css'
import { revalidatePath } from 'next/cache';
import { Control } from './Control';
// import { useEffect, useState } from 'react'

//이 부분은 서버컴포넌트에서만 사용가능
//클라이언트컴포넌트("use client")로 만들었다면, 이부분에서 에러가 남
export const metadata = {
  title: 'Web tutorials',
  description: 'heheheh',
}

//클라이언트컴포넌트("use client")로 만들지않았다면 이 컴포넌트는 서버컴포넌트이기 때문에
//useState 나 useEffect의 사용으로 인해 에러가난다(이 두개는 클라이언트컴포넌트에서 사용해야하므로)
//따라서 위 두개를 사용하지않고 하기위해서 async await 사용
export default async function RootLayout({ children }) {
  // const [topics, setTopics] = useState([]);
  // useEffect(() => {
  //   fetch("http://localhost:9999/topics").then((resp)=>{return resp.json();}).then((result)=>{setTopics(result)});
  // },[]);

  //{next : {revalidate : 10}} 는 10초동안만 캐시를 유지하고, 이후에는 캐시를 삭제한다는 의미로 0으로 할경우는 캐시를 사용하지않겠다는 의미
  //아니면 {cache : "no-store"} (캐시를 저장하지않는다 )롤 사용
  const resp = await fetch(process.env.NEXT_PUBLIC_API_URL + "topics", {next : {revalidate : 0}});
  const topics = await resp.json();

  return (
    <html>
      <body>
        <h1><Link href='/'>WEB</Link></h1>
        <ol>
          {/* <li><Link href='/read/1'>html</Link></li>
          <li><Link href='/read/2'>css</Link></li> */}
          {topics.map((topic, index) => {
            return <li key={index}><Link href={`/read/${topic.id}`}>{topic.title}</Link></li>
          })}
        </ol>
        {children}
        {/* 이 컴포넌트는 useParams();를 사용해야하는데 이 레이아웃은 서버컴포넌트이기때문에 따로 컴포넌트화시켜서 클라이언트컴포넌트로 만듬 */}
        <Control />
      </body>
    </html>
  )
}
