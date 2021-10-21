
import {useMutation, gql} from '@apollo/client'

export const SAVE_FORM_MUTATION = gql`
  mutation SaveFormValuesForUser(
    $fieldValues: [FormFieldValue]!,
    $userId: ID!
  ) {
    saveFormValuesForUser(fieldValues: $fieldValues, userId: $userId) {
      id
      slug
      optional
      config
      type
      value
    }
  }
`

export default function useFormsGenericUserMutation(apolloConfig) {
  const defaultConfig = {
    update: updateCache
  }
  const config = Object.assign(defaultConfig, apolloConfig)

  return useMutation(SAVE_FORM_MUTATION, config)
}

function updateCache(cache, { data: { saveFormValues } }) {
  cache.modify({
    fields: {
      formFields(existingFields = []) {
        const updatedEntries = existingFields.filter((r) => {
          const id = r.__ref.split(':')[1]
          const foundFormValue = saveFormValues.find(formValue => formValue.id === id)
          const fieldRef = !foundFormValue ? r : cache.writeFragment({
            data: foundFormValue,
            fragment: gql`
              fragment FormFields on FormFields {
                id
                slug
                optional
                config
                type
                value
              }
            `
          })
          return fieldRef
        })
        return [...updatedEntries]
      },
    },
  })
}