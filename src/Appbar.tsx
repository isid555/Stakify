import { useAccount, useConnect, useDisconnect } from 'wagmi'

export function Appbar() {
    const { address } = useAccount()



    return <div className='flex justify-between p-2 m-2'>
        <div className="text-4xl font-extrabold text-transparent bg-clip-text
                bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500
                drop-shadow-md animate-pulse tracking-wide">
            ⚡ Stakify ⚡
        </div>

        <div>
            {!address ? <Connectors/> : <Disconnect/>}
        </div>
    </div>
}

function Connectors() {
    const {connectors, connect} = useConnect()
    return connectors.map((connector) => (
        <button className='mx-2 border rounded p-2' key={connector.uid} onClick={() => {

            connect({ connector })
        }



        }>
            {connector.name}
        </button>
    ))
}

function Disconnect() {
    const {disconnect} = useDisconnect();
    localStorage.removeItem("eth")
    return <div>
        <button className='mx-2 border rounded p-2' onClick={() => disconnect()}>
            Disconnect wallet
        </button>
    </div>

}