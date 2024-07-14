import { useState, useEffect } from 'react';
import $common from '../../../common'
export default function Calendar(activeMenu) {

    // [
    //     {
    //         date: "20240201" //(string)
    //         , year: 2024 //(int)
    //         , month: 2 //(int)
    //         , day: 1 //(int)
    //         , title: "스터디" // (string)
    //         , notes: "친구와 함께 투썸플레이스에서 공부를 했다." // (string)
    //         , picture: [
    //             {
    //                 url: "https://domain/picture/{id}"
    //                 , detail: "스터디 1일차 사진" // (string)
    //             }
                
    //         ]
    //         , mood: 30 //(int) % 
    //     }
    //     ,{
    //         date: "20240202" //(string)
    //         , year: 2024 //(int)
    //         , month: 2 //(int)
    //         , day: 2 //(int)
    //         , title: "스터디" // (string)
    //         , notes: "친구와 함께 투썸플레이스에서 공부를 했다." // (string)
    //         , picture: [
    //             {
    //                 url: "https://domain/picture/{id}"
    //                 , detail: "스터디 1일차 사진" // (string)
    //             }
                
    //         ]
    //         , mood: 30 //(int) % 
    //     }
    // ]

    
    const [dailybox, setDailybox] = useState([]);
    const [modalData, setModalData] = useState([]);
    const [modalIsOpen, setModalIsOpen] = useState(false);

    const clickbox = (dailyEntry) => {
        console.log("Daily", dailyEntry);
        setModalData(dailyEntry);
        setModalIsOpen(true);
    }

    const modalOnOff = (flag) => {
        setModalIsOpen(flag);
    }

    useEffect(() => {
        async function fetchData() {
            const dailyEntryList = await $common.getCalendar();
            if (!dailyEntryList)
                return ;
            setDailybox(dailyEntryList);
        }; 
        fetchData(); 
    }, []);

    return (
        <div className="calendar">
            {/* ===================================== 달력 ===================================== */}
            <div className="calendar-header">
                <a href='#'><i class="fa-solid fa-caret-left"></i></a>
                {/* <a href='#'><i class="fa-regular fa-square-caret-left"></i></a> */}
                <a href='#'>7월</a>
                <a href='#'><i class="fa-solid fa-caret-right"></i></a>
                {/* <a href='#'><i class="fa-solid fa-square-caret-right"></i></a> */}
            </div>
            <div className="calendar-content">
                <div>일</div>
                <div>월</div>
                <div>화</div>
                <div>수</div>
                <div>목</div>
                <div>금</div>
                <div>토</div>
                {dailybox.map(e => (
                    <div className="daily" onClick={clickbox}>
                        {e.date} <br/>
                        {e.title} <br/>
                        {e.notes} <br/>
                    </div>
                ))}
            </div>

            {/* =============================== 선택 날짜 상세보기 =============================== */}
            {modalIsOpen && (
                <div className="modal-overlay">
                <div className="modal-content">
                    <h2>Add Your Mood</h2>
                    <div>
                    <label>
                        Mood:
                        <select value={modalData.mood}>
                        <option value="">Select your mood</option>
                        <option value="happy">Happy</option>
                        <option value="sad">Sad</option>
                        <option value="neutral">Neutral</option>
                        <option value="anxious">Anxious</option>
                        <option value="excited">Excited</option>
                        </select>
                    </label>
                    </div>
                    <div>
                    <label>
                        Note:
                        <textarea value={modalData.notes} />
                    </label>
                    </div>
                    <button onClick={()=>modalOnOff(false)}>Save</button>
                    <button onClick={()=>modalOnOff(false)}>Cancel</button>
                </div>
                </div>
            )}
        </div>
    )
}