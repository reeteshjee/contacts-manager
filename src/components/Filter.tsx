import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ContactContext, { Contact } from '../context/ContactContext';


export default function Filter() {
    const navigate = useNavigate();
    const { contacts, setContacts, originalContacts } = useContext(ContactContext);

    const [filter, setFilter] = useState('all');

    const handleLetterClick = (letter: string) => {
        if (letter == 'all') {
            setContacts(originalContacts);
            setFilter('all');
        } else {
            const filteredContacts = letter ? originalContacts.filter((contact: Contact) => contact.name.toUpperCase().startsWith(letter))
                : contacts;
            setFilter(letter);
            setContacts(filteredContacts);
        }
    }

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const keyword = e.target.value;
        const filteredContacts = originalContacts.filter((contact: Contact) =>
            contact.name.toLowerCase().includes(keyword.toLowerCase())
        );
        setContacts(filteredContacts);
    }

    const handleBookmarked = () => {
        setFilter('bookmark');
        const filteredContacts = originalContacts.filter((contact: Contact) => contact.bookmarked);
        setContacts(filteredContacts);
    }



    return (
        <>
            <div className="bg-white rounded-2xl shadow-md p-6 mb-8">
                <div className="flex flex-col md:flex-row md:items-center gap-4">

                    <div className="flex-1">
                        <div className="relative">
                            <input onChange={handleSearchChange} type="text" placeholder="Search contacts..."
                                className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-gray-100 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all duration-200" />
                            <i className="w-6 h-6 text-gray-400 absolute left-4 top-5 fas fa-search"></i>

                        </div>
                    </div>

                    <button onClick={() => navigate('/add')} className="cursor-pointer bg-purple-600 text-white px-8 py-3 rounded-xl font-semibold shadow-md hover:bg-purple-700 transition-colors duration-200">
                        + Add Contact
                    </button>
                </div>

                <div className="mt-6 flex flex-wrap gap-2">
                    <span
                        onClick={() => handleLetterClick('all')}
                        className={`${filter == 'all' ? 'bg-purple-500 text-white' : 'bg-gray-100 text-gray-600'} px-4 py-2 rounded-lg font-medium cursor-pointer`}>
                        All
                    </span>
                    <span
                        onClick={() => handleBookmarked()}
                        className={`${filter == 'bookmark' ? 'bg-purple-500 text-white' : 'bg-gray-100 text-gray-600'} px-4 py-2 rounded-lg font-medium cursor-pointer`}>
                        Bookmarked
                    </span>
                    {Array.from('ABCDEFGHIJKLMNOPQRSTUVWXYZ').map((letter) => (
                        <span
                            onClick={() => handleLetterClick(letter)}
                            key={letter}
                            className={`${filter == letter ? 'bg-purple-500 text-white' : 'bg-gray-100 text-gray-600'} px-4 py-2 rounded-lg font-medium cursor-pointer`}>
                            {letter}
                        </span>
                    ))}
                </div>
            </div >
        </>
    )
}