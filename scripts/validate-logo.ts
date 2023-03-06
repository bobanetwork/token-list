import axios from 'axios';
import bobaTokenList from '../boba.tokenlist.json';

async function validateLogoURI() {
  const branch = process.argv[2] || 'main'
  const errors = []
  for (const token of bobaTokenList.tokens) {
    if (!token.logoURI) {
      errors.push(`Token ${token.symbol} does not have a logoURI`)
    } else {
      const logoURI = token.logoURI.replace('main', branch)
      try {
        const response = await axios.get(logoURI)
        if (response.status !== 200) {
          errors.push(`Token ${token.symbol} has an invalid logoURI`)
        }
      } catch (error) {
        errors.push(`Token ${token.symbol} has an invalid logoURI`)
      }
    }
  }
  if (errors.length === 0) {
    console.log('All logoURIs are valid.')
  } else {
    const errorMessage = `Found ${errors.length} errors:\n${errors.join('\n')}`
    throw new Error(errorMessage)
  }
}

validateLogoURI();
