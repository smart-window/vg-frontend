import React from 'react'
import { useParams } from 'react-router-dom'
import Companies from 'web/pages/Companies/Companies'
import ClientCompany from 'web/pages/CompanyProfile/ClientCompany'


export default function CompanyRouter() {
  const { type, id } = useParams();

  if (id && type === 'client') return <ClientCompany />
  if (id && type === 'partner') return <div />

  return <Companies />
}
