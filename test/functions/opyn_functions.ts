import { Contract } from 'ethers'

// Function: addERC20CollateralOption
export async function handleAddERC20CollateralOption(
    opynContract: Contract,
    amtToCreate: number,
    amtCollateral: number,
    receiver: string,
) {
    return await opynContract.addERC20CollateralOption(amtToCreate, amtCollateral, receiver)
}

// Function: exercise
export async function handleExercise(
    opynContract: Contract,
    oTokensToExercise: number,
    vaultsToExerciseFrom: string[],
) {
    return await opynContract.exercise(oTokensToExercise, vaultsToExerciseFrom)
}

// Function: removeUnderlying
export async function handleRemoveUnderlying(opynContract: Contract) {
    return await opynContract.removeUnderlying()
}

// Function: hasVault
export async function handleHasVault(opynContract: Contract, owner: string) {
    return await opynContract.hasVault(owner)
}
