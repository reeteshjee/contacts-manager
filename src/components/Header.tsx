const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;


export default function Header() {
    return (
        <>
            <header className="bg-gradient-to-r from-purple-600 to-blue-500 shadow-lg">
                <div className="max-w-7xl mx-auto px-6 py-8">
                    <div className="flex justify-between items-center">
                        <div>
                            <h1 className="text-4xl font-bold text-white mb-2">Contacts Manager</h1>
                            <p className="text-purple-100">Manage your contacts efficiently</p>
                        </div>
                        <a rel="noopener" href={`${API_BASE_URL}/export`} target="_blank" className="cursor-pointer bg-white text-purple-600 px-6 py-3 rounded-full font-semibold shadow-md hover:shadow-lg transition-shadow duration-200">
                            <i className="fa fa-download me-3 "></i>
                            Export Contacts
                        </a>
                    </div>
                </div>
            </header>
        </>
    )
}