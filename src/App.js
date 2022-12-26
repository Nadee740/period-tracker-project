
import './App.css';
import { useEffect, useState } from 'react';
import { Calendar } from 'react-calendar';
//import '../node_modules/react-calendar/dist/Calendar.css';
function App() {
    const [date, setDate] = useState(new Date());
    const [dateselected, setdateselected] = useState(false);
    const [prds, setprds] = useState([]);
    const [onprds, setonprds] = useState(false)
    const [mark,setmark]=useState()
    
    function getDatesInRange(startDate, endDate) {
  const date = new Date(startDate.getTime());

  const dates = [];

  while (date <= endDate) {
    dates.push(new Date(date).toDateString().toString());
    date.setDate(date.getDate() + 1);
  }

  return dates;
}
    useEffect(() => {
       //localStorage.clear();
        let datearray=[]
        var arr = localStorage.getItem('prdsdates');
        if (arr != null) {
            let a = JSON.parse(arr);
            let b;
            a.map((elm,index)=>{
                if(index==a.length-1 && a[a.length-1].end==null)
                {
                    b=getDatesInRange(new Date(elm.start),new Date())
                }
               else{
                 b=getDatesInRange(new Date(elm.start),new Date(elm.end))
               }
              
                b.map((i)=>{
                    datearray.push(i)
                })
            })
            console.log(datearray)
            setmark(datearray)
            if (a[a.length - 1].end == null)
                setonprds(true)
            setprds(a);
        }

    }, [])
    return (
        <div className='app'>
            <h1 className='text-center'>React Calendar</h1>
            <div className='calendar-container'>
                <Calendar
                tileClassName={({ date, view }) => {
            if(mark!=null){
                if(mark.includes(date.toDateString().toString())){
       return  'highlight'
      }
            }
     
    }
    }
                    onClickDay={
                        (e) => {
                            let arr = prds

                            console.log(arr)
                            setdateselected(true)
                        }
                    } onChange={setDate} value={date} selectRange={false} showDoubleView={false} />
            </div>
            {date.length > 0 ? (
                <p className='text-center'>
                    <span className='bold'>Start:</span>{' '}
                    {date[0].toDateString()}
                    &nbsp;|&nbsp;
                    <span className='bold'>End:</span> {date[0].toDateString()}
                </p>
            ) : (
                <p className='text-center'>
                    <span className='bold'>Default selected date:</span>{' '}
                    {date.toDateString()}
                </p>
            )}
            {dateselected ? (<div className='col'><button> Add Task</button>{!onprds ? (<button onClick={() => {
                let arr
                if (prds != null)
                    arr = prds
                arr.push({ "start": date.toDateString(), "end": null })
                console.log(arr);
                setprds(arr);
                setonprds(true)
                localStorage.setItem('prdsdates', JSON.stringify(arr))
                window.location.reload()
            }}> Mark periods</button>) : (<button onClick={() => {
                if (prds != null) {

                    let b = prds
                    b[b.length - 1].end = date.toDateString();
                    setprds(b);
                    setonprds(false)
                    localStorage.setItem('prdsdates', JSON.stringify(b))
                   window.location.reload()
                }
            }}> End periods</button>)}</div>) : ""}
        </div>
    );
}

export default App;
