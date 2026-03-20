// 도서 데이터를 저장할 배열
const books = [];
// 대여 상태를 관리할 배열
const rentals = [];

// 도서 추가 기능
function addBook() {
    const titleInput = document.getElementById('bookTitle');
    const priceInput = document.getElementById('bookPrice');
    const title = titleInput.value.trim();
    const price = Number(priceInput.value);

    if (title === '' || isNaN(price) || price <= 0) {
        alert('도서 제목과 유효한 가격(0 이상)을 입력하세요!');
        return;
    }

    const book = { title, price };
    books.push(book);

    // 대여 상태 클로저 객체 생성 및 저장
    const rental = createBookRental(title);
    rentals.push(rental);

    const bookList = document.getElementById('bookList');
    const li = document.createElement('li');
    li.className = 'book-item';
    li.innerHTML = `
        <span>${title} - ${price}원 (대여 가능)</span>
        <button onclick="removeBook(this)">삭제</button>
        <button onclick="toggleRental(this)">대여/반납</button>
    `;
    bookList.appendChild(li);

    titleInput.value = '';
    priceInput.value = '';
}

// 삭제 기능 구현
function removeBook(button) {
    // li 요소와 제목 추출
    const li = button.parentElement;
    const text = li.querySelector('span').textContent; 
    const title = text.split(' - ')[0]; // 제목 추출

    // 1. books 배열에서 해당 제목을 가진 도서의 인덱스 찾아 제거
    const bookIndex = books.findIndex(book => book.title === title);
    if (bookIndex !== -1) {
        books.splice(bookIndex, 1);
    }

    // 2. 도전과제: rentals 배열에서도 해당 도서의 대여 상태 제거
    const rentalIndex = rentals.findIndex(rental => rental.getStatus().title === title);
    if (rentalIndex !== -1) {
        rentals.splice(rentalIndex, 1);
    }

    // DOM에서 li 제거
    li.remove();
}

// 도서 데이터 처리 기능 구현
function processBooks() {
    // 1. map: 각 도서 제목에 "Book: " 접두사 추가
    const prefixedBooks = books.map(book => ({
        ...book,
        title: `Book: ${book.title}`
    }));

    // 2. filter: 가격이 10,000원 이상인 도서 필터링 (원본 데이터 기준)
    const highPriceBooks = prefixedBooks.filter(book => book.price >= 10000);

    // 3. reduce: 모든 도서 가격의 합계 계산
    const totalPrice = books.reduce((acc, cur) => acc + cur.price, 0);

    // 결과 표시
    const resultsDiv = document.getElementById('results');
    let html = '<h3>상위 가격 도서:</h3><ul>';
    if (prefixedBooks.length === 0) {
        html += '<li>도서가 없습니다.</li>';
    } else {
        prefixedBooks.forEach(book => {
            html += `<li>${book.title} - ${book.price}원</li>`;
        });
    }
    html += '</ul>';

    html += '<h3>고가 도서:</h3><ul>';
    if (highPriceBooks.length === 0) {
        html += '<li>고가 도서가 없습니다.</li>';
    } else {
        highPriceBooks.forEach(book => {
            html += `<li>${book.title} - ${book.price}원</li>`;
        });
    }
    html += '</ul>';

    html += `<h3>총 가격:</h3><p>${totalPrice}원</p>`;
    resultsDiv.innerHTML = html;
}

// 클로저로 대여 상태 관리
const createBookRental = (bookTitle) => {
    let isBorrowed = false;
    let borrowCount = 0;
    return {
        borrow: () => {
            if (isBorrowed) {
                alert(`${bookTitle}은 이미 대여 중입니다.`);
                return false;
            }
            isBorrowed = true;
            borrowCount++;
            return true;
        },
        returnBook: () => {
            isBorrowed = false;
        },
        getStatus: () => ({
            title: bookTitle,
            isBorrowed,
            borrowCount
        })
    };
};

// 대여/반납 토글
function toggleRental(button) {
    const li = button.parentElement;
    const text = li.querySelector('span').textContent;
    const title = text.split(' - ')[0];
    
    // rentals에서 title과 동일한 요소 찾기
    const rental = rentals.find(r => r.getStatus().title === title);
    if (!rental) return;

    const status = rental.getStatus();
    // books에서 title과 동일한 요소 찾기
    const book = books.find(b => b.title === title);
    if (status.isBorrowed) {
        rental.returnBook();
        li.querySelector('span').textContent = `${title} - ${book.price}원 (대여 가능)`;
    } else {
        if (rental.borrow()) {
            li.querySelector('span').textContent = `${title} - ${book.price}원 (대여 중)`;
        }
    }
}

// 모든 대여 상태 표시 (참고용)
function showAllRentalStatus() {
    const resultsDiv = document.getElementById('results');
    let html = '<h3>대여 상태:</h3><ul>';
    if (rentals.length === 0) {
        html += '<li>대여 정보가 없습니다.</li>';
    } else {
        rentals.forEach(rental => {
            const status = rental.getStatus();
            html += `<li>${status.title}: ${status.isBorrowed ? '대여 중' : '대여 가능'}, 대여 횟수: ${status.borrowCount}</li>`;
        });
    }
    html += '</ul>';
    resultsDiv.innerHTML = html;
}