import { BiArchive} from "react-icons/bi";
import './App.css';
import Search from './components/search';
import Addappointment from './components/addappointment';
import Appointmentinfo from "./components/appointmentinfo";
import { useCallback,useState , useEffect } from "react";

// import { BsFillAwardFill } from "react-icons/bs";

function App() {
  let [Appointmentlist, setAppointmentList] = useState([]);
  let [query, setQuery] = useState('');
  let [sortBy, setSortBy] = useState("petName");
  let [orderBy, setOrderBy] = useState("asc");

  const filteredAppointment = Appointmentlist.filter(
    item => {
      return (
        item.petName.toLowerCase().includes(query.toLowerCase()) ||
        item.ownerName.toLowerCase().includes(query.toLowerCase()) ||
        item.aptNotes.toLowerCase().includes(query.toLowerCase())

      )
    }
  ).sort((a, b)=> {
    let order = (orderBy === "asc") ? 1 : -1;
    return (
      a[sortBy].toLowerCase() < b[sortBy].toLowerCase() ? -1 * order
      : 1 * order
    )
  })

  const fetchData = useCallback(() => {
    fetch('./data.json')
      .then(response => response.json())
      .then(data => {
        setAppointmentList(data)
      });
  }, [])

  useEffect(() => {
      fetchData()

  },[fetchData]);

  return (
    <div className="App container mx-auto mt-3 font-thin">
      <h1 className="text-4xl">
        <BiArchive className="inline-block text-red-400 align top"/>Appointment</h1>
      <Addappointment />
      <Search query={query} onQueryChange={myQuery => setQuery(myQuery)}
        orderBy= {orderBy}
      />

      <ul className="divide-y divide-gray-200">
        {filteredAppointment
          .map(appointment => (
            <Appointmentinfo key={appointment.id} appointment={appointment}
              onDeleteAppointment={
                appointmentid => setAppointmentList(Appointmentlist.filter(appointment => appointment.id !== appointmentid))
              }/>
          ))}
        </ul>

    </div>
  );
}

export default App;
