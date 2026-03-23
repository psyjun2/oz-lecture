const apiUrl = "https://jsonplaceholder.typicode.com";
const CACHE_EXPIRATION_MS = 5 * 60 * 1000; // 5분을 밀리초로 계산

async function displayPostDetail() {
    try {
        // 1. URL 파라미터에서 postId 추출
        const urlParams = new URLSearchParams(window.location.search);
        const postId = urlParams.get("postId");

        if (!postId) {
            throw new Error("No post ID provided");
        }

        const cacheKey = `post_${postId}`;
        const cachedData = localStorage.getItem(cacheKey);
        let post = null;

        // 2. localStorage 캐시 확인
        if (cachedData) {
            const parsedCache = JSON.parse(cachedData);
            const currentTime = new Date().getTime();

            // 캐시 유효 시간(5분) 확인
            if (currentTime - parsedCache.timestamp < CACHE_EXPIRATION_MS) {
                post = parsedCache.data;
                console.log("Post loaded from localStorage");
            }
        }

        // 3. 캐시가 없거나 만료된 경우 API 호출
        if (!post) {
            const response = await fetch(`${apiUrl}/posts/${postId}`);
            
            if (!response.ok) {
                throw new Error("Failed to fetch post details");
            }

            post = await response.json();

            // 새로운 데이터를 localStorage에 저장 (데이터 + 현재 시간)
            const cachePayload = {
                data: post,
                timestamp: new Date().getTime()
            };
            localStorage.setItem(cacheKey, JSON.stringify(cachePayload));
            
            console.log("Post fetched from API");
        }

        // 4. 화면에 렌더링
        renderPost(post);

    } catch (error) {
        console.error(`Error: ${error.message}`);
        document.getElementById("post-detail").innerHTML = `<p style="color:red;">Error: ${error.message}</p>`;
    }
}

// 데이터를 HTML 요소에 주입하는 함수
function renderPost(post) {
    const postDetail = document.getElementById("post-detail");
    postDetail.innerHTML = `
        <h3>${post.title}</h3>
        <p>${post.body}</p>
    `;
}

// 페이지 로드 시 실행
displayPostDetail();