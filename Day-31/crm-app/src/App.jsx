
import { useState } from "react";
import CustomerList from "./CustomerList"
import SearchBar from "./SearchBar";

// Mediator
function App() {

  const [searchTerm, setSearchTerm] = useState("");

  const [customers, setCustomers] = useState(
    [
      { id: 1, name: 'Jane Doe', email: 'jane.doe@acme.com', company: 'Acme Corp', isActive: true },
      { id: 2, name: 'Bob Wilson', email: 'bob@globex.com', company: 'Globex Inc', isActive: true },
      { id: 3, name: 'Sara Chen', email: 's.chen@initech.com', company: 'Initech', isActive: false },
      { id: 4, name: 'Mike Ross', email: 'mike@piedpiper.com', company: 'Pied Piper', isActive: true },
      { id: 5, name: 'Anna Bell', email: 'anna@hooli.com', company: 'Hooli', isActive: true },
    ]
  );

  // won't work
  // customers[1].isActive = false;

  // invoke set customers
  const toggleIsActive = ((id) => {
    debugger;
    setCustomers(customers.map((customer) =>
      customer.id === id
        ? { ...customer, isActive: !customer.isActive }
        : customer
    ))
  });

  const filteredCustomers = customers.filter((customer) => customer.name.toLowerCase().includes(searchTerm.toLowerCase()))

  return (
    <div className="app">
      <header className="app-header">
        <h1>Customers</h1>
      </header>
      <main className="app-main">
        <SearchBar onSearchChange={setSearchTerm} />
        <CustomerList customers={filteredCustomers} toggleIsActive={toggleIsActive} />
      </main>
    </div>
  )
}

export default App
