import React, { useState } from 'react'
import { useMutation, gql } from '@apollo/client'
import dateHelper from 'shared/services/dateHelper'
import {
  DivContainer,
  DivTitle,
  H1Title,
  DivContentContainer,
  H2Subheader,
  TableLedger,
  TRrow,
} from './PtoSimulation.styles'

const PTO_SIMULATION_MUTATION = gql`
  mutation SimulatePto(
    $startDate: Date!
    $endDate: Date!
    $user: InputUser!
    $accrualPolicy: InputPtoAccrualPolicy!
    $takenEvents: [InputTakenEvent]
    $manualEvents: [InputManualAdjustmentEvent]
    $withdrawnEvents: [InputWithdrawnEvent]
    $persist: Boolean
  ) {
    simulatePto(
      startDate: $startDate
      endDate: $endDate
      user: $user
      accrualPolicy: $accrualPolicy
      takenEvents: $takenEvents
      manualEvents: $manualEvents
      withdrawnEvents: $withdrawnEvents
      persist: $persist
    ) {
      id
      eventDate
      eventType
      regularBalance
      regularTransaction
      carryoverBalance
      carryoverTransaction
      userId
      accrualPolicyId
    }
  }
`

function parseIntForNumField(string) {
  const parsed = parseInt(string)
  if (isNaN(parsed)) {
    return null
  }
  else {
    return parsed
  }
}

function parseDecimalFromTextField(string) {
  const parsed = parseFloat(string)
  if (isNaN(parsed)) {
    return ''
  }
  else {
    return parsed
  }
}

/**
 * This page is used by admins in order to test different inputs into the PTO engine.
 * @category Pages
 * @module PtoSimulation
 */
