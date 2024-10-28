import { db } from "../firebase";
import { collection, doc, setDoc, getDoc } from "firebase/firestore";

const workData = [
  {
    id: 1,
    name: "하수현",
    works: [
      { id: "w1", work: "메인페이지 전체흐름담당" },
      { id: "w2", work: "날씨api사용: 상단에표시" },
      { id: "w3", work: "모임개설페이지: 카카오지도연결" },
      { id: "w4", work: "모임목록필터링" },
    ],
  },
  {
    id: 2,
    name: "박소현",
    works: [
      { id: "w1", work: "모임등록페이지: 카카오지도연결" },
      { id: "w2", work: "메인페이지지도: 사용자와 가까운 모임보여주기" },
    ],
  },
  {
    id: 3,
    name: "신아령",
    works: [
      { id: "w1", work: "유저프로필페이지" },
      { id: "w2", work: "달력: 런닝도장구현예정" },
      { id: "w3", work: "이벤트등록: 관리자와 연결" },
      { id: "w4", work: "결제" },
    ],
  },
  {
    id: 4,
    name: "이현정",
    works: [{ id: "w1", work: "관리자페이지: 도표, 차트 등 사용예정" }],
  },
];

// 작업데이터 등록
const addWorkDataToFirestore = async () => {
  const workCollection = collection(db, "works");

  try {
    for (const worker of workData) {
      const workerDocRef = doc(workCollection, worker.id.toString());
      const docSnapshot = await getDoc(workerDocRef);

      if (!docSnapshot.exists()) {
        await setDoc(workerDocRef, {
          name: worker.name,
          works: worker.works,
        });
        console.log(`작업자 ${worker.name}의 데이터가 추가되었습니다.`);
      } else {
        console.log(`모든 작업자의 데이터가 이미 존재합니다.`);
      }
    }
    console.log("모든 작업자 데이터 등록성공");
  } catch (e) {
    console.error("작업자 데이터 등록실패: ", e.message);
  }
};

addWorkDataToFirestore();
