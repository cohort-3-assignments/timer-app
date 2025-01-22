

export default function TimerRing({timeleft, totalTime}){

    // showing a ring that decreases as time goes on from 360 to 0

    const radius = 200;

    const circumference = 2 * Math.PI * radius;

    if(totalTime==0){
        totalTime = 1;
    }
    const offset = circumference - (timeleft / totalTime) * circumference;

    // completed time
    const offset2 = -(circumference - offset);

    return (
        <div>
            <svg  class="timer-ring">
                <circle cx="250" cy="250" r={radius}></circle>
                <circle cx="250" cy="250" r={radius} style={{strokeDashoffset: offset, strokeDasharray: circumference }}></circle>
                <circle id="circle2" cx="250" cy="250" r={radius} style={{strokeDashoffset: offset2, strokeDasharray: circumference }}></circle>
            </svg>
        </div>
    )

}