import { useEffect, useState } from "react";
import Image from "next/image";

declare global {
  interface Window {
    Kakao: any;
  }
}

interface ShareProps {
  image: string;
  name: string;
}

function Share({ image, name }: ShareProps) {
  // 공유할 링크 생성
  const [link, setLink] = useState<string>("");
  useEffect(() => {
    const url = window.location.href;
    setLink(url);
  }, [link]);

  // @ts-ignore
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://developers.kakao.com/sdk/js/kakao.js";
    script.async = true;
    document.body.appendChild(script);
    return () => document.body.removeChild(script);
  }, []);

  const shareToKakao = () => {
    if (window.Kakao) {
      const kakao = window.Kakao;

      // 중복 initialization 방지
      if (!kakao.isInitialized()) {
        kakao.init("d95ef69b35e44f346b48bee40d61c7b9");
      }

      kakao.Share.sendDefault({
        objectType: "feed",
        content: {
          title: "친환경 샵 BrandU",
          description: `${name}`,
          imageUrl: `${image}`,
          link: {
            mobileWebUrl: `${link}`,
            webUrl: `${link}`,
          },
        },
        buttons: [
          {
            title: "웹으로 이동",
            link: {
              mobileWebUrl: `${link}`,
              webUrl: `${link}`,
            },
          },
          {
            title: "앱으로 이동",
            link: {
              mobileWebUrl: `${link}`,
              webUrl: `${link}`,
            },
          },
        ],
      });
    }
  };

  return (
    <div className="share mt-1" id="share-btn" onClick={shareToKakao}>
      <Image src={"/logo/share.svg"} alt={"sharelogo"} width={18} height={20} />
    </div>
  );
}

export default Share;
