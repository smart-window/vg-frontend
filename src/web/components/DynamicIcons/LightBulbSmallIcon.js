import { number } from 'prop-types'
import React from 'react'

LightBulbSmallIcon.propTypes = {
  height: number,
  width: number
}

LightBulbSmallIcon.defaultProps = {
  height: 38,
  width: 36
}

function LightBulbSmallIcon({height, width}) {
  return (
    <svg width={width} height={height} viewBox='0 0 36 38' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <rect width='36' height='36' transform='translate(0 1)' fill='none'/>
      <path fillRule='evenodd' clipRule='evenodd' d='M14 34.436V32.436H23V34.436H14Z' stroke='currentColor' strokeLinecap='round' strokeLinejoin='round'/>
      <path fillRule='evenodd' clipRule='evenodd' d='M14 32.436V30.436H23V32.436H14Z' stroke='currentColor' strokeLinecap='round' strokeLinejoin='round'/>
      <path fillRule='evenodd' clipRule='evenodd' d='M23 34.436V34.8635L22.9471 35.2335L22.7841 35.601L22.5697 35.9052L22.2488 36.091L18.876 37.376L18.5 37.436L18.1262 37.376L14.7512 36.091L14.4303 35.9052L14.2159 35.601L14.055 35.2335L14 34.8635V34.436H23Z' stroke='currentColor' strokeLinecap='round' strokeLinejoin='round'/>
      <path d='M13.6451 27.2593L13.2674 26.1369L12.8307 25.0674L12.3403 24.1036L11.794 23.1978L11.25 22.2921L10.0502 20.5818L9.45028 19.7258L8.90628 18.8714L8.41365 18.0147L7.92329 17.0532L7.54551 16.0893L7.27276 15.0198L7.10956 13.8974L7.05591 13.3087L7 12.72L7.10956 11.5433L7.27276 10.4209L7.54551 9.34912L7.92329 8.33469L8.41365 7.318L8.95992 6.41227L9.66939 5.55559L10.3766 4.75401L11.1956 4.00527L12.066 3.36371L13.0483 2.82782L14.0305 2.34702L15.0664 1.96963L16.2103 1.64885L17.3005 1.48884L18.5004 1.436L19.7002 1.48884L20.7897 1.64885L21.9336 1.96963L22.9695 2.34702L23.9517 2.82782L24.934 3.36371L25.8066 4.00527L26.6234 4.75401L27.3329 5.55559L28.0401 6.41227L28.5863 7.318L29.0767 8.33469L29.4545 9.34912L29.7272 10.4209L29.8904 11.5433L30 12.72L29.9464 13.3087L29.8904 13.8974L29.7272 15.0198L29.4545 16.0893L29.0767 17.0532L28.5863 18.0147L28.096 18.8714L27.5497 19.7258L26.9498 20.5818L25.75 22.2921L25.206 23.1978L24.6597 24.1036L24.1693 25.0674L23.7334 26.1369L23.3556 27.2593' stroke='currentColor' strokeLinecap='round' strokeLinejoin='round'/>
      <path d='M21 27.5L22.7578 19.8402L24 13.436' stroke='currentColor' strokeLinecap='round' strokeLinejoin='round'/>
      <path d='M13 13.436L14.2422 19.8402L16 27.5' stroke='currentColor' strokeLinecap='round' strokeLinejoin='round'/>
      <path d='M24 13.1869L21.473 15L18.946 13.1869L18.7227 13.0637L18.4995 13L18.2773 13.0637L18.054 13.1869L15.527 15L13 13.1869' stroke='currentColor' strokeLinecap='round' strokeLinejoin='round'/>
      <path d='M23.3 27.5H13.7' stroke='currentColor' strokeLinecap='round' strokeLinejoin='round'/>
    </svg>

  )
}

export default LightBulbSmallIcon