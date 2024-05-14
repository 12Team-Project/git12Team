export default function shareKakaoLink(route, userData) {
    if (window.Kakao) {
        const kakao = window.Kakao;
        if (!kakao.isInitialized()) {
            kakao.init("1b7c8a284ca573f85b3d99d9219876c9"); // 카카오에서 제공받은 javascript key를 넣어줌
        }

        kakao.Link.sendDefault({
            objectType: "feed", // 카카오 링크 공유 여러 type들 중 feed라는 타입 -> 자세한 건 카카오에서 확인
            content: {
                title: userData.name, // 인자값으로 받은 title
                description: "너와 나의 연결고리, 오픈마인드", // 인자값으로 받은 title
                imageUrl: `${userData.imageSource}`,
                link: {
                    mobileWebUrl: route, // 인자값으로 받은 route(uri 형태)
                    webUrl: route,
                },
            },
            buttons: [
                {
                    title: "보러가기",
                    link: {
                        mobileWebUrl: route,
                        webUrl: route,
                    },
                },
            ],
        });
    }
}
