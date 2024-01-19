import { Link } from "@inertiajs/react";



const Sidebar = () => {
    const currentPath = window.location.pathname;

    return (
        <main>
            <header>
                <div className="main-sidebar sidebar-style-2">
                    <aside id="sidebar-wrapper">
                        <div className="sidebar-brand">
                            <a href="index.html"> <img alt="image" src="assets/img/logo.png" className="header-logo" /> <span
                                className="logo-name">Otika</span>
                            </a>
                        </div>
                        <ul className="sidebar-menu ">
                            <li className="menu-header">Main</li>
                            <li className={`dropdown ${currentPath === '/' ? 'active' : ''}`}>
                                <Link href='/'>
                                    <i data-feather="monitor"></i><span>Dashboard</span>
                                </Link>

                            </li>
                            <li className={`dropdown ${currentPath === '/votes' ? 'active' : ''}`}>
                                <Link href='/votes'>
                                    <i data-feather="monitor"></i><span>Votes</span>
                                </Link>

                            </li>
                            <li className={`dropdown ${currentPath === '/operator' ? 'active' : ''}`}>
                                <Link href='/operator'>
                                    <i data-feather="monitor"></i><span>Operator</span>
                                </Link>

                            </li>
                        </ul>
                    </aside>
                </div>
            </header>
        </main>
    )

}
export default Sidebar;
