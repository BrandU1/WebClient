function Notice(){
  return(
    <div className="max-w-4xl m-auto ">
      <div>
        <h2 className="py-5 font-bold text-xl">공지사항</h2>
        <div className="border-[1px] border-black"/>
      </div>
      <div className="contents">
        {[1,2,3,4,5].map((res,idx)=>{
          return(
            <>
            <div key={idx} className="flex items-center justify-between px-2 py-4">
              <h3 className="text-base">[공지] 브랜뉴 이용약관 계정 안내 (7.18 ~ )</h3>
              <p className="text-xs">2022/07/15</p>
            </div>
              <div className="border-[1px] border-[#EDEDED]"/>
            </>
          )
        })}

      </div>

    </div>
  )
}

export default Notice;