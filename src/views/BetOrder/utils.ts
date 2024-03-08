export const parseAH_k = (k = '', marketId = '', betOnId = '') => {
  if (marketId.includes('ah') && betOnId === 'a') {
    return k.replace(/[+, -]/g, (u) => u === '+' ? '-' : '+')
  }
  return k
}
