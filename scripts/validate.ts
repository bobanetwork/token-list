
import { schema } from '@uniswap/token-lists'
import Ajv from 'ajv'
import addFormats from 'ajv-formats'
import bobaTokenList from '../boba.tokenlist.json'

async function validate() {
  const ajv = new Ajv({ allErrors: true, verbose: true })
  addFormats(ajv)
  const validator = ajv.compile(schema);
  const valid = validator(bobaTokenList)
  if (valid) {
    return valid
  }
  if (validator.errors) {
    throw validator.errors.map(error => {
      delete error.data
      return error
    })
  }
}

validate()
.then(() => {
    console.log("Valid List.")
  })
  .catch((error) => {
    console.error(error)
    throw new Error('Validation failed')
  })
