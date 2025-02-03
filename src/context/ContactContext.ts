
    import { createContext } from "react";

    export type Contact = {
        id: string;
        name: string;
        email: string;
        phone: string;
        bookmarked: boolean;
    }

    export type ContactContextType = {
        contacts: Contact[];
        originalContacts: Contact[];
        loading: boolean;
        error: string | null;
        refresh: () => void;
        setContacts: (contacts: Contact[]) => void;
        setOriginalContacts: (contacts: Contact[]) => void;

    }

    const ContactContext = createContext<ContactContextType>({
        contacts: [],
        originalContacts: [],
        loading: false,
        error: null,
        refresh: () => { },
        setContacts: () => { },
        setOriginalContacts: () => { },
    });


    export default ContactContext;