function PtoSimulation(props) {
  const [persist, setPersist] = useState(false)
  const today = new Date()
  const initialStartDate = dateHelper.getISOStringDate(today)

  const initialEnd = dateHelper.addDaysToDate(today, 120)
  const initialEndDate = dateHelper.getISOStringDate(initialEnd)

  const initialHire = dateHelper.addDaysToDate(today, -120)
  // const initialHire = new Date(2020, 9, 19)
  const initialHireDate = dateHelper.getISOStringDate(initialHire)

  const initalEvent = dateHelper.addDaysToDate(today, 7)
  // const initialPto = new Date(2021, 1, 14)
  // const initialEventDate = dateHelper.getISOStringDate(initalEvent)

  const [startDate, setStartDate] = useState(initialStartDate)
  const [endDate, setEndDate] = useState(initialEndDate)

  const [user, setUser] = useState({
    oktaUserUid: 'abc123',
    email: 'larryfitzgerald@gmail.com',
    startDate: initialHireDate,
  })

  const [accrualPolicy, setAccrualPolicy] = useState({
    pegaPolicyId: '',
    label: '',
    carryoverDay: 'first_of_year',
    firstAccrualPolicy: 'pay_in_full',
    levels: [
      {
        pegaLevelId: '',
        carryoverLimitType: 'unlimited',
        carryoverLimit: 2,
        maxDays: 50,
        accrualPeriod: 'months',
        accrualFrequency: 1,
        accrualAmount: 5,
        startDateIntervalUnit: 'days',
        startDateInterval: 0,
        accrualCalculationMonthDay: '15',
        accrualCalculationWeekDay: null,
        accrualCalculationYearDay: null,
        accrualCalculationYearMonth: '',
      },
    ],
  })

  const [takenEvents, setTakenEvents] = useState([])

  const [manualEvents, setManualEvents] = useState([])

  const [withdrawnEvents, setWithdrawnEvents] = useState([])

  const [simulatePto, { data, loading, error }] = useMutation(
    PTO_SIMULATION_MUTATION
  )

  return (
    <DivContainer>
      <DivTitle>
        <H1Title>PTO Simulation</H1Title>
      </DivTitle>
      <DivContentContainer>
        <H2Subheader>Timing</H2Subheader>

        <button
          style={{ float: 'right' }}
          onClick={async () => {
            try {
              const string = await navigator.clipboard.readText()
              const formatted = JSON.parse(`"${string}"`)
              const json = JSON.parse(formatted)
              setStartDate(json.startDate)
              setEndDate(json.endDate)
              setAccrualPolicy(json.accrualPolicy)
              setUser(json.user)
              setManualEvents(json.manualEvents)
              setTakenEvents(json.takenEvents)
              setWithdrawnEvents(json.withdrawnEvents)
            }
            catch (e) {
              console.error(e)
              alert(
                'error reading from your clipboard. make sure you copy a valid json simulation'
              )
            }
          }}
        >
          paste simulation
        </button>
        <button
          style={{ float: 'right' }}
          onClick={() => {
            const json = JSON.stringify({
              startDate: startDate,
              endDate: endDate,
              user: user,
              accrualPolicy: accrualPolicy,
              manualEvents: manualEvents,
              takenEvents: takenEvents,
              withdrawnEvents: withdrawnEvents,
            })

            const el = document.createElement('textarea')
            el.value = json.replace(/\\([\s\S])|(")/g, '\\$1$2')
            document.body.appendChild(el)
            el.select()
            document.execCommand('copy')
            document.body.removeChild(el)

            alert(
              'Data has been copied to your clipboard. Please include this on any tickets'
            )
          }}
        >
          copy simulation
        </button>
        <div style={{ float: 'right', padding: 5 }}>
          <label>Persist Data: </label>
          <input
            type='checkbox'
            onChange={(e) => {
              setPersist(e.target.checked)
            }}
            checked={persist}
          />
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault()
            simulatePto({
              variables: {
                startDate: startDate,
                endDate: endDate,
                user: user,
                accrualPolicy: accrualPolicy,
                manualEvents: manualEvents,
                takenEvents: takenEvents,
                withdrawnEvents: withdrawnEvents,
                persist,
              },
            })
          }}
        >
          <label> Start Date </label>
          <input
            type='date'
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
          <br />
          <label> End Date </label>
          <input
            type='date'
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />

          <H2Subheader>User</H2Subheader>

          <label> Email </label>
          <input
            type='text'
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
          />
          <label> Okta User Uid </label>
          <input
            type='text'
            value={user.oktaUserUid}
            onChange={(e) => setUser({ ...user, oktaUserUid: e.target.value })}
          />
          <label> Start Date </label>
          <input
            type='date'
            value={user.startDate}
            onChange={(e) => setUser({ ...user, startDate: e.target.value })}
          />

          <H2Subheader>Policy</H2Subheader>

          <label> Policy Id </label>
          <input
            type='text'
            value={accrualPolicy.pegaPolicyId}
            onChange={(e) =>
              setAccrualPolicy({
                ...accrualPolicy,
                pegaPolicyId: e.target.value,
              })
            }
          />
          <label> Policy Label </label>
          <input
            type='text'
            value={accrualPolicy.label}
            onChange={(e) =>
              setAccrualPolicy({
                ...accrualPolicy,
                label: e.target.value,
              })
            }
          />
          <br />
          <label> First Accrual Policy </label>
          <select
            value={accrualPolicy.firstAccrualPolicy}
            onChange={(e) =>
              setAccrualPolicy({
                ...accrualPolicy,
                firstAccrualPolicy: e.target.value,
              })
            }
          >
            <option value='prorate'>prorate</option>
            <option value='pay_in_full'>pay in full</option>
          </select>

          <label> Carryover Day </label>
          <input
            type='text'
            value={accrualPolicy.carryoverDay}
            onChange={(e) =>
              setAccrualPolicy({
                ...accrualPolicy,
                carryoverDay: e.target.value,
              })
            }
          />

          <H2Subheader> Levels </H2Subheader>

          {accrualPolicy.levels.map((level, index) => {
            return (
              <div key={index} style={{ marginBottom: 25 }}>
                <label> Pega Level Id </label>
                <input
                  type='text'
                  value={level.pegaLevelId}
                  onChange={(e) =>
                    setAccrualPolicy({
                      ...accrualPolicy,
                      levels: accrualPolicy.levels.map((level, j) => {
                        if (index === j) {
                          return {
                            ...level,
                            pegaLevelId: e.target.value,
                          }
                        }
                        else {
                          return level
                        }
                      }),
                    })
                  }
                />

                <label> Start Date Interval </label>
                <input
                  type='number'
                  value={level.startDateInterval}
                  onChange={(e) =>
                    setAccrualPolicy({
                      ...accrualPolicy,
                      levels: accrualPolicy.levels.map((level, j) => {
                        if (index === j) {
                          return {
                            ...level,
                            startDateInterval: parseIntForNumField(
                              e.target.value
                            ),
                          }
                        }
                        else {
                          return level
                        }
                      }),
                    })
                  }
                />

                <label> Start Date Interval Unit </label>
                <select
                  value={level.startDateIntervalUnit}
                  onChange={(e) =>
                    setAccrualPolicy({
                      ...accrualPolicy,
                      levels: accrualPolicy.levels.map((level, j) => {
                        if (index === j) {
                          return {
                            ...level,
                            startDateIntervalUnit: e.target.value,
                          }
                        }
                        else {
                          return level
                        }
                      }),
                    })
                  }
                >
                  <option value='years'>years</option>
                  <option value='months'>months</option>
                  <option value='weeks'>weeks</option>
                  <option value='days'>days</option>
                </select>
                <br />
                <br />
                <label> Carryover Limit Type </label>
                <input
                  type='text'
                  value={level.carryoverLimitType}
                  onChange={(e) =>
                    setAccrualPolicy({
                      ...accrualPolicy,
                      levels: accrualPolicy.levels.map((level, j) => {
                        if (index === j) {
                          return {
                            ...level,
                            carryoverLimitType: e.target.value,
                          }
                        }
                        else {
                          return level
                        }
                      }),
                    })
                  }
                />

                <label> Carryover Limit </label>
                <input
                  type='number'
                  value={level.carryoverLimit}
                  onChange={(e) =>
                    setAccrualPolicy({
                      ...accrualPolicy,
                      levels: accrualPolicy.levels.map((level, j) => {
                        if (index === j) {
                          return {
                            ...level,
                            carryoverLimit: parseIntForNumField(e.target.value),
                          }
                        }
                        else {
                          return level
                        }
                      }),
                    })
                  }
                />
                <br />
                <br />
                <label> Max Days </label>
                <input
                  type='number'
                  value={level.maxDays}
                  onChange={(e) =>
                    setAccrualPolicy({
                      ...accrualPolicy,
                      levels: accrualPolicy.levels.map((level, j) => {
                        if (index === j) {
                          return {
                            ...level,
                            maxDays: parseIntForNumField(e.target.value),
                          }
                        }
                        else {
                          return level
                        }
                      }),
                    })
                  }
                />
                <br />
                <br />
                <label> Accrual Period </label>
                <select
                  value={level.accrualPeriod}
                  onChange={(e) =>
                    setAccrualPolicy({
                      ...accrualPolicy,
                      levels: accrualPolicy.levels.map((level, j) => {
                        if (index === j) {
                          return {
                            ...level,
                            accrualPeriod: e.target.value,
                          }
                        }
                        else {
                          return level
                        }
                      }),
                    })
                  }
                >
                  <option value='years'>years</option>
                  <option value='months'>months</option>
                  <option value='weeks'>weeks</option>
                  <option value='days'>days</option>
                </select>
                <label> Accrual Frequency </label>
                <input
                  type='number'
                  value={level.accrualFrequency}
                  onChange={(e) =>
                    setAccrualPolicy({
                      ...accrualPolicy,
                      levels: accrualPolicy.levels.map((level, j) => {
                        if (index === j) {
                          return {
                            ...level,
                            accrualFrequency: parseIntForNumField(
                              e.target.value
                            ),
                          }
                        }
                        else {
                          return level
                        }
                      }),
                    })
                  }
                />
                <label> Accrual Amount </label>
                <input
                  type='number'
                  value={level.accrualAmount}
                  onChange={(e) =>
                    setAccrualPolicy({
                      ...accrualPolicy,
                      levels: accrualPolicy.levels.map((level, j) => {
                        if (index === j) {
                          return {
                            ...level,
                            accrualAmount: parseDecimalFromTextField(
                              e.target.value
                            ),
                          }
                        }
                        else {
                          return level
                        }
                      }),
                    })
                  }
                />
                <br />
                <br />

                <label> Accrual Calculation Month Day </label>
                <input
                  type='text'
                  value={level.accrualCalculationMonthDay}
                  onChange={(e) =>
                    setAccrualPolicy({
                      ...accrualPolicy,
                      levels: accrualPolicy.levels.map((level, j) => {
                        if (index === j) {
                          return {
                            ...level,
                            accrualCalculationMonthDay: e.target.value,
                          }
                        }
                        else {
                          return level
                        }
                      }),
                    })
                  }
                />
                <label> Accrual Calculation Week Day </label>
                <input
                  type='number'
                  value={level.accrualCalculationWeekDay}
                  onChange={(e) =>
                    setAccrualPolicy({
                      ...accrualPolicy,
                      levels: accrualPolicy.levels.map((level, j) => {
                        if (index === j) {
                          return {
                            ...level,
                            accrualCalculationWeekDay: parseIntForNumField(
                              e.target.value
                            ),
                          }
                        }
                        else {
                          return level
                        }
                      }),
                    })
                  }
                />
                <label> Accrual Calculation Year Day </label>
                <input
                  type='number'
                  value={level.accrualCalculationYearDay}
                  onChange={(e) =>
                    setAccrualPolicy({
                      ...accrualPolicy,
                      levels: accrualPolicy.levels.map((level, j) => {
                        if (index === j) {
                          return {
                            ...level,
                            accrualCalculationYearDay: parseIntForNumField(
                              e.target.value
                            ),
                          }
                        }
                        else {
                          return level
                        }
                      }),
                    })
                  }
                />
                <label> Accrual Calculation Year Month </label>
                <input
                  type='text'
                  value={level.accrualCalculationYearMonth}
                  onChange={(e) =>
                    setAccrualPolicy({
                      ...accrualPolicy,
                      levels: accrualPolicy.levels.map((level, j) => {
                        if (index === j) {
                          return {
                            ...level,
                            accrualCalculationYearMonth: e.target.value,
                          }
                        }
                        else {
                          return level
                        }
                      }),
                    })
                  }
                />
              </div>
            )
          })}
          <button
            onClick={(e) => {
              e.preventDefault()

              setAccrualPolicy({
                ...accrualPolicy,
                levels: accrualPolicy.levels.concat({
                  pegaLevelId: '',
                  carryoverLimitType: '',
                  carryoverLimit: 0,
                  maxDays: 0,
                  accrualPeriod: 'months',
                  accrualFrequency: 0,
                  accrualAmount: 0,
                  startDateIntervalUnit: 'days',
                  startDateInterval: 0,
                  accrualCalculationMonthDay: '15',
                  accrualCalculationWeekDay: 0,
                  accrualCalculationYearDay: 0,
                  accrualCalculationYearMonth: 'hire',
                }),
              })
            }}
          >
            add level
          </button>

          <H2Subheader>Manual Adjustment</H2Subheader>

          {manualEvents.map((event, index) => {
            return (
              <div key={index}>
                <label> Amount </label>
                <input
                  type='number'
                  value={event.amount}
                  onChange={(e) => {
                    setManualEvents(
                      manualEvents.map((event, j) => {
                        if (index === j) {
                          const float = parseFloat(e.target.value)
                          return {
                            ...event,
                            amount: isNaN(float) ? '' : float,
                          }
                        }
                        else {
                          return event
                        }
                      })
                    )
                  }}
                />
                <label> Date </label>
                <input
                  type='date'
                  value={event.date}
                  onChange={(e) => {
                    setManualEvents(
                      manualEvents.map((event, j) => {
                        if (index === j) {
                          return {
                            ...event,
                            date: e.target.value,
                          }
                        }
                        else {
                          return event
                        }
                      })
                    )
                  }}
                />
                <br />
              </div>
            )
          })}

          <button
            onClick={(e) => {
              e.preventDefault()

              const newEventDate = dateHelper.addDaysToDate(initalEvent, 1)
              const dateString = dateHelper.getISOStringDate(newEventDate)

              setManualEvents(
                [...manualEvents].concat({
                  amount: 0,
                  date: dateString,
                })
              )
            }}
          >
            add manual adjustment
          </button>

          <button
            onClick={(e) => {
              e.preventDefault()

              const events = manualEvents
              events.pop()

              setManualEvents([...events])
            }}
          >
            remove manual adjustment
          </button>

          <H2Subheader>Taken Events</H2Subheader>

          {takenEvents.map((event, index) => {
            return (
              <div key={index}>
                <label> Amount </label>
                <input
                  type='number'
                  value={event.amount}
                  onChange={(e) => {
                    setTakenEvents(
                      takenEvents.map((event, j) => {
                        if (index === j) {
                          const float = parseFloat(e.target.value)
                          return {
                            ...event,
                            amount: isNaN(float) ? '' : float,
                          }
                        }
                        else {
                          return event
                        }
                      })
                    )
                  }}
                />
                <label> Date </label>
                <input
                  type='date'
                  value={event.date}
                  onChange={(e) => {
                    setTakenEvents(
                      takenEvents.map((event, j) => {
                        if (index === j) {
                          return {
                            ...event,
                            date: e.target.value,
                          }
                        }
                        else {
                          return event
                        }
                      })
                    )
                  }}
                />
                <br />
              </div>
            )
          })}

          <button
            onClick={(e) => {
              e.preventDefault()

              const newEventDate = dateHelper.addDaysToDate(initalEvent, 1)
              const dateString = dateHelper.getISOStringDate(newEventDate)

              setTakenEvents(
                [...takenEvents].concat({
                  amount: -1,
                  date: dateString,
                })
              )
            }}
          >
            add taken event
          </button>

          <button
            onClick={(e) => {
              e.preventDefault()

              const events = takenEvents
              events.pop()

              setTakenEvents([...events])
            }}
          >
            remove taken event
          </button>

          <H2Subheader>Withdrawn Events</H2Subheader>

          {withdrawnEvents.map((event, index) => {
            return (
              <div key={index}>
                <label> Regular Amount </label>
                <input
                  type='number'
                  value={event.regularAmount}
                  onChange={(e) => {
                    setWithdrawnEvents(
                      withdrawnEvents.map((event, j) => {
                        if (index === j) {
                          const float = parseFloat(e.target.value)
                          return {
                            ...event,
                            regularAmount: isNaN(float) ? '' : float,
                          }
                        }
                        else {
                          return event
                        }
                      })
                    )
                  }}
                />
                <label> Carryover Amount </label>
                <input
                  type='number'
                  value={event.carryoverAmount}
                  onChange={(e) => {
                    setWithdrawnEvents(
                      withdrawnEvents.map((event, j) => {
                        if (index === j) {
                          const float = parseFloat(e.target.value)
                          return {
                            ...event,
                            carryoverAmount: isNaN(float) ? '' : float,
                          }
                        }
                        else {
                          return event
                        }
                      })
                    )
                  }}
                />
                <label> Date </label>
                <input
                  type='date'
                  value={event.date}
                  onChange={(e) => {
                    setWithdrawnEvents(
                      withdrawnEvents.map((event, j) => {
                        if (index === j) {
                          return {
                            ...event,
                            date: e.target.value,
                          }
                        }
                        else {
                          return event
                        }
                      })
                    )
                  }}
                />
                <br />
              </div>
            )
          })}

          <button
            onClick={(e) => {
              e.preventDefault()

              const newEventDate = dateHelper.addDaysToDate(initalEvent, 1)
              const dateString = dateHelper.getISOStringDate(newEventDate)

              setWithdrawnEvents(
                [...withdrawnEvents].concat({
                  regularAmount: 1,
                  carryoverAmount: 0,
                  date: dateString,
                })
              )
            }}
          >
            add withdrawn event
          </button>

          <button
            onClick={(e) => {
              e.preventDefault()

              const events = withdrawnEvents
              events.pop()

              setWithdrawnEvents([...events])
            }}
          >
            remove withdrawn event
          </button>

          <button style={{ float: 'right' }} type='submit'>
            {' '}
            submit
          </button>
        </form>
      </DivContentContainer>
      <DivContentContainer>
        {loading && <h1>loading</h1>}
        {error && (
          <>
            <h1>error</h1>
            <p>{`${error}`}</p>
          </>
        )}

        {!loading && !error && data && (
          <>
            <H2Subheader>Ledger</H2Subheader>
            <TableLedger>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Event Date</th>
                  <th>Event Type</th>
                  <th>Regular Transaction</th>
                  <th>Regular Balance</th>
                  <th>Carryover Transaction</th>
                  <th>Carryover Balance</th>
                </tr>
              </thead>
              <tbody>
                {data.simulatePto.map((ledger, index) => {
                  return (
                    <TRrow key={index}>
                      <td>{ledger.id}</td>
                      <td>{ledger.eventDate}</td>
                      <td>{ledger.eventType}</td>
                      <td>{ledger.regularTransaction}</td>
                      <td>{ledger.regularBalance}</td>
                      <td>{ledger.carryoverTransaction}</td>
                      <td>{ledger.carryoverBalance}</td>
                    </TRrow>
                  )
                })}
              </tbody>
            </TableLedger>
          </>
        )}
      </DivContentContainer>
    </DivContainer>
  )
}

export default PtoSimulation
