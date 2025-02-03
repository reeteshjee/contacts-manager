import { useEffect, useState } from 'react';
import './App.css';
import ContactList from './components/ContactList';
import Filter from './components/Filter';
import Header from './components/Header';
import ContactContext, { Contact, ContactContextType } from "./context/ContactContext";
import axios from "axios";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AddContact from './components/AddContact';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;



function App() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [originalContacts, setOriginalContacts] = useState<any[]>([]);  // All contacts (unfiltered)

  const [loading, setLoading] = useState(true);
  const [error] = useState<string | null>(null);



  const fetchContacts = () => {
    setLoading(true);
    axios
      .get(API_BASE_URL)
      .then((response) => {
        setContacts(response.data);
        setOriginalContacts(response.data);
      })
      .catch((error) => {
        console.log("Error fetching contacts: " + error);
        setLoading(false);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  useEffect(() => {
    fetchContacts();
  }, []);

  const value: ContactContextType = {
    'contacts': contacts,
    'originalContacts': originalContacts,
    'loading': loading,
    'error': error,
    'refresh': fetchContacts,
    'setContacts': setContacts,
    'setOriginalContacts': setContacts
  };

  return (
    <>
      <ContactContext.Provider value={value}>
        <Router>
          <Header></Header>
          <div className="max-w-7xl mx-auto px-6 py-8">
            <Routes>
              <Route path="/" element={
                <>
                  <Filter></Filter>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <ContactList></ContactList>
                  </div>
                </>
              }>
              </Route>
              <Route path="/add" element={
                <>
                  <AddContact></AddContact>
                </>
              }>
              </Route>
              <Route path="/edit/:id" element={
                <>
                  <AddContact></AddContact>
                </>
              }>
              </Route>

            </Routes>

          </div>
        </Router>
      </ContactContext.Provider>
    </>
  )
}

export default App
