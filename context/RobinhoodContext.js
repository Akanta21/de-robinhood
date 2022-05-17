import { createContext, useEffect, useState } from 'react'
import { useMoralis } from 'react-moralis'

export const RobinhoodContext = createContext()

export const RobinhoodProvider = ({ children }) => {
  const [currentAcct, setCurrentAcct] = useState('')
  const [formattedAcct, setFormattedAcct] = useState('')
  const [balance, setBalance] = useState('')

  const {
    isAuthenticated,
    authenticate,
    user,
    logout,
    Moralis,
    enableWeb3,
  } = useMoralis()

  const connectWallet = () => {
    authenticate()
  }

  const signOut = () => {
    logout()
  }

  useEffect(() => {
    async function getCurrentBalance(account) {
      const currentBalance = await Moralis.Web3API.account.getNativeBalance({
        chain: process.env.CHAIN_NETWORK,
        address: account,
      })

      const balanceToEth = Moralis.Units.FromWei(currentBalance.balance)
      const formattedBalance = parseFloat(balanceToEth).toFixed(3)
      setBalance(formattedBalance)
    }

    if (isAuthenticated) {
      const account = user.get('ethAddress')

      let formatAccount = account.slice(0, 4) + '...' + account.slice(-4)

      setFormattedAcct(formatAccount)
      setCurrentAcct(account)

      getCurrentBalance(account)
    }
  }, [isAuthenticated, enableWeb3])

  useEffect(() => {
    if (currentAcct) return
    ;(async () => {
      const response = await fetch('/api/createUser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          walletAddress: currentAcct,
        }),
      })
      const data = await response.json()
    })()
  }, [currentAcct])

  return (
    <RobinhoodContext.Provider
      value={{
        connectWallet,
        signOut,
        currentAcct,
        isAuthenticated,
        formattedAcct,
      }}
    >
      {children}
    </RobinhoodContext.Provider>
  )
}
