const apiUrl = "https://jsonplaceholder.typicode.com";

// 포스트 목록 표시 함수
async function displayPosts() {
    try {
        // API로부터 포스트 데이터 fetch
        const response = await fetch(`${apiUrl}/posts`);
        
        // 응답 상태 확인
        if (!response.ok) {
            throw new Error("Failed to fetch posts");
        }
        
        const posts = await response.json();
        const postList = document.getElementById("post-list");
        
        postList.innerHTML = ""; // 기존 목록 초기화

        posts.forEach(post => {
            const li = document.createElement("li");
            li.textContent = post.title;
            li.dataset.postId = post.id;

            // 리스트 아이템 클릭 시 상세 페이지로 이동 (쿼리 스트링 포함)
            li.addEventListener("click", () => {
                window.location.href = `detail.html?postId=${post.id}`;
            });
            
            postList.appendChild(li);
        });
    } catch (error) {
        // 에러 발생 시 콘솔 출력
        console.error(`Error: ${error.message}`);
    }
}

// 페이지 로드 시 실행
displayPosts();