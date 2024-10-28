import { db } from "../firebase";
import { collection, doc, setDoc, getDoc } from "firebase/firestore";

const meetingData = [
  { id: 1, date: "10/23", text: "오후1시 FE회의" },
  { id: 2, date: "10/23", text: "오후2시 전체회의" },
  { id: 3, date: "10/23", text: "오후8시30분 FE중간피드백" },
  { id: 4, date: "10/14", text: "오전11시 첫 회의" },
];

const memoData = [
  {
    id: 1,
    title: "작업 규칙",
    script: [
      "1. 폴더는 캐멀 케이스로, 파일은 파스칼 케이스로 작성합니다.",
      "예) 폴더명: loginForm, 파일명: LoginForm.jsx",
      "2. JS 파일은 명사형으로 소문자로 작성합니다.",
      "예) api.js, cookie.js",
    ],
  },
  {
    id: 2,
    title: "프리티어오류수정",
    script: ["프리티어 설정 확인하고 작업하시기 바랍니다.", "Print Width : 80"],
  },
  {
    id: 3,
    title: "10/23 중간피드백 정리",
    script: [
      "1. tanstack-query 사용 계획 axios 의 대체제",
      "2. redux 를 사용한 이유",
      "- toolkit이나 recoil 사용은 왜 안 했는지",
      "3. styles 를 별도로 분리한 이유?",
      "장점 : 가독성",
      "단점 : 스타일을 고치기 위해 찾아가야 할 코드가 길다",
      "4. 다크모드 구현 Good 대기질에 따라 theme 바꾼 아이디어 Good",
      "5. AdminSider에 주석 처리가 너무 많다.",
      "6. eslint, prettier 설정 파일이 있는 건 최초고 좋은데 잘 동작하는지?",
      "7. 맵핑을 잘 사용해라. 비슷한 코드를 너무 하드코딩하고 있음. 반복된 코드는 맵핑을 사용해라.",
      "8. button 컴포넌트화 했을 때 BlueBtn 좋긴 한데 button 하나로 관리하는 것이 유지보수에 좋음.",
      "9. 맵 사용 시 key 값에 index를 넣으면 안 되는 이유 찾아보기.",
      "10. 왜 stopPropagation()을 따로 분리해서 사용했는지?",
      "11. 좋은 코드를 많이 보면 컴포넌트 구현력 급상승.",
      "- GPT와 대화",
      "- 시중의 디자인 시스템을 열심히 본다.",
    ],
  },
];

// 회의 데이터 등록
const addMeetingsToFirestore = async () => {
  const meetingCollection = collection(db, "meetings");

  try {
    for (const meeting of meetingData) {
      const meetingDocRef = doc(meetingCollection, meeting.id.toString());
      const docSnapshot = await getDoc(meetingDocRef);

      if (!docSnapshot.exists()) {
        await setDoc(meetingDocRef, {
          date: meeting.date,
          text: meeting.text,
        });
      } else {
        console.log("meetings 데이터가 이미 존재합니다.");
      }
    }
    console.log("meetings 데이터 등록성공");
  } catch (e) {
    console.log("meetings 데이터 등록실패: ", e.message);
  }
};
addMeetingsToFirestore();

// 공지 데이터 등록
const addMemosToFirestore = async () => {
  const memosCollection = collection(db, "memos");

  try {
    for (const memo of memoData) {
      const memoDocRef = doc(memosCollection, memo.id.toString());
      const docSnapshot = await getDoc(memoDocRef);

      if (!docSnapshot.exists()) {
        await setDoc(memoDocRef, {
          title: memo.title,
          script: memo.script,
        });
      } else {
        console.log("memos 데이터가 이미 존재합니다.");
      }
    }
    console.log("memos 데이터 등록성공");
  } catch (e) {
    console.error("memos 데이터 등록실패: ", e.message);
  }
};
addMemosToFirestore();
