import { UserType } from '@/pwa/types/userType';
import { router, usePage } from '@inertiajs/react';
import { ChevronRight, LayoutDashboard, LogOut, User } from 'lucide-react';
import { useEffect, useRef, useState } from 'react'; // 1. Import hooks

const AppLogo = ({ className, onClick }: { className?: string; onClick?: () => void }) => {
    const { app_logo } = usePage().props;
    return <img src={`/storage/${app_logo}`} alt="App Logo" className={`${className}`} onClick={onClick} />;
};

const AppBarHome = ({ user }: { user: UserType }) => {
    const { url } = usePage();
    const [isScrolled, setIsScrolled] = useState(false);

    const [showProfilePopup, setShowProfilePopup] = useState(false);
    const popupRef = useRef<HTMLDivElement>(null);

    const age = Math.floor((Date.now() - new Date(user.birth_date).getTime()) / (1000 * 60 * 60 * 24 * 365));

    const handleLogout = () => {
        router.post(route('logout'));
    };

    const handleProfileClick = () => setShowProfilePopup((v) => !v);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 10) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    // Close popup if click outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
                setShowProfilePopup(false);
            }
        }
        if (showProfilePopup) {
            document.addEventListener('mousedown', handleClickOutside);
        }
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [showProfilePopup]);

    if (url.includes('/home')) {
        return (
            <div className="sticky top-0 z-50 flex flex-row items-center justify-between bg-white py-2 pr-3 pl-4 shadow-lg">
                <div onClick={handleProfileClick} className="relative flex cursor-pointer items-center space-x-2 bg-white">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-teal-400 to-teal-600">
                        {user.avatar ? (
                            <img src={`/storage/${user.avatar}`} alt="" className="flex h-12 w-12 items-center justify-center rounded-full" />
                        ) : (
                            <span className="text-xl font-bold text-white">{user.name.charAt(0).toUpperCase()}</span>
                        )}
                    </div>
                    <div>
                        <h1 className="text-md font-bold text-gray-800">{user.name}</h1>
                        <p className="text-xs text-gray-500">
                            {user.gender === 'male' ? 'Laki-laki' : user.gender === 'female' ? 'Perempuan' : 'Pengguna'}, {age} tahun
                        </p>
                    </div>
                    {/* Popup */}
                    {showProfilePopup && (
                        <div ref={popupRef} className="absolute top-14 left-0 z-50 w-56 rounded-xl border border-gray-100 bg-white py-3 shadow-xl">
                            {user.role === 'admin' && (
                                <button
                                    className="flex w-full items-center px-4 py-2 text-gray-700 hover:bg-gray-50"
                                    onClick={() => (window.location.href = '/admin')}
                                >
                                    <LayoutDashboard className="mr-2 h-5 w-5" />
                                    <span>Dashboard Admin</span>
                                    <ChevronRight className="ml-auto h-4 w-4 text-gray-400" />
                                </button>
                            )}
                            <button
                                className="flex w-full items-center px-4 py-2 text-gray-700 hover:bg-gray-50"
                                onClick={() => router.get(route('profile'))}
                            >
                                <User className="mr-2 h-5 w-5" />
                                <span>Profile</span>
                                <ChevronRight className="ml-auto h-4 w-4 text-gray-400" />
                            </button>
                            <button className="flex w-full items-center px-4 py-2 text-gray-700 hover:bg-gray-50" onClick={handleLogout}>
                                <LogOut className="mr-2 h-5 w-5" />
                                <span>Logout</span>
                            </button>
                        </div>
                    )}
                </div>
                <AppLogo onClick={() => router.get(route('home'))} className="h-7 w-auto" />
            </div>
        );
    }
    return (
        <div className="sticky top-0 z-50 flex flex-row items-center justify-between bg-white py-2 pr-3 pl-4 shadow-lg">
            <AppLogo onClick={() => router.get(route('home'))} className="h-9 w-auto" />

            <div onClick={() => router.get(route('profile'))} className="flex items-center space-x-2 bg-white">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-teal-400 to-teal-600">
                    {user.avatar ? (
                        <img src={`/storage/${user.avatar}`} alt="" className="flex h-10 w-10 items-center justify-center rounded-full" />
                    ) : (
                        <span className="text-xl font-bold text-white">{user.name.charAt(0).toUpperCase()}</span>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AppBarHome;
