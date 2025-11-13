export function StatCard({ title, children, hidden = false }) {
    if (hidden) return null;
    
    return (
        <div className="stats-card">
            <h3>{title}</h3>
            <div className="card">
                {children}
            </div>
        </div>
    );
}

export function StatBlock({ title, value }) {
    
    return (
        <div>
            <p className="general-card-titles">{title}</p>
            <p>{value}</p>
        </div>
    );
}