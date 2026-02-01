import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

const Posts = ({ nfts }) => {

  return (
    <section className="bg-gray-900 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-3xl font-bold text-white mb-2 uppercase tracking-tighter">
              Tus NFTs Minteados
            </h2>
            <p className="text-gray-400">Explora tus activos digitales creados en la red.</p>
          </div>
          <Link to="/inprogress" className="hidden sm:block text-blue-400 hover:text-blue-300 font-medium transition">
            Ver colección completa →
          </Link>
        </div>

        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          
          {nfts && nfts.map((nft, i) => (
            <div 
              key={i} 
              className="bg-gray-800/50 border border-gray-700 rounded-2xl overflow-hidden hover:border-blue-500/50 transition-all duration-300 group shadow-xl"
            >
              
              <div className="relative aspect-square overflow-hidden bg-black/20">
                <img 
                  src={nft} 
                  alt={`NFT index ${i}`} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute top-3 right-3 bg-blue-600/90 backdrop-blur-sm px-3 py-1 rounded-full text-[10px] font-bold text-white uppercase tracking-widest">
                  # {i + 1}
                </div>
              </div>

              
              <div className="p-5">
                <h3 className="text-sm font-mono text-blue-400 mb-4 truncate">
                    {nft}
                </h3>
                
                <div className="flex justify-between items-center mb-4">
                  <span className="text-xs text-gray-500 uppercase font-bold">Status</span>
                  <span className="text-xs font-semibold text-green-400 bg-green-400/10 px-2 py-1 rounded">Verificado</span>
                </div>
                
                <a 
                    href={nft} 
                    target="_blank" 
                    rel="noreferrer"
                    className="block w-full text-center bg-gray-700 hover:bg-blue-600 text-white text-sm font-bold py-3 rounded-xl transition duration-300"
                >
                  Ver Metadatos
                </a>
              </div>
            </div>
          ))}
        </div>

        
        {nfts.length === 0 && (
            <div className="text-center py-20 border-2 border-dashed border-gray-800 rounded-3xl">
                <p className="text-gray-500 italic">Aún no has minteado ningún NFT en esta colección.</p>
            </div>
        )}

      </div>
    </section>
  );
};

const mapStateToProps = state => ({
  nfts: state.ethereum.nfts
});

export default connect(mapStateToProps, {})(Posts);