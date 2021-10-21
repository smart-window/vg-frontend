import { ALL_USERS, INTERNAL_USERS_ONLY } from 'shared/constants/visibilityConstants'

const commentsMock=[
  {
    fullName: 'Ryan Henry',
    comment: 'Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. The passage is attributed to an unknown typesetter in the 15th century who is thought to have scrambled parts of Cicero\'s De Finibus Bonorum et Malorum for use in a type specimen book.',
    visibility: ALL_USERS,
    postedOn: 'Verify Signed Contract',
    postedAt: '4: 53 PM 01 Jan 2021'
  },
  {
    fullName: 'Piper Wright',
    comment: 'Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. The passage is attributed to an unknown typesetter in the 15th century who is thought to have scrambled parts of Cicero\'s De Finibus Bonorum et Malorum for use in a type specimen book.',
    visibility: INTERNAL_USERS_ONLY,
    postedOn: 'Verify Signed Contract',
    postedAt: '4: 53 PM 01 Jan 2021'
  },
]

export default commentsMock