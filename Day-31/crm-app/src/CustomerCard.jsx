const CustomerCard = ({ name, email, company, isActive }) => {
    const initials = name
        .split(' ')
        .map((part) => part[0])
        .join('')
        .toUpperCase()

    return (
        <div className="customer-card">
            <div className="customer-avatar">{initials}</div>

            <div className="customer-info">
                <h3 className="customer-name">{name}</h3>
                <p className="customer-email">{email}</p>
                <p className="customer-company">{company}</p>
            </div>

            <span className={`badge ${isActive ? 'badge-active' : 'badge-inactive'}`}>
                {isActive ? 'Active' : 'Inactive'}
            </span>
        </div>
    )
}

export default CustomerCard
