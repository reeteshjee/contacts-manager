import { useState, useContext, useEffect } from "react";
import { NavLink, useParams } from "react-router-dom";
import axios from "axios";
import ContactContext from '../context/ContactContext';
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;


const AddContact = () => {
    const { id } = useParams();

    const { contacts, refresh } = useContext(ContactContext);
    console.log(contacts);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        bookmarked: false
    });

    useEffect(() => {
        if (id) {
            axios
                .get(`${API_BASE_URL}/${id}`)
                .then((response) => {
                    const contact = response.data;
                    setFormData({
                        name: contact.name,
                        email: contact.email,
                        phone: contact.phone,
                        bookmarked: contact.bookmarked
                    });
                })

        }
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, type, checked, value } = e.target;

        setFormData(prevState => ({
            ...prevState,
            [name]: type === "checkbox" ? checked : value
        }));
    };




    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            if (id) {
                // Update existing contact
                await axios.patch(`${API_BASE_URL}/${id}`, formData);
            } else {
                // Add new contact
                await axios.post(API_BASE_URL, formData);
            }
            // Clear form
            setFormData({
                name: "",
                email: "",
                phone: "",
                bookmarked: false
            });
            refresh();
        } catch (error) {
            console.error("Error adding contact:", error);
        }
    };

    return (

        <div className="w-140 mx-auto bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-200">
            <form onSubmit={handleSubmit} className="p-6">
                <div className="mb-5">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter full name"
                    />
                </div >


                <div className="mb-5">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter email"
                    />
                </div >


                <div className="mb-5">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                    <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter phone"
                    />
                </div >

                <div className="mb-5 flex items-center">
                    <input
                        type="checkbox"
                        id="bookmark"
                        name="bookmarked"
                        checked={formData.bookmarked}
                        onChange={handleChange}
                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 cursor-pointer"
                    />
                    <label htmlFor="bookmark" className="ms-3 text-sm font-medium text-gray-700 cursor-pointer">
                        Add to bookmarks
                    </label>
                </div >




                <div className="md:col-span-2 flex justify-between space-x-4 pt-4 border-t border-gray-200" >
                    <NavLink
                        to="/"
                        className="cursor-pointer px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 focus:ring-2 focus:ring-gray-400"
                    >
                        Back
                    </NavLink>
                    <button
                        type="submit"
                        className="cursor-pointer bg-purple-600 text-white px-8 py-3 rounded-xl font-semibold shadow-md hover:bg-purple-700 transition-colors duration-200"
                    >
                        Save Contact
                    </button>
                </div >
            </form >
        </div>
    );
};

export default AddContact;
