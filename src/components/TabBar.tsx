import { Nav } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'
export function TabBar() {
  return <Nav as="nav" className="bottom-nav" aria-label="Основная навигация">
    <Nav.Link as={NavLink} to="/feed" className="nav-item"><svg aria-hidden="true" viewBox="0 0 24 24"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg>Лента</Nav.Link>
    <Nav.Link disabled className="nav-item" title="Демонстрационная форма доступна по адресу /add"><svg aria-hidden="true" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M12 8v8M8 12h8"/></svg>Добавить</Nav.Link>
    <Nav.Link as={NavLink} to="/gases" className="nav-item"><svg aria-hidden="true" viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>Газы</Nav.Link>
    <Nav.Link disabled className="nav-item"><svg aria-hidden="true" viewBox="0 0 24 24"><circle cx="12" cy="8" r="4"/><path d="M4 21v-2a8 8 0 0 1 16 0v2"/></svg>Вход</Nav.Link>
  </Nav>
}
