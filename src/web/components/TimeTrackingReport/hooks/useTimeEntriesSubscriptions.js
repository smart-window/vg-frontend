import { useEffect } from 'react'
import { gql } from '@apollo/client'
import { timeEntriesPageFragment } from 'web/apollo/fragments/timeEntryFragments'

const TIME_ENTRY_CREATED = gql`
  subscription timeEntryCreated {
    timeEntryCreated {
      ...TimeEntriesPageTimeEntry
    }
  }
  ${timeEntriesPageFragment}
`
const TIME_ENTRY_UPDATED = gql`
  subscription timeEntryUpdated {
    timeEntryUpdated {
      ...TimeEntriesPageTimeEntry
    }
  }
  ${timeEntriesPageFragment}
`

const TIME_ENTRY_DELETED = gql`
  subscription timeEntryDeleted {
    timeEntryDeleted {
      ...TimeEntriesPageTimeEntry
    }
  }
  ${timeEntriesPageFragment}
`

/**
 * Takes a subscribe to more functions from the timeEntriesReport query and subscribes
 * to created, updated and deleted events
 * @param {function} subscribeToMore
 * @category Hooks - Web
 * @module useTimeEntriesSubscriptions
 */
export default function useTimeEntriesSubscriptions(subscribeToMore) {
  useEffect(() => {
    /**
     * Created Time Entries
     */
    subscribeToMore({
      document: TIME_ENTRY_CREATED,
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev
        const newTimeEntry = subscriptionData.data.timeEntryCreated
        const updatedTimeEntries = [
          newTimeEntry,
          ...prev.timeEntriesReport.time_entries
        ]
        return updateTimeEntriesCache(prev, updatedTimeEntries)
      }
    })

    /**
     * Updated Time Entries
     */
    subscribeToMore({ document: TIME_ENTRY_UPDATED })

    /**
     * Deleted Time Entries
     */
    subscribeToMore({
      document: TIME_ENTRY_DELETED,
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev
        const deletedEntry = subscriptionData.data.timeEntryDeleted
        const updatedTimeEntries = prev.timeEntriesReport.time_entries.filter(
          (entry) => entry.id !== deletedEntry.id
        )
        return updateTimeEntriesCache(prev, updatedTimeEntries)
      }
    })
  }, [subscribeToMore])
}

/**
 * Takes the previous cache object of time entries and an array of updated
 * time entries and merges them together.
 * @param {object} prev
 * @param {array} updatedTimeEntries
 */
function updateTimeEntriesCache(prev, updatedTimeEntries) {
  return {
    ...prev,
    timeEntriesReport: {
      ...prev.timeEntriesReport,
      time_entries: updatedTimeEntries
    }
  }
}
