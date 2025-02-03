import { useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import ContactContext, { Contact } from '../context/ContactContext';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;


export default function ContactItem({ details }: { details: Contact }) {
    const { contacts, setContacts } = useContext(ContactContext);

    const getInitials = (fullname: string) => {
        const slices = fullname.split(' ');
        let initials = '';
        slices.map((slice: string) => {
            initials += slice.charAt(0);
        });
        return initials;
    }

    const handleDelete = async (contactId: string) => {
        const confirmation = confirm('Are you sure you want to delete this contact?');
        if (confirmation) {
            try {
                await axios.delete(`${API_BASE_URL}/${contactId}`);
                setContacts(contacts.filter(c => c.id !== contactId));
            } catch (error) {
                console.error("Error deleting contact:", error);
            }
        }
    };

    const toggleBookmark = async (contact: Contact, bookmarked: boolean) => {
        try {
            const contactData = {
                ...contact,
                'bookmarked': bookmarked
            }
            await axios.patch(`${API_BASE_URL}/${contact.id}`, contactData);
            setContacts(contacts.map(c => c.id === contact.id ? { ...c, bookmarked } : c));
        } catch (error) {
            console.error("Error toggling bookmark:", error);
        }
    };
    return (
        <>
            <div className={`${details.bookmarked ? 'bg-yellow-50' : 'bg-white'} rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-200`}>
                <div className="p-6">
                    <div className="flex items-center gap-4">
                        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center shadow-md">
                            <span className="text-xl font-bold text-white">
                                {getInitials(details.name)}
                            </span>
                        </div>
                        <div className="flex-1 min-w-0">
                            <h3 className="text-lg font-semibold text-gray-800 mb-1">
                                {details.name}
                            </h3>
                            <p className="text-gray-600 text-sm mb-2 truncate">
                                {details.email}
                            </p>
                            <p className="text-gray-600 text-sm">
                                {details.phone}
                            </p>
                        </div>
                        <button onClick={() => toggleBookmark(details, !details.bookmarked)} title="bookmark" className={`${details.bookmarked ? 'text-yellow-500' : 'text-gray-300'} cursor-pointer`}>
                            <i className="fas fa-bookmark"></i>
                        </button>
                    </div>
                    <div className="mt-4 pt-4 border-t border-gray-100 flex justify-end gap-2">
                        <Link to={`/edit/${details.id}`} title="edit" className="cursor-pointer p-2 text-gray-400 hover:text-blue-500">
                            <button title="edit" className="cursor-pointer p-2 text-gray-400 hover:text-blue-500">
                                <i className="fas fa-edit"></i>
                            </button>
                        </Link>
                        <button onClick={() => handleDelete(details.id)} title="delete" className="cursor-pointer p-2 text-gray-400 hover:text-red-500">
                            <i className="fas fa-trash-alt"></i>
                        </button>
                    </div>
                </div>
            </div >
        </>
    )
}