export default function AdminDashboard() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8 md:py-16">
      <h1 className="text-2xl md:text-3xl font-bold text-brand-green mb-6 md:mb-8">
        Team Workspace
      </h1>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-6 md:mb-8">
        {[
          { label: 'New Leads', value: '5' },
          { label: 'Won', value: '2' },
          { label: 'Active Clients', value: '4' },
          { label: 'Follow‑ups Today', value: '3' },
        ].map(card => (
          <div
            key={card.label}
            className="bg-white/60 backdrop-blur-sm rounded-[1.5rem] md:rounded-[2rem] p-4 md:p-6 shadow-md border border-white/50 text-center"
          >
            <p className="text-xl md:text-2xl font-bold text-brand-green">{card.value}</p>
            <p className="text-xs md:text-sm text-gray-500 mt-1">{card.label}</p>
          </div>
        ))}
      </div>

      <div className="bg-white/60 backdrop-blur-sm rounded-[2rem] md:rounded-[3rem] p-4 md:p-6 shadow-xl border border-white/50">
        <h2 className="font-semibold text-lg md:text-xl text-brand-green mb-4">Recent Leads</h2>
        <div className="overflow-x-auto -mx-4 md:mx-0">
          <table className="w-full text-xs md:text-sm min-w-[500px]">
            <thead>
              <tr className="text-left text-gray-500 border-b border-white/40">
                <th className="pb-3 px-2 md:px-0">Name</th>
                <th className="pb-3 px-2 md:px-0">Email</th>
                <th className="pb-3 px-2 md:px-0">Status</th>
              </tr>
            </thead>
            <tbody>
              {[
                { name: 'Juan dela Cruz', email: 'juan@email.com', status: 'new' },
                { name: 'Maria Santos', email: 'maria@email.com', status: 'contacted' },
              ].map((lead, i) => (
                <tr key={i} className="border-t border-white/40">
                  <td className="py-3 px-2 md:px-0">{lead.name}</td>
                  <td className="py-3 px-2 md:px-0">{lead.email}</td>
                  <td className="py-3 px-2 md:px-0">
                    <span
                      className={`inline-block px-3 py-1 rounded-pill text-xs font-medium ${
                        lead.status === 'new'
                          ? 'bg-brand-accent/20 text-brand-accent'
                          : 'bg-brand-green/20 text-brand-green'
                      }`}
                    >
                      {lead.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}