const Person = ({ person, deleteperson }) => {
    return (
    <li>
        {person.name} {person.number}
        <button onClick={deleteperson} id={person.number} >Delete</button>
    </li>
  )}

const Persons = ({personsToShow, deleteperson}) => (
<>
    <h2>Numbers</h2>
        
    <ul>
    {personsToShow.map(person => 
        <Person key={person.id} person={person} deleteperson={deleteperson(person.id, person.name)} />
    )}
    </ul>
</>
)
export default Persons