import ContactContext, { Contact } from '../context/ContactContext'; // Import the context
import { useContext } from "react";
import ContactItem from './ContactItem';


export default function ContactList() {
    const { contacts, loading, error } = useContext(ContactContext);

    if (loading) {
        return <div>Loading...</div>; // Handle loading state
    }
    if (error) {
        return <div>Error: {error}</div>; // Handle error state
    }

    return (
        <>
            {
                contacts?.length === 0 ? (
                    <p className="bg-red-200 col-span-3 p-4 flex items-center justify-center rounded-2xl">
                        No contacts available
                    </p>
                ) : (
                    contacts
                        ?.slice() // Create a shallow copy to avoid mutating the original array
                        .sort((a: Contact, b: Contact) => a.name.localeCompare(b.name)) // Sort alphabetically (A-Z)
                        .map((contact: Contact) => (
                            <ContactItem key={contact.id} details={contact}></ContactItem>
                        ))
                )
            }
        </>
    )
}