// bancor_functions.ts
import { Contract } from 'ethers'
import { IERC20 } from '../../typechain-types'

// Function: restrictRegistryUpdate
export async function handleRestrictRegistryUpdate(bancor: Contract, onlyOwnerCanUpdateRegistry: boolean = true) {
    return await bancor.restrictRegistryUpdate(onlyOwnerCanUpdateRegistry)
}

// Function: registerEtherToken
export async function handleRegisterEtherToken(
    bancor: Contract,
    token: string = '0x0000000000000000000000000000000000000000',
    register: boolean = true,
) {
    return await bancor.registerEtherToken(token, register)
}

// Function: getReturnByPath
export async function handleGetReturnByPath(
    bancor: Contract,
    path: string[] = ['0x0000000000000000000000000000000000000000'],
    amount: number = 1000,
) {
    return await bancor.getReturnByPath(path, amount)
}

// Function: claimAndConvertFor2
export async function handleClaimAndConvertFor2(
    bancor: Contract,
    path: string[] = ['0x0000000000000000000000000000000000000000'],
    amount: number = 1000,
    minReturn: number = 1,
    beneficiary: string = '0x0000000000000000000000000000000000000000',
    affiliateAccount: string = '0x0000000000000000000000000000000000000000',
    affiliateFee: number = 100,
) {
    return await bancor.claimAndConvertFor2(path, amount, minReturn, beneficiary, affiliateAccount, affiliateFee)
}

// Function: onlyOwnerCanUpdateRegistry
export async function handleOnlyOwnerCanUpdateRegistry(bancor: Contract) {
    return await bancor.onlyOwnerCanUpdateRegistry()
}

// Function: updateRegistry
export async function handleUpdateRegistry(bancor: Contract) {
    return await bancor.updateRegistry()
}

// Function: convert2
export async function handleConvert2(
    bancor: Contract,
    path: string[] = ['0x0000000000000000000000000000000000000000'],
    amount: number = 1000,
    minReturn: number = 1,
    affiliateAccount: string = '0x0000000000000000000000000000000000000000',
    affiliateFee: number = 100,
) {
    return await bancor.convert2(path, amount, minReturn, affiliateAccount, affiliateFee)
}

// Function: safeTransfer
export async function handleSafeTransfer(
    bancor: Contract,
    token: string = '0x0000000000000000000000000000000000000000',
    to: string = '0x0000000000000000000000000000000000000000',
    value: number = 1000,
) {
    return await bancor.safeTransfer(token, to, value)
}

// Function: safeTransferFrom
export async function handleSafeTransferFrom(
    bancor: Contract,
    token: IERC20,
    from: string = '0x0000000000000000000000000000000000000000',
    to: string = '0x0000000000000000000000000000000000000000',
    value: BigInt = 1000n,
) {
    return await bancor.safeTransferFrom(token, from, to, value)
}

// Function: setMaxAffiliateFee
export async function handleSetMaxAffiliateFee(bancor: Contract, maxAffiliateFee: number = 1000) {
    return await bancor.setMaxAffiliateFee(maxAffiliateFee)
}

// Function: transferOwnership
export async function handleTransferOwnership(bancor: Contract) {
    const newOwner = '0x0000000000000000000000000000000000000000'
    return await bancor.transferOwnership(newOwner)
}
