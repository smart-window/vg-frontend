import {USER_PTO_TYPES_QUERY, POLICY_BALANCE_QUERY} from 'web/components/modals/TimeOffRequestModal/TimeOffRequestModal'

export const getPtoTypesMock = () => ({
  request: {
    query: USER_PTO_TYPES_QUERY,
    variables: {
      userId: '1'
    }
  },
  result: {
    data: {
      'userPolicies': [
        {
          '__typename': 'UserPolicy',
          'accrualPolicy': {
            '__typename': 'AccrualPolicy',
            'id': '2',
            'ptoType': {
              '__typename': 'PtoType',
              'id': '1',
              'name': 'vacation'
            }
          },
          'endDate': null
        },
        {
          '__typename': 'UserPolicy',
          'accrualPolicy': {
            '__typename': 'AccrualPolicy',
            'id': '3',
            'ptoType': {
              '__typename': 'PtoType',
              'id': '2',
              'name': 'paternity leave'
            }
          },
          'endDate': null
        }
      ]
    }
  }
})

export const getPolicyBalanceMock = () => ({
  request: {
    query: POLICY_BALANCE_QUERY,
    variables: {
      userId: '1',
      accrualPolicyId: '2'
    }
  },
  result: {
    data: {
      'lastLedgerEntry': {
        '__typename': 'PtoLedger',
        'regularBalance': 100
      }
    }
  }
})