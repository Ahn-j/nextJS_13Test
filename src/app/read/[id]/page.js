//다이나믹폴더(프롭스로 {params} 를 받을수있음
export default async function Read({params}) {
  //param프롭스를 받아와 현재 파라미터의 아이디 확인
  const { id } = params;
  //파라미터아이디로 데이터안에서 일치하는 데이터 가져오기
  const resp = await fetch(process.env.NEXT_PUBLIC_API_URL + `topics/${id}`, {cache : "no-store"});
  const topics = await resp.json();

  return (
    <>
      <h2>{topics.title}</h2>
      <h4>{topics.body}</h4>
    </>
  )
}