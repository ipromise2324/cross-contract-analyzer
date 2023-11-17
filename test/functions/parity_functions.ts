import { Contract } from 'ethers';

// Function: isOwner
export async function handleIsOwner(walletLibrary: Contract, address: string) {
    return await walletLibrary.isOwner(address)
}

// Function: initWallet
export async function handleInitWallet(walletLibrary: Contract, address: string) {
    const ownerArray = [address]
    return await walletLibrary.initWallet(ownerArray, 0, 0)
}

// Function: kill
export async function handleKill(walletLibrary: Contract, address: string) {
    return await walletLibrary.kill(address)
}

// Function: removeOwner
export async function handleRemoveOwner(walletLibrary: Contract, address: string) {
    // Example default owner address
    const defaultOwnerAddress = '0x0000000000000000000000000000000000000000'
    return await walletLibrary.removeOwner(defaultOwnerAddress)
}

// Function: m_numOwners
export async function handleNumOwners(walletLibrary: Contract, _: string) {
    return await walletLibrary.m_numOwners()
}

// Function: m_lastDay
export async function handleLastDay(walletLibrary: Contract, _: string) {
    return await walletLibrary.m_lastDay()
}

// Function: resetSpentToday
export async function handleResetSpentToday(walletLibrary: Contract, _: string) {
    return await walletLibrary.resetSpentToday()
}

// Function: m_spentToday
export async function handleSpentToday(walletLibrary: Contract, _: string) {
    return await walletLibrary.m_spentToday()
}

// Function: addOwner
export async function handleAddOwner(walletLibrary: Contract, address: string) {
    return await walletLibrary.addOwner(address)
}

// Function: m_required
export async function handleRequired(walletLibrary: Contract, _: string) {
    return await walletLibrary.m_required()
}

// Function: confirm
export async function handleConfirm(walletLibrary: Contract, _: string) {
    // Example default hash
    const defaultHash = '0x0000000000000000000000000000000000000000000000000000000000000000'
    return await walletLibrary.confirm(defaultHash)
}

// Function: initDaylimit
export async function handleInitDaylimit(walletLibrary: Contract, _: string) {
    // Example default limit
    const defaultLimit = 1000
    return await walletLibrary.initDaylimit(defaultLimit)
}

// Function: setDailyLimit
export async function handleSetDailyLimit(walletLibrary: Contract, _: string) {
    // Example default new limit
    const defaultNewLimit = 1000
    return await walletLibrary.setDailyLimit(defaultNewLimit)
}

// Function: execute
export async function handleExecute(walletLibrary: Contract, _: string) {
    // Example default values
    const defaultTo = '0x0000000000000000000000000000000000000000'
    const defaultValue = 0
    const defaultData = '0x00'
    return await walletLibrary.execute(defaultTo, defaultValue, defaultData)
}

// Function: revoke
export async function handleRevoke(walletLibrary: Contract, _: string) {
    // Example default operation
    const defaultOperation = '0x0000000000000000000000000000000000000000000000000000000000000000'
    return await walletLibrary.revoke(defaultOperation)
}

// Function: changeRequirement
export async function handleChangeRequirement(walletLibrary: Contract, _: string) {
    // Example default new requirement
    const defaultNewRequired = 1
    return await walletLibrary.changeRequirement(defaultNewRequired)
}

// Function: hasConfirmed
export async function handleHasConfirmed(walletLibrary: Contract, _: string) {
    // Example default values
    const defaultOperation = '0x0000000000000000000000000000000000000000000000000000000000000000'
    const defaultOwner = '0x0000000000000000000000000000000000000000'
    return await walletLibrary.hasConfirmed(defaultOperation, defaultOwner)
}

// Function: getOwner
export async function handleGetOwner(walletLibrary: Contract, _: string) {
    // Example default owner index
    const defaultOwnerIndex = 0
    return await walletLibrary.getOwner(defaultOwnerIndex)
}

// Function: initMultiowned
export async function handleInitMultiowned(walletLibrary: Contract, _: string) {
    // Example default values
    const defaultOwners = ['0x0000000000000000000000000000000000000000']
    const defaultRequired = 1
    return await walletLibrary.initMultiowned(defaultOwners, defaultRequired)
}

// Function: changeOwner
export async function handleChangeOwner(walletLibrary: Contract, _: string) {
    // Example default values
    const defaultFrom = '0x0000000000000000000000000000000000000000'
    const defaultTo = '0x0000000000000000000000000000000000000000'
    return await walletLibrary.changeOwner(defaultFrom, defaultTo)
}

// Function: m_dailyLimit
export async function handleDailyLimit(walletLibrary: Contract, _: string) {
    return await walletLibrary.m_dailyLimit()
}