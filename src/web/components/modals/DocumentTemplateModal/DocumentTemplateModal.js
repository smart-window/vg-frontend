import React from 'react'
import { func } from 'prop-types'
import DocumentTemplateForm from '../../DocumentTemplateForm/DocumentTemplateForm'
import XIcon from 'assets/images/icons/X.png'
import { colors } from 'shared/constants/cssConstants'

import {
  DivModalContainer,
  DivContentBackground,
  DivModalContent,
  DivTopSection,
  DivTemplateIcon,
  DivTitles,
  DivModalTitle,
  DivModalSubtitle,
  ButtonExit
} from './DocumentTemplateModal.styles'

DocumentTemplateModal.propTypes = {
  /** Called when the user submits the form */
  onSubmit: func.isRequired,
  /** Called when the user clicks the cancel or x button */
  onCancel: func.isRequired,
}

DocumentTemplateModal.defaultProps = {}

// TODO: this should probably leverage <GenericLargeModal>

export default function DocumentTemplateModal({
  onSubmit,
  onCancel
}) {
  return (
    <DivModalContainer>
      <DivContentBackground>
        <DivModalContent>
          <DivTopSection>
            <DivTemplateIcon>
              <TemplateIcon />
            </DivTemplateIcon>
            <DivTitles>
              <DivModalSubtitle>DOCUMENT MANAGEMENT</DivModalSubtitle>
              <DivModalTitle><span>CREATE</span> ONBOARDING DOCUMENT TEMPLATE</DivModalTitle>
            </DivTitles>
          </DivTopSection>
          <ButtonExit onClick={onCancel}>
            <img src={XIcon} alt='close modal' />
          </ButtonExit>
          <DocumentTemplateForm
            onSubmit={onSubmit}
            onCancel={onCancel}
            showPreview={true}
          />
        </DivModalContent>
      </DivContentBackground>
    </DivModalContainer>
  )
}

