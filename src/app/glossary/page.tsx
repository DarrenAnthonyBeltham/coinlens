const glossaryTerms = [
  {
    term: "Blockchain",
    definition: "A distributed digital ledger that stores data of any kind. A blockchain can record information about cryptocurrency transactions, NFT ownership, or DeFi smart contracts.",
  },
  {
    term: "Market Cap",
    definition: "In cryptocurrency, market capitalization is the total value of a cryptocurrency. It's calculated by multiplying the current market price of a particular coin by the total number of coins in circulation.",
  },
  {
    term: "DeFi (Decentralized Finance)",
    definition: "An umbrella term for financial services on public blockchains, primarily Ethereum. DeFi allows users to do things like earn interest, borrow, lend, buy insurance, and trade assets without relying on traditional financial intermediaries.",
  },
  {
    term: "NFT (Non-Fungible Token)",
    definition: "A unique digital identifier that cannot be copied, substituted, or subdivided, that is recorded in a blockchain, and that is used to certify authenticity and ownership of a specific digital asset.",
  },
  {
    term: "Gas Fees",
    definition: "Fees paid by users to compensate for the computing energy required to process and validate transactions on a blockchain, such as Ethereum.",
  },
  {
    term: "ATH (All-Time High)",
    definition: "The highest price a cryptocurrency has ever reached in its history.",
  },
];

export default function GlossaryPage() {
  return (
    <main className="min-h-screen text-white p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 pb-2 mb-8">
          Glossary
        </h1>
        <div className="space-y-8">
          {glossaryTerms.map((item) => (
            <div key={item.term} className="bg-slate-900/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6">
              <h2 className="text-2xl font-semibold text-white mb-2">{item.term}</h2>
              <p className="text-slate-300 leading-relaxed">{item.definition}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}