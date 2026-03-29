export default function Card({ children, className = "", noPadding = false }) {
    return (
        <div className={`glass-card rounded-3xl ${noPadding ? '' : 'p-6 md:p-8'} ${className}`}>
            {children}
        </div>
    );
}
