import oktaService from 'web/services/oktaService'
import pegaApiConfig from 'shared/config/pegaApiConfig'

/**
 * This file contains helpers for fetching pega related data using a
 * specially configured REST service (spaapi in PEGA).
 * @category Services
 * @module pegaService
 */
export default {
  fetchAssignments
}

const {PEGA_API_HOST, BASIC_AUTH_HEADER} = pegaApiConfig

/**
 * Retrieve assignments for current user (through employee number) from PEGA.
 * @returns {assignments as received from PEGA} e.g.
 *   { "assignments":
 *     [
 *       {
 *         "caseID":"VG-PEO-WORK OB-7050",
 *         "ID":"ASSIGN-WORKLIST VG-PEO-WORK OB-7050!EMPLOYEEUPLOADSDOCUMENTSSF" ,
 *         "name":"OB: Some User in Employee Contract Review",
 *         "pxObjClass":"Pega-API-CaseManagement-Assignment",
 *         "routedTo":"637136278",
 *         "type":"Worklist",
 *         "urgency":"10"
 *        },
 *        ...
 *     ]
 *   }
 */
async function fetchAssignments() {
  const operatorId = oktaService.getOperatorId()
  const assignmentsResponse = await fetch(
    PEGA_API_HOST + '/assignments/' + operatorId,
    {
      method: 'GET',
      headers: { authorization: BASIC_AUTH_HEADER }
    }
  )
  if (assignmentsResponse.ok) {
    const assignmentsJSON = await assignmentsResponse.json()
    return {assignments: assignmentsJSON.assignments}
  }
  else {
    // TODO: other error handling patterns to consider? Attempting to avoid a bunch of error handling in the caller.
    const errorText = 'Error fetching assignments: ' + assignmentsResponse.statusText
    /* eslint-disable no-console */
    console.error(errorText)
    return {assignments: [], error: errorText}
  }
}