function TemplateIcon() {
  return (
    <svg width='36' height='36' viewBox='0 0 36 36' fill='none' xmlns='http://www.w3.org/2000/svg' role='img'>
      <title>A Template Type File Icon</title>
      <path fillRule='evenodd' clipRule='evenodd' d='M11.3901 12.6757V32.6555L11.4222 32.8582L11.4881 33.0626L11.554 33.2322L11.6841 33.4019L11.8487 33.5384L12.0447 33.6402L12.2407 33.7072L12.4366 33.742H31.0147L31.2106 33.7072L31.4066 33.6402L31.6025 33.5384L31.7672 33.4019L31.8973 33.2322L31.9632 33.0626L32.029 32.8582L32.0611 32.6555V9.47383L32.029 9.2372L31.9632 9.03449L31.8973 8.86486L31.7672 8.69523L31.6025 8.56038L31.4066 8.4586L31.2106 8.39075H16.2938' fill='white'/>
      <path fillRule='evenodd' clipRule='evenodd' d='M32.2775 9.50054V9.84075C32.2775 10.0739 32.0917 10.263 31.8624 10.263C31.6332 10.263 31.4474 10.0739 31.4474 9.84075L31.4514 9.55899L31.4365 9.39896L31.3783 9.21993L31.3342 9.10791L31.2702 9.02544L31.1703 8.94463L31.0703 8.88997L30.9371 8.84442H29.4942C29.265 8.84442 29.0791 8.65539 29.0791 8.42221C29.0791 8.18903 29.265 8 29.4942 8H31.0049L31.1372 8.022L31.3894 8.11276L31.5869 8.21409L31.6584 8.2606L31.8244 8.39486L31.8918 8.46363L32.0229 8.63251L32.0826 8.73744L32.1573 8.92911L32.2411 9.20649L32.2775 9.50054ZM32.2773 15.7517V12.374C32.2773 12.1408 32.0915 11.9518 31.8623 11.9518C31.6331 11.9518 31.4472 12.1408 31.4472 12.374V15.7517C31.4472 15.9849 31.6331 16.1739 31.8623 16.1739C32.0915 16.1739 32.2773 15.9849 32.2773 15.7517ZM11 16.4544V13.0767C11 12.8435 11.1858 12.6545 11.4151 12.6545C11.6443 12.6545 11.8301 12.8435 11.8301 13.0767V16.4544C11.8301 16.6875 11.6443 16.8766 11.4151 16.8766C11.1858 16.8766 11 16.6875 11 16.4544ZM11 22.3653V18.9876C11 18.7544 11.1858 18.5654 11.4151 18.5654C11.6443 18.5654 11.8301 18.7544 11.8301 18.9876V22.3653C11.8301 22.5985 11.6443 22.7875 11.4151 22.7875C11.1858 22.7875 11 22.5985 11 22.3653ZM11 24.8986V28.2762C11 28.5094 11.1858 28.6985 11.4151 28.6985C11.6443 28.6985 11.8301 28.5094 11.8301 28.2762V24.8986C11.8301 24.6654 11.6443 24.4763 11.4151 24.4763C11.1858 24.4763 11 24.6654 11 24.8986ZM11 30.8095V32.9687L11.0378 33.2385L11.1199 33.507L11.1949 33.6997L11.2546 33.8046L11.3857 33.9735L11.4511 34.0407L11.6172 34.1766L11.6906 34.2247L11.8535 34.3083C12.0582 34.4133 12.3078 34.3296 12.411 34.1214C12.5142 33.9132 12.4319 33.6593 12.2273 33.5543L12.1035 33.4908L12.0081 33.4127L11.9433 33.3292L11.8992 33.2172L11.8413 33.0375L11.8247 32.9007L11.8301 30.8095C11.8301 30.5763 11.6443 30.3873 11.4151 30.3873C11.1858 30.3873 11 30.5763 11 30.8095ZM14.5131 34.4726H17.8336C18.0628 34.4726 18.2486 34.2836 18.2486 34.0504C18.2486 33.8172 18.0628 33.6282 17.8336 33.6282H14.5131C14.2839 33.6282 14.0981 33.8172 14.0981 34.0504C14.0981 34.2836 14.2839 34.4726 14.5131 34.4726ZM23.6442 34.4726H20.3238C20.0946 34.4726 19.9087 34.2836 19.9087 34.0504C19.9087 33.8172 20.0946 33.6282 20.3238 33.6282H23.6442C23.8735 33.6282 24.0593 33.8172 24.0593 34.0504C24.0593 34.2836 23.8735 34.4726 23.6442 34.4726ZM26.1347 34.4726H29.4551C29.6843 34.4726 29.8702 34.2836 29.8702 34.0504C29.8702 33.8172 29.6843 33.6282 29.4551 33.6282H26.1347C25.9054 33.6282 25.7196 33.8172 25.7196 34.0504C25.7196 34.2836 25.9054 34.4726 26.1347 34.4726ZM32.1489 33.5308L32.1135 33.6208C32.0284 33.8373 31.7868 33.9426 31.574 33.856C31.3612 33.7694 31.2576 33.5237 31.3428 33.3072L31.3696 33.241L31.4203 33.1025L31.4473 32.9687V30.1069C31.4473 29.8737 31.6331 29.6847 31.8623 29.6847C32.0915 29.6847 32.2774 29.8737 32.2774 30.1069L32.272 33.0367L32.2239 33.3035L32.1489 33.5308ZM32.2773 27.5736V24.1959C32.2773 23.9627 32.0915 23.7737 31.8623 23.7737C31.6331 23.7737 31.4472 23.9627 31.4472 24.1959V27.5736C31.4472 27.8068 31.6331 27.9958 31.8623 27.9958C32.0915 27.9958 32.2773 27.8068 32.2773 27.5736ZM32.2773 18.2849V21.6626C32.2773 21.8958 32.0915 22.0848 31.8623 22.0848C31.6331 22.0848 31.4472 21.8958 31.4472 21.6626V18.2849C31.4472 18.0518 31.6331 17.8627 31.8623 17.8627C32.0915 17.8627 32.2773 18.0518 32.2773 18.2849ZM27.0038 8H23.6833C23.4541 8 23.2683 8.18903 23.2683 8.42221C23.2683 8.65539 23.4541 8.84442 23.6833 8.84442H27.0038C27.233 8.84442 27.4188 8.65539 27.4188 8.42221C27.4188 8.18903 27.233 8 27.0038 8ZM17.8725 8H21.1929C21.4221 8 21.608 8.18903 21.608 8.42221C21.608 8.65539 21.4221 8.84442 21.1929 8.84442H17.8725C17.6432 8.84442 17.4574 8.65539 17.4574 8.42221C17.4574 8.18903 17.6432 8 17.8725 8Z' fill={colors.officialBlue}/>
      <path fillRule='evenodd' clipRule='evenodd' d='M17.0792 11.7749C17.0792 12.0065 16.8693 12.1943 16.6104 12.1943C16.3515 12.1943 16.1417 12.0065 16.1417 11.7749V9.38936L16.1509 9.38081L16.1417 8.83435V8.41943C16.1417 8.18779 16.3515 8 16.6104 8C16.8693 8 17.0792 8.18779 17.0792 8.41943V11.7749ZM16.1417 8.83435L16.1318 8.25514L13.4865 10.6336C13.3039 10.7978 13.3046 11.0634 13.4881 11.2268C13.6717 11.3902 13.9685 11.3895 14.1511 11.2253L16.1417 9.38936V8.83435ZM11.5025 12.4181C11.6851 12.2539 11.982 12.2533 12.1655 12.4167C12.349 12.5801 12.3899 12.6262 12.3899 12.6262L14.7024 12.6228C14.9613 12.6228 15.1712 12.8106 15.1712 13.0422C15.1712 13.2739 14.9613 13.4617 14.7024 13.4617H11.4697C11.0526 13.4617 10.8432 13.0109 11.1374 12.7464L11.5025 12.4181Z' fill={colors.officialBlue}/>
      <path fillRule='evenodd' clipRule='evenodd' d='M7.39014 9.67571V29.6555L7.42225 29.8582L7.48812 30.0626L7.55399 30.2322L7.68408 30.4019L7.84875 30.5384L8.04471 30.6402L8.24067 30.7072L8.43663 30.742H27.0147L27.2106 30.7072L27.4066 30.6402L27.6025 30.5384L27.7672 30.4019L27.8973 30.2322L27.9632 30.0626L28.029 29.8582L28.0611 29.6555V6.47383L28.029 6.2372L27.9632 6.03449L27.8973 5.86486L27.7672 5.69523L27.6025 5.56038L27.4066 5.4586L27.2106 5.39075H12.2938' fill='white'/>
      <path fillRule='evenodd' clipRule='evenodd' d='M28.2775 6.50054V6.84075C28.2775 7.07393 28.0917 7.26296 27.8624 7.26296C27.6332 7.26296 27.4474 7.07393 27.4474 6.84075L27.4514 6.55899L27.4365 6.39896L27.3783 6.21993L27.3342 6.10791L27.2702 6.02544L27.1703 5.94463L27.0703 5.88997L26.9371 5.84442H25.4942C25.265 5.84442 25.0791 5.65539 25.0791 5.42221C25.0791 5.18903 25.265 5 25.4942 5H27.0049L27.1372 5.022L27.3894 5.11276L27.5869 5.21409L27.6584 5.2606L27.8244 5.39486L27.8918 5.46363L28.0229 5.63251L28.0826 5.73744L28.1573 5.92911L28.2411 6.20649L28.2775 6.50054ZM28.2773 12.7517V9.37401C28.2773 9.14083 28.0915 8.9518 27.8623 8.9518C27.6331 8.9518 27.4472 9.14083 27.4472 9.37401V12.7517C27.4472 12.9849 27.6331 13.1739 27.8623 13.1739C28.0915 13.1739 28.2773 12.9849 28.2773 12.7517ZM7 13.4544V10.0767C7 9.8435 7.18583 9.65447 7.41506 9.65447C7.64428 9.65447 7.83011 9.8435 7.83011 10.0767V13.4544C7.83011 13.6875 7.64428 13.8766 7.41506 13.8766C7.18583 13.8766 7 13.6875 7 13.4544ZM7 19.3653V15.9876C7 15.7544 7.18583 15.5654 7.41506 15.5654C7.64428 15.5654 7.83011 15.7544 7.83011 15.9876V19.3653C7.83011 19.5985 7.64428 19.7875 7.41506 19.7875C7.18583 19.7875 7 19.5985 7 19.3653ZM7 21.8986V25.2762C7 25.5094 7.18583 25.6985 7.41506 25.6985C7.64428 25.6985 7.83011 25.5094 7.83011 25.2762V21.8986C7.83011 21.6654 7.64428 21.4763 7.41506 21.4763C7.18583 21.4763 7 21.6654 7 21.8986ZM7 27.8095V29.9687L7.03779 30.2385L7.11992 30.507L7.19488 30.6997L7.25456 30.8046L7.38572 30.9735L7.45114 31.0407L7.61716 31.1766L7.69056 31.2247L7.85354 31.3083C8.05822 31.4133 8.30781 31.3296 8.41101 31.1214C8.51421 30.9132 8.43195 30.6593 8.22726 30.5543L8.1035 30.4908L8.0081 30.4127L7.94326 30.3292L7.89921 30.2172L7.84135 30.0375L7.82469 29.9007L7.83011 27.8095C7.83011 27.5763 7.64428 27.3873 7.41506 27.3873C7.18583 27.3873 7 27.5763 7 27.8095ZM10.5131 31.4726H13.8336C14.0628 31.4726 14.2486 31.2836 14.2486 31.0504C14.2486 30.8172 14.0628 30.6282 13.8336 30.6282H10.5131C10.2839 30.6282 10.0981 30.8172 10.0981 31.0504C10.0981 31.2836 10.2839 31.4726 10.5131 31.4726ZM19.6442 31.4726H16.3238C16.0946 31.4726 15.9087 31.2836 15.9087 31.0504C15.9087 30.8172 16.0946 30.6282 16.3238 30.6282H19.6442C19.8735 30.6282 20.0593 30.8172 20.0593 31.0504C20.0593 31.2836 19.8735 31.4726 19.6442 31.4726ZM22.1347 31.4726H25.4551C25.6843 31.4726 25.8702 31.2836 25.8702 31.0504C25.8702 30.8172 25.6843 30.6282 25.4551 30.6282H22.1347C21.9054 30.6282 21.7196 30.8172 21.7196 31.0504C21.7196 31.2836 21.9054 31.4726 22.1347 31.4726ZM28.1489 30.5308L28.1135 30.6208C28.0284 30.8373 27.7868 30.9426 27.574 30.856C27.3612 30.7694 27.2576 30.5237 27.3428 30.3072L27.3696 30.241L27.4203 30.1025L27.4473 29.9687V27.1069C27.4473 26.8737 27.6331 26.6847 27.8623 26.6847C28.0915 26.6847 28.2774 26.8737 28.2774 27.1069L28.272 30.0367L28.2239 30.3035L28.1489 30.5308ZM28.2773 24.5736V21.1959C28.2773 20.9627 28.0915 20.7737 27.8623 20.7737C27.6331 20.7737 27.4472 20.9627 27.4472 21.1959V24.5736C27.4472 24.8068 27.6331 24.9958 27.8623 24.9958C28.0915 24.9958 28.2773 24.8068 28.2773 24.5736ZM28.2773 15.2849V18.6626C28.2773 18.8958 28.0915 19.0848 27.8623 19.0848C27.6331 19.0848 27.4472 18.8958 27.4472 18.6626V15.2849C27.4472 15.0518 27.6331 14.8627 27.8623 14.8627C28.0915 14.8627 28.2773 15.0518 28.2773 15.2849ZM23.0038 5H19.6833C19.4541 5 19.2683 5.18903 19.2683 5.42221C19.2683 5.65539 19.4541 5.84442 19.6833 5.84442H23.0038C23.233 5.84442 23.4188 5.65539 23.4188 5.42221C23.4188 5.18903 23.233 5 23.0038 5ZM13.8725 5H17.1929C17.4221 5 17.608 5.18903 17.608 5.42221C17.608 5.65539 17.4221 5.84442 17.1929 5.84442H13.8725C13.6432 5.84442 13.4574 5.65539 13.4574 5.42221C13.4574 5.18903 13.6432 5 13.8725 5Z' fill={colors.officialBlue}/>
      <path fillRule='evenodd' clipRule='evenodd' d='M13.0792 8.77487C13.0792 9.00652 12.8693 9.1943 12.6104 9.1943C12.3515 9.1943 12.1417 9.00652 12.1417 8.77487V6.38936L12.1509 6.38081L12.1417 5.83435V5.41943C12.1417 5.18779 12.3515 5 12.6104 5C12.8693 5 13.0792 5.18779 13.0792 5.41943V8.77487ZM12.1417 5.83435L12.1318 5.25514L9.48651 7.63362C9.30389 7.79782 9.30461 8.06338 9.48814 8.22678C9.67166 8.39017 9.96847 8.38952 10.1511 8.22532L12.1417 6.38936V5.83435ZM7.50252 9.41812C7.68514 9.25392 7.98196 9.25327 8.16548 9.41666C8.349 9.58006 8.3899 9.62625 8.3899 9.62625L10.7024 9.6228C10.9613 9.6228 11.1712 9.81058 11.1712 10.0422C11.1712 10.2739 10.9613 10.4617 10.7024 10.4617H7.46972C7.05264 10.4617 6.84323 10.0109 7.13743 9.74638L7.50252 9.41812Z' fill={colors.officialBlue}/>
      <path fillRule='evenodd' clipRule='evenodd' d='M3 5.39462V25.8857L3.03107 26.0936L3.0948 26.3033L3.15853 26.4772L3.2844 26.6512L3.44372 26.7912L3.63332 26.8956L3.82292 26.9643L4.01252 27H21.9875L22.1771 26.9643L22.3667 26.8956L22.5563 26.7912L22.7156 26.6512L22.8415 26.4772L22.9052 26.3033L22.9689 26.0936L23 25.8857V2.1108L22.9689 1.86811L22.9052 1.66022L22.8415 1.48625L22.7156 1.31228L22.5563 1.17397L22.3667 1.06959L22.1771 1H7.7445' fill='white'/>
      <path fillRule='evenodd' clipRule='evenodd' d='M22.243 0.0278987L22.07 0L8.49849 1.97887e-05L8.48599 0.00112382C8.45993 0.00153031 8.4338 0.00380525 8.4078 0.00803344L8.40088 0.00864443C8.2758 0.0310276 8.16564 0.095658 8.08617 0.186999L2.15918 6.05903C2.03574 6.18133 1.98885 6.33481 2.0022 6.48084V26.2L2.05164 26.5421L2.15908 26.8825L2.25714 27.1268L2.33522 27.2599L2.5068 27.474L2.59239 27.5591L2.80958 27.7315L2.90561 27.7925L3.16407 27.921L3.49594 28.0356L3.83327 28.099L21.8115 28.1068L22.1621 28.0551L22.4995 27.951L22.8313 27.7925L22.9274 27.7315L23.1446 27.5591L23.2301 27.474L23.4017 27.2598L23.4798 27.1268L23.5667 26.9127L23.6647 26.6245L23.7277 26.2862L23.7348 1.90251L23.6872 1.5297L23.5774 1.17801L23.4798 0.934988L23.4017 0.801958L23.2301 0.587831L23.142 0.500641L22.9248 0.330411L22.8313 0.271447L22.5729 0.142971L22.243 0.0278987ZM3.08798 6.97194L3.08108 26.1138L3.10287 26.2872L3.17856 26.5151L3.23586 26.6571L3.31948 26.7621L3.45088 26.8659L3.57959 26.9349L3.75918 27L3.92546 27.0361L21.7193 27.0439L21.8989 27.0195L22.084 26.965L22.2915 26.8605L22.4164 26.762L22.5011 26.6561L22.5472 26.5452L22.6135 26.3696L22.6488 26.2L22.654 1.97662L22.6345 1.77373L22.5584 1.54674L22.5 1.4036L22.4175 1.30082L22.2839 1.19697L22.1554 1.12838L21.9831 1.07063L9.04157 1.07065L9.04253 5.32309L9.01446 5.49523L8.89874 5.81979L8.76951 6.07567L8.6686 6.2144L8.45235 6.4243L8.17403 6.63871L7.95683 6.76718L7.84853 6.81621L7.49851 6.92228L7.11819 6.97194H3.08798ZM3.84724 5.90238L7.95548 1.83291L7.95656 5.23645L7.89777 5.41128L7.84145 5.51589L7.7267 5.62998L7.55417 5.76268L7.4581 5.81566L7.24795 5.88467L7.03869 5.90708L3.84724 5.90238Z' fill={colors.officialBlue}/>
    </svg>
  )
